import { defineStore } from 'pinia'
import API from '@/services/API'

export const useProjectStore = defineStore('projectstore',{
    state: () => ({
        allprojectList : [],
        ViewData:{},
        SupplierData: [],
        loader : false,
        projectSupplier : false,
        totalPages: 0
    }),
    actions:{
        async loadProjectList(data) {
            this.loader = true
            const response = await API.get(`api/projectbid/get-by-pagination`, data)
            this.loader = false
            if( response.status == 200 ){
                this.totalPages = Math.ceil(response.data.TotalRows/data.RowNo)
                this.allprojectList = response.data.Pagination            }
        }, 
        async loadProjectSupplierList(id) {
            this.projectSupplier = true
            const response = await API.get(`api/projectbid/supplier-modal?RegD_id=${id}`)
            this.projectSupplier = false
            if( response.status == 200 ){
                this.SupplierData = response.data
            }
        }, 
        
    }
})