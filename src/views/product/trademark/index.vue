<template>
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <el-button type="primary" :icon="Plus" @click="showDialog"
          >添加</el-button
        >
      </div>
    </template>

    <!-- 表格 -->
    <el-table :data="tableData" border style="width: 100%; margin-bottom: 20px">
      <el-table-column type="index" label="序号" width="80" align="center" />
      <el-table-column prop="tmName" label="品牌名称" width="180" />
      <el-table-column label="品牌LOGO">
        <template v-slot="{ row }">
          <img :src="row.logoUrl" alt="" style="width: 80px" />
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template v-slot="{ row }">
          <el-tooltip
            class="box-item"
            effect="dark"
            content="编辑"
            placement="top"
          >
            <el-button
              type="warning"
              size="small"
              :icon="Edit"
              @click="editTrademark(row)"
            ></el-button>
          </el-tooltip>

          <el-tooltip
            class="box-item"
            effect="dark"
            content="删除"
            placement="top"
          >
            <el-button
              type="danger"
              size="small"
              :icon="Delete"
              @click="delTrademark(row.id)"
            ></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
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
  </el-card>

  <el-dialog
    v-model="dialogVisible"
    :title="`${tradeMark.id ? '编辑' : '添加'}品牌`"
  >
    <el-form
      ref="ruleFormRef"
      :rules="rules"
      :model="tradeMark"
      label-width="120px"
    >
      <el-form-item label="品牌名称" prop="tmName">
        <el-input v-model="tradeMark.tmName" />
      </el-form-item>
      <el-form-item label="品牌LOGO" prop="logoUrl">
        <el-upload
          class="avatar-uploader"
          :action="`${BASE_URL}/admin/product/fileUpload`"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
          <template #tip>
            <div class="el-upload__tip">jpg/png 文件大小不能超过2M</div>
          </template>
        </el-upload>
      </el-form-item>
    </el-form>

    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleComfirm(ruleFormRef)">
          确定
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "Trademark",
});
</script>
<script lang="ts" setup>
import { ref, reactive, onMounted } from "vue";
import {
  reqbaseTrademark,
  reqAddTrademark,
  reqDelTrademark,
  reqUpdateTrademark,
} from "@/api/product/tradeMark";
import { Plus, Delete, Edit } from "@element-plus/icons-vue";
import type {
  tradeMarkListModel,
  tradeMarkModel,
} from "@/api/product/model/tradeMarkModel";
import { ElMessageBox, ElMessage } from "element-plus";
import type { UploadProps, FormInstance, FormRules } from "element-plus";

const tableData = ref<tradeMarkListModel>();
const pageSize = ref(3);
const small = ref(false);
const background = ref(false);
const disabled = ref(false);
const total = ref(100);
const currentPage = ref(1);
const dialogVisible = ref(false);
const BASE_URL = import.meta.env.VITE_API_URL;
const ruleFormRef = ref<FormInstance>();
const rules = reactive<FormRules>({
  tmName: [
    { required: true, message: "请输入品牌名称", trigger: "blur" },
    { min: 1, max: 6, message: "品牌名称应该是在1到6之间", trigger: "blur" },
  ],
  logoUrl: [
    {
      required: true,
      message: "请上传一张图片",
      trigger: "change",
    },
  ],
});

let tradeMarkInfo = () => ({
  logoUrl: "",
  tmName: "",
});
const tradeMark = reactive<tradeMarkModel>(tradeMarkInfo());

const imageUrl = ref("");

const getTrademark = async () => {
  const res = await reqbaseTrademark(currentPage.value, pageSize.value);
  console.log(res);
  tableData.value = res.records; // 请求参数需要类型定义
  total.value = res.total;
};

onMounted(() => {
  getTrademark();
});
// 每页条数改变
const handleSizeChange = (val: number) => {
  pageSize.value = val;
  getTrademark();
};
// 当前页码改变
const handleCurrentChange = (val: number) => {
  currentPage.value = val;
  getTrademark();
};

// 1.点击添加弹出对话框
const showDialog = async () => {
  dialogVisible.value = true;
  delete tradeMark.id;
};

// 2.上传逻辑
const handleAvatarSuccess: UploadProps["onSuccess"] = (
  response,
  uploadFile
) => {
  imageUrl.value = URL.createObjectURL(uploadFile.raw!);
  tradeMark.logoUrl = response.data;
};

const beforeAvatarUpload: UploadProps["beforeUpload"] = (rawFile) => {
  const imgType = ["image/jpeg", "image/jpg", "image/png"];
  if (!imgType.includes(rawFile.type)) {
    ElMessage.error("图片必须是JPG/PNG格式!");
    return false;
  } else if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error("图片大小不能大于2MB!");
    return false;
  }
  return true;
};

// 3.确定添加修改逻辑
const handleComfirm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      if (tradeMark.id) {
        await reqUpdateTrademark(tradeMark);
        ElMessage.success("修改成功");
        dialogVisible.value = false;
        getTrademark();
      } else {
        await reqAddTrademark(tradeMark);
        ElMessage.success("添加成功");
        dialogVisible.value = false;
        Object.assign(tradeMark, tradeMarkInfo());
        imageUrl.value = "";
        getTrademark();
      }
    } else {
      console.log("error submit!", fields);
    }
  });
};

//4.删除品牌(id)
const delTrademark = async (id: number) => {
  ElMessageBox.confirm("您真的要删除此商品品牌吗??", "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(async () => {
      await reqDelTrademark(id);
      ElMessage.success("删除成功");
      getTrademark();
    })
    .catch(() => {
      ElMessage({
        type: "info",
        message: "Delete canceled",
      });
    });
};
//5.修改品牌(id)
const editTrademark = (row: tradeMarkModel) => {
  dialogVisible.value = true;
  // 数据回显
  Object.assign(tradeMark, row);
  imageUrl.value = tradeMark.logoUrl;
};
</script>


<style scoped>
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>
