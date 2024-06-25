<template>
  <div class="w-full h-full d-flex nav-page">
    <mu-dragable :initWidth="300" class="nav-router" :changeWidth="200" :minWidth="100">
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
    href: "/",
  },
  {
    title: "Dragable",
    href: "/dragable",
  },
  {
    title: "Identify",
    href: "/identify",
  },
  {
    title: "Tree",
    href: "/tree",
  },
  {
    title: "TextAnimation",
    href: "/animation",
  },
  {
    title: "Charging",
    href: "/charging",
  },
   {
    title: "Card",
    href: "/card",
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
.router-link-exact-active {
    background-color: #e1e1e1;
}
.doc-inner {
    flex: 1;
    padding: 16px;
}
</style>
