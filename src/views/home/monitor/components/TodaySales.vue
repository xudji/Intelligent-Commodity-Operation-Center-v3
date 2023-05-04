<template>
  <CommonCard title="今日销售额" :value="numberFormat(salesToday)">
    <template #default>
      <div class="compare">
        <div class="emphasis">
          日同比 &nbsp;{{ numberFormat(salesGrowthLastDay) }}% &nbsp;
          <span class="decrement"></span>
        </div>             
        <div class="emphasis">
          月同比 &nbsp;{{ numberFormat(salesGrowthLastMonth) }}% &nbsp;<span
            class="increment"
          ></span>
        </div>
      </div>
    </template>
    <template #footer>                        
      <div>
        昨日销售额 <span class="emphasis">{{ moneyFormat(salesLastDay) }}</span>
      </div>
    </template>      
  </CommonCard>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "TodaySales",
});
</script>

<script lang="ts" setup>
import { ref, reactive, onMounted, computed } from "vue";
import CommonCard from "./CommonCard.vue";
import { useReportDataStore } from "@/stores/reportData";
import useFormat from "@/hooks/useFormat";

const { numberFormat, moneyFormat } = useFormat();

const reportDataStore = useReportDataStore();
// 获取数据渲染
// 获取销售额数据并渲染
// 1.今日销售额
const salesToday = computed(() => reportDataStore.reportData.salesToday);
// 2.日同比
const salesGrowthLastDay = computed(
  () => reportDataStore.reportData.salesGrowthLastDay
);
// 3.月同比
const salesGrowthLastMonth = computed(
  () => reportDataStore.reportData.salesGrowthLastMonth
);
// 4.昨日销售额
const salesLastDay = computed(() => reportDataStore.reportData.salesLastDay);



</script>

<style scoped lang="scss">
.compare {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  > div {
    display: flex;
    align-items: center;
  }
}
</style>