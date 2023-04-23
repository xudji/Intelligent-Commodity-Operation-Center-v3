<template>
  <div style="margin-top: 10px">
    <el-card>
      <el-form label-width="100px">
        <el-form-item label="SPU名称">
          <el-input placeholder="SPU名称"></el-input>
        </el-form-item>
        <el-form-item label="SPU品牌" prop="sex">
          <el-select placeholder="请选择">
            <el-option label="品牌" value="品牌"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="SPU描述">
          <el-input placeholder="SPU描述" type="textarea"></el-input>
        </el-form-item>
        <el-form-item label="SPU图片">
          <el-upload
            v-model:file-list="fileList"
            action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
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
        <el-form-item label="销售属性">
          <el-select placeholder="还有3项未选择">
            <el-option label="小米" value="小米"></el-option>
          </el-select>
          <el-button type="primary">添加销售属性</el-button>
        </el-form-item>
        <el-form-item>
          <el-table border>
            <el-table-column
              type="index"
              label="序号"
              width="120"
            ></el-table-column>
            <el-table-column label="属性名"></el-table-column>
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
import { ref, reactive,onMounted } from "vue";
import { Plus, Delete, Edit, InfoFilled } from "@element-plus/icons-vue";
import type { UploadProps, UploadUserFile } from "element-plus";
import { ElMessage } from "element-plus";

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
</script>

<style scoped></style>