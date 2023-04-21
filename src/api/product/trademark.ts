import request from '@/utils/request'
import type { trademarkListModelResponse, trademarkModel } from '@/api/model/trademarkModel'

// 枚举
enum Api {
  getTradeMarkApi = '/admin/product/baseTrademark',
  saveTradeMarkApi = '/admin/product/baseTrademark/save',
  deleteTradeMarkApi = '/admin/product/baseTrademark/remove',
  updateTrademarkApi = '/admin/product/baseTrademark/update'
}


// 获取品牌数据
const reqGetTrademarkList = (page: number, limit: number) => {
  return request.get<any, trademarkListModelResponse>(`${Api.getTradeMarkApi}/${page}/${limit}`)
}

// 添加品牌数据
const reqSaveTrademark = (trademarkInfo: trademarkModel) => {
  return request.post<any, null>(Api.saveTradeMarkApi, trademarkInfo)
}

// 删除品牌数据
const reqDeleteTrademark = (id: number) => {
  return request.delete<any, null>(`${Api.deleteTradeMarkApi}/${id}`)
}

// 修改品牌数据
const reqUpdateTrademark = (trademarkInfo: trademarkModel) => {
  return request.put<any, null>(Api.updateTrademarkApi, trademarkInfo)
}



export {
  reqGetTrademarkList,
  reqSaveTrademark,
  reqDeleteTrademark,
  reqUpdateTrademark
}

