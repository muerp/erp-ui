<template>
    <div
      ref="content"
      class="drag-win drag-cross"
      :class="'direction-' + direction"
    >
      <div v-if="oneShow" class="drag-block drag-one" :style="oneStyle">
        <slot name="left-top" />
        <div
          class="drag-line-common drag-line-right"
          v-if="direction === 'row' && upMode === DragCrossMode.enabled"
          :class="{ resize: dragHReady || resizeHAble }"
          @mouseenter="onReadyDray('dragHReady')"
          @mouseleave="onCancelReadyDray('dragHReady')"
          @mousedown="onMouseHDown"
        />
        <div
          class="drag-line-common drag-line-right"
          v-else-if="
            direction === 'column' && downMode !== DragCrossMode.disabled
          "
          :class="{ resize: dragHReady || resizeHAble }"
          @mouseenter="onReadyDray('dragHReady')"
          @mouseleave="onCancelReadyDray('dragHReady')"
          @mousedown="onMouseHDown"
        />
        <div
          class="drag-line-common drag-line-bottom"
          v-if="
            direction === 'row' &&
            downMode !== DragCrossMode.disabled &&
            upMode !== DragCrossMode.disabled
          "
          :class="{ resize: dragVReady || resizeVAble }"
          @mouseenter="onReadyDray('dragVReady')"
          @mouseleave="onCancelReadyDray('dragVReady')"
          @mousedown="onMouseVDown"
        />
        <div
          class="drag-line-common drag-line-bottom"
          v-if="
            (direction === 'column' && upMode !== DragCrossMode.disabled) ||
            downMode !== DragCrossMode.disabled
          "
          :class="{ resize: dragVReady || resizeVAble }"
          @mouseenter="onReadyDray('dragVReady')"
          @mouseleave="onCancelReadyDray('dragVReady')"
          @mousedown="onMouseVDown"
        />
      </div>
      <div v-else style="width: 0; height: 0" class="drag-block">
        <slot name="left-top" />
      </div>
      <div v-if="twoShow" class="drag-block drag-two" :style="twoStyle">
        <slot name="right-top"></slot>
        <div
          class="drag-line-common drag-line-right"
          v-if="direction === 'column' && downMode !== DragCrossMode.disabled"
          :class="{ resize: dragHReady || resizeHAble }"
          @mouseenter="onReadyDray('dragHReady')"
          @mouseleave="onCancelReadyDray('dragHReady')"
          @mousedown="onMouseHDown"
        />
        <div
          class="drag-line-common drag-line-bottom"
          v-else-if="
            direction === 'row' &&
            downMode !== DragCrossMode.disabled &&
            upMode !== DragCrossMode.disabled
          "
          :class="{ resize: dragVReady || resizeVAble }"
          @mouseenter="onReadyDray('dragVReady')"
          @mouseleave="onCancelReadyDray('dragVReady')"
          @mousedown="onMouseVDown"
        />
      </div>
      <div v-else style="width: 0; height: 0" class="drag-block">
        <slot name="right-top" />
      </div>
      <div v-if="threeShow" class="drag-block drag-three" :style="threeStyle">
        <slot name="left-bottom" />
        <div
          class="drag-line-common drag-line-right"
          v-if="direction === 'row' && downMode === DragCrossMode.enabled"
          :class="{ resize: dragHReady || resizeHAble }"
          @mouseenter="onReadyDray('dragHReady')"
          @mouseleave="onCancelReadyDray('dragHReady')"
          @mousedown="onMouseHDown"
        />
        <div
          class="drag-line-common drag-line-bottom"
          v-else-if="direction === 'column' && downMode === DragCrossMode.enabled"
          :class="{ resize: dragVReady || resizeVAble }"
          @mouseenter="onReadyDray('dragVReady')"
          @mouseleave="onCancelReadyDray('dragVReady')"
          @mousedown="onMouseVDown"
        />
      </div>
      <div
        v-else-if="downMode !== DragCrossMode.disabled"
        :style="{ width: width + '%', height: 0 }"
        class="drag-block"
      >
        <slot name="left-bottom" />
      </div>
      <div v-if="fourShow" class="drag-block drag-four" :style="fourStyle">
        <slot name="right-bottom" />
      </div>
      <div
        v-else-if="downMode !== DragCrossMode.disabled"
        :style="{
          width: downMode === DragCrossMode.rightDisabled ? 0 : 100 - width + '%',
          height: 0,
        }"
        class="drag-block"
      >
        <slot name="right-bottom" />
      </div>
      <slot />
    </div>
  </template>
  
  <script lang="ts" setup>
  import { ref } from "vue";
  import { DragCrossMode } from "../utils/constaints";
  const props = defineProps({
    direction: "row",
    hor: 0,
    ver: 0,
    horEnabled: true,
    verEnabled: true,
    initWidth: "60%",
    initHeight: "50%",
    upMode: DragCrossMode.leftDisabled,
    downMode: DragCrossMode.disabled,
    dragEnabled: true,
  });
  </script>
  
  <style scoped></style>
  