import request from '@/utils/request'

enum Api {
    spuSaleAttrListApi = '/admin/product/spuSaleAttrList',
    spuImageListApi = '/admin/product/spuImageList',
    // 添加skuInfo
    saveSkuInfoApi = '/admin/product/saveSkuInfo',
    getSkuListBySpuApi = '/admin/product/findBySpuId',
    getSkuList = '/admin/product/list',
    deleteSkuApi = '/admin/product/deleteSku',
    getOneSkuInfoApi = '/admin/product/getSkuById',
    cancelSaleApi = '/admin/product/cancelSale',
    onSaleApi = '/admin/product/onSale',    
}

// /admin/product/list/{page}/{limit}
// 3.保存更新attr
const reqSpuSaleAttrList = (spuId: number) => {
    return request.get<any, null>(Api.spuSaleAttrListApi + `/${spuId}`)
}
const reqSpuImageList = (spuId: number) => {
    return request.get<any, null>(Api.spuImageListApi + `/${spuId}`)
}
// GET /admin/product/spuSaleAttrList/{spuId}
// get /admin/product/spuImageList/{spuId}

const reqSaveSkuInfo = (skuInfo) => {
    return request.post(Api.saveSkuInfoApi, skuInfo)
}
// 查看skuList 
const reqGetSkuListBySpuId = (spuId: number) => {
    return request.get(Api.getSkuListBySpuApi + `/${spuId}`)
}
const reqGetSkuList = (page: number, limit: number) => {
    return request.get(Api.getSkuList + `/${page}/${limit}`)
}
const reqDeleteSku = (skuId: number) => {
    return request.delete(Api.deleteSkuApi + `/${skuId}`)
}

// 查看sku
const reqGetOneSkuInfo = (skuId: number) => {
    return request.get(Api.getOneSkuInfoApi + `/${skuId}`)
}

// 上架
const reqOnSale = (skuId: number) => {
    return request.get(Api.onSaleApi + `/${skuId}`)   
}
// 下架 
const reqCancelSale = (skuId: number) => {
    return request.get(Api.cancelSaleApi + `/${skuId}`)
}

export {
    reqSpuSaleAttrList,
    reqSpuImageList,
    reqSaveSkuInfo,
    reqGetSkuListBySpuId,
    reqGetSkuList,
    reqDeleteSku,
    reqGetOneSkuInfo,
    reqOnSale,
    reqCancelSale
}
