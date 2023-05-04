<template>
  <common-card title="今日交易用户数" :value="numberFormat(orderUser)">
    <div ref="barChartRef" style="width: 100%; height: 100%"></div>
    <template #footer>
      <div>
        退货率 &nbsp;<span class="emphasis">{{ returnRate }}%</span>
      </div>
    </template>
  </common-card>
</template>
 
 <script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "TodayUsers",
});
</script>
 <script lang="ts" setup>
import { ref, onMounted, watch, computed } from "vue";
import CommonCard from "./CommonCard.vue";
import * as echarts from "echarts";
import type { EChartsType } from "echarts";
import { useReportDataStore } from "@/stores/reportData";
import useFormat from "@/hooks/useFormat";
const reportDataStore = useReportDataStore();
const { numberFormat, moneyFormat } = useFormat();
const barChartRef = ref();
let barChart: EChartsType;
// 1. 先准备一个具有宽高的容器盒子
// 2. 引入echarts.js文件 项目中是: npm i echarts下载
// 3. 初始化容器盒子生成一个实例对象myChart
// 4. 准备参数
// 5. 调用setOption方法 根据参数来生成图形

const getOption = () => {
  // 方便在这里书写业务逻辑 函数内部是一个独立的作用域 与外部没有影响
  return {
    xAxis: {
      show: false,
      data: orderUserTrendAxis.value,
    },
    yAxis: {
      show: false,
    },
    tooltip: {},
    grid: {
      left: 0,
      right: 0,
    },
    series: {
      type: "bar",
      data: orderUserTrend.value,
    },
  };
};

// 1.今日交易用户数
const orderUser = computed(() => reportDataStore.reportData.orderUser);
const returnRate = computed(() => reportDataStore.reportData.returnRate);
const orderUserTrend = computed(
  () => reportDataStore.reportData.orderUserTrend
);
const orderUserTrendAxis = computed(
  () => reportDataStore.reportData.orderUserTrendAxis
);

watch(orderUserTrend, () => {
  barChart && barChart.setOption(getOption());
});

onMounted(() => {
  // 使用init方法将容器 初始化成一个实例对象
  barChart = echarts.init(barChartRef.value);

  // 再让实例对象去调用setOption() 根据参数生成图像
  // 当页面尺寸变化的时候，也需要变化
  window.addEventListener("resize", () => {
    barChart && barChart.resize();
  });
});
</script>
 
 <style scoped>
</style>