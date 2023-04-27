import request from '@/utils/request'

enum Api {
    spuSaleAttrListApi = '/admin/product/spuSaleAttrList',
    spuImageListApi = '/admin/product/spuImageList',
    // 添加skuInfo
    saveSkuInfoApi = '/admin/product/saveSkuInfo',
    getSkuListBySpuApi = '/admin/product/findBySpuId',
    getSkuList = '/admin/product/list',
    deleteSkuApi = '/admin/product/deleteSku'
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

export {
    reqSpuSaleAttrList,
    reqSpuImageList,
    reqSaveSkuInfo,
    reqGetSkuListBySpuId,
    reqGetSkuList,
    reqDeleteSku
}
