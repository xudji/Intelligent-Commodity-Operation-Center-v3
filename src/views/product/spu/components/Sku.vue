<template>
  <el-card style="margin-top: 10px">
    <el-form label-width="120px">
      <el-form-item label="SPU名称">
        <span>{{ props.editSpuInfo.spuName }}</span>
      </el-form-item>
      <el-form-item label="SKU名称">
        <el-input placeholder="SKU名称" :maxLength="20"></el-input>
      </el-form-item>
      <el-form-item label="价格(元)">
        <el-input type="number"></el-input>
      </el-form-item>
      <el-form-item label="重量(千克)">
        <el-input type="number"></el-input>
      </el-form-item>
      <el-form-item label="规格描述">
        <el-input placeholder="规格描述" type="textarea"></el-input>
      </el-form-item>
      <el-form-item label="平台属性">
        <el-row :gutter="10">
          <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="6">
            <el-form-item label="手机系统">
              <el-select placeholder="请选择" label="系统">
                <el-option value="11"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item label="销售属性">
        <el-form label-width="100px">
          <el-form-item label="颜色">
            <el-select placeholder="请选择">
              <el-option value="1"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>
      <el-form-item label="图片列表">
        <el-table
          ref="multipleTableRef"
          :data="tableData"
          style="width: 100%"
          @selection-change="handleSelectionChange"
          border
        >
          <el-table-column type="selection" width="55" />
          <el-table-column label="图片" >
            <template #default="scope">{{ scope.row.date }}</template>
          </el-table-column>
          <el-table-column
            property="name"
            label="名称"
            width="120"
          ></el-table-column>
          <el-table-column
            property="address"
            label="操作"
            show-overflow-tooltip
          ></el-table-column>
        </el-table>
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
import { ref, reactive } from "vue";
import { ElTable } from "element-plus";
const props = defineProps(["editSpuInfo"]);

interface User {
  date: string;
  name: string;
  address: string;
}
const multipleTableRef = ref<InstanceType<typeof ElTable>>();
const multipleSelection = ref<User[]>([]);
const tableData: User[] = [
  {
    date: "2016-05-03",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
];

const handleSelectionChange = (val: User[]) => {
  multipleSelection.value = val;
};
</script>

<style scoped></style>