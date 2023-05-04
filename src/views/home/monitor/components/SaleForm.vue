<template>
  <el-card class="sale" style="margin-top: 20px">
    <template #header>
      <el-menu class="el-menu-demo" mode="horizontal" @select="handleSelect">
        <el-menu-item index="1">销售额</el-menu-item>
        <el-menu-item index="2">访问量</el-menu-item>
      </el-menu>
      <!-- 头部右侧 -->
      <div class="right">
        <el-radio-group label="size control">
          <el-radio-button label="今日">今日</el-radio-button>
          <el-radio-button label="本周">本周</el-radio-button>
          <el-radio-button label="本月">本月</el-radio-button>
          <el-radio-button label="本年">本年</el-radio-button>
        </el-radio-group>
        <el-date-picker
          type="daterange"
          unlink-panels
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :shortcuts="shortcuts"
        />
      </div>
    </template>

    <div class="sale-content" v-for="o in 4" :key="o">
      {{ "List item " + o }}
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
import { ref, reactive, onMounted } from "vue";
import { reqGetReportData } from "@/api/mock/index";

const activeIndex = ref("1");
const tabPosition = ref("top");
const handleSelect = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
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
}
</style>