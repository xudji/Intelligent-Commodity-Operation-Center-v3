<template>
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <el-button
          class="button"
          type="primary"
          :icon="Plus"
          @click="showAddDialog"
          >添加</el-button
        >
      </div>
    </template>
    <!-- 表格 -->
    <el-table
      v-loading="loading"
      :data="tableData"
      border
      style="width: 100%; margin-bottom: 20px"
    >
      <el-table-column align="center" label="序号" type="index" width="180" />
      <el-table-column prop="tmName" label="品牌名称" width="180" />
      <el-table-column label="品牌LOGO">
        <template v-slot="{ row }">
          <img :src="row.logoUrl" alt="" style="width: 80px" />
        </template>
      </el-table-column>
      <el-table-column prop="address" label="操作">
        <template v-slot="{ row }">
          <el-button
            type="warning"
            :icon="Edit"
            size="small"
            @click="editTradeMark(row)"
          />
          <el-button
            type="danger"
            :icon="Delete"
            size="small"
            @click="delTradeMark(row.id)"
          />
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

    <!-- 弹出框 -->
    <el-dialog
      v-model="dialogVisible"
      :title="`${trademarkInfo.id ? '修改' : '添加'}品牌`"
      :before-close="handleClose"
    >
      <el-form
        :model="trademarkInfo"
        ref="trademarkForm"
        :rules="rules"
        label-width="120px"
      >
        <el-form-item label="品牌名称" prop="tmName">
          <el-input v-model="trademarkInfo.tmName" />
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
          <el-button type="primary" @click="btnConfirm(trademarkForm)">
            确定
          </el-button>
        </span>
      </template>
    </el-dialog>
  </el-card>
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
  reqGetTrademarkList,
  reqSaveTrademark,
  reqDeleteTrademark,
  reqUpdateTrademark,
} from "@/api/product/trademark";
import { Plus, Delete, Edit } from "@element-plus/icons-vue";
import type {
  trademarkListModel,
  trademarkModel,
} from "@/api/model/trademarkModel";
import { ElMessageBox, ElMessage } from "element-plus";
import type { UploadProps, FormInstance, FormRules } from "element-plus";
const currentPage = ref(1);
const pageSize = ref(3);
const total = ref(100);
const small = ref(false);
const background = ref(false);
const disabled = ref(false);
let tableData = ref<trademarkListModel>([]);
let loading = ref(false);
const dialogVisible = ref(false);

const trademarkForm = ref<FormInstance>();
const rules = reactive<FormRules>({
  tmName: [
    { required: true, message: "请添加品牌名称", trigger: "blur" },
    { min: 2, max: 6, message: "长度在2到6之间", trigger: "blur" },
  ],
  logoUrl: [
    { required: true, message: "请选择要上传的图片", trigger: "change" },
  ],
});

const initTrademark = () => ({ tmName: "", logoUrl: "" });
const trademarkInfo = reactive<trademarkModel>(initTrademark());

const imageUrl = ref("");
const BASE_URL = import.meta.env.VITE_API_URL;
// 1.获取页面数据
const getGetTrademarkList = async () => {
  loading.value = true;
  const res = await reqGetTrademarkList(currentPage.value, pageSize.value);
  loading.value = false;
  tableData.value = res.records;
  total.value = res.total;
  console.log(res);
};
onMounted(() => {
  getGetTrademarkList();
});

// 2.分页器
const handleSizeChange = (val: number) => {
  pageSize.value = val;
  getGetTrademarkList();
  // 当前页码归零
  currentPage.value = 1;
};
const handleCurrentChange = (val: number) => {
  currentPage.value = val;
  getGetTrademarkList();
};

// 3.关闭弹窗
const handleClose = (done: () => void) => {
  ElMessageBox.confirm("你要关闭弹窗吗?")
    .then(() => {
      done();
    })
    .catch(() => {
      // catch error
    });
};

// 4.上传 上传成功
const handleAvatarSuccess: UploadProps["onSuccess"] = (
  response,
  uploadFile
) => {
  imageUrl.value = URL.createObjectURL(uploadFile.raw!);
  trademarkInfo.logoUrl = response.data;
   trademarkForm.value?.clearValidate()
};

// 上传前校验
const beforeAvatarUpload: UploadProps["beforeUpload"] = (rawFile) => {
  const imgArr = ["image/jpeg", "image/png"];
  if (!imgArr.includes(rawFile.type)) {
    ElMessage.error('图片格式必须是"image/jpeg或image/png"!');
    return false;
  } else if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error("图片大小不能超过2M!");
    return false;
  }
  return true;
};

// 5.确定按钮事件 合二为一 更具id判断编辑还是添加 表单校验
const btnConfirm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return; // 如果没有值 则不再往下执行
  await formEl.validate(async (valid, fields) => {
    // console.log('vv', valid, fields);
    if (valid) {
      // 校验通过后，再执行以下业务
      if (trademarkInfo.id) {
        // 如果有id值 此时说明是更新品牌
        await reqUpdateTrademark(trademarkInfo);
      } else {
        // 没有id值 此时说明是添加操作
        await reqSaveTrademark(trademarkInfo);
      }

      ElMessage.success(`${trademarkInfo.id ? '更新' : '添加'}品牌成功了...`);
      // ElMessage({
      //   type:'success',
      //   message:'添加品牌成功了...'
      // })
      // 重新发送请求 根据当前页码获取最新的数据
      getGetTrademarkList();
       dialogVisible.value = false;
    } else {
      console.log('error submit!', fields);
    }
  });
};



// 6.删除功能(需要id)
const delTradeMark = async (id: number) => {
  ElMessageBox.confirm(`确定要删除此商品吗?`, "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(async () => {
      await reqDeleteTrademark(id);
      getGetTrademarkList();
      ElMessage({
        type: "success",
        message: "删除成功",
      });
    })
    .catch(() => {
      ElMessage({
        type: "info",
        message: "删除失败",
      });
    });
};

// 7.编辑功能 数据回显 需要id
const editTradeMark = (row: trademarkModel) => {
  dialogVisible.value = true;
  imageUrl.value = row.logoUrl;
  Object.assign(trademarkInfo, row);
   trademarkForm.value?.clearValidate()
};

// 8. 点击添加
 const showAddDialog = () => {
  // 清除校验规则  没有参数的时候，表示清除所有的校验规则
  trademarkForm.value?.clearValidate()
  delete trademarkInfo.id; // 删除id
  // 清空原对象中的属性值
  Object.assign(trademarkInfo, initTrademark());
  imageUrl.value = '';
  dialogVisible.value = true;
 }
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