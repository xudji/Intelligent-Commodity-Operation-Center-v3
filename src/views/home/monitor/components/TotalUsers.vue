<template>
  <common-card title="累计用户数" value="117,796,5">
    <div ref="barChartRef" style="width:100%;height: 100%;"></div>
    <template #footer>
      <div class="footer">
        <span>日同比</span>&nbsp;
        <span class="emphasis">17.70%</span>&nbsp;
        <span class="increment"></span>&nbsp;&nbsp;&nbsp;
        <span>月同比</span>&nbsp;
        <span class="emphasis">47.12%</span>&nbsp;
        <span class="decrement"></span>
      </div>
    </template>
  </common-card>
</template>
 
 <script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'TotalUsers'
});
</script>
 <script lang="ts" setup>
import { ref, onMounted } from 'vue';
import CommonCard from './CommonCard.vue';
import * as echarts from 'echarts';
import type { EChartsType } from 'echarts';
const barChartRef = ref();
let barChart: EChartsType;

const getOption = () => {
  return {
    xAxis: {
      boundaryGap: false, // 左右两侧不留白
      show: false,
      min: 0,
      max: 100
    },
    grid: {
      left: 0,
      right: 0
    },
    yAxis: {
      show: false,
      data: ['AAA']
    },
    tooltip: {},
    series: {
      type: 'bar',
      // 设置柱条的宽度
      barWidth: 10,
      showBackground: true,
      itemStyle: {
        color: 'orangered'
      },
      label: {
        show: true,
        formatter: '|',
        position: 'right',
        color: 'red'
      },
      data: [66]
    }
  };
};
onMounted(() => {
  barChart = echarts.init(barChartRef.value);
  barChart && barChart.setOption(getOption());
});
</script>
 
 <style scoped lang="scss">
.footer {
  display: flex;
  align-items: center;
}
</style>