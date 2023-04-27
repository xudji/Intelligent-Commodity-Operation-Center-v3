import request from '@/utils/request'

enum Api {
    spuSaleAttrListApi = '/admin/product/spuSaleAttrList',
    spuImageListApi = '/admin/product/spuImageList',
    // 添加skuInfo
    saveSkuInfoApi = '/admin/product/saveSkuInfo',
    getSkuListBySpuApi= '/admin/product/findBySpuId',
}

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
const reqGetSkuListBySpuId =  (spuId:number) => {
    return request.get(Api.getSkuListBySpuApi + `/${spuId}`)
}

export {
    reqSpuSaleAttrList,
    reqSpuImageList,
    reqSaveSkuInfo,
    reqGetSkuListBySpuId
}
