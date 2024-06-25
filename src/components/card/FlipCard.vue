<template>
  <div class="mu-flip-card">
    <div class="flip-card flip-card1"><slot name="flip-up"/></div>
    <div class="flip-card flip-card2"><slot name="flip-down"/></div>
    <div class="flip-card flip-card3"><slot name="up"/></div>
    <div class="flip-card flip-card4"><slot name="down"/></div>
  </div>
</template>
<script lang="ts" setup>
import { ref } from "vue";
defineOptions({
  name: "MuFlipCard",
});
defineProps({});
</script>
<style lang="scss" scoped>

</style>
