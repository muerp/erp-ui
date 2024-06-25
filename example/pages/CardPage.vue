<template>
  <div class="page w-full h-full d-center black-page">
    <div class="d-flex">
      <mu-flip-card v-for="k in 4" class="ml-1" :key="k"> 
        <template #flip-up> {{k+1}} </template>
        <template #flip-down> {{k+1}} </template>
        <template #up> {{k+2}} </template>
        <template #down> {{k+2}} </template>
      </mu-flip-card>
    </div>
  </div>
</template>
<script lang="ts" setup></script>
<style lang="scss">
html,
body {
  color: #fff;
}
.black-page {
  background: #000;
}
</style>
