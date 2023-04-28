<template>
  <el-row :gutter="10" class="monitor">
    <el-col :span="6">
      <!-- <TodaySales></TodaySales> -->
      <today-sales></today-sales>
    </el-col>
    <el-col :span="6">
      <today-orders></today-orders>
    </el-col>
    <el-col :span="6">
      <today-users></today-users>
    </el-col>
    <el-col :span="6">
      <total-users></total-users>
    </el-col>
  </el-row>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'Monitor'
});
</script>
<script lang="ts" setup>
import TodayOrders from './components/TodayOrders.vue';
import TodaySales from './components/TodaySales.vue';
import TodayUsers from './components/TodayUsers.vue';
import TotalUsers from './components/TotalUsers.vue';
</script>

<style lang="scss">
.monitor {
  .emphasis {
    font-size: 12px;
    font-weight: 700;
    color: #777;
  }
  .increment {
    width: 0;
    height: 0;
    border-width:4px;
    border-color:transparent  transparent green transparent;
    border-style: solid;
  } 
  .decrement {
    width: 0;
    height: 0;
    border-width:4px;
    border-color:red  transparent transparent transparent;
    border-style: solid;
  }
}
</style>