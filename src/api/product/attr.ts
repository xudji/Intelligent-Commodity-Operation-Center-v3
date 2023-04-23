import request from '@/utils/request'

import type { CategoryIdsModel, AttrListModel,AttrInfoModel } from '@/api/product/model/attrModel'

enum Api {
    getAttrInfo = '/admin/product/attrInfoList',
    getDelAttr = '/admin/product/deleteAttr',
    getSaveAttr = '/admin/product/saveAttrInfo'
}

// 1.获得attr数据
const reqAttrInfo = ({
    category1Id,
    category2Id,
    category3Id,
}: CategoryIdsModel) => {
    return request.get<any, AttrListModel>(Api.getAttrInfo + `/${category1Id}/${category2Id}/${category3Id}`)
}

// 2.删除attr
const reqDelAttr = (attrId: number) => {
    return request.delete<any, null>(Api.getDelAttr + `/${attrId}`)
}

// 3.保存更新attr
const reqSaveAttr = (attr:AttrInfoModel) => {
    return request.post<any,null >(Api.getSaveAttr, attr)
} 

export {
    reqAttrInfo,
    reqDelAttr,
    reqSaveAttr
}

