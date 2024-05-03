<template>
  <div class="mu-identify">
    <canvas ref="canvas" :width="contentWidth" :height="contentHeight"></canvas>
  </div>
</template>
<script lang="ts" setup>
import { onMounted, ref, watch } from "vue";
defineOptions({
  name: "MuIdentify",
});
const props = defineProps({
  identifyCode: {
    type: String,
    default: "1234",
  },
  fontSizeMin: {
    type: Number,
    default: 22,
  },
  fontSizeMax: {
    type: Number,
    default: 30,
  },
  backgroundColorMin: {
    type: Number,
    default: 180,
  },
  backgroundColorMax: {
    type: Number,
    default: 240,
  },
  colorMin: {
    type: Number,
    default: 50,
  },
  colorMax: {
    type: Number,
    default: 160,
  },
  lineColorMin: {
    type: Number,
    default: 40,
  },
  lineColorMax: {
    type: Number,
    default: 180,
  },
  dotColorMin: {
    type: Number,
    default: 0,
  },
  dotColorMax: {
    type: Number,
    default: 255,
  },
  contentWidth: {
    type: Number,
    default: 88,
  },
  contentHeight: {
    type: Number,
    default: 30,
  },
});
const canvas = ref<HTMLCanvasElement>();
function randomColor(min: number, max: number) {
  var r = randomNum(min, max);
  var g = randomNum(min, max);
  var b = randomNum(min, max);
  return "rgb(" + r + "," + g + "," + b + ")";
}
function randomNum(min: number, max: number) {
  return Math.floor(Math.random() * (max - min) + min);
}
function render() {
  var ctx = canvas.value.getContext("2d");
  ctx.textBaseline = "bottom";
  // 绘制背景
  ctx.fillStyle = randomColor(props.backgroundColorMin, props.backgroundColorMax);
  ctx.fillRect(0, 0, props.contentWidth, props.contentHeight);
  // 绘制文字
  for (let i = 0; i < props.identifyCode.length; i++) {
    drawText(ctx, props.identifyCode[i], i);
  }
  drawLine(ctx);
  renderDot(ctx);
}
function drawText(ctx: CanvasRenderingContext2D, txt: string, i: number) {
  ctx.fillStyle = randomColor(props.colorMin, props.colorMax);
  ctx.font = randomNum(props.fontSizeMin, props.fontSizeMax) + "px SimHei";
  var x = (i + 1) * (props.contentWidth / (props.identifyCode.length + 1));
  var y = randomNum(props.fontSizeMax, props.contentHeight - 5);
  var deg = randomNum(-30, 30);
  // 修改坐标原点和旋转角度
  ctx.translate(x, y);
  ctx.rotate((deg * Math.PI) / 270);
  ctx.fillText(txt, 0, 0);
  // 恢复坐标原点和旋转角度
  ctx.rotate((-deg * Math.PI) / 270);
  ctx.translate(-x, -y);
}
function drawLine(ctx: CanvasRenderingContext2D) {
  // 绘制干扰线
  for (let i = 0; i < 2; i++) {
    ctx.strokeStyle = randomColor(props.lineColorMin, props.lineColorMax);
    ctx.beginPath();
    ctx.moveTo(randomNum(0, props.contentWidth), randomNum(0, props.contentHeight));
    ctx.lineTo(randomNum(0, props.contentWidth), randomNum(0, props.contentHeight));
    ctx.stroke();
  }
}
function renderDot(ctx: CanvasRenderingContext2D) {
  // 绘制干扰点
  for (let i = 0; i < 20; i++) {
    ctx.fillStyle = randomColor(0, 255);
    ctx.beginPath();
    ctx.arc(
      randomNum(0, props.contentWidth),
      randomNum(0, props.contentHeight),
      1,
      0,
      2 * Math.PI
    );
    ctx.fill();
  }
}

onMounted(() => {
  render();
});

watch(
  () => props.identifyCode,
  () => {
    render();
  }
);
</script>
<style lang="scss" scoped>
.mu-identify {
  display: block;
  cursor: pointer;
  padding: 0;
  margin: 0;
  line-height: normal;
  font-size: 0;
}
</style>
