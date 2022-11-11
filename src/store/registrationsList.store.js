import API from '@/services/API'
import { defineStore } from 'pinia'
// import useToast from '@/composables/useToast.js'

export const useregistrationsStore = defineStore('registrationstore',{
    state: () => ({
        registrationsList : [],
        RegisteredList: [],
        ProfileView:{},
        totalPages: 0,
        loader : false,
        regListLoader : false,
        profileLoader : false,
        
    }),

    actions:{
        async loadRegistrationListing(data){
            this.loader = true
            const response = await API.get("api/registration/get-by-pagination",data)
            this.loader = false
            if(response.status == 200 ){
                this.totalPages = Math.ceil(response.data.TotalRows/data.RowNo)
                this.registrationsList = response.data.Pagination              
            }
        },

      
        async loadRegisteredList(data) {
            this.regListLoader = true
            const response = await API.get("api/registration/get-total-reglist",data)
            this.regListLoader = false
            if( response.status == 200 ){
                this.RegisteredList = response.data
            }
        }, 

        
        async loadProfileView(RegD_id) {
            this.profileLoader = true
            const response = await API.get(`api/RegistrationSetting/getEditComp/${RegD_id}`)
            this.profileLoader = false
            if(response.status == 200){
              this.ProfileView = response.data
              console.log("data",response.data)
            }
        },

        // async loadRegisteredList(id) {
        //     const response = await API.get(`api/registration/get-registerd/?RegD_id=${id}`)
        //     if( response.status == 200 ){
        //         this.RegisteredList = response.data
        //     }
        // }, 
    }

})