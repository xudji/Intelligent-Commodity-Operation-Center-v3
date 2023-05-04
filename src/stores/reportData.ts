
import { defineStore } from 'pinia'
import { reqGetReportData } from '@/api/mock/index'


export const useReportDataStore = defineStore({
    id: 'reportData',

    state: () => ({
        reportData: {}
    }),

    actions: {
        async getReportData() {
            const res = await reqGetReportData()
            this.reportData = res
            console.log(res)
        }
    }
})
