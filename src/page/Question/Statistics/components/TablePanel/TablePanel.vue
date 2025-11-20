<script setup lang="ts">
import type { ComponentInfoType } from "@/store/module/question";
import { ref, watch } from "vue";
import { VueUiQuickChart } from "vue-data-ui";
import "vue-data-ui/style.css";
interface IChartItem {
  name: string;
  value: number;
}
const isShowChartType = ["questionRadio", "questionCheckBox"];
const props = defineProps<{
  statisticsData: any;
  curComponentInfoType: ComponentInfoType | null;
}>();
const curShowDataList = ref<IChartItem[] | null>(null);
function fromatData(data: any[]) {
  let result: any[] = [];
  if (props.curComponentInfoType?.type === isShowChartType[0]) {
    result = data.map(item => {
      return {
        name: item.label,
        value: item.count
      };
    });
  }
  if (props.curComponentInfoType?.type === isShowChartType[1]) {
    result = data.map(item => {
      return {
        name: item.label,
        value: item.count
      };
    });
  }

  return result;
}

watch(
  () => props.curComponentInfoType,
  newValue => {
    const { questionCheckBoxResult, questionRadioResult } = props.statisticsData;
    if (newValue?.type === isShowChartType[0]) {
      for (const key in questionRadioResult) {
        if (key === newValue?.fe_id) {
          curShowDataList.value = fromatData(questionRadioResult[key]);
        }
      }
    }
    if (newValue?.type === isShowChartType[1]) {
      for (const key in questionCheckBoxResult) {
        if (key === newValue?.fe_id) {
          curShowDataList.value = fromatData(questionCheckBoxResult[key]);
        }
      }
    }
  }
);
</script>

<template>
  <div class="TablePanel">
    <template v-if="isShowChartType.includes(curComponentInfoType?.type!)">
      <div class="chartCon">
        <div class="chart">
          <vue-ui-quick-chart
            :config="{
              title: curComponentInfoType?.props.title
            }"
            :dataset="curShowDataList || []"
          ></vue-ui-quick-chart>
        </div>
      </div>
    </template>
    <template v-else>
      <div class="warn">请点击有统计的组件</div>
    </template>
  </div>
</template>

<style lang="less" scoped>
.TablePanel {
  width: 100%;
  display: flex;
  gap: 10px;
  overflow-y: auto;
  .chartCon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
  }
  .chart {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 55%;
    padding: 10px;
  }
  .warn {
    display: flex;
    justify-content: center;
    width: 100%;
    align-items: center;
  }
}
</style>
