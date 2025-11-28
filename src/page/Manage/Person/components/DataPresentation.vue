<script setup lang="ts">
import { getPersonQuestionWriteCount } from "@/api/person";
import type { PersonQuestionWriteCount } from "@/api/person/type";
import { VueUiQuickChart } from "vue-data-ui";
import "vue-data-ui/style.css";
import { computed, onMounted, reactive } from "vue";
import { ElCard, ElMessage } from "element-plus";
// 个人中心-问题写数量
const personQuestionWriteCount = reactive({
  count: 0,
  data: [] as PersonQuestionWriteCount[]
});

// 个人中心-问题写数量
async function getPersonQuestionWriteCountAction() {
  try {
    const result = await getPersonQuestionWriteCount();
    personQuestionWriteCount.count = result.count;
    personQuestionWriteCount.data = result.data;
  } catch (error: any) {
    ElMessage.error(error.message || "获取个人问题写数量失败");
  }
}

const datasetCmp = computed(() => {
  if (!personQuestionWriteCount.data) {
    return [];
  }
  return personQuestionWriteCount.data.map(item => {
    return {
      name: item.title,
      value: Number(item.writeCount)
    };
  });
});
const config = computed(() => {
  return {
    title: "问卷填写统计",
    type: "pie",
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: "top"
        }
      }
    }
  };
});
onMounted(() => {
  getPersonQuestionWriteCountAction();
});
</script>

<template>
  <div class="dataPresentation">
    <el-card class="el-card--primary">
      <template #header>
        <span class="title">问卷发布数量:{{ personQuestionWriteCount.count || 0 }}</span>
      </template>
      <template #default>
        <div class="chart">
          <vue-ui-quick-chart :dataset="datasetCmp || []" :config="config || {}"></vue-ui-quick-chart>
        </div>
      </template>
    </el-card>
  </div>
</template>

<style lang="less" scoped>
.dataPresentation {
  .el-card--primary {
    height: 100%;
  }
  .title {
    font-size: 20px;
    font-weight: bold;
  }
  .chart {
    display: flex;
    margin: 0 auto;
    justify-content: center;
    align-items: center;
    width: 500px;
    height: 500px;
  }
}
</style>
