<template>
  <div class="home">
    <Monitor></Monitor>
  </div>
</template>

<script lang="ts">
export default {
  name: "Home",
};
</script>
<script lang="ts" setup>
import { onMounted } from "vue";
import { useUserInfoStore } from "@/stores/userInfo";
import { useReportDataStore } from "@/stores/reportData";
import Monitor from "./monitor/index.vue";
const userInfoStore = useUserInfoStore();
const reportDataStore = useReportDataStore();
onMounted(() => {
  reportDataStore.getReportData();
});
</script>

<style scoped>
.home {
  width: 100%;
  padding: 20px;
  background-color: #eee;
}
</style>
