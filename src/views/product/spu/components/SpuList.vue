<template>
  <el-card style="margin-top: 10px">
    <div>
      <el-button
        type="primary"
        :icon="Plus"
        :disabled="!cateStore.category3Id"
        @click="AddSpu"
        >添加SPU</el-button
      >

      <el-table border style="margin-top: 10px" :data="spuList">
        <el-table-column
          type="index"
          label="序号"
          width="120px"
        ></el-table-column>
        <el-table-column prop="spuName" label="SPU名称" width="260px">
        </el-table-column>
        <el-table-column prop="description" label="SPU描述"> </el-table-column>
        <el-table-column label="操作">
          <template v-slot="{ row }">
            <el-tooltip effect="dark" content="添加SKU" placement="top">
              <el-button type="primary" size="small" :icon="Plus" @click="addSKU(row)"></el-button>
            </el-tooltip>
            <el-tooltip effect="dark" content="修改SPU" placement="top">
              <el-button type="primary" size="small" :icon="Edit" @click="editSpu(row)"></el-button>
            </el-tooltip>
            <el-tooltip effect="dark" content="查看SKU列表" placement="top">
              <el-button
                type="info"
                size="small"
                :icon="InfoFilled"
              ></el-button>
            </el-tooltip>
            <el-popconfirm :title="`确定删除数据吗?`" @confirm="delSpu(row.id)" >
              <template #reference>
                <div style="display: inline-block; margin-left: 10px;">
                  <el-tooltip
                    class="box-item"
                    effect="dark"
                    content="删除SPU"
                    placement="top"
                  >
                    <el-button
                      type="danger"
                      size="small"
                      :icon="Delete"
                    ></el-button>
                  </el-tooltip>
                </div>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[3, 5, 7, 11]"
        :small="small"
        :disabled="disabled"
        :background="background"
        layout="prev, pager, next, jumper, ->, sizes, total"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </el-card>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "SpuList",
});
</script>
<script lang="ts" setup>
import { ref, onMounted, reactive, watch, nextTick } from "vue";
import { Plus, Delete, Edit, InfoFilled } from "@element-plus/icons-vue";
import { reqSpuList, reqDelSpu,reqUpdateSpu } from "@/api/product/spu";
import { useCategoryListStore } from "@/stores/categoryList";
import { ElMessage } from "element-plus";
import type { SpuInfoModel } from '@/api/product/model/spuModels';
const cateStore = useCategoryListStore();
const spuList = ref<SpuInfoModel[]>([]);
const emits = defineEmits(["changeState","saveSpuInfo"]);
// 分页器数据
const pageSize = ref<number>(3);
const small = ref<boolean>(false);
const background = ref<boolean>(false);
const disabled = ref<boolean>(false);
const total = ref<number>(100);
const currentPage = ref<number>(1);

// 每页条数改变
const handleSizeChange = (val: number) => {
  pageSize.value = val;
  currentPage.value = 1;
  getSpuList();

};
// 当前页码改变
const handleCurrentChange = (val: number) => {
  pageSize.value = val;
  getSpuList();

};

// 1.获取spu分页数据(需要页码和页数和3id)
const getSpuList = async () => {
  const res = await reqSpuList(
    currentPage.value,
    pageSize.value,
    cateStore.category3Id as number
  );
  spuList.value = res.records;

  total.value = res.total;
};

// 2.监听3id变化发请求
watch(
  () => cateStore.category3Id,
  async (category3Id) => {
    if (!category3Id) return (spuList.value = []);
    // 发请求获取spu列表
    getSpuList();
  },
  {
    immediate: true,
  }
);

// 3.添加Spu
const AddSpu = () => {
  emits("changeState", 2);
  emits('saveSpuInfo',{})
};
// 4.删除SPu
const delSpu = async (id: number) => {
  await reqDelSpu(id);
  ElMessage.success("删除成功");
  getSpuList()
};
//5.修改Spu
const editSpu = async (row:SpuInfoModel) => {
   // 传数据回显
 emits('saveSpuInfo',row)
 emits("changeState", 2);
}
//6.添加sku
const addSKU = (row:SpuInfoModel) => {
 emits('saveSpuInfo',row)
 emits("changeState", 3);
}
</script>
<style scoped></style>