import request from '@/utils/request'



enum Api {
  getSpuList = '/admin/product',
  getBaseSaleAttrList = '/admin/product/baseSaleAttrList',
  getTrademarkList = '/admin/product/baseTrademark/getTrademarkList',
  getSaveSpuInfo = '/admin/product/saveSpuInfo',
  getDelSpu = '/admin/product/deleteSpu',
  getUpdateSpu = '/admin/product/updateSpuInfo',
  getSpuImageListApi = '/admin/product/spuImageList',
  getSpuSaleAttrListApi = '/admin/product/spuSaleAttrList'
}

// 1.获取spu列表
const reqSpuList = (page: number, limit: number, category3Id: number) => {
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

//4.保存
const reqGetSaveSpuInfo = (spuInfo) => {
  return request.post<any, any>(Api.getSaveSpuInfo, spuInfo)
}

//5.删除Spu
const reqDelSpu = (spuId: number) => {
  return request.delete<any, any>(Api.getDelSpu + `/${spuId} `)
}
//6.修改Spu
const reqUpdateSpu = (spuInfo) => {
  return request.post<any, any>(Api.getUpdateSpu, spuInfo)
}
const reqGetSpuImageListData = (spuId: number) => {
  return request.get(Api.getSpuImageListApi + `/${spuId}`)
}
// 4.7 获取待编辑的spuInfo中的销售属性及值
const reqGetSpuSaleAttrListData = (spuId: number) => {
  return request.get(Api.getSpuSaleAttrListApi + `/${spuId}`)
}

export {
  reqSpuList,
  reqBaseSaleAttrList,
  reqTrademarkList,
  reqGetSaveSpuInfo,
  reqDelSpu,
  reqUpdateSpu,
  reqGetSpuImageListData,
  reqGetSpuSaleAttrListData
}

