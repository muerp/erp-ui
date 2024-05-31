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
    <el-dropdown placement="left-start" trigger="click" popper-class="color-drop">
      <div class="d-flex align-center color-select">Test Dropdown</div>
      <template #dropdown>
        <mu-color-picker placement="left">
          <div class="drop-label">COLORS</div>
          <div>dss</div>
        </mu-color-picker>
      </template>
    </el-dropdown>
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
