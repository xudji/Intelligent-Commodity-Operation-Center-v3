<template>
  <CategorySelector
    :disabled="showState !== StateCate.SPULIST_STATE"
  ></CategorySelector>
  <SpuList
    v-if="showState === StateCate.SPULIST_STATE"
    @changeState="changeState"
    @saveSpuInfo="saveSpuInfo"
  ></SpuList>
  <Spu
    v-if="showState === StateCate.SPU_STATE"
    @changeState="changeState"
    :editSpuInfo="editSpuInfo"
  ></Spu>
  <Sku v-if="showState === StateCate.SKU_STATE"></Sku>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "Spu",
});
</script>
<script lang="ts" setup>
import { ref } from "vue";
import CategorySelector from "@/components/CategorySelector/index.vue";
import SpuList from "./components/SpuList.vue";
import Spu from "./components/Spu.vue";
import Sku from "./components/Sku.vue";
import { StateCate } from "./types";
const showState = ref(StateCate.SPULIST_STATE);
// 切换StateCate
const changeState = (val: number) => {
  showState.value = val;
};
const editSpuInfo = ref({});
const saveSpuInfo = (spuInfo) => {
  editSpuInfo.value = {
    ...spuInfo,
    // 手动添加以下两个属性 防止跳转到spuForm.vue页面报错
    spuImageList: [],
    spuSaleAttrList: [],
  };
};
</script>

<style scoped></style>