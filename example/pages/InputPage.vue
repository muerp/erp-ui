<template>
  <div>
    <mu-form-input
      label="邮箱"
      v-model="email"
      placeholder="请输入邮箱"
      :hideErrorText="false"
      @change="onChange"
    ></mu-form-input>
    <mu-form-input label="验证码" placeholder="请输入验证码">
      <template #left>
        <el-button class="ml-1"> Left </el-button>
      </template>
      <template #right>
        <el-button class="mr-1"> Right </el-button>
      </template>
    </mu-form-input>
    <mu-form-input
      label="账号"
      placeholder="请输入账号"
      v-model:error-text="errorText"
    ></mu-form-input>
    <mu-form-input
      label="介绍"
      tag="textarea"
      placeholder="请输入邮箱"
      v-model:error-text="errorText"
    ></mu-form-input>
  </div>
</template>
<script lang="ts" setup>
import { ref } from "vue";
const email = ref("");
const errorText = ref('邮箱格式错误');
const onChange = (e) => {
  console.log("--onChange-", email.value);
};
</script>
