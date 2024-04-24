<template>
  <div class="form-input" :class="{ focus: focus }">
    <div v-if="label" class="form-label">{{ label }}</div>
    <div
      class="form-inner d-flex align-center"
      :class="{
        error: errorText,
        'auto-height': tag === 'textarea',
        shake: shake,
      }"
    >
      <slot name="left"></slot>
      <textarea
        v-if="tag === 'textarea'"
        :placeholder="placeholder"
        :readOnly="readonly"
        :value="inputValue"
        @input="onChange"
        @focus="onFocus"
        @blur="onBlur"
      ></textarea>
      <input
        v-else
        :placeholder="placeholder"
        :type="type || 'text'"
        :readOnly="readonly"
        :value="inputValue"
        @input="onChange"
        @focus="onFocus"
        @blur="onBlur"
      />
      <slot />
      <slot name="right"></slot>
    </div>
    <div className="form-error" v-if="errorText || !hideErrorText">{{ errorText }}</div>
  </div>
</template>
<script lang="ts" setup>
import { ref, watch, onMounted } from "vue";
const focus = ref(false);
const emit = defineEmits(["update:modelValue", "update:errorText"]);
const shake = ref(false);
const inputValue = ref('');
defineOptions({
  name: "mu-form-input",
});
const props = defineProps({
  label: { type: String, default: "" },
  tag: { type: String, default: "input" },
  placeholder: { type: String, default: "" },
  type: { type: String, default: "" },
  readonly: { type: Boolean, default: false },
  modelValue: { type: String, default: "" },
  errorText: { type: String, default: "" },
  hideErrorText: { type: Boolean, default: true },
});
onMounted(() => {
  shake.value = !!props.errorText;
  inputValue.value = props.modelValue || ''
});
watch(()=>props.modelValue, (val) => {
  if (inputValue.value !== val) {
    inputValue.value = val;
  }
})
watch(
  () => props.errorText,
  () => {
    shake.value = !!props.errorText;
  }
);
watch(shake, (val) => {
  if (val) {
    setTimeout(() => {
      shake.value = false;
    }, 600);
  }
});
const onChange = (e) => {
  emit("update:modelValue", e.target.value);
  emit("change", e);
  emit("update:errorText", "");
  inputValue.value = e.target.value;
};
const onFocus = () => {
  focus.value = true;
};
const onBlur = () => {
  focus.value = false;
};
</script>
