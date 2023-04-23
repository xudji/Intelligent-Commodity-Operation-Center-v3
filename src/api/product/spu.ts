import request from '@/utils/request'

enum Api {
  getSpuList = '/admin/product',

}
// 1.获取spu列表
const reqSpuList = (page: number, limit:number,category3Id:number) => {
  return request.get<any, any>(Api.getSpuList + `/${page}/${limit}?category3Id=${category3Id}`)
}

export {
  reqSpuList
}

