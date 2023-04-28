<template>
  <CommonCard title="今日订单量" value="256,206,1">
    <div ref="lineChartRef" style="width: 100%;height: 100%;"></div>
    <template #footer>
      <div>昨日订单量 <span class="emphasis">￥ 210,000,0</span></div>
    </template>
  </CommonCard>
</template>
 
 <script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'TodayOrders'
});
</script>
 <script lang="ts" setup>
import { ref, onMounted } from 'vue';
import CommonCard from './CommonCard.vue';
import * as echarts from 'echarts';
import type { EChartsType } from 'echarts';
const lineChartRef = ref();
let lineChart: EChartsType;

// 以箭头函数的方式来准备参数
const getOption = () => {
  return {
    xAxis: {
      boundaryGap: false, // 左右两侧不留白
      data: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'] // x轴数据列表
    },
    yAxis: {
      show: false
    },
    tooltip: {
      trigger: 'axis', // 只要鼠标在x轴就会触发
      confine: true // 显示的内容是在图形内还是图形外
      // true表示在图形内  false 表示在图形外
    },
    // 图表在坐标中显示的位置
    grid: {
      left: 0,
      top: 0,
      right: 0,
      bottom: 0
    },
    series: {
      type: 'line',
      smooth: true, // 让折线更加的平滑
      itemStyle: {
        // 折线点 不要显示
        opacity: 0
      },
      lineStyle: {
        // 折线也不显示
        opacity: 0
      },
      areaStyle: {
        // 折线图区域内的颜色
        color: 'purple'
      },
      data: [44, 126, 55, 88, 133, 99, 33, 113, 63, 98, 77, 123]
    }
  };
};

onMounted(() => {
  lineChart = echarts.init(lineChartRef.value);
  lineChart && lineChart.setOption(getOption());
  // 当页面尺寸变化的时候，也需要变化
  window.addEventListener('resize', () => {
    lineChart && lineChart.resize();
  });
});
</script>
 
 <style scoped>
</style>