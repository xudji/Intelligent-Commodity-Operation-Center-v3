

export interface categoryModel { 
   id: number,
   name: string
}
export type categoryModelList = categoryModel[];

export type Numberable = number | undefined

export interface tradeMarkModel {
   category1Id: Numberable,
   category2Id: Numberable,
   category3Id: Numberable,
   category1List: categoryModelList,
   category2List: categoryModelList,
   category3List: categoryModelList
}


// 单独定义一个拥有分类Id的接口
export interface CategoryIdsModel {
   category1Id: Numberable;
   category2Id: Numberable;
   category3Id: Numberable;
 }

 // 定义一个约束分类数据的接口 并继承自另一个接口
export interface CategoryStateModel extends CategoryIdsModel {
   category1List: categoryModelList;
   category2List: categoryModelList;
   category3List: categoryModelList;
 }

export interface AttrValueInfoModel {
   valueName: string,
   attrId?:number,
   isShowInput:boolean
}

export type AttrValueListModel = AttrValueInfoModel[];


// attr ts

export interface AttrInfoModel {
   id?:number
   attrName:string
   attrValueList:AttrValueListModel,
   categoryId:number
   categoryLevel:number
}

export type AttrListModel = AttrInfoModel[]
