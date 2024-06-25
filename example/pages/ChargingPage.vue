<template>
  <div class="page w-full h-full d-center black-page">
    <mu-charging> {{ percent }}% </mu-charging>
  </div>
</template>
<script lang="ts" setup>
import { ref, onMounted } from "vue";
const percent = ref(0);

setInterval(() => {
  if (percent.value >= 100) {
    percent.value = 0;
  } else {
    percent.value += 1;
  }
}, 200);
</script>
<style lang="scss">
html,
body {
  color: #fff;
}
.black-page {
  background: #000;
}
</style>
