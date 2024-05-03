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
      :ref="onRef"
    >
      <div ref="dragRef" v-if="!noDrag" class="mu-tree-left-icon">
        <slot name="drag-icon"></slot>
      </div>
      <slot :data="data" :level="level" :index="index"></slot>
    </div>
    <collapse-expand
      v-if="data.children && data.children.length > 0"
      :expand="data.expand"
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
          @drag-start="onDragStart"
          @drag-move="onDragMove"
          @drag-end="onDragEnd"
        >
          <template #default="{ data, level, index}">
            <slot :data="data" :level="level" :index="index"></slot>
          </template>
          <template #drag-icon>
            <slot name="drag-icon"></slot>
          </template>
        </tree-node>
      </div>
    </collapse-expand>
  </div>
</template>
<script lang="ts" setup>
// import { useDraggable } from "element-plus";
import {
  defineComponent,
  onMounted,
  ref,
  defineEmits,
  inject,
  onUnmounted,
  watch,
} from "vue";
import CollapseExpand from "./CollapseExpand.vue";
import { useDraggable } from "./useDraggable";
const props = defineProps({
  data: { type: Object, default: undefined },
  index: { type: String, default: "" },
  level: { type: Number, default: 0 },
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
const refList = inject("refList");
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

const onRef = (el) => {
  if (!props.noDrag) {
    refList.value[props.index] = {
      el,
      data: props.data,
      index: props.index,
    };
  }
};
const emit = defineEmits(["drag-start", "drag-move", "drag-end"]);
const dragRef = useDraggable((key: string, data: any) => {
  data.index = props.index;
  data.target = props.data;
  emit(key, data);
});
const onDragStart = (e) => {
  emit("drag-start", e);
};
const onDragMove = (e) => {
  emit("drag-move", e);
};
const onDragEnd = (e) => {
  emit("drag-end", e);
};
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
  &:hover {
    background-color: rgb(36, 36, 36);
    .drag-icon {
      opacity: 1;
    }
  }
}
.tree-inner {
  flex: 1;
  display: flex;
  align-items: center;
  * {
    user-select: none;
  }
}
.tree-content {
  padding: 7px 3px;
  border-radius: 4px;
  border: 1px solid transparent;
}
.enter-center {
  .tree-content {
    border: 1px dashed var(--mu-enter-color);
  }
}
.enter-top {
  .tree-content {
    border-top-color: var(--mu-enter-color);
  }
}
.enter-bottom {
  .tree-content {
    border-bottom-color: var(--mu-enter-color);
  }
}
.mu-tree-left-icon {
  display: inline-block;
  line-height: 0;
}
</style>
