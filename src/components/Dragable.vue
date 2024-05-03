<template>
  <div
    ref="content"
    :class="`drag-win drag-${direction}`"
    :style="{
      display: showMode !== 2 ? 'block' : 'none',
      width: width + 'px',
      height: height + 'px'
    }"
  >
    <slot />
    <div
      class="drag-line-common drag-line"
      v-if="dragEnabled"
      :class="{ resize: resizeAble }"
      @mousedown="onMouseDown"
    />
  </div>
</template>

<script lang="ts" setup>
import { onBeforeMount, ref } from "vue";
import { DragDirection } from "../utils/constaints";
defineOptions({
  name: "mu-dragable",
});
const props = defineProps({
  direction: { type: String, default: DragDirection.right },
  minWidth: { type: Number, default: 8 },
  maxWidth: { type: Number, default: 0 },
  initWidth: { type: Number, default: 0 },

  minHeight: { type: Number, default: 8 },
  maxHeight: { type: Number, default: 0 },
  initHeight: { type: Number, default: 0 },
  showMode: { type: Number, default: 0 },
  dragEnabled: { type: Boolean, default: true },

  changeWidth: { type: Number, default: 0 },
});
const resizeAble = ref(false);
const content = ref<HTMLDivElement>();
const width = ref(props.direction===DragDirection.left||props.direction===DragDirection.right? props.initWidth:'inherit');
function setWidthFlex(w: number) {
  if (props.changeWidth>0) {
    width.value = w < props.changeWidth? props.minWidth:w;
  } else {
    width.value = w;
  }
}
const height = ref(props.direction===DragDirection.top||props.direction===DragDirection.bottom? props.initHeight:'inherit');
function setHeightFlex(w: number) {
  height.value = w;
}
onBeforeMount(() => {
  setWidthFlex(props.initWidth);
});

let clientX = 0,
  clientY = 0,
  tempWidth = 0,
  tempHeight = 0;
const onMouseDown = (e: MouseEvent) => {
  e.preventDefault();
  resizeAble.value = true;
  clientX = e.clientX;
  clientY = e.clientY;
  tempWidth = content.value?.offsetWidth || 0;
  tempHeight = content.value?.offsetHeight || 0;
  window.document.body.style.cursor =
    props.direction === "right" ? "col-resize" : "row-resize";
  window.addEventListener("mousemove", onMouseMove);
  window.addEventListener("mouseup", onMouseUp, { once: true });
};
function onMouseMove(e: MouseEvent) {
  if (!resizeAble.value || !content.value) return;
  e.preventDefault();
  if (props.direction === DragDirection.right) {
    let sW = tempWidth + e.clientX - clientX;
    let minWidth = props.minWidth;
    let maxWidth = props.maxWidth;
    if (sW < minWidth) {
      setWidthFlex(minWidth);
      return;
    }
    if (e.clientX !== clientX) {
      sW = minWidth && sW < minWidth ? minWidth : sW;
      sW = maxWidth && sW > maxWidth ? maxWidth : sW;
      setWidthFlex(sW);
    }
  } else if (props.direction === DragDirection.left) {
    let sW = tempWidth + clientX - e.clientX;
    let minWidth = props.minWidth;
    let maxWidth = props.maxWidth;
    if (minWidth && sW < minWidth) {
      setWidthFlex(minWidth);
      return;
    }
    if (e.clientX !== clientX) {
      sW = minWidth && sW < minWidth ? minWidth : sW;
      sW = maxWidth && sW > maxWidth ? maxWidth : sW;
      setWidthFlex(sW);
    }
  } else if (props.direction === DragDirection.top) {
    let sH = tempHeight + clientY - e.clientY;
    let minHeight = props.minHeight;
    let maxHeight = props.maxHeight;
    if (minHeight && sH < minHeight) {
      setHeightFlex(minHeight);
      return;
    }
    if (e.clientY !== clientY) {
      sH = minHeight && sH < minHeight ? minHeight : sH;
      sH = maxHeight && sH > maxHeight ? maxHeight : sH;
      setHeightFlex(sH);
    }
  } else if (props.direction === DragDirection.bottom) {
    let sH = tempHeight + e.clientY - clientY;
    let minHeight = props.minHeight;
    let maxHeight = props.maxHeight;
    if (minHeight && sH < minHeight) {
      setHeightFlex(minHeight);
      return;
    }
    if (e.clientY !== clientY) {
      sH = minHeight && sH < minHeight ? minHeight : sH;
      sH = maxHeight && sH > maxHeight ? maxHeight : sH;
      setHeightFlex(sH);
    }
  }
}
function onMouseUp() {
  resizeAble.value = false;
  window.document.body.style.cursor = "initial";
  window.removeEventListener("mousemove", onMouseMove);
}
</script>

<style scoped></style>
