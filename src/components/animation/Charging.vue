<template>
  <div class="mu-charging">
    <div class="mu-charging-content">
      <slot />
    </div>
    <div class="charging-circle"></div>
    <ul class="charging-bubbles">
      <li v-for="(item, index) in 15" :key="index"></li>
    </ul>
  </div>
</template>
<script lang="ts" setup>
import { ref } from "vue";
defineOptions({
  name: "MuCharging",
});
defineProps({});
const decimals = ref(2);
const prefix = ref("");
const suffix = ref("%");
const separator = ref(",");
const duration = ref(3000);
</script>
<style lang="scss" scoped>

</style>
