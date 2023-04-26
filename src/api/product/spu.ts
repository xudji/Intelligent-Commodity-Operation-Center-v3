import request from '@/utils/request'
import type { SpuListDataModel,BaseSaleAttrListModel, SpuInfoModel, SpuImageListModel, SpuSaleAttrListModel } from '@/api/product/model/spuModels'
import type { tradeMarkListModel } from '@/api/product/model/tradeMarkModel'



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
  return request.get<any, SpuListDataModel>(Api.getSpuList + `/${page}/${limit}?category3Id=${category3Id}`)
}

// 2.获取品牌列表
const reqTrademarkList = () => {
  return request.get<any, tradeMarkListModel>(Api.getTrademarkList)
}

// 3.获取销售属性
const reqBaseSaleAttrList = () => {
  return request.get<any, BaseSaleAttrListModel>(Api.getBaseSaleAttrList)
}

//4.保存
const reqGetSaveSpuInfo = (spuInfo:SpuInfoModel) => {
  return request.post<any, null>(Api.getSaveSpuInfo, spuInfo)
}

//5.删除Spu
const reqDelSpu = (spuId: number) => {
  return request.delete<any, null>(Api.getDelSpu + `/${spuId} `)
}
//6.修改Spu
const reqUpdateSpu = (spuInfo:SpuInfoModel) => {
  return request.post<any, null>(Api.getUpdateSpu, spuInfo)
}
const reqGetSpuImageListData = (spuId: number) => {
  return request.get<any,SpuImageListModel>(Api.getSpuImageListApi + `/${spuId}`)
}
// 4.7 获取待编辑的spuInfo中的销售属性及值
const reqGetSpuSaleAttrListData = (spuId: number) => {
  return request.get<any,SpuSaleAttrListModel>(Api.getSpuSaleAttrListApi + `/${spuId}`)
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

