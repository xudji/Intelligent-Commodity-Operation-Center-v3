<template>
  <el-card class="box-card"> 

    <el-form :inline="true" :model="formInline" class="demo-form-inline">
    <el-form-item label="一级分类">
        <el-input v-model="formInline.user" placeholder="Approved by" />
      </el-form-item>
      <el-form-item label="二级分类">
        <el-select v-model="formInline.region" placeholder="Activity zone">
          <el-option label="Zone one" value="shanghai" />
          <el-option label="Zone two" value="beijing" />
        </el-select>
      </el-form-item>
      <el-form-item label="三级分类">
        <el-select v-model="formInline.region" placeholder="Activity zone">
          <el-option label="Zone one" value="shanghai" />
          <el-option label="Zone two" value="beijing" />
        </el-select>
      </el-form-item>
   
  </el-form>
  </el-card>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "CategorySelector",
});
</script>
<script lang="ts" setup>
import { ref,reactive, onMounted  } from "vue";
import {useCategoryListStore} from '@/stores/category'
const categoryStore = useCategoryListStore()

const formInline = reactive({
  user: '',
  region: '',
})

onMounted(() => {
   categoryStore.getCategory1ListData() 
})

</script>

<style scoped></style>