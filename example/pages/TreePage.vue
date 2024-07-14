<template>
  <div class="page w-full h-full">
    <mu-tree v-model:list="list" class-name="tree-test" @node-move="onMove">
      <template #default="{ data }">
        <div class="d-flex align-center">
          <div
            class="d-center tree-angle"
            v-if="data.children && data.children.length > 0"
          ></div>
          <div class="d-center tree-dot" v-else></div>
          <span :class="{ 'tree-empty': !data.title }">
            {{ data.title || "菜单名称" }}
          </span>
        </div>
      </template>
      <!-- <template #content>
        <div class="drag-p drag-icon"></div>
      </template> -->
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
        children: [
          {
            title: "PP one1111",
          },
        ],
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
  // console.log("--onMove-", data);
};
</script>
<style lang="scss">
.drag-p {
  width: 20px;
  height: 20px;
  background: red;
}
.mu-tree {
  color: #000;
  * {
    user-select: none;
  }
}
.erp-drag-tree {
  color: #000;
}
.tree-dot, .tree-angle {
  font-family: emoji;
  width: 10px;
  height: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: .25s;
  position: relative;
  margin-right: 10px;
  margin-left: 10px;
  margin-top: 4px;
}
.tree-angle {
  border-right: 1px solid #000;
  border-top: 1px solid #000;
  transform: rotate(45deg);
  transform-origin: 50% 25%;
}
.tree-item.expand {
  .tree-angle {
    transform: rotate(135deg);
  }
}
</style>
