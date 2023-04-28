<template>
  <el-card class="common-card">
    <!-- 默认生成的是div 同级是+ 嵌套是> -->
    <!-- .card-top+.card-body+.card-line+.card-bottom -->
    <div class="card-top">
      <span class="top-title">{{title}}</span>
      <div class="top-value">{{value}}</div>
    </div>
    <div class="card-body">
      <slot></slot>
    </div>
    <div class="card-line"></div>
    <div class="card-bottom">
      <slot name="footer"></slot>
    </div>
    
  </el-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'CommonCard'
});
</script>
<script lang="ts" setup>
const props = defineProps(['title', 'value']);
</script>

<style scoped lang="scss">
.common-card {
  .card-top {
    .top-title {
      font-size: 12px;
      color: #999;
    }
    .top-value {
      font-size: 26px;
      letter-spacing: 1px;
      margin: 6px 0;
    }
  }
  .card-body {
    height: 50px;
  }
  .card-line {
    border-bottom: 1px solid #ccc;
    margin: 10px 0;
  }
  .card-bottom {
    font-size: 12px;
    color: #666;
  }
}
</style>