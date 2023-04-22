import request from '@/utils/request'

import type { tradeMarkListModelRes,tradeMarkModel } from '@/api/product/model/tradeMarkModel'

enum Api {
    getTrademarkApi = '/admin/product/baseTrademark',
    addTrademarkApi = '/admin/product/baseTrademark/save',
    delTrademarkApi = '/admin/product/baseTrademark/remove',
    updateTrademarkApi = '/admin/product/baseTrademark/update',
} 


// 1.获取品牌
const reqbaseTrademark = (page: number, limit: number) => {
  return request.get<any, tradeMarkListModelRes>(`${Api.getTrademarkApi}/${page}/${limit}`)
}
// 2.添加品牌
const reqAddTrademark = (trademark:tradeMarkModel) => {
  return request.post<any, null>(Api.addTrademarkApi,trademark)
}
// 3.删除品牌
const reqDelTrademark = (id:number) => {
  return request.delete<any, null>(`${Api.delTrademarkApi}/${id}`)
}

//4.修改品牌
const reqUpdateTrademark = (trademark:tradeMarkModel) => {
  return request.put<any, null>(Api.updateTrademarkApi,trademark)
}




export {
  reqbaseTrademark,
  reqAddTrademark,
  reqDelTrademark,
  reqUpdateTrademark
}

