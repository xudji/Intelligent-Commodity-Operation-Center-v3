// tableData.value = res.records // 请求参数需要类型定义
// total.value = res.total
export interface tradeMarkModel {
  id?: number,
  tmName: string,
  logoUrl:string
}
export type tradeMarkListModel = tradeMarkModel[]
export interface tradeMarkListModelRes {
  total: number,
  records: tradeMarkListModel
}