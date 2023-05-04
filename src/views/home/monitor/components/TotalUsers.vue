<template>
  <common-card title="累计用户数" :value="numberFormat(usersTotal)">
    <div ref="barChartRef" style="width: 100%; height: 100%"></div>
    <template #footer>
      <div class="footer">
        <span>日同比</span>&nbsp;
        <span class="emphasis">{{ userGrowthLastDay }}%</span>&nbsp;
        <span class="increment"></span>&nbsp;&nbsp;&nbsp;
        <span>月同比</span>&nbsp;
        <span class="emphasis">{{ userGrowthLastMonth }}%</span>&nbsp;
        <span class="decrement"></span>
      </div>
    </template>
  </common-card>
</template>
 
 <script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "TotalUsers",
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

const getOption = () => {
  return {
    xAxis: {
      boundaryGap: false, // 左右两侧不留白
      show: false,
      min: 0,
      max: usersTotal.value,
    },
    grid: {
      left: 0,
      right: 0,
    },
    yAxis: {
      show: false,
      data: ["AAA"],
    },
    tooltip: {},
    series: {
      type: "bar",
      // 设置柱条的宽度
      barWidth: 10,
      showBackground: true,
      itemStyle: {
        color: "green",
      },
      label: {
        show: true,
        formatter: "|",
        position: "right",
        color: "green",
      },
      data: [usersTotal.value - usersLastMonth.value],
    },
  };
};

const usersTotal = computed(() => reportDataStore.reportData.usersTotal);
const userGrowthLastDay = computed(
  () => reportDataStore.reportData.userGrowthLastDay
);
const userGrowthLastMonth = computed(
  () => reportDataStore.reportData.userGrowthLastMonth
);

const userFullYearAxis = computed(
  () => reportDataStore.reportData.userFullYearAxis
);

const usersLastMonth = computed(
  () => reportDataStore.reportData.usersLastMonth
);

watch(usersTotal, () => {
  barChart && barChart.setOption(getOption());
});

onMounted(() => {
  barChart = echarts.init(barChartRef.value);
  window.addEventListener("resize", () => {
    barChart && barChart.resize();
  });
});
</script>
 
 <style scoped lang="scss">
.footer {
  display: flex;
  align-items: center;
}
</style>