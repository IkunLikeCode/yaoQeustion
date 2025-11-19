<script setup lang="ts">
import { provide, onMounted, reactive } from "vue";
import useGetQuestionDetail from "@/hooks/useGetQuestionDetail";
import LeftPanel from "./components/LeftPanel/LeftPanel.vue";
import LinkPanel from "./components/LinkPanel/LinkPanel.vue";
import TablePanel from "./components/TablePanel/TablePanel.vue";
import RightPanel from "./components/RightPanel/RightPanel.vue";
import { useRoute } from "vue-router";
import { getStatisticsById } from "@/api/statistics/index";
interface IStatisticsData {
  count: number;
  statistics: any;
}
const {
  query: { id }
} = useRoute();
const statisticsData = reactive<IStatisticsData>({
  count: 0,
  statistics: {}
});
async function getStatisticsByIdApi(id: string) {
  try {
    const result = await getStatisticsById<IStatisticsData>(id);
    statisticsData.count = result.count;
    statisticsData.statistics = result.statistics;
    console.log(result);
  } catch (error) {
    console.log(error);
  }
}
onMounted(() => {
  getStatisticsByIdApi(id as string);
});
const { componentsList } = useGetQuestionDetail();

provide("componentsList", componentsList);
</script>

<template>
  <div class="StatisticsQuestion">
    <div class="top">
      <link-panel></link-panel>
    </div>
    <div class="main">
      <div class="LeftPanel">
        <left-panel></left-panel>
      </div>
      <div class="TablePanel">
        <TablePanel></TablePanel>
      </div>
      <div class="RightPanel">
        <RightPanel :statistics="statisticsData.statistics"></RightPanel>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.StatisticsQuestion {
  display: flex;
  flex-direction: column;
  padding: 20px;
  box-sizing: border-box;
  gap: 10px;
  width: 100%;
  .top {
    display: flex;
    padding: 10px;
    gap: 10px;
    margin: 0 auto;
    background-color: var(--statistics-bg-color);
    box-shadow: 0 0 10px var(--statistics-shadow-color);
    justify-content: center;
    width: 100%;
    box-sizing: border-box;
  }
  .main {
    display: grid;
    width: 100%;
    gap: 10px;
    grid-template-columns: 1fr 2fr 1fr;
    grid-template-rows: 1fr;
    box-sizing: border-box;
    height: calc(100vh - 120px);
    .LeftPanel {
      @import "@/style/scrollbar.less";
      .custom-scrollbar();
      overflow-y: auto;
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
      padding: 10px;
      box-sizing: border-box;
      background-color: var(--statistics-bg-color);
      box-shadow: 0 0 10px var(--statistics-shadow-color);
    }
  }
}
</style>
