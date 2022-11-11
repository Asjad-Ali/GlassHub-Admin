import API from '@/services/API'
import { defineStore } from 'pinia'
import useToast from '@/composables/useToast.js'

export const useAdminListingStore = defineStore('adminListing',{
    state: () => ({
        adminListing : [],
        loader : false,
        totalPages: 0,
        statusLoader: ''
    }),

    actions:{
        async loadAdminListing(data){
            this.loader = true
            const response = await API.get("api/adminlisting/get-by-pagination?",data)
            this.loader = false
            if(response.status == 200 ){
                this.totalPages = Math.ceil(response.data.TotalRows/data.RowNo)
                this.adminListing = response.data.Pagination            
            }
        },
        async updateAccountStatus(data){
            const response = await API.post("api/Signup/UpdateAction",data)
            if(response.status == 200 ){
                useToast("Status Updated Successfully",'success');
            }else{
                useToast(response);
            }
        }
    }

})