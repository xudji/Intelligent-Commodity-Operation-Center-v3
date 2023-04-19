<template>
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <el-button class="button" type="primary" :icon="Plus">添加</el-button>
      </div>
    </template>
    <!-- 表格 -->
    <el-table v-loading="loading" :data="tableData" border style="width: 100%; margin-bottom:20px;">
      <el-table-column align="center" label="序号" type="index" width="180" />
      <el-table-column prop="tmName" label="品牌名称" width="180" />
      <el-table-column label="品牌LOGO">
        <template v-slot="{ row }">
          <img :src="row.logoUrl" alt="" style="width:80px">
        </template>
      </el-table-column>
      <el-table-column prop="address" label="操作">
        <template v-slot="{ row }">
          <el-button type="warning" :icon="Edit" size="small" />
          <el-button type="danger" :icon="Delete" size="small" />
        </template>
      </el-table-column>>
    </el-table>
    <!-- 分页 -->
    <el-pagination v-model:current-page="currentPage" v-model:page-size="pageSize" :page-sizes="[3, 5, 7, 11]"
      :small="small" :disabled="disabled" :background="background" layout="prev, pager, next, jumper, ->, sizes, total"
      :total="total" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
  </el-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'Trademark',
})
</script>
<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { reqGetTrademarkList } from '@/api/product/trademark'
import {
  Plus,
  Delete,
  Edit,
} from '@element-plus/icons-vue'
import type { trademarkListModel } from '@/api/model/trademarkModel'
const currentPage = ref(1)
const pageSize = ref(3)
const total = ref(100)
const small = ref(false)
const background = ref(false)
const disabled = ref(false)
let tableData = ref<trademarkListModel>([])
let loading = ref(false)
// 当前页数，每夜条数，动态
const getGetTrademarkList = async () => {
  loading.value = true
  const res = await reqGetTrademarkList(currentPage.value, pageSize.value)
  loading.value = false
  tableData.value = res.records
  total.value = res.total
  console.log(res)
}
onMounted(() => {
  getGetTrademarkList()
})

const handleSizeChange = (val: number) => {
  pageSize.value = val
  getGetTrademarkList()
  // 当前页码归零
  currentPage.value = 1
}
const handleCurrentChange = (val: number) => {
  currentPage.value = val
  getGetTrademarkList()
}



</script>

<style scoped></style>