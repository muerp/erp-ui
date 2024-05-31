<template>
  <div class="text-center mu-letter-content" :style="{
    '--start-latter-spacing': startLatterSpacing+'px',
    '--end-latter-spacing': endLatterSpacing+'px',
    '--start-blur': 'blur('+startBlur+'px)',
    '--end-blur': 'blur('+endBlur+'px)',
    }">
    <span class="mu-ani-letter-up">
      <slot />
    </span>
  </div>
</template>
<script lang="ts" setup>
defineOptions({
  name: "MuLatterAnimation",
});
defineProps({
  startLatterSpacing: { type: Number, default: -10 },
  endLatterSpacing: { type: Number, default: 4 },
  startBlur: { type: Number, default: 10 },
  endBlur: { type: Number, default: 2 },
});
</script>
<style lang="scss"></style>
