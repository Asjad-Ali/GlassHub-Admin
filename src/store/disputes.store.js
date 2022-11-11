import { defineStore } from 'pinia'
import useToast from '@/composables/useToast.js'

import API from '@/services/API'

export const useDisputesStore = defineStore('disputes',{
    state:() =>({
        loader: false,
        btnLoader: false,
        adminListLoader: false,
        totalPages: 0,
        disputesList:[],
        disputeDetail: [],
        AdminUserList:{}
    }),
    actions:{

        async loadDisputesList(data){
            this.loader = true
            const response = await API.get(`api/dispute/get-by-pagination`,data)
            this.loader = false
            if(response.status == 200 ){
                this.totalPages = Math.ceil(response.data.TotalRows/data.RowNo)
                this.disputesList = response.data.Pagination
            }
        },
        async loadDisputeDetail(DID){
            this.loader = true
            const response = await API.get(`api/dispute/get-by-DID?Dispute_Code=${DID}`)
            this.loader = false
            if(response.status == 200 ){
                this.disputeDetail = response.data
            }
        },
        async loadDisputeAdminUserList(){
            this.adminListLoader = true
            const response = await API.get(`api/dispute/get-AdminUser`)
            this.adminListLoader = false
            if(response.status == 200 ){
                this.AdminUserList = response.data
            }
        },
        async updateDisputeDetail(data){
            this.btnLoader = true
            const response = await API.post("api/dispute/Updatedetail",data)
            this.btnLoader = false
            if(response.status == 200 ){
                useToast("Dispute Updated Successfully","success")
            } else {
                useToast(response);
            }
        }
    }
})