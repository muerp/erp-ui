<template>
  <div class="page w-full h-full">
    <mu-tree :list="list" class-name="tree-test" @node-move="onMove" :disabled-center="true">
      <template #default="{ data }">
        <svg-icon
          v-if="data.children && data.children.length > 0"
          class="tree-arrow"
          icon="arrow-right"
        />
        <div class="d-center tree-dot" v-else></div>
        <span :class="{ 'tree-empty': !data.title }">
          {{ data.title || "菜单名称" }}
        </span>
      </template>
      <template #drag-icon>
        <div class="drag-p drag-icon"></div>
      </template>
    </mu-tree>
  </div>
</template>
<script lang="ts" setup>
import { ref } from "vue";

const list = ref([
  {
    title: "tree one",
    children: [
      {
        title: "PP one",
      },
    ],
  },
  {
    title: "tree two",
    children: [
      {
        title: "PP two",
      },
    ],
  },
  {
    title: "tree three",
    children: [
      {
        title: "PP three",
      },
    ],
  },
]);
const onMove = (data) => {
  console.log('--onMove-', data);
}
</script>
<style lang="scss">
html, body {
    background-color: #1f1f1f;
}
.drag-p {
  width: 20px;
  height: 20px;
  background: red;
}
.mu-tree {
    color: #fff;
    * {
        user-select: none;
    }
}
.erp-drag-tree {
    color: #fff;
}
</style>
