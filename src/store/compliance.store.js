import { defineStore } from 'pinia'
import API from '@/services/API'
import useToast from '@/composables/useToast.js'


export const usecomplianceStore = defineStore('compliancestore',{
    state: () => ({
        allcomplianceList: [],
        loader : false,
        totalPages: 0,
        btnLoader : false
    }),
    actions:{
        async loadComplianceList(data) {
            this.loader = true
            const response = await API.get(`api/compliance/get-bypagination`, data)
            this.loader = false
            if( response.status == 200 ){
                this.totalPages = Math.ceil(response.data.TotalRows/data.RowNo)
                this.allcomplianceList = response.data.Pagination  
            } else{
                useToast(response)
                this.totalPages = 0
                this.allcomplianceList = []  
            }
        },
        async insertComplianceList(data) {
            this.btnLoader = true
            const response = await API.post("api/compliance/InsertUpdate",data)
            this.btnLoader = false
            if ( response.status == 200 ){
                this.allcomplianceList.push(response.data)
                useToast("compliance Data Added Successfully",'success')
            } else {
                useToast(response);
            }
            return response
        },

        async deleteComplianceList(id) {
            const response = await API.delete( `api/compliance/delete?Compliance_id=${id}`)
            if( response.status == 200 ){
                this.allcomplianceList = this.allcomplianceList.filter(obj => obj.Compliance_id != id )
                useToast(" Data Deleted Successfully",'success')
            }else{
                useToast(" Data Deleted Failure")
            }
        }



        
    }
})

