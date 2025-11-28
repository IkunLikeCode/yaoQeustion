<script setup lang="ts">
import { provide, onMounted, reactive, ref } from "vue";
import useGetQuestionDetail from "@/hooks/useGetQuestionDetail";
import LeftPanel from "./components/LeftPanel/LeftPanel.vue";
import LinkPanel from "./components/LinkPanel/LinkPanel.vue";
import TablePanel from "./components/TablePanel/TablePanel.vue";
import { useRoute } from "vue-router";
import { getStatisticsById } from "@/api/statistics/index";
import type { ComponentInfoType } from "@/store/module/question";
import { ElMessage } from "element-plus";
interface IStatisticsData {
  count: number;
  statistics: any;
}
const { componentsList } = useGetQuestionDetail();
const {
  query: { id }
} = useRoute();
const statisticsData = reactive<IStatisticsData>({
  count: 0,
  statistics: {}
});
const curComponentInfoType = ref<ComponentInfoType | null>(null);

/**
 * 根据问卷id获取统计信息
 * @param id 问卷id11
 */
async function getStatisticsByIdApi(id: string) {
  try {
    const result = await getStatisticsById<IStatisticsData>(id);
    statisticsData.count = result.count;
    statisticsData.statistics = result.statistics;
  } catch (error: any) {
    ElMessage.error(error.message || "获取统计信息失败");
  }
}

function clickHandle(componentInfoType: ComponentInfoType) {
  curComponentInfoType.value = componentInfoType;
}

onMounted(() => {
  getStatisticsByIdApi(id as string);
});

provide("componentsList", componentsList);
</script>

<template>
  <div class="StatisticsQuestion">
    <div class="top">
      <link-panel :count="statisticsData.count"></link-panel>
    </div>
    <div class="main">
      <div class="LeftPanel">
        <left-panel @click-handle="clickHandle"></left-panel>
      </div>
      <div class="TablePanel">
        <TablePanel
          :cur-component-info-type="curComponentInfoType"
          :statistics-data="statisticsData.statistics"
        ></TablePanel>
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
    grid-template-columns: 1fr 3fr;
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
      overflow-y: auto;
    }
  }
}
</style>
