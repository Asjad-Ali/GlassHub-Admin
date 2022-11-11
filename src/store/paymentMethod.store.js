import API from '@/services/API'
import { defineStore } from 'pinia'
import useToast from '@/composables/useToast.js'

export const usePaymentMethodsStore = defineStore('payment-methods',{
    state: () => ({
        totalPages:0,
        allPaymentMethodsList: [],
        loader: false,
        btnLoader: false
    }),

    actions:{
        async loadPaymentMethodsList(data){
            this.loader = true
            const response = await API.get(`api/payment_method/GetList/${data.Search}/${data.PageNo}/${data.RowNo}`)
            this.loader = false
            if(response.status == 200 ){
                this.totalPages = Math.ceil(response.data.TotalRows/data.RowNo)
                this.allPaymentMethodsList = response.data.Pagination            
            }
        },
        async insertPaymentMethods(data){
            this.btnLoader = true
            const response = await API.post("api/payment_method/InsertUpdate",data)
            this.btnLoader = false
            if(response.status == 200 ){
                useToast("Payment Method Add","success")
            }else{
                useToast(response)
            }
            return response
        },
        async deletePaymentMethodsList(id){
            const response = await API.delete(`api/payment_method/Delete/${id}`)
            if(response.status == 200 ){
                this.allPaymentMethodsList = this.allPaymentMethodsList.filter(pay => pay.Pay_id != id)
                useToast("Payment Method Add","success")
            }else{
                useToast(response)
            }
            return response
        },

    }

})