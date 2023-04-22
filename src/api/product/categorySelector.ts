import request from '@/utils/request'


enum Api {
  getCategory1Api = '/admin/product/getCategory1',
  getCategory2Api = '/admin/product/getCategory2',
  getCategory3Api = '/admin/product/getCategory3',
 
}

const reqCategory1List = () => {
  return request.get<any, null>(Api.getCategory1Api)
}

const reqCategory2List = (category2Id: number) => {
  return request.get<any, null>(`${Api.getCategory2Api}/${category2Id}`)
}
const reqCategory3List = (category3Id: number) => {
  return request.get<any, null>(`${Api.getCategory3Api}/${category3Id}`)
}


export {
  reqCategory1List,
  reqCategory2List,
  reqCategory3List
}
