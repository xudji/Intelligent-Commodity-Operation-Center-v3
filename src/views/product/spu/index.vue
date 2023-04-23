<template>
  <CategorySelector :disabled="showState !== StateCate.SPULIST_STATE"></CategorySelector>
  <SpuList v-if="showState === StateCate.SPULIST_STATE" @changeState="changeState"></SpuList>
  <Spu v-if="showState === StateCate.SPU_STATE"></Spu>
  <Sku v-if="showState === StateCate.SKU_STATE"></Sku>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'Spu',
})
</script>
<script lang="ts" setup>
import { ref } from 'vue'
import CategorySelector from '@/components/CategorySelector/index.vue'
import SpuList from './components/SpuList.vue'
import Spu from './components/Spu.vue'
import Sku from './components/Sku.vue'
import { StateCate } from './types'
const showState = ref(StateCate.SPULIST_STATE)
// 切换StateCate
const changeState = (val: number) => {
  showState.value = val
}
</script>

<style scoped></style>