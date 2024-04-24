<template>
  <div
    ref="content"
    :class="`drag-win drag-${direction}`"
    :style="{
      display: showMode !== 2 ? 'block' : 'none',
      width: width + 'px',
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
import { DragDirection } from "../utils/constaints.ts";
defineOptions({
  name: "mu-dragable",
});
const props = defineProps({
  direction: { type: DragDirection, default: DragDirection.right },
  minWidth: { type: Number, default: 8 },
  maxWidth: { type: Number, default: 0 },
  initWidth: { type: Number, default: 0 },

  minHeight: { type: Number, default: 8 },
  maxHeight: { type: Number, default: 0 },
  initHeight: { type: Number, default: 0 },
  showMode: { type: Number, default: 0 },
  dragEnabled: { type: Boolean, default: true },
});
const resizeAble = ref(false);
const content = ref<HTMLDivElement>();
const width = ref(props.initWidth);
function setWidthFlex(w: number) {
  width.value = w;
}
const height = ref(props.initHeight || "auto");
function setHeightFlex(w: number) {
  width.value = w;
}
onBeforeMount(() => {
  width.value = props.initWidth;
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

    let minWidth = props.minWidth;
    let maxWidth = props.maxWidth;
    let sW = tempWidth + e.clientX - clientX;
    if (sW < minWidth) {
      setWidthFlex(minWidth);
      return;
    }
    if (e.clientX !== clientX) {
      sW = minWidth && sW < minWidth ? minWidth : sW;
      sW = maxWidth && sW > maxWidth ? maxWidth : sW;
      setWidthFlex(sW);
    }
    // this.clientX = e.clientX;
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
    let minHeight = props.minHeight;
    if (e.clientY < content.value.getBoundingClientRect().top + minHeight) {
      content.value.style.height = minHeight - 8 + "px";
      clientY = e.clientY;
      return;
    }
    let maxHeight = props.maxHeight;
    let mH = content.value.offsetHeight;
    let sH = mH + parseInt((e.clientY - clientY).toString());
    sH = sH < minHeight ? minHeight : sH;
    if (maxHeight) {
      sH = sH > maxHeight ? maxHeight : sH;
    }
    content.value.style.height = sH + "px";
    clientY = e.clientY;
  }
}
function onMouseUp() {
  resizeAble.value = false;
  window.document.body.style.cursor = "initial";
  window.removeEventListener("mousemove", onMouseMove);
}
</script>

<style scoped></style>
