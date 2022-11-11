import API from '@/services/API'
import { defineStore } from 'pinia'
import useToast from '@/composables/useToast.js'

export const useadminUsersStore = defineStore('adminUsers',{
    state: () => ({
        alladminUsersList : [],
        loader : false,
        totalPages: 0,
        btnLoading: false,
        
    }),

    actions:{
        async loadAdminUsers(data){
            this.loader = true
            const response = await API.get("api/adminlisting/get-adminlist-pagination",data)
            this.loader = false
            if(response.status == 200 ){
                this.totalPages = Math.ceil(response.data.TotalRows/data.RowNo)
                this.alladminUsersList = response.data.Pagination            
            }
        },

        async updateIsactive(data){
            const response = await API.post("api/adminlisting/chnge-adminuser-status",data)
            if(response.status == 200 ){
                useToast("Status Updated Successfully",'success');
            }else{
                useToast(response);
            }
        },

        async deleteComplianceList(id) {
            const response = await API.delete( `api/users/users-Delete?User_id=${id}`)
            if( response.status == 200 ){
                this.alladminUsersList = this.alladminUsersList.filter(obj => obj.User_id != id )
                useToast(" Data Deleted Successfully",'success')
            }else{
                useToast(response)
            }
        },

        async insertAdminUsers(data){
            this.btnLoading = true
            const response = await API.post("api/users/admin-InsertUpdate",data)
            this.btnLoading = false
            console.log(response)
            if( response.status == 200 ){
                useToast("Data added Successfully",'success');
            }else{
                useToast(response);
            }
            return response
        },
    }

})