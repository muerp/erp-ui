<template>
  <div class="mu-tree" :class="[className, { 'is-dragable': !!dragItem }]">
    <tree-node
      v-for="(item, idx) in list"
      :data="item"
      :key="item.id"
      :index="idx + ''"
      :indent="indent"
      @drag-start="onDragStart"
      @drag-move="onDragMove"
      @drag-end="onDragEnd"
      @click="onClick"
      @dblclick="onDouble"
    >
      <template #default="{ data, level, index }">
        <slot :data="data" :level="level" :index="index"></slot>
      </template>
      <template #content="{ data, level, index }">
        <slot name="content" :data="data" :level="level" :index="index"></slot>
      </template>
    </tree-node>
  </div>
  <div
    class="erp-drag-tree"
    v-if="dragItem && dragPos"
    :style="{ left: dragPos.x + 20 + 'px', top: dragPos.y + 'px' }"
  >
    <tree-node :data="dragItem" index="0" :no-drag="true" :indent="indent">
      <template #content="{ data, level, index }">
        <slot :data="data" :level :index="index"></slot>
      </template>
    </tree-node>
  </div>
</template>
<script lang="ts" setup>
import { defineComponent, onMounted, provide, ref, watch } from "vue";
defineOptions({
  name: "MuTree",
});
import TreeNode from "./TreeNode.vue";
const props = defineProps({
  list: { type: Array<any>, default: [] },
  indent: { type: Number, default: 20 },
  modalvalue: { type: Object, default: undefined },
  disabledCenter: {type: Boolean, default: false},
  className: {type: String, default: ''}
});
defineComponent({
  components: {
    TreeNode,
  },
});
const emit = defineEmits(["update:modalvalue", "node-move", 'double-item', 'update:list']);
const activeItem = ref();
const dragItem = ref();
const dragPos = ref();
const refList = ref<any>({});
const timer = ref()
provide("refList", refList);
onMounted(() => {
  activeItem.value = props.list[0];
});
watch(
  () => props.list,
  () => {
    activeItem.value = props.list[0];
  }
);
watch(
  () => activeItem.value,
  (val, old) => {
    if (old) {
      old.active = false;
    }
    if (val) {
      val.active = true;
    }
    emit("update:modalvalue", val);
  }
);
const onClick = (_:any, item: any) => {
  item.expand = !item.expand;
  item.active = true;
  activeItem.value = item;
};
const onDouble = (_:any, item: any) => {
  emit("double-item", item);
};
const onDragStart = ({ target }: any) => {
  dragItem.value = target;
};
const curEnterItem = ref();
watch(
  () => curEnterItem.value,
  (_, old) => {
    if (old) {
      old.enterType = "";
    }
  }
);
const onDragMove = ({ offsetX, offsetY, index }: any) => {
  if (!dragItem.value) return;
  dragPos.value = {
    x: offsetX,
    y: offsetY,
  };
  const keys = Object.keys(refList.value);
  keys.sort();

  for (let i = 0; i < keys.length; ++i) {
    const key = keys[i];
    const itemRef = refList.value[key];
    const rect = itemRef.el.getBoundingClientRect();
    const dy = Math.abs(offsetY - rect.top);
    if (key.startsWith(index)) {
      continue;
    }
    const delta = props.disabledCenter? rect.height*0.5:10;
    if (dy < delta) {
      itemRef.data.enterType = "top";
      itemRef.data.targetIndex = itemRef.index;
      curEnterItem.value = itemRef.data;
      break;
    }
    const py = Math.abs(offsetY - rect.top - rect.height);
    if (py < delta) {
      if (
        itemRef.data.expand &&
        itemRef.data.children &&
        itemRef.data.children.length > 0
      ) {
        continue;
      }
      itemRef.data.enterType = "bottom";
      itemRef.data.targetIndex = itemRef.index;
      curEnterItem.value = itemRef.data;
      break;
    } else if (!props.disabledCenter && offsetY > rect.top && offsetY < rect.top + rect.height) {
      itemRef.data.enterType = "center";
      itemRef.data.targetIndex = itemRef.index;
      curEnterItem.value = itemRef.data;
      break;
    } else {
      curEnterItem.value = undefined;
    }
  }
};
const findNode = (path: number[]) => {
  if (path.length === 0) return undefined;
  let list = props.list;
  let node: any;
  for (let i=0; i<path.length; ++i) {
    node = list[path[i]];
    if (node) {
      list = node.children;
    } else {
      return undefined;
    }
  }
  return node;
}
const equalsPath = (path: number[], another: number[]) => {
  return (
    path.length === another.length && path.every((n, i) => n === another[i])
  )
}
const onDragEnd = (e: any) => {
  clearTimeout(timer.value)
  timer.value = undefined;
  if (dragItem.value && curEnterItem.value) {
    //移动
    const sourcePath = e.index.split('-').map((n: string) => ~~n);
    const targetPath = curEnterItem.value.targetIndex.split('-').map((n: string) => ~~n);
    const position = curEnterItem.value.enterType;
    const item = dragItem.value;
    const parent = curEnterItem.value
    emit("node-move", {
      item,
      parent,
      position,
      sourcePath,
      targetPath,
    });
    activeItem.value = dragItem.value;

    const list = [...props.list];

    const sourceIdx = sourcePath[sourcePath.length - 1];
    let targetIdx = targetPath[targetPath.length - 1];
    const itemParent = findNode(sourcePath.slice(0, -1));
    const itemList = itemParent? itemParent.children: list;
    const parentNode = findNode(targetPath.slice(0, -1));
    const parentList = parentNode? parentNode.children: list;

    itemList.splice(sourceIdx, 1);
    if (position==='center') {
        parent.expand = true;
        if (!parent.children) {
          parent.children = [];
        }
        parent.children.push(item);
    }  else if (equalsPath(sourcePath.slice(0, -1), targetPath.slice(0, -1))) {
      if (targetIdx > sourceIdx) {
        targetIdx -= 1;
      }
      const insertIdx = targetIdx + (position === 'top' ? 0 : 1);
      itemList.splice(insertIdx, 0, item)
    } else {
      parentList.splice(targetIdx + (position === 'top' ? 0 : 1) , 0, item);
    }
    console.log(list)
    emit('update:list', list)
  }
  dragItem.value = undefined;
  curEnterItem.value = undefined;
  dragPos.value = undefined;
};
defineExpose({
  findNode,
})
</script>
<style lang="scss">
.mu-tree {
  * {
    user-select: none;
  }
}
.tree-item {
  &:hover {
    background-color: #f9f9f9;
  }
  &.active {
    background-color: #f0f0f0;
  }
}
.is-dragable {
  .tree-item:not(.active) {
    &:hover {
      background-color: transparent;
    }
  }
}
.erp-drag-tree {
  position: fixed;
  z-index: 99;
  background-color: #fafafa;
  backdrop-filter: blur(10px);
  pointer-events: none;
  border-radius: 4px;
  border: 1px solid #ccc;
  .nav-icon {
    width: 16px;
  }
}

</style>
