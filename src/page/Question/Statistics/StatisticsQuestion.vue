<script setup lang="ts">
import { provide } from "vue";
import useGetQuestionDetail from "@/hooks/useGetQuestionDetail";
import LeftPanel from "./components/LeftPanel/LeftPanel.vue";
const { componentsList } = useGetQuestionDetail();

provide("componentsList", componentsList);
</script>

<template>
  <div class="StatisticsQuestion">
    <div class="LeftPanel">
      <left-panel></left-panel>
    </div>
    <div class="TablePanel"></div>
    <div class="RightPanel"></div>
  </div>
</template>

<style lang="less" scoped>
.StatisticsQuestion {
  display: grid;
  grid-template-columns: 1fr 3fr 1fr;
  width: 100%;
  height: 100vh;
  padding: 20px;
  gap: 10px;
  box-sizing: border-box;
  @media screen and (max-width: 768px) {
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 3fr 1fr;
  }
  .LeftPanel {
    width: 100%;
    height: 100%;
    background-color: var(--statistics-bg-color);
    box-shadow: 0 0 10px var(--statistics-shadow-color);
  }
  .TablePanel {
    width: 100%;
    height: 100%;
    background-color: var(--statistics-bg-color);
    box-shadow: 0 0 10px var(--statistics-shadow-color);
  }
  .RightPanel {
    width: 100%;
    height: 100%;
    background-color: var(--statistics-bg-color);
    box-shadow: 0 0 10px var(--statistics-shadow-color);
  }
}
</style>
