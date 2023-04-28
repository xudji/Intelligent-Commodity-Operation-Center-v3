<template>
  <CommonCard title="今日销售额" value="303,467,99">
    <template #default>
      <div class="compare">
        <div class="emphasis">日同比  &nbsp;-19.16% &nbsp; <span class="decrement"></span></div>
        <div class="emphasis">月同比  &nbsp;56.67%  &nbsp;<span class="increment"></span></div>
      </div>
    </template>
    <template #footer>
      <div>昨日销售额 <span class="emphasis">￥ 360,000,00</span></div>
    </template>
  </CommonCard>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'TodaySales'
});
</script>
<script lang="ts" setup>
import CommonCard from './CommonCard.vue';
</script>

<style scoped lang="scss">
.compare {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  >div {
    display: flex;
    align-items: center;
  }
}
</style>