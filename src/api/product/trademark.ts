import request from '@/utils/request'


import type { trademarkListModelResponse } from '@/api/model/trademarkModel'
const reqGetTrademarkList = (page: number, limit: number) => {
  return request.get<any, trademarkListModelResponse>(`/admin/product/baseTrademark/${page}/${limit}`)
}


export {
  reqGetTrademarkList
}

