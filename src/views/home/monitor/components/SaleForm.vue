<template>
  <el-card class="sale" style="margin-top: 20px">
    <template #header>
      <el-menu
        :default-active="state.activeIndex"
        class="el-menu-demo"
        mode="horizontal"
        @select="handleSelect"
      >
        <el-menu-item index="1">销售额</el-menu-item>
        <el-menu-item index="2">访问量</el-menu-item>
      </el-menu>
      <!-- 头部右侧 -->
      <div class="right">
        <el-radio-group v-model="state.time" label="size control">
          <el-radio-button label="今日">今日</el-radio-button>
          <el-radio-button label="本周">本周</el-radio-button>
          <el-radio-button label="本月">本月</el-radio-button>
          <el-radio-button label="本年">本年</el-radio-button>
        </el-radio-group>
        <el-date-picker
          v-model="state.time2"
          type="daterange"
          unlink-panels
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :shortcuts="shortcuts"
        />
      </div>
    </template>

    <div class="sale-content">
      <v-chart
        :option="getOption()"
        autoresize
        class="sales-content-form"
      ></v-chart>
      <div class="sales-content-list">
        <ul>
          <h4>
            {{
              state.activeIndex === "1" ? "门店销售额排名" : "门店访问量排名"
            }}
          </h4>
          <li v-for="rank in rankData" :key="rank.no">
            <span :class="{ 'list-no': rank.no < 4 }">{{ rank.no }}</span
            ><span>{{ rank.name }}</span
            ><span>{{ rank.count }}</span>
          </li>
        </ul>
      </div>
    </div>
  </el-card>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "Home",
});
</script>
<script lang="ts" setup>
import { ref, reactive, onMounted, computed, watch } from "vue";
import { reqGetReportData } from "@/api/mock/index";
import { useReportDataStore } from "@/stores/reportData";
import * as echarts from "echarts";
import type { EChartsType } from "echarts";

const lineChartRef = ref();
let lineChart: EChartsType;

const reportDataStore = useReportDataStore();
const activeIndex = ref("1");
const tabPosition = ref("top");
const state = reactive({
  activeIndex: "1",
  time: "本周",
  time2: "",
});
const handleSelect = (value) => {
  state.activeIndex = value;
};
const size = ref<"default" | "large" | "small">("default");
const value2 = ref("");
const shortcuts = [
  {
    text: "最近一周",
    value: () => {
      const end = new Date();
      const start = new Date();
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
      return [start, end];
    },
  },
  {
    text: "最近一个月",
    value: () => {
      const end = new Date();
      const start = new Date();
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
      return [start, end];
    },
  },
  {
    text: "最近三个月",
    value: () => {
      const end = new Date();
      const start = new Date();
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
      return [start, end];
    },
  },
];

const getOption = () => {
  const text = state.activeIndex === "1" ? "订单销售趋势" : "用户访问量趋势";
  return {
    title: {
      text,
      textStyle: {
        fontSize: 14,
        color: "#333",
      },
      left: 10,
    },
    xAxis: {
      type: "category",
      // data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      data:
        state.activeIndex === "1"
          ? orderFullYearAxis.value
          : userFullYearAxis.value,
      axisTick: {
        // 标签刻度对齐 底部的那个刻度
        alignWithLabel: true,
      },
    },
    color: "#3398DB", // 柱状体颜色
    yAxis: {
      // 坐标轴在 grid 区域中的分隔线。
      splitLine: {
        lineStyle: {
          type: "dotted",
          color: "#ccc",
        },
      },
    },
    grid: {
      left: 50,
      right: 50,
      top: 50,
      bottom: 50,
    },
    tooltip: {},
    series: [
      {
        // data: [120, 200, 150, 80, 70, 110, 130],
        data:
          state.activeIndex === "1" ? orderFullYear.value : userFullYear.value,
        type: "bar",
        showBackground: true,
        barWidth: "35%",
        backgroundStyle: {
          color: "rgba(180, 180, 180, 0.2)",
        },
      },
    ],
  };
};
// 门店访问销售
const userRank = computed(() => reportDataStore.reportData.userRank);
const orderRank = computed(() => reportDataStore.reportData.orderRank);
const rankData = computed(() =>
  state.activeIndex === "1" ? userRank.value : orderRank.value
);
// 获取销售趋势数据
const orderFullYear = computed(() => reportDataStore.reportData.orderFullYear);
const orderFullYearAxis = computed(
  () => reportDataStore.reportData.orderFullYearAxis
);
// 获取用户趋势数
const userFullYear = computed(() => reportDataStore.reportData.orderFullYear);
const userFullYearAxis = computed(
  () => reportDataStore.reportData.userFullYearAxis
);
onMounted(() => {
  getOption();
});
</script>

<style scoped lang="scss">
.sale {
  :deep(.el-card__header) {
    position: relative;
    padding: 0 20px;
    border-bottom: none;
    .right {
      position: absolute;
      top: 0;
      right: 20px;
      height: 100%;
      display: flex;
      align-items: center;
      .el-date-editor {
        margin-left: 20px;
      }
    }
  }
  .sale-content {
    display: flex;
    height: 270px;
    .sales-content-form {
      flex: 4;
    }
    .sales-content-list {
      flex: 2;

      .list-title {
        font-size: 14px;
        margin: 20px 0 10px;
      }
      ul {
        list-style: none;
        font-size: 12px;
        padding: 0 20px 0 0;

        li {
          span {
            cursor: pointer;
            &:first-child {
              display: inline-block;
              width: 20px;
              height: 20px;
              line-height: 20px;
              text-align: center;
            }
            &.list-no {
              background-color: #000;
              color: #fff;
              border-radius: 50%;
            }
            &:last-child {
              float: right;
            }
          }
        }
      }
    }
  }
}
.demo-tabs > .el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}

.el-tabs--right .el-tabs__content,
.el-tabs--left .el-tabs__content {
  height: 100%;
}
.demo-date-picker {
  display: flex;
  width: 100%;
  padding: 0;
  flex-wrap: wrap;
}

.demo-date-picker .block {
  padding: 30px 0;
  text-align: center;
  border-right: solid 1px var(--el-border-color);
  flex: 1;
}

.demo-date-picker .block:last-child {
  border-right: none;
}

.demo-date-picker .demonstration {
  display: block;
  color: var(--el-text-color-secondary);
  font-size: 14px;
  margin-bottom: 20px;
}
</style>