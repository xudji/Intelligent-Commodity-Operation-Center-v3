<template>
  <div style="margin-top: 10px">
    <el-card>
      <el-form
        label-width="100px"
        :model="spuInfo"
        :rules="rules"
        ref="ruleFormRef"
      >
        <el-form-item label="SPU名称" prop="spuName">
          <el-input placeholder="SPU名称" v-model="spuInfo.spuName"></el-input>
        </el-form-item>
        <el-form-item label="SPU品牌" prop="tmId">
          <el-select placeholder="请选择" v-model="spuInfo.tmId">
            <el-option
              v-for="t1 in traMarkList"
              :key="t1.id"
              :value="t1.id"
              :label="t1.tmName"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="SPU描述" prop="description">
          <el-input
            placeholder="SPU描述"
            type="textarea"
            v-model="spuInfo.description"
          ></el-input>
        </el-form-item>
        <el-form-item label="SPU图片" prop="spuImageList">
          <el-upload
            v-model:file-list="spuInfo.spuImageList"
            :action="`${BASE_URL}/admin/product/fileUpload`"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <el-icon>
              <Plus />
            </el-icon>
          </el-upload>
          <el-dialog v-model="dialogVisible">
            <img w-full :src="dialogImageUrl" alt="Preview Image" />
          </el-dialog>
        </el-form-item>
        <el-form-item label="销售属性" prop="spuSaleAttrList">
          <el-select
            :placeholder="`还有${filterSpuSaleAttrList.length}项未选择`"
            v-model="spuInfo.spuSaleAttr"
          >
            <el-option
              v-for="a1 in filterSpuSaleAttrList"
              :key="a1.id"
              :value="a1.name"
              :label="a1.name"
            ></el-option>
          </el-select>
          <el-button
            type="primary"
            @click="addSale"
            :disabled="!spuInfo.spuSaleAttr"
            >添加销售属性</el-button
          >
        </el-form-item>
        <el-form-item>
          <el-table border :data="spuInfo?.spuSaleAttrList">
            <el-table-column
              type="index"
              label="序号"
              width="120"
            ></el-table-column>
            <el-table-column label="属性名" prop="saleAttrName">
              <template v-slot="{ row }">
                <span>{{ row.saleAttrName }}</span>
              </template>
            </el-table-column>
            <el-table-column label="属性值名称列表">
              <template v-slot="{ row, $index }">
                <el-tag
                  v-for="tag in row.spuSaleAttrValueList"
                  :key="tag"
                  class="mx-1"
                  closable
                  :disable-transitions="false"
                  @close="handleClose(row, $index)"
                >
                  {{ tag.saleAttrValueName }}
                </el-tag>
                <el-input
                  v-if="row.inputVisible"
                  ref="InputRef"
                  v-model="inputValue"
                  class="ml-1 w-20"
                  size="small"
                  @keyup.enter="handleInputConfirm(row)"
                  @blur="handleInputConfirm(row)"
                  style="width: 100px"
                />
                <el-button
                  v-else
                  class="button-new-tag ml-1"
                  size="small"
                  @click="showInput(row)"
                >
                  + New
                </el-button>
              </template>
            </el-table-column>
            <el-table-column label="操作">
              <template v-slot="{ row, $index }">
                <el-tooltip effect="dark" content="删除SKU" placement="top">
                  <el-button
                    type="danger"
                    size="small"
                    :icon="Delete"
                    @click="delAttr($index)"
                  ></el-button>
                </el-tooltip>
              </template>
            </el-table-column>
          </el-table>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="saveSpuInfo(ruleFormRef)"
            >保存</el-button
          >
          <el-button @click="cancalSpu">取消</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "Spu",
});
</script>
<script lang="ts" setup>
import { ref, reactive, onMounted, computed, nextTick } from "vue";
import { Plus, Delete, Edit, InfoFilled } from "@element-plus/icons-vue";
import type {
  UploadProps,
  UploadUserFile,
  FormRules,
  FormInstance,
} from "element-plus";
import { ElMessage, ElInput } from "element-plus";
import {
  reqTrademarkList,
  reqBaseSaleAttrList,
  reqGetSaveSpuInfo,
  reqUpdateSpu,
  reqGetSpuImageListData,
  reqGetSpuSaleAttrListData,
} from "@/api/product/spu";
import { useCategoryListStore } from "@/stores/categoryList";

import type { tradeMarkListModel } from '@/api/product/model/tradeMarkModel';
import type { BaseSaleAttrListModel, SpuImageListModel, SpuInfoModel, SpuSaleAttrModel } from '@/api/product/model/spuModels';
const props = defineProps<{
  editSpuInfo: SpuInfoModel; // 传入的时候， 也要添加类型约束
}>();

const traMarkList = ref<tradeMarkListModel>([]);
const attrList = ref<BaseSaleAttrListModel>([]);
const ruleFormRef = ref<FormInstance>();
const cateStore = useCategoryListStore();

// el-tag
const inputValue = ref("");
const inputVisible = ref(false);
const InputRef = ref<InstanceType<typeof ElInput>>();

// 表单验证规则
const rules: FormRules = {
  spuName: [{ required: true, message: "请输入SPU名称", trigger: "blur" }],
  tmId: [{ required: true, message: "请选择SPU品牌" }],
  description: [{ required: true, message: "请输入SPU描述", trigger: "blur" }],
  spuImageList: [{ required: true, message: "请上传SPU图片", type: "array" }],
  spuSaleAttrList: [
    { required: true, message: "请添加SPU销售属性", type: "array" },
  ],
};

// 保存时提交数据
const spuInfo = reactive<SpuInfoModel>(props.editSpuInfo);

const BASE_URL = import.meta.env.VITE_API_URL;

const emits = defineEmits(["changeState"]);
// 取消按钮
const cancalSpu = () => {
  emits("changeState", 1);
};
onMounted(() => {
  console.log(props.editSpuInfo);
  console.log(spuInfo.spuImageList, spuInfo.spuSaleAttrList);
});
// 发请求获取品牌列表和销售属性
onMounted(async () => {
  // promise.all写法发两个请求
  try {
    const id = spuInfo.id;
    let promises = [reqTrademarkList(), reqBaseSaleAttrList()];
    if (id) {
      promises = promises.concat([
        reqGetSpuImageListData(id),
        reqGetSpuSaleAttrListData(id),
      ]);
    }
    const [
      resTrademarkList,
      resBaseSaleAttrList,
      resSpuImageListData,
      resSpuSaleAttrListData,
    ] = await Promise.all(promises);
    console.log("商标列表：", resTrademarkList);
    console.log("销售属性列表：", resBaseSaleAttrList);
    traMarkList.value = resTrademarkList;
    attrList.value = resBaseSaleAttrList;

    if (resSpuImageListData && resSpuSaleAttrListData) {
      // spuInfo.spuImageList = responseSpuImageList

      spuInfo.spuImageList = resSpuImageListData.map((item) => {
        return {
          ...item,
          name: item.imgName,
          url: item.imgUrl,
        };
      });

      spuInfo.spuSaleAttrList = resSpuSaleAttrListData;
    }
  } catch (error) {
    console.error(error);
  }
});

// 上传属性
const dialogImageUrl = ref("");
const dialogVisible = ref(false);
const imageUrl = ref("");
const imageName = ref("");
const fileList = ref<UploadUserFile[]>([]);

// 移除图片
const handleRemove: UploadProps["onRemove"] = (uploadFile, uploadFiles) => {
  console.log(uploadFile, uploadFiles);
};
// 预览图片
const handlePictureCardPreview: UploadProps["onPreview"] = (uploadFile) => {
  dialogImageUrl.value = uploadFile.url!;
  dialogVisible.value = true;
};
// 上传成功
const handleAvatarSuccess: UploadProps["onSuccess"] = (
  response,
  uploadFile,
  uploadFiles
) => {
  spuInfo.spuImageList = uploadFiles;
  // 清除校验规则
  ruleFormRef?.value.clearValidate("spuImageList");
};
// 上传文件之前验证
const beforeAvatarUpload: UploadProps["beforeUpload"] = (rawFile) => {
  if (rawFile.type !== "image/jpeg") {
    ElMessage.error("Avatar picture must be JPG format!");
    return false;
  } else if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error("Avatar picture size can not exceed 2MB!");
    return false;
  }
  return true;
};
// 添加销售属性
const addSale = () => {
  // 添加时判断如果销售属性值为空return
  const spuSaleAttrList = spuInfo.spuSaleAttrList;
  if (
    spuSaleAttrList.length &&
    spuSaleAttrList.some((item) => item.spuSaleAttrValueList.length === 0)
  ) {
    ElMessage.error("请至少添加一个销售属性");
    return;
  }
  const id = attrList.value.find((item) => item.name == spuInfo.spuSaleAttr).id;
  spuInfo.spuSaleAttrList.push({
    inputVisible: false,
    baseSaleAttrId: id,
    saleAttrName: spuInfo.spuSaleAttr,
    spuSaleAttrValueList: [],
  });
  spuInfo.spuSaleAttr = ""; // 清空下拉框选项
};

// 计算销售属性数量
// 添加后的和基础的比较如果是的话过滤掉
const filterSpuSaleAttrList = computed(() => {
  return attrList.value.filter((attr) => {
    return !spuInfo.spuSaleAttrList.find(
      (item) => attr.name === item.saleAttrName
    );
  });
});

// 删除销售属性
const delAttr = (index:number) => {
  spuInfo.spuSaleAttrList.splice(index, 1);
};

// el-tag事件
const handleClose = (row:SpuSaleAttrModel, index:number) => {
  // dynamicTags.value.splice(dynamicTags.value.indexOf(tag), 1)
  row.spuSaleAttrValueList.splice(row.spuSaleAttrValueList.indexOf(index), 1);
};
// 展示输入框
const showInput = (row:SpuSaleAttrModel) => {
  // inputVisible.value = true
  row.inputVisible = true;
  nextTick(() => {
    InputRef.value!.input!.focus();
  });
};
const handleInputConfirm = (row:SpuSaleAttrModel) => {
  // 判断属性列表和输入值是否一样，一样就return
  const spuSaleAttrValueList = row.spuSaleAttrValueList;
  if (
    spuSaleAttrValueList.length &&
    spuSaleAttrValueList.find(
      (item) => item.saleAttrValueName === inputValue.value
    )
  ) {
    ElMessage.error("属性值相同，请重新输入!");
    row.inputVisible = false;
    inputValue.value = "";
    return;
  }
  const { baseSaleAttrId, saleAttrName } = row;
  if (inputValue.value) {
    row.spuSaleAttrValueList.push({
      baseSaleAttrId,
      saleAttrValueName: inputValue.value,
      saleAttrName,
    });
  }

  row.inputVisible = false;
  inputValue.value = "";
};

// 保存
const saveSpuInfo = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      spuInfo.category3Id = cateStore.category3Id as number;
      spuInfo.spuImageList = spuInfo.spuImageList.map((item) => {
        return {
          imgName: item.name,
          imgUrl: item.response ? item.response.data : item.imgUrl
        };
      });

      /* "category3Id": 0,
  "description": "string",
  "id": 0,
  "spuImageList": [
    {
      "createTime": "2023-04-25T14:24:01.791Z",
      "id": 0,
      "imgName": "string",
      "imgUrl": "string",
      "spuId": 0,
      "updateTime": "2023-04-25T14:24:01.791Z"
    }
  ],
  "spuName": "string",
  "imgName": "string",
      "imgUrl": "string",
      "tmId": 0, */

      if (spuInfo.id) {
        await reqUpdateSpu(spuInfo);
           // 提示用户 添加成功了
      ElMessage.success("更新spu数据成功了...");
      } else {
        await reqGetSaveSpuInfo(spuInfo);
      ElMessage.success("保存成功");

      }
      emits("changeState", 1);
    } else {
      console.log("error submit!", fields);
    }
  });
};
</script>

<style scoped></style>