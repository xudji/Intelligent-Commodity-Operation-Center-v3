<template>
  <el-card style="margin-top: 10px">
    <el-form label-width="120px">
      <el-form-item label="SPU名称">
        <span>{{ props.editSpuInfo.spuName }}</span>
      </el-form-item>
      <el-form-item label="SKU名称">
        <el-input
          placeholder="SKU名称"
          :maxLength="20"
          v-model="skuInfo.skuName"
        ></el-input>
      </el-form-item>
      <el-form-item label="价格(元)">
        <el-input type="number" v-model="skuInfo.price"></el-input>
      </el-form-item>
      <el-form-item label="重量(千克)">
        <el-input type="number" v-model="skuInfo.weight"></el-input>
      </el-form-item>
      <el-form-item label="规格描述">
        <el-input
          placeholder="规格描述"
          type="textarea"
          v-model="skuInfo.skuDesc"
        ></el-input>
      </el-form-item>
      <el-form-item label="平台属性" prop="skuAttrValueList">
        <el-row :gutter="10">
          <el-col
            :xs="24"
            :sm="12"
            :md="8"
            :lg="8"
            :xl="6"
            v-for="(attr,index) in attrInfo"
            :key="attr.id"
          >
            <el-form-item :label="attr.attrName">
              <el-select
                placeholder="请选择"
                style="margin-bottom: 10px"
                v-model="skuInfo.skuAttrValueList[index]"
              >
                <el-option
                  v-for="attrValue in attr.attrValueList"
                  :key="attrValue.id"
                  :label="attrValue.valueName"
                  :value=" `${attr.id}:${attr.attrName}:${attrValue.id}:${attrValue.valueName}` "
                >{{ attrValue.valueName }}</el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item label="销售属性">
        <el-form label-width="100px">
          <el-form-item
            :label="saleAttr.saleAttrName"
            v-for="saleAttr in spuSaleAttrList"
            :key="saleAttr.id"
            label-width="100px"
          >
            <el-select
              placeholder="请选择"
              v-model="skuInfo.skuSaleAttrValueList[index]"
            >
              <el-option
                :label="saleAttrValue.saleAttrValueName"
                v-for="saleAttrValue in saleAttr.spuSaleAttrValueList"
                :key="saleAttrValue.id"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>
      <el-form-item label="图片列表">
        <el-table
          ref="multipleTableRef"
          :data="spuImageList"
          style="width: 100%"
          @selection-change="handleSelectionChange"
          border
        >
          <el-table-column type="selection" width="55" />
          <el-table-column label="图片" prop="imgUrl">
            <template v-slot="{ row }">
              <img :src="row.imgUrl" alt="" style="width:100px" />
            </template>
          </el-table-column>
          <el-table-column
            property="name"
            label="名称"
            width="120"
            prop="imgName"
          >
          </el-table-column>
          <el-table-column label="操作">
            <template v-slot="{ row }">
              <el-button type="priamry" v-if="row.isDefault === '0'"
                 @click="setDefaultAttr">设置默认属性</el-button
              >
              <el-button type="success" v-else>默认属性</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">确定</el-button>
        <el-button @click="cancelSku">取消</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "Sku",
});
</script>
<script lang="ts" setup>
import { ref, reactive, onMounted } from "vue";
import { ElTable } from "element-plus";
import { useCategoryListStore } from "@/stores/categoryList";
import { reqAttrInfo } from "@/api/product/attr";
import { reqSpuSaleAttrList, reqSpuImageList } from "@/api/product/sku";
const categoryStore = useCategoryListStore();
const props = defineProps(["editSpuInfo"]);
const emits = defineEmits(['changeState'])
const attrInfo = ref([]);
const spuSaleAttrList = ref([]);
const spuImageList = ref([]);
const skuInfo = reactive({
  skuName: "",
  price: 0,
  weight: 0,
  skuDesc: "",
  tmId: undefined,
  // 平台属性
  skuAttrValueList: [
    // {
    //   attrId: 0,
    //   attrName: 'string',
    //   valueId: 0,
    //   valueName: 'string',
    // },
  ],
  skuSaleAttrValueList: [
    // {
    //   saleAttrId: 0,
    //   saleAttrName: 'string',
    //   saleAttrValueId: 0,
    //   saleAttrValueName: 'string',
    //   spuId: 0,
    // },
  ],
  // 默认图片
  skuDefaultImg: "",
  skuImageList: [
    // {
    //   imgName: 'string',
    //   imgUrl: 'string',
    //   isDefault: 'string',
    //   spuImgId: 0,
    //   isDefault: "1"
    // },
  ],
  // spuId: 0,
});

// 1.发请求获取平台属性，销售属性，图片列表
onMounted(async () => {
  const id = props.editSpuInfo.id;
  console.log(id);
  // 使用 Promise.all 并结合 async/await 发起多个异步请求
  const [resSpuSaleAttrList, resSpuImageList, resAttrInfo] =
    await Promise.allSettled([
      reqSpuSaleAttrList(id),
      reqSpuImageList(id),
      reqAttrInfo({
        category1Id: categoryStore.category1Id as number,
        category2Id: categoryStore.category2Id as number,
        category3Id: categoryStore.category3Id as number,
      }),
    ]);
  // 将响应数据赋值给响应数据对象
  if (resSpuSaleAttrList.status === "fulfilled") {
    spuSaleAttrList.value = resSpuSaleAttrList.value;
    console.log("spuSaleAttrList.value", resSpuSaleAttrList.value);
  }
  if (resSpuImageList.status === "fulfilled") {
    spuImageList.value = resSpuImageList.value.map((item)=> {
      return {
        ...item,
      isDefault:'0'
      }
     
    })
    // 遍历添加属性 isDefault
        


    console.log("spuImageList.value", spuImageList.value);
  }
  if (resAttrInfo.status === "fulfilled") {
    attrInfo.value = resAttrInfo.value;
    console.log("attrInfo.value", attrInfo.value);
  }
});

// 取消cancelSku
const cancelSku = () => {
  emits('changeState',1)
}









interface User {
  date: string;
  name: string;
  address: string;
}
const multipleTableRef = ref<InstanceType<typeof ElTable>>();
const multipleSelection = ref<User[]>([]);

const handleSelectionChange = (val: User[]) => {
  multipleSelection.value = val;
};
</script>
<style scoped></style>