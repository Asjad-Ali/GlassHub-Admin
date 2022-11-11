import { defineStore } from 'pinia'
import API from '@/services/API'
import useToast from '@/composables/useToast.js'

export const useLegalPagesStore = defineStore('legalPages',{
    state:() =>({
        btnLoading: false,
        totalPages: 0,
        loader: true,
        existingData: [],
        legalPagesList:[]
    }),
    actions:{
        async insertLegalPages(data){
            this.btnLoading = true
            const response = await API.post("api/legalpages/InsertUpdate",data)
            this.btnLoading = false
            if( response.status == 200 ){
                useToast("Data added Successfully",'success');
            }else{
                useToast(response);
            }
            return response
        },
        async loadLegalPageList(data){
            this.loader = true
            const response = await API.get("api/legalpages/get-by-pagination",data)
            this.loader = false
            if(response.status == 200 ){
                this.totalPages = Math.ceil(response.data.TotalRows/data.RowNo)
                this.legalPagesList = response.data.Pagination
            }
        },
        async loadExistingLegalPage(p_id, p_name){
            const response = await API.get(`api/legalpages/last-definedpages?Account_id=${p_id}&Page_Name=${p_name}`)
            if(response.status == 200 ){
                this.existingData = response.data
            }
            return response
        },
        async deleteLegalPage(id){
            const response = await API.delete(`api/legalpages/delete?Legal_id=${id}`)
            if(response.status == 200){
                useToast("Data Deleted Successfully",'success');
                this.legalPagesList = this.legalPagesList.filter(issue => issue.Legal_id != id)
            }else{
                useToast(response);
            }
        }
    }
})