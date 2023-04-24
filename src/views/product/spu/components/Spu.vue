<template>
  <div style="margin-top: 10px">
    <el-card>
      <el-form label-width="100px" :model="spuInfo">
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
            v-model:file-list="fileList"
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
          <el-select placeholder="还有3项未选择" v-model="spuInfo.spuSaleAttr">
            <el-option
              v-for="a1 in attrList"
              :key="a1.id"
              :value="a1.name"
              :label="a1.name"
            ></el-option>
          </el-select>
          <el-button type="primary" @click="addSale">添加销售属性</el-button>
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
            <el-table-column label="属性值名称列表"></el-table-column>
            <el-table-colum label="操作">
              <el-tooltip effect="dark" content="删除SKU" placement="top">
                <el-button
                  type="danger"
                  size="small"
                  :icon="Delete"
                ></el-button>
              </el-tooltip>
            </el-table-colum>
          </el-table>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">保存</el-button>
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
import { ref, reactive, onMounted } from "vue";
import { Plus, Delete, Edit, InfoFilled } from "@element-plus/icons-vue";
import type { UploadProps, UploadUserFile } from "element-plus";
import { ElMessage } from "element-plus";
import { reqTrademarkList, reqBaseSaleAttrList } from "@/api/product/spu";
const traMarkList = ref([]);
const attrList = ref([]);

// 保存时提交数据
const spuInfo = reactive({
  spuName: "",
  tmId: "", // spu品牌
  description: "", // spu描述
  spuImageList: [], // 存储spu图片的数组
  spuSaleAttrList: [], // 基本销售属性
  spuSaleAttr: "", // 收集选中的属性
  category3Id: "", // 三级id
});



const BASE_URL = import.meta.env.VITE_API_URL;

const emits = defineEmits(["changeState"]);
// 取消按钮
const cancalSpu = () => {
  emits("changeState", 1);
};

// 发请求获取品牌列表和销售属性
onMounted(async () => {
  // promise.all写法发两个请求
  try {
    const [resTrademarkList, resBaseSaleAttrList] = await Promise.all([
      reqTrademarkList(),
      reqBaseSaleAttrList(),
    ]);
    console.log("商标列表：", resTrademarkList);
    console.log("销售属性列表：", resBaseSaleAttrList);
    traMarkList.value = resTrademarkList;
    attrList.value = resBaseSaleAttrList;
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
  uploadFile
) => {
  imageUrl.value = URL.createObjectURL(uploadFile.raw!);
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
  spuInfo.spuSaleAttrList.push({
    saleAttrName: spuInfo.spuSaleAttr,
    spuSaleAttrValueList: []
  })
  spuInfo.spuSaleAttr = '' // 清空下拉框选项
  
};
</script>

<style scoped></style>