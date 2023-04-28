<template>
  <div class="home">
    <Monitor></Monitor>
  </div>
</template>

<script lang="ts">
export default {
  name: 'Home',
}
</script>
<script lang="ts" setup>
import { useUserInfoStore } from '@/stores/userInfo';
import Monitor from './monitor/index.vue'
const userInfoStore = useUserInfoStore()

</script>

<style scoped>
  .home {
    width: 100%;
    padding: 20px;
    background-color: #eee;
  }
</style>
