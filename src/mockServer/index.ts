// 此文件是用于开启mock服务器的
import Mock from 'mockjs'
import data from './data.json'
// 配置mock服务器
// Mock.mock('/mock/report/data',{code:200,data})


// 这是个接口，接口地址             返回数据 data是自己写的
Mock.mock('/mock/report/data', { code: 200, data })

