<script setup lang="ts"></script>

<template>
  <div class="EditCanvas">
    <div class="canvas"></div>
  </div>
</template>

<style lang="less" scoped>
.EditCanvas {
  width: 60%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  .canvas {
    width: 50%;
    height: 100%;
    background-color: #fff;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
  }
}
</style>
