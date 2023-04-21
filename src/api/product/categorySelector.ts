/**
 * 此文件是用来发送请求，获取三级分类的接口函数文件
 */
// 1. 引入异步对象
import request from '@/utils/request'

enum Api {
  getCategory1ListApi = '/admin/product/getCategory1',
  getCategory2ListApi = '/admin/product/getCategory2',
  getCategory3ListApi = '/admin/product/getCategory3'
}
export const reqGetCategory1ListData = () => {
    return  request.get(Api.getCategory1ListApi)  
}

export const reqGetCategory2ListData = (category1Id:number) => {
  return request.get(`${Api.getCategory2ListApi}/${category1Id}`)
}
export const reqGetCategory3ListData = (category2Id:number) => {
  return request.get(`${Api.getCategory3ListApi}/${category2Id}`)
}
