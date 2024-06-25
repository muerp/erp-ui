<template>
  <div class="page w-full h-full d-center black-page">
    <mu-latter-animation
      :startLatterSpacing="-50"
      :endLatterSpacing="0"
      :startBlur="10"
      :endBlur="2"
    >
      Web Developer
    </mu-latter-animation>
  </div>
</template>
<script lang="ts" setup>
import { ref } from "vue";
</script>
<style lang="scss">
html,
body {
  color: #fff;
}
.black-page {
    background: #000;
}
.mu-ani-letter-up {
  font-size: 100px;
}
</style>
