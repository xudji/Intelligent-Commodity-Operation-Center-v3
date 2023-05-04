// 定义一个函数 来格式化数据


function formatNumber(num: number) {
    var numStr = (num || 0).toString();
    return numStr.replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');
}

// 格式化数字和钱
export default function useFormat() {
    const numberFormat = (num: number) => formatNumber(num)
    const moneyFormat = (num: number) => `￥${formatNumber(num)}`
    return {
        numberFormat,
        moneyFormat
    }
}        

