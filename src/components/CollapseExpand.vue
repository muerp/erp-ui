<template>
  <div v-if="active" class="collapse-expand" style="overflow: auto" ref="expandRef">
    <slot />
  </div>
</template>
<script lang="ts" setup>
import { nextTick, onMounted, ref, watch } from "vue";

const props = defineProps({
  expand: { type: Boolean, default: false },
});
const active = ref(props.expand);
const expandRef = ref();
const openTimer = ref();
watch(
  () => props.expand,
  (val, old) => {
    if (val === old) return;
    clearTimeout(openTimer.value);
    if (val) {
      active.value = true;
      nextTick(() => {
        expandRef.value.style.overflow = "auto";
        expandRef.value.style.maxHeight = "0px";
        openTimer.value = setTimeout(() => {
          expandRef.value.style.maxHeight = expandRef.value.scrollHeight + "px";
          expandRef.value.style.overflow = "hidden";
          openTimer.value = setTimeout(() => {
            expandRef.value.style.maxHeight = "inherit";
          }, 300);
        });
      });
    } else {
      expandRef.value.style.maxHeight = expandRef.value.offsetHeight + "px";
      openTimer.value = setTimeout(() => {
        expandRef.value.style.maxHeight = "0px";
        openTimer.value = setTimeout(() => {
          active.value = false;
        }, 300);
      }, 0);
    }
  }
);
onMounted(() => {
  if (active.avlue) {
    expandRef.value.style.maxHeight = "inherit";
    expandRef.value.style.overflow = "hidden";
  }
});
</script>
<style lang="scss">
.collapse-expand {
  transition: all .3s;
  &::-webkit-scrollbar {
    display: none;
  }
}
</style>