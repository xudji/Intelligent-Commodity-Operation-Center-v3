import request from '@/utils/request'

enum Api {
    spuSaleAttrListApi = '/admin/product/spuSaleAttrList',
    spuImageListApi = '/admin/product/spuImageList'
}

// 3.保存更新attr
const reqSpuSaleAttrList = (spuId:number) => {
    return request.get<any,null >(Api.spuSaleAttrListApi + `/${spuId}`)
} 
const reqSpuImageList = (spuId:number) => {
    return request.get<any,null >(Api.spuImageListApi + `/${spuId}`)
} 
// GET /admin/product/spuSaleAttrList/{spuId}
// get /admin/product/spuImageList/{spuId}
export {
    reqSpuSaleAttrList,
    reqSpuImageList
}
