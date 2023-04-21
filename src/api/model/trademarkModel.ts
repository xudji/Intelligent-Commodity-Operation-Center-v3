export interface trademarkModel {
  id?: number,
  logoUrl: string,
  tmName: string,
}

export type trademarkListModel = trademarkModel[]

export interface trademarkListModelResponse {
  total: number,
  records: trademarkListModel
}