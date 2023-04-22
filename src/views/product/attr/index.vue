<template>
    <CategorySelector :isCategorySelectorShow="isCategorySelectorShow"></CategorySelector>

    <el-card style="margin-top: 20px;">
        <div v-if="isAttrShow">
            <el-button type="primary" :icon="Plus" :disabled="!attrStore.category3Id" @click="addAttr">添加属性</el-button>
            <el-table border style="margin-top: 10px;" :data="attrList">
                <el-table-column type="index" label="序号" width="160px"></el-table-column>
                <el-table-column prop="attrName" label="属性名称" width="160px">
                </el-table-column>

                <el-table-column label="属性值列表">
                    <template v-slot="{ row }">
                        <el-tag type="success" v-for="attr in  row.attrValueList" :key="attr.id">{{ attr.valueName
                        }}</el-tag>
                    </template>

                </el-table-column>
                <el-table-column label="操作" width="180" fixed="right">
                    <template v-slot="{ row }">
                        <div style="display: flex; justify-content: space-between;  width: 80px;">
                            <el-tooltip class="box-item" effect="dark" content="编辑" placement="top">
                                <el-button type="primary" size="small" :icon="Edit"></el-button>
                            </el-tooltip>

                            <el-popconfirm :title="`确定删除数据吗?`" @confirm="confirmDel(row.id)">
                                <template #reference>
                                    <div>
                                        <el-tooltip class="box-item" effect="dark" content="删除" placement="top">
                                            <el-button type="danger" size="small" :icon="Delete"></el-button>
                                        </el-tooltip>
                                    </div>
                                </template>

                            </el-popconfirm>
                        </div>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div v-else>
            <el-form>
                <el-form-item label="属性名">
                    <el-input v-model="attr.attrName" placeholder="请输入属性名" style="width: 160px;"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" :icon="Plus" @click="addAttrValue" :disabled="!attr.attrName" >添加属性值</el-button>
                    <el-button @click="cancelAdd">取消</el-button>
                </el-form-item>
            </el-form>
            <div>
                <el-table style="margin-bottom: 10px;" :data="attr.attrValueList">
                    <el-table-column label="序号" type="index" width="140"></el-table-column>
                    <el-table-column label="属性值名称" width="400px">
                        <template v-slot="{ row, $index }">
                            <el-input ref="inutRef" v-if="row.isShowInput" v-model="row.valueName" @blur="blurInput(row,$index)"></el-input>
                            <span v-else> {{ row.valueName }} </span>
                        </template>


                    </el-table-column>
                    <el-table-column label="操作">
                        <el-button type="danger" size="small" :icon="Delete" @click="delAttrInput($index)"></el-button>
                    </el-table-column>
                </el-table>
                <el-button type="primary" >保存</el-button>
                <el-button @click="cancelAdd">取消</el-button>
            </div>
        </div>
    </el-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
    name: 'Attr',
})
</script>
<script lang="ts" setup>
import { ref, onMounted, reactive, watch, nextTick } from 'vue'
import { Plus, Delete, Edit } from "@element-plus/icons-vue";
import { ElMessageBox, ElMessage } from "element-plus";
import CategorySelector from '@/components/CategorySelector/index.vue'
import { useCategoryListStore } from '@/stores/categoryList'
import { reqAttrInfo, reqDelAttr } from '@/api/product/attr'
import type { AttrInfoModel,AttrValueInfoModel,CategoryIdsModel,AttrListModel} from '@/api/product/model/attrModel'
const attrStore = useCategoryListStore()
const attrList = ref<AttrListModel>([])
const isAttrShow = ref<boolean>(true)
const isCategorySelectorShow = ref(false)

const inutRef = ref<HTMLInputElement>()
// &准备添加的数初始值
const attr = reactive<AttrInfoModel>({
    attrName: '',
    attrValueList: [],
    categoryId: 0,
    categoryLevel: 3,
    id: 1
})

// 1.监听有3id 发请求渲染表格数据
watch(
    // 监听3Id的变化 
    () => attrStore.category3Id, // 去除响应式的值
    async (category3Id) => {
        if (!category3Id) {
            attrList.value = [];
            return;
        }
        getAttrInfo()
    },
    { immediate: true },
)

// 2.渲染表格数据请求
const getAttrInfo = async () => {
    const res  = await reqAttrInfo({
        category1Id: attrStore.category1Id as number,
        category2Id: attrStore.category2Id as number,
        category3Id: attrStore.category3Id as number
    })
    attrList.value = res
}

// 3.删除attr表格数据
const confirmDel = async (id: number) => {
    await reqDelAttr(id)
    getAttrInfo()
}

// 4.添加属性操作
const addAttr = () => {
    isAttrShow.value = false;
    isCategorySelectorShow.value = true
   


}

// 5.添加属性值
const addAttrValue = () => {
    
    attr.attrValueList.push({
        valueName: '',
        isShowInput: true // 是否显示输入框
    })
    nextTick(() => {
        inutRef.value?.focus()
    })
}

// 6.取消按钮
const cancelAdd = () => {
    isAttrShow.value = true
    attr.attrName = ''
    isCategorySelectorShow.value = false

}

// 7.属性值输入框失去焦点
const blurInput = (row:AttrValueInfoModel,index:number) => {
   // 删除空值
   if(!row.valueName) return attr.attrValueList.splice(index,1)
   row.isShowInput = false

}

// 8.删除输入值
const delAttrInput = (index:number) => {
    attr.attrValueList.splice(index,1)    
}

// 9.保存

</script>

<style scoped></style>

