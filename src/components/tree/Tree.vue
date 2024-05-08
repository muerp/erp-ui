<template>
  <el-scrollbar>
    <div class="mu-tree" :class="{ 'is-dragable': !!dragItem }">
      <tree-node
        v-for="(item, idx) in list"
        :data="item"
        :key="item.id"
        :index="idx + ''"
        @drag-start="onDragStart"
        @drag-move="onDragMove"
        @drag-end="onDragEnd"
      >
        <template #default="{ data, level, index }">
          <div
            class="tree-inner"
            :style="{ 'padding-left': indent * level + 'px' }"
            @click="onClick(data)"
            @dblclick="onDouble(data)"
          >
            <div class="tree-content d-flex h-full flex-1 align-center">
              <slot :data="data" :level="level" :index="index"></slot>
            </div>
          </div>
        </template>
        <template #drag-icon="{ data, level }">
          <slot name="drag-icon" :data="data" :level="level"></slot>
        </template>
      </tree-node>
    </div>
  </el-scrollbar>
  <div
    class="erp-drag-tree"
    v-if="dragItem && dragPos"
    :style="{ left: dragPos.x + 20 + 'px', top: dragPos.y + 'px' }"
  >
    <tree-node :data="dragItem" index="0" :no-drag="true">
      <template #default="{ data, level }">
        <div class="tree-inner" :style="{ 'padding-left': indent * level + 'px' }">
          <div class="tree-content d-flex h-full flex-1 align-center">
            <slot :data="data" :level></slot>
          </div>
        </div>
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
  disabledCenter: {type: Object, default: false},
});
defineComponent({
  components: {
    TreeNode,
  },
});
const emit = defineEmits(["update:modalvalue", "node-move", 'double-item']);
const activeItem = ref();
const dragItem = ref();
const dragPos = ref();
const refList = ref<any>({});
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
const onClick = (item: any) => {
  item.expand = !item.expand;
  item.active = true;
  activeItem.value = item;
};
const onDouble = (item: any) => {
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
const onDragEnd = (e: any) => {
  if (dragItem.value && curEnterItem.value) {
    //移动
    emit("node-move", {
      item: dragItem.value,
      parent: curEnterItem.value,
      position: curEnterItem.value.enterType,
      sourceIndex: parseInt(e.index),
      targetIndex: parseInt(curEnterItem.value.targetIndex)
    });
    activeItem.value = dragItem.value;
  }
  dragItem.value = undefined;
  curEnterItem.value = undefined;
  dragPos.value = undefined;
};
</script>
<style lang="scss">
.mu-tree {
  * {
    user-select: none;
  }
}
.drag-icon {
  transition: opacity all 0.25s;
  opacity: 0;
  cursor: move;
}
.is-dragable {
  .tree-item {
    &:hover {
      background-color: transparent;
    }
  }
}
.erp-drag-tree {
  position: fixed;
  z-index: 99;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(10px);
  pointer-events: none;
  .tree-item {
    padding-left: 8px;
  }
  .tree-content {
    padding: 6px;
  }
  .nav-icon {
    width: 16px;
  }
}
</style>
