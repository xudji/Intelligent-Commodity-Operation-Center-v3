import { defineStore } from "pinia";

// 引入接口函数
import {reqGetCategory1ListData,reqGetCategory2ListData,reqGetCategory3ListData} from '@/api/product/categorySelector'
// 2. 创建模块对象
export const useCategoryListStore = defineStore('categoryList', {
  state: () => {
    return {
      // 以下三个属性用于收集用户真正选择的分类的id
      category1Id: undefined,
      category2Id: undefined,
      category3Id: undefined,

      // 以下三个数组用于存储服务器响应回来的分类数据
      category1List: [],
      category2List: [],
      category3List: []
    }
  },
  actions: {
    // 1. 获取一级分类数据
    async getCategory1ListData() {
      const result = await reqGetCategory1ListData()
      console.log('pp',result)
      this.category1List = result
    }
  },
  getters: {
    
  }
})