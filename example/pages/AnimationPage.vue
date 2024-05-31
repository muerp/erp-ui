<template>
  <div class="page w-full h-full d-center">
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
  background-color: #1f1f1f;
  color: #fff;
}
.mu-ani-letter-up {
  font-size: 100px;
}
</style>
