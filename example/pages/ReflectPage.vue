<template>
  <div class="page w-full h-full d-center black-page">
    <div class="reflect-card">
      <img src="../assets/test001.jpeg" style="width: 200px" />
    </div>
  </div>
</template>
<script setup lang="ts"></script>
<style lang="scss">
.reflect-card {
  box-shadow: 0 0 8px #fff;
  border-radius: 8px;
  overflow: hidden;
  -webkit-box-reflect: below 10px linear-gradient(transparent, transparent, #0005);
}
</style>
