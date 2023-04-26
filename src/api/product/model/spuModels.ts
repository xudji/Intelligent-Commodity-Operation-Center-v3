
export interface ImgResponseModel {
  code: number,
  data: string,
  message: string,
  ok: boolean
}

export interface SpuImageModel {
  id?: number
  // percentage:number,
  response?: ImgResponseModel,
  imgName: string,
  imgUrl: string,
  name?: string,
  spuId?: number,
  status?: string,
  uid?: number
  url?: string
}

export type SpuImageListModel = SpuImageModel[]

export interface SpuSaleAttrValueModel {
  baseSaleAttrId: number | string,
  id?: number,
  isChecked?: string | null,
  saleAttrName: string,
  saleAttrValueName: string,
  spuId?: number
}

export type SpuSaleAttrValueListModel = SpuSaleAttrValueModel[]
export interface SpuSaleAttrModel {
  inputVisible?:boolean,
  baseSaleAttrId: number | string,
  id?: number,
  saleAttrName: string,
  spuId?: number,
  spuSaleAttrValueList: SpuSaleAttrValueListModel
}

export type SpuSaleAttrListModel = SpuSaleAttrModel[]
export interface SpuInfoModel {
  id?:number,
  spuName: string, // spu名称
  category3Id: number, // 三级id
  tmId: number | string, // spu品牌
  description: string, // spu描述
  spuImageList: SpuImageListModel, // 要上传的图片列表
  spuSaleAttrList: SpuSaleAttrListModel, // 销售属性
  spuSaleAttr?: string, // 额外添加的属性 用来收集属性名
}

// 添加服务器端响应回来的spuListData数据格式  带data后缀的表示服务器端响应回来的
export interface SpuListDataModel {
  total: number,
  size: number,
  records: SpuInfoModel[]
}
// 再添加 baseSaleAttr的约束
export interface BaseSaleAttrModel {
  id: number,
  name:string
}

export type BaseSaleAttrListModel = BaseSaleAttrModel[]