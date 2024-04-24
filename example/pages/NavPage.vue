<template>
  <div class="w-full h-full d-flex nav-page">
    <mu-dragable initWidth="200" class="nav-router">
      <el-scrollbar>
        <div class="nav-label">组件</div>
        <router-link v-for="nav in navs" :to="nav.href">
          {{ nav.title }}
        </router-link>
      </el-scrollbar>
    </mu-dragable>
    <div class="doc-inner">
        <router-view/>
    </div>
  </div>
</template>

<script lang="ts" setup>
const navs = [
  {
    title: "Input",
    href: "/input",
  },
  {
    title: "Dragable",
    href: "/dragable",
  },
];
</script>
<style lang="scss">
.nav-router {
    background-color: #f1f1f1;
}
.nav-page {
  a {
    display: block;
    padding: 6px 10px;
    outline: none;
    text-decoration: none;
    width: 100%;
    color: #000;
  }
  .nav-label {
    padding: 6px 10px;
    font-size: 14px;
    color: #666;
  }
}
.router-link-active {
    background-color: #e1e1e1;
}
.doc-inner {
    flex: 1;
    padding: 16px;
}
</style>
