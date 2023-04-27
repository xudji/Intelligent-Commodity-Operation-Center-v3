<template>
  <el-card style="margin-top: 10px">
    <el-form
      label-width="120px"
      ref="ruleFormRef"
      :rules="rules"
      :model="skuInfo"
    >
      <el-form-item label="SPU名称">
        <span>{{ props.editSpuInfo.spuName }}</span>
      </el-form-item>
      <el-form-item label="SKU名称" prop="skuName">
        <el-input
          placeholder="SKU名称"
          :maxLength="20"
          v-model="skuInfo.skuName"
        ></el-input>
      </el-form-item>
      <el-form-item label="价格(元)" prop="price">
        <el-input type="number" v-model="skuInfo.price"></el-input>
      </el-form-item>
      <el-form-item label="重量(千克)" prop="weight">
        <el-input type="number" v-model="skuInfo.weight"></el-input>
      </el-form-item>
      <el-form-item label="规格描述" prop="skuDesc">
        <el-input
          placeholder="规格描述"
          type="textarea"
          v-model="skuInfo.skuDesc"
          :rows="4"
        ></el-input>
      </el-form-item>
      <el-form-item label="平台属性" prop="skuAttrValueList">
        <el-row :gutter="10">
          <el-col
            v-for="(attr, index) in attrInfo"
            :key="attr.id"
            :xs="24"
            :sm="12"
            :md="8"
            :lg="8"
            :xl="6"
          >
            <el-form-item :label="attr.attrName">
              <el-select
                v-model="skuInfo.skuAttrValueList[index]"
                style="margin-bottom: 10px"
              >
                <el-option
                  v-for="attrValue in attr.attrValueList"
                  :key="attrValue.id"
                  :label="attrValue.valueName"
                  :value="`${attr.id}:${attr.attrName}:${attrValue.id}:${attrValue.valueName}`"
                  >{{ attrValue.valueName }}</el-option
                >
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item label="销售属性" prop="skuSaleAttrValueList">
        <el-form :inline="true" label-width="100px">
          <el-form-item
            v-for="(saleAttr, index) in spuSaleAttrList"
            :key="saleAttr.id"
            :label="saleAttr.saleAttrName"
          >
            <el-select
              placeholder="请选择"
              v-model="skuInfo.skuSaleAttrValueList[index]"
              style="margin-bottom: 10px"
            >
              <el-option
                v-for="saleAttrValue in saleAttr.spuSaleAttrValueList"
                :key="saleAttrValue.id"
                :value="`${saleAttr.id}:${saleAttr.saleAttrName}:${saleAttrValue.id}:${saleAttrValue.saleAttrValueName}`"
                :label="saleAttrValue.saleAttrValueName"
                >{{ saleAttrValue.saleAttrValueName }}</el-option
              >
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>
      <el-form-item label="图片列表">
        <el-table
          :data="spuImageList"
          style="width: 100%"
          @selection-change="handleSelectionChange"
          border
        >
          <el-table-column type="selection" width="55" />
          <el-table-column label="图片" prop="imgUrl">
            <template v-slot="{ row }">
              <el-image :src="row.imgUrl" alt="" style="width: 100px" />
            </template>
          </el-table-column>
          <el-table-column
            property="name"
            label="名称"
            width="120"
            prop="imgName"
          >
          </el-table-column>
          <el-table-column label="操作" prop="imgName">
            <template v-slot="{ row }">
              <el-button
                type="priamry"
                v-if="row.isDefault === '0'"
                @click="setDefaultAttr(row)"
                >设置默认图片</el-button
              >
              <el-button type="success" v-else>默认图片</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitSkuForm(ruleFormRef)"
          >确定</el-button
        >
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
import { ElMessage, ElTable } from "element-plus";
import { useCategoryListStore } from "@/stores/categoryList";
import { reqAttrInfo } from "@/api/product/attr";
import {
  reqSpuSaleAttrList,
  reqSpuImageList,
  reqSaveSkuInfo,
} from "@/api/product/sku";
import type { FormInstance, FormRules } from "element-plus";
import { StateCate } from "../types";
const categoryStore = useCategoryListStore();
const props = defineProps(["editSpuInfo"]);
const emits = defineEmits(["changeState"]);
const ruleFormRef = ref<FormInstance>();
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
const skuAttrValueListValidator = (rule: any, value: any, callback: any) => {
  // rule 校验规则规则对象
  // value 表示要校验的数据值 有可能是对象有可能是数组
  // callback是执行函数
  if (!value.length) {
    return callback(new Error("请至少选择一个平台属性..."));
  }
  callback();
};

const skuImageListValidator = (rule: any, value: any, callback: any) => {
  if (value.length < 3) {
    return callback(new Error("请至少选择三张图片..."));
  }
  callback();
};

// 表单验证
const rules = reactive<FormRules>({
  skuName: [
    {
      required: true,
      message: "请输入SKU名称",
      trigger: "change",
    },
  ],
  price: [
    {
      required: true,
      message: "请输入价格",
      trigger: "change",
    },
  ],
  weight: [
    {
      required: true,
      message: "请输入重量",
      trigger: "change",
    },
  ],
  skuDesc: [
    {
      required: true,
      message: "请输入SKU描述",
      trigger: "change",
    },
  ],
  skuAttrValueList: [
    {
      required: true,
      validator: skuAttrValueListValidator,
      trigger: "change",
    },
  ],
  skuImageList: [
    { required: true, validator: skuImageListValidator, trigger: "change" },
  ],
  skuSaleAttrValueList: [
    {
      type: "array",
      required: true,
      message: "请至少一个选择销售属性",
      trigger: "change",
    },
  ],
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
  }
  if (resSpuImageList.status === "fulfilled") {
    spuImageList.value = resSpuImageList.value.map((item) => {
      return {
        ...item,
        isDefault: "0",
      };
    });
  }
  if (resAttrInfo.status === "fulfilled") {
    attrInfo.value = resAttrInfo.value;
  }
});

//取消cancelSku
const cancelSku = () => {
  emits("changeState", 1);
};
//设置默认属性
const setDefaultAttr = (row) => {
  spuImageList.value.forEach((item) => {
    item.isDefault = "0";
  });
  row.isDefault = "1";
  skuInfo.skuDefaultImg = row.imgUrl;
};
//确定
const submitSkuForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate(async (valid) => {
    if (valid) {
      const skuImg = skuInfo.skuImageList.find(
        (item) => item.imgUrl === skuInfo.skuDefaultImg
      );
      if (!skuImg) return ElMessage.error("请在所选图片中指定默认图片");
      // 处理平台属性 undefined清除
      skuInfo.skuAttrValueList = skuInfo.skuAttrValueList
        .filter(Boolean)
        .map((item) => {
          const [attrId, attrName, valueId, valueName] = item.split(":");
          return {
            attrId,
            attrName,
            valueId,
            valueName,
          };
        });
      // 处理销售属性
      skuInfo.skuSaleAttrValueList = skuInfo.skuSaleAttrValueList
        .filter(Boolean)
        .map((item) => {
          const [saleAttrId, saleAttrName, saleAttrValueId, saleAttrValueName] =
            item.split(":");
          return {
            saleAttrId,
            saleAttrName,
            saleAttrValueId,
            saleAttrValueName,
          };
        });
      skuInfo.category3Id = categoryStore.category3Id as number;
      skuInfo.spuId = props.editSpuInfo.id as number;
      await reqSaveSkuInfo(skuInfo);
      ElMessage.success("添加sku成功...");
      emits("changeState", StateCate.SPULIST_STATE);
    } else {
      console.log("error submit!");
      return false;
    }
  });
};

const multipleTableRef = ref<InstanceType<typeof ElTable>>();
const handleSelectionChange = (val) => {
  skuInfo.skuImageList = val;
};
</script>
<style scoped></style>