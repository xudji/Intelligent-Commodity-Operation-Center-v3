
import { defineStore } from 'pinia'
import { reqCategory1List, reqCategory2List, reqCategory3List } from '@/api/product/categorySelector'
import {reqAttrInfo} from '@/api/product/attr'
import type {tradeMarkModel} from '@/api/product/model/attrModel'

export const useCategoryListStore = defineStore({
    id: 'categoryList',

    state: ():tradeMarkModel => ({
        category1Id: undefined,
        category2Id: undefined,
        category3Id: undefined,

        // 以下三个数组用于存储服务器响应回来的分类数据
        category1List: [],
        category2List: [],
        category3List: []
    }),

    actions: {
        async reqCategory1List() {
            const res = await reqCategory1List()
            console.log(res)
            this.category1List = res
          
            
        },
        async reqCategory2List(id: number) {
            this.category1Id = id
            const res = await reqCategory2List(id)
            console.log(res)
            this.category2List = res
            this.category2Id = undefined
            this.category3Id = undefined
            this.category3List = []
            
        },
        async reqCategory3List(id: number) {
            this.category2Id = id
            this.category3Id = undefined
            const res = await reqCategory3List(id)
            console.log(res)
            this.category3List = res

        },
        getCategory3Id(id: number) {
            this.category3Id = id
        },
        async reqAttrInfo(category1Id:number,category2Id:number,category3Id:number){
         const res = await reqAttrInfo(category1Id,category2Id,category3Id)
         console.log(res)
        }
    }
})
