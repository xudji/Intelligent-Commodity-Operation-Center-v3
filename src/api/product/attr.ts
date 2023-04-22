import request from '@/utils/request'

import type { AttrInfoModel,AttrValueInfoModel,CategoryIdsModel} from '@/api/product/model/attrModel'

enum Api {
    getAttrInfo = '/admin/product/attrInfoList',
    getDelAttr = '/admin/product/deleteAttr'
}

// 1.获得attr数据
const reqAttrInfo = ({
    category1Id,
    category2Id,
    category3Id,
}:CategoryIdsModel) => {
    return request.get<any, AttrValueInfoModel[]>(Api.getAttrInfo + `/${category1Id}/${category2Id}/${category3Id}`)
}

// 2.删除attr
const reqDelAttr = (attrId:number) => {
    return request.delete<any,null>(Api.getDelAttr + `/${attrId}`)  
}

export {
    reqAttrInfo,
    reqDelAttr
}

