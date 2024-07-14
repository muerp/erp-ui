<template>
  <div class="tree-node" v-if="data">
    <div
      class="tree-item"
      :class="{
        expand: data.expand,
        active: data.active,
        'enter-center': data.enterType === 'center',
        'enter-top': data.enterType === 'top',
        'enter-bottom': data.enterType === 'bottom',
      }"
      :style="{ 'padding-left': indent * level + 'px' }"
      :ref="onRef"
    >
      <div class="tree-inner" @click="onClick" @dbclick="onDBClick">
        <div ref="dragRef" v-if="!noDrag" class="mu-tree-darg">
          <slot :data="data" :level="level" :index="index"></slot>
        </div>
        <slot name="content" :data="data" :level="level" :index="index"></slot>
      </div>
    </div>
    <collapse-expand
      v-if="data.children && data.children.length > 0"
      :expand="data.expand"
      :name="data.title"
    >
      <div
        v-loading="data.loading"
        element-loading-text="加载中..."
        element-loading-background="rgba(0, 0, 0, 0.3)"
      >
        <tree-node
          v-for="(node, idx) in data.children"
          :data="node"
          :key="node.id"
          :index="index + '-' + idx"
          :level="level + 1"
          :no-drag="noDrag"
          :indent="indent"
          @drag-start="onDragStart"
          @drag-move="onDragMove"
          @drag-end="onDragEnd"
          @click="onClick" 
          @dbclick="onDBClick"
        >
          <template #default="{ data, level, index }: any">
            <slot :data="data" :level="level" :index="index"></slot>
          </template>
          <template #content="{ data, level, index }: any">
            <slot name="content" :data="data" :level="level" :index="index"></slot>
          </template>
        </tree-node>
      </div>
    </collapse-expand>
  </div>
</template>
<script lang="ts" setup>
import { defineComponent, defineEmits, inject, onUnmounted, watch } from "vue";
import CollapseExpand from "./CollapseExpand.vue";
import { useDraggable } from "../../utils/useDraggable";

defineOptions({
  name: "MuTreeNode",
});
const props = defineProps({
  data: { type: Object, default: undefined },
  index: { type: String, default: "" },
  level: { type: Number, default: 0 },
  indent: { type: Number, default: 0 },
  noDrag: { type: Boolean, default: false },
});
defineComponent({
  components: {
    CollapseExpand,
  },
});
onUnmounted(() => {
  delete refList.value[props.index];
});
const refList = inject<any>("refList");
watch(
  () => props.index,
  (val, old) => {
    if (val !== old) {
      if (refList.value[old]) {
        refList.value[val] = refList.value[old];
        delete refList.value[old];
      }
    }
  }
);

const onRef = (el: any) => {
  if (!props.noDrag) {
    refList.value[props.index] = {
      el,
      data: props.data,
      index: props.index,
    };
  }
};
const emit = defineEmits(["drag-start", "drag-move", "drag-end", 'click', 'dbclick']);
const dragRef = useDraggable((key: string, data: any) => {
  data.index = props.index;
  data.target = props.data;
  emit(key as any, data);
});
const onDragStart = (e: MouseEvent) => {
  emit("drag-start", e);
};
const onDragMove = (e: MouseEvent) => {
  emit("drag-move", e);
};
const onDragEnd = (e: MouseEvent) => {
  emit("drag-end", e);
};
const onClick = (e: MouseEvent, data?: any) => {
  emit("click", e, data || props.data);
}
const onDBClick = (e: MouseEvent, data?: any) => {
  emit("dbclick", e, data || props.data);
}
</script>
<style lang="scss">
.tree-item {
  --mu-enter-color: #056bd1;
  display: flex;
  align-items: center;
  padding: 0 10px 0 0;
  cursor: pointer;
  transition: all 0.25s;
  border-radius: 4px;
}
.tree-inner {
  flex: 1;
  display: flex;
  align-items: center;
  * {
    user-select: none;
  }
}
.tree-inner {
  padding: 7px 3px;
  border-radius: 4px;
  border: 1px solid transparent;
}
.enter-center {
  .tree-inner {
    border: 1px dashed var(--mu-enter-color);
  }
}
.enter-top {
  .tree-inner {
    border-top-color: var(--mu-enter-color);
  }
}
.enter-bottom {
  .tree-inner {
    border-bottom-color: var(--mu-enter-color);
  }
}
.mu-tree-left-icon {
  display: inline-block;
  line-height: 0;
}
.mu-tree-darg {
  width: 100%;
}
</style>
