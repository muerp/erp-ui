<template>
  <div class="w-full h-full d-column">
    <div class="d-flex">
      <mu-dragable :initWidth="300" class="drag-one" :dragWidth="200" :minWidth="100">
        拖动右边
      </mu-dragable>
      <mu-dragable :initHeight="300" class="drag-two" direction="bottom">
        拖动下边
      </mu-dragable>
    </div>
    <div style="background: #ccc; flex: 1"></div>
    <div class="d-flex">
      <mu-dragable :initHeight="300" class="drag-three" direction="top">
        拖动上边
      </mu-dragable>
      <mu-dragable :initWidth="300" class="drag-four" direction="left">
        拖动左边
      </mu-dragable>
    </div>
  </div>
</template>

<style lang="scss">
.drag-one,
.drag-four {
  background-color: aliceblue;
  height: 100%;
  color: #000;
}
.drag-two,
.drag-three {
  background-color: aqua;
  height: 100%;
  color: #000;
}
.drag-three,
.drag-two {
  flex: 1;
}
.drag-empty {
  flex: 1;
  background-color: rgb(128, 128, 83);
}
</style>
