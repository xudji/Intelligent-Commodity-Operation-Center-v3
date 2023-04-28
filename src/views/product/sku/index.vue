<template>
  <el-card class="skuInfo">
    <el-table border :data="skuList">
      <el-table-column
        type="index"
        label="序号"
        width="100"
        align="center"
      ></el-table-column>
      <el-table-column prop="skuName" label="名称"></el-table-column>
      <el-table-column prop="skuDesc" label="描述"></el-table-column>
      <el-table-column label="默认图片">
        <template v-slot="{ row }">
          <el-image :src="row.skuDefaultImg" style="width: 100px"> </el-image>
        </template>
      </el-table-column>
      <el-table-column prop="weight" label="重量(KG)"></el-table-column>
      <el-table-column prop="price" label="价格(无)"></el-table-column>
      <el-table-column label="操作" align="center" width="220px">
        <template v-slot="{ row,$index }">
          <el-tooltip
            effect="dark"
            content="上架"
            placement="top"
            v-if="row.isOnsale === 1"
          >
            <el-button
              type="success"
              size="small"
              :icon="Top"
              @click="toOnSale(row.id,$index)"
            ></el-button>
          </el-tooltip>
          <el-tooltip effect="dark" content="下架" placement="top" v-else>
            <el-button
              type="info"
              size="small"
              :icon="Bottom"
              @click="toCancelSale(row.id,$index)"
            ></el-button>
          </el-tooltip>
          <el-tooltip effect="dark" content="修改SPU" placement="top">
            <el-button type="primary" size="small" :icon="Edit"></el-button>
          </el-tooltip>
          <el-tooltip effect="dark" content="查看SKU列表" placement="top">
            <el-button
              type="info"
              size="small"
              :icon="InfoFilled"
              @click="checkSku(row.id)"
            ></el-button>
          </el-tooltip>
          <el-popconfirm :title="`确定删除数据吗?`" @confirm="delSku(row.id)">
            <template #reference>
              <div style="display: inline-block; margin-left: 10px">
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

    <el-drawer
      v-model="table"
      :title="skuInfo.skuName"
      direction="rtl"
      size="50%"
    >
      <el-row :gutter="20">
        <el-col :span="5">名称</el-col>
        <el-col :span="15">{{ skuInfo.skuName }}</el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="5">描述</el-col>
        <el-col :span="15">{{ skuInfo.skuDesc }}</el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="5">价格</el-col>
        <el-col :span="15">{{ skuInfo.price }}</el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="5">平台属性</el-col>
        <el-col :span="15">
          <el-tag v-for="attr in skuInfo.skuAttrValueList" :key="attr.id"
            >{{ attr.attrName }}-{{ attr.valueName }}</el-tag
          >
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="5">销售属性</el-col>
        <el-col :span="15">
          <el-tag
            v-for="attrSale in skuInfo.skuSaleAttrValueList"
            :key="attrSale.id"
            >{{ attrSale.saleAttrName }}-{{
              attrSale.saleAttrValueName
            }}</el-tag
          >
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="5">商品图片</el-col>
        <el-col :span="15">
          <el-carousel indicator-position="outside">
            <el-carousel-item
              v-for="skuImg in skuInfo.skuImageList"
              :key="skuImg.id"
            >
              <el-image :src="skuImg.imgUrl" style="width: 100%"></el-image>
            </el-carousel-item>
          </el-carousel>
        </el-col>
      </el-row>
    </el-drawer>
  </el-card>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "Sku",
});
</script>
<script lang="ts" setup>
import { ref, onMounted, reactive, watch, nextTick } from "vue";
import {
  Plus,
  Delete,
  Edit,
  InfoFilled,
  Top,
  Bottom,
} from "@element-plus/icons-vue";
import { ElMessage, ElDrawer, ElMessageBox } from "element-plus";
import {
  reqGetSkuList,
  reqDeleteSku,
  reqGetOneSkuInfo,
  reqOnSale,
  reqCancelSale,
} from "@/api/product/sku";

const skuList = ref([]);

const table = ref(false);
const skuInfo = ref({});

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
  getSkuList();
};
// 当前页码改变
const handleCurrentChange = (val: number) => {
  currentPage.value = val;
  getSkuList();
};

// 1.获取skuList
const getSkuList = async () => {
  const res = await reqGetSkuList(currentPage.value, pageSize.value);
  skuList.value = res.records;
  total.value = res.total;
  console.log(res);
};
// 2.挂载发请求
onMounted(() => {
  getSkuList();
});
// 3.确定删除吗
const delSku = async (id: number) => {
  await reqDeleteSku(id);
  ElMessage.success("删除成功！");
  getSkuList();
};
// 3.查看checkSku
const checkSku = async (id: number) => {
  const res = await reqGetOneSkuInfo(id);
  skuInfo.value = res;
  table.value = true;
  console.log(res);
};
// 4.上架
const toOnSale = async (id: number,index:number) => {
  await reqOnSale(id);
  skuInfo.value[index].isOnsale = 0 
  ElMessage.success("上架成功！");
};

// 5.下架
const toCancelSale = async (id: number,index:number) => {
  await reqCancelSale(id);
  skuInfo.value[index].isOnsale = 1 
  ElMessage.info("下架成功！");
};
</script>

<style scoped lang="scss">
.skuInfo {
  .el-col-5 {
    text-align: right;
    font-size: 20px;
  }
}
</style>