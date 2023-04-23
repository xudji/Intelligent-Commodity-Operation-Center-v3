<template>
  <el-card style="margin-top: 10px;">
    <div>
      <el-button type="primary" :icon="Plus" :disabled="!cateStore.category3Id" @click="AddSpu">添加SPU</el-button>

      <el-table border style="margin-top: 10px;" :data="spuList">
        <el-table-column type="index" label="序号" width="120px"></el-table-column>
        <el-table-column prop="spuName" label="SPU名称" width="260px">
        </el-table-column>
        <el-table-column prop="description" label="SPU描述">
        </el-table-column>
        <el-table-column label="操作">
          <el-tooltip effect="dark" content="添加SKU" placement="top">
            <el-button type="primary" size="small" :icon="Plus"></el-button>
          </el-tooltip>
          <el-tooltip effect="dark" content="修改SKU" placement="top">
            <el-button type="primary" size="small" :icon="Edit"></el-button>
          </el-tooltip>
          <el-tooltip effect="dark" content="查看SKU列表" placement="top">
            <el-button type="info" size="small" :icon="InfoFilled"></el-button>
          </el-tooltip>
          <el-tooltip effect="dark" content="删除SKU" placement="top">
            <el-button type="danger" size="small" :icon="Delete"></el-button>
          </el-tooltip>
        </el-table-column>
      </el-table>

      <el-pagination v-model:current-page="currentPage" v-model:page-size="pageSize" :page-sizes="[3, 5, 7, 11]"
        :small="small" :disabled="disabled" :background="background" layout="prev, pager, next, jumper, ->, sizes, total"
        :total="total" @size-change="handleSizeChange" @current-change="handleCurrentChange" />


    </div>
  </el-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'SpuList',
})
</script>
<script lang="ts" setup>
import { ref, onMounted, reactive, watch, nextTick } from 'vue'
import { Plus, Delete, Edit, InfoFilled } from "@element-plus/icons-vue";
import { reqSpuList } from '@/api/product/spu'
import { useCategoryListStore } from '@/stores/categoryList'

const cateStore = useCategoryListStore()
const spuList = ref([])
const emits = defineEmits(['changeState'])
// 分页器数据
const pageSize = ref(3);
const small = ref(false);
const background = ref(false);
const disabled = ref(false);
const total = ref(100);
const currentPage = ref(1);

// 每页条数改变
const handleSizeChange = (val: number) => {
  pageSize.value = val;
};
// 当前页码改变
const handleCurrentChange = (val: number) => {
  currentPage.value = val;
};

// 1.获取spu分页数据(需要页码和页数和3id)
const getSpuList = async () => {
  const res = await reqSpuList(currentPage.value, pageSize.value, cateStore.category3Id as number)
  spuList.value = res.records
}

// 2.监听3id变化发请求
watch(
  () => cateStore.category3Id,
  async (category3Id) => {
    if (!category3Id) return spuList.value = [];
    // 发请求获取spu列表
    getSpuList()
  },
  {
    immediate: true
  }
)

// 3.添加ASpu
const AddSpu = () => {
  emits('changeState', 2)
}

</script>
<style scoped></style>