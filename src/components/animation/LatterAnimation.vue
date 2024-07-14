<template>
  <div
    class="text-center mu-letter-content"
    ref="root"
    :style="{
      '--start-latter-spacing': startLatterSpacing + 'px',
      '--end-latter-spacing': endLatterSpacing + 'px',
      '--start-blur': 'blur(' + startBlur + 'px)',
      '--end-blur': 'blur(' + endBlur + 'px)',
    }"
  >
    <span class="mu-ani-letter-up">
      <slot />
    </span>
  </div>
</template>
<script lang="ts" setup>
import { onMounted, ref } from 'vue';

defineOptions({
  name: "MuLatterAnimation",
});
const props = defineProps({
  startLatterSpacing: { type: Number, default: -10 },
  endLatterSpacing: { type: Number, default: 4 },
  startBlur: { type: Number, default: 10 },
  endBlur: { type: Number, default: 2 },
  duration: { type: [String,Number], default: 2 },
});
const root = ref<HTMLDivElement>();
onMounted(() => {
  root.value?.style.setProperty('--duration', props.duration+'s');
})
</script>
<style lang="scss"></style>
