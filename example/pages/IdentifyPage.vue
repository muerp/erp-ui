<template>
  <div class="w-full h-full">
    <el-row class="mb-2">
      <mu-identify :identify-code="identifyCode"></mu-identify>
    </el-row>
    <el-row class="mb-2">
      <mu-identify :identify-code="identifyCode1"></mu-identify>
    </el-row>
    <el-row class="mb-2">
      <mu-identify identify-code="您好"></mu-identify>
    </el-row>
  </div>
</template>
<script lang="ts" setup>
import { ref } from "vue";
const r = (~~(Math.random() * (10000 - 1234) + 1234)).toString();
const identifyCode = ref(r);

const r1 = `${~~(Math.random() * 10)}+${~~(Math.random() * 10)}`;
const identifyCode1 = ref(r1);
</script>
<style lang="scss"></style>
