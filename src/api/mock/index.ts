// 1. 引入函数
/* import request from '@/utils/request-mock'
import type { ReportDataModel } from './interface/dataModel'
​
// 2. 定义方法
export const reqGetReportData = () => {
  return request.get<any,ReportDataModel>('/report/data')
}
 */


import request from '@/utils/mock-request'


export const reqGetReportData = () => {
    return request.get<any, any>('/report/data')
}