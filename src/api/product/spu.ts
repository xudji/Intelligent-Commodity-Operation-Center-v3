import request from '@/utils/request'

enum Api {
  getSpuList = '/admin/product',
  getBaseSaleAttrList = '/admin/product/baseSaleAttrList',
  getTrademarkList = '/admin/product/baseTrademark/getTrademarkList'
  
}
// 1.获取spu列表
const reqSpuList = (page: number, limit:number,category3Id:number) => {
  return request.get<any, any>(Api.getSpuList + `/${page}/${limit}?category3Id=${category3Id}`)
}

// 2.获取品牌列表
const reqTrademarkList = () => {
  return request.get<any, any>(Api.getTrademarkList)
}

// 3.获取销售属性

const reqBaseSaleAttrList = () => {
  return request.get<any, any>(Api.getBaseSaleAttrList)
}
  
export {
  reqSpuList,
  reqBaseSaleAttrList,
  reqTrademarkList
}

