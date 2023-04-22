<template>
    <el-card>
        <el-form :inline="true" :model="formInline" class="demo-form-inline" :disabled="isCategorySelectorShow">
            <el-form-item label="一级分类">
                <el-select v-model="category1Id" placeholder="请选择">
                    <el-option :label="c1.name" :value="c1.id" v-for="c1 in attrStore.category1List" :key="c1.id" />
                </el-select>
            </el-form-item>
            <el-form-item label="二级分类">
                <el-select v-model="category2Id" placeholder="请选择">
                    <el-option :label="c2.name" :value="c2.id" v-for="c2 in attrStore.category2List" :key="c2.id"  />

                </el-select>
            </el-form-item>
            <el-form-item label="三级分类">
                <el-select v-model="category3Id" placeholder="请选择">
                    <el-option :label="c3.name" :value="c3.id" v-for="c3 in attrStore.category3List" :key="c3.id" />

                </el-select>
            </el-form-item>

        </el-form>
    </el-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
    name: 'CategorySelector',
})
</script>
<script lang="ts" setup>
import { ref, reactive, onMounted, computed } from 'vue'
import { useCategoryListStore } from '@/stores/categoryList'
const attrStore = useCategoryListStore()
const formInline = reactive({
    user: '',
    region: '',
})
defineProps(['isCategorySelectorShow'])

// 1.获取1Id
onMounted(() => {
    attrStore.reqCategory1List()
})

// 2.选项1变化才会发请求获取2Id
const category1Id = computed({
    get() {
        return attrStore.category1Id as number
    },                                  
    set(val) {
        attrStore.reqCategory2List(val)
    }
})                    
const category2Id = computed({
    get() {
        return attrStore.category2Id as number
    },
    set(val) {
        attrStore.reqCategory3List(val)
    }
})
const category3Id = computed({
    get() {
        return attrStore.category3Id as number
    },
    set(val) {
        attrStore.getCategory3Id(val)
    }
})


        

</script>

<style scoped></style>