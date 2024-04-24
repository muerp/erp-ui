<template>
    <div class="w-full h-full">
        <div class="d-flex" style="height: 50%">
            <mu-dragable initWidth="200" class="drag-one"></mu-dragable>
            <div class="drag-empty"></div>
        </div>
        <div class="d-flex" style="height: 50%">
            <div class="drag-empty"></div>
            
            <mu-dragable initWidth="200" class="drag-two" direction="left"></mu-dragable>
        </div>
    </div>
</template>

<style lang="scss">
.drag-one {
    background-color: aliceblue;
    height: 100%;
}
.drag-two {
    background-color: aqua;
    height: 100%;
}
.drag-empty {
    flex: 1;
    background-color: rgb(128, 128, 83);
}
</style>