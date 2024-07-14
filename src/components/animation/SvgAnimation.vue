<template>
  <div
    class="mu-svg-animation"
    ref="root"
    :style="{ stroke, fill, strokeWidth: lineWidth }"
  >
    <slot />
  </div>
</template>
<script lang="ts" setup>
import { onMounted, ref } from "vue";
defineOptions({
  name: "MuSvgAnimation",
});

const props = defineProps({
  lineWidth: { type: Number, default: 10 },
  fill: { type: String, default: "red" },
  stroke: { type: String, default: "white" },
  duration: { type: [String,Number], default: 2 },
});

const root = ref<HTMLDivElement>();
onMounted(() => {
  if (!root.value) return;
  root.value?.style.setProperty('--duration', props.duration+'s');
  const svgs = root.value.querySelectorAll("svg");
  svgs.forEach((svg) => {
    for (let i = 0; i < svg.childNodes.length; ++i) {
      const child = svg.childNodes[i] as SVGGeometryElement;
      child.style.setProperty("--line-width", child.getTotalLength().toString());
    }
  });
});
</script>
<style lang="scss">
.mu-svg-animation svg {
  * {
    --line-width: 300;
    stroke-dasharray: var(--line-width);
    stroke-dashoffset: var(--line-width);
    animation: svgAnimation var(--duration) forwards;
  }
}
@keyframes svgAnimation {
  to {
    stroke-dashoffset: 0;
  }
}
</style>
