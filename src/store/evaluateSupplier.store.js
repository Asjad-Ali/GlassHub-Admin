import { defineStore } from 'pinia'
import API from '@/services/API'
import useToast from '@/composables/useToast.js'

export const useEvaluateSupplierStore = defineStore('evaluateSupplierStore',{
    state: () => ({
        allEvaluationList : [],
        loader : false,
        totalPages: 0,
        btnLoader : false,
        editEvaluationList:{}
    }),
    actions:{
        async loadEvaluationList(data) {
                this.loader = true
                const response = await API.get("api/evaluatesupplier/get-by-pagination",data)
                this.loader = false
                if( response.status == 200 ){
                    this.totalPages = Math.ceil(response.data.TotalRows/data.RowNo)
                    this.allEvaluationList = response.data.Pagination
                }
        },
        async insertEvaluationList(data) {
            this.btnLoader = true
            const response = await API.post("api/evaluatesupplier/InsertUpdate",data)
            this.btnLoader = false
            if ( response.status == 200 ){
                useToast("Evaluate Data Added Successfully",'success')
            } else {
                useToast(response);
            }
            return response
        },

        async deleteEvaluate(id) {
            const response = await API.delete( `api/evaluatesupplier/delete?Evaluate_Supplier_id=${id}`)
            if( response.status == 200 ){
                this.allEvaluationList = this.allEvaluationList.filter(obj => obj.Evaluate_Supplier_id != id )
                useToast("Evaluate Data Deleted Successfully",'success')
            }else{
                useToast(response);
            }
        },


        async EditEvaluate(id) {
            const response = await API.get( `api/evaluatesupplier/get-by-id?Evaluate_Supplier_id=${id}`)
            if( response.status == 200 ){
               this.editEvaluationList = response.data
            }else{
                useToast(response);
            }
        }
    }
})