<template>
  <div v-if="active" class="collapse-expand" style="overflow: auto" ref="expandRef">
    <slot />
  </div>
</template>
<script lang="ts" setup>
import { nextTick, onMounted, onUnmounted, ref, watch } from "vue";
defineOptions({
  name: 'MuCollapseExpand'
})
const props = defineProps({
  expand: { type: Boolean, default: false },
  name: {type: String, default: ''}
});
const active = ref(props.expand);
const expandRef = ref();
const openTimer = ref();
const initTimer = ref();
watch(
  () => props.expand,
  (val, old) => {
    if (val === old) return;
    if (initTimer.value) {
      expandRef.value.style.maxHeight = "inherit";
      expandRef.value.style.overflow = "hidden";
      active.value = val;
      return;
    }
    clearTimeout(openTimer.value);
    if (val) {
      active.value = true;
      nextTick(() => {
        if (!expandRef.value || !expandRef.value.style) return;
        expandRef.value.style.overflow = "auto";
        expandRef.value.style.maxHeight = "0px";
        openTimer.value = setTimeout(() => {
          if (!expandRef.value || !expandRef.value.style) return;
          expandRef.value.style.maxHeight = expandRef.value.scrollHeight + "px";
          expandRef.value.style.overflow = "hidden";
          openTimer.value = setTimeout(() => {
            if (!expandRef.value || !expandRef.value.style) return;
            expandRef.value.style.maxHeight = "inherit";
          }, 300);
        });
      });
    } else {
      if (!expandRef.value || !expandRef.value.style) return;
      expandRef.value.style.maxHeight = expandRef.value.offsetHeight + "px";
      openTimer.value = setTimeout(() => {
        if (!expandRef.value || !expandRef.value.style) return;
        expandRef.value.style.maxHeight = "0px";
        openTimer.value = setTimeout(() => {
          active.value = false;
        }, 300);
      }, 0);
    }
  }
);
onUnmounted(()=>{
  clearTimeout(openTimer.value);
})
onMounted(() => {
  initTimer.value = setTimeout(() => {
    initTimer.value = undefined;
  }, 500);
  active.value = props.expand;
  if (active.value) {
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