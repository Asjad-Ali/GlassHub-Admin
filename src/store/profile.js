import { defineStore } from 'pinia'
import API from '@/services/API'
import useToast from '@/composables/useToast.js'
import axios from 'axios'
export const profileStore = defineStore('profile',{
    state:()=>({
        profileDetail:[],
    }),

    actions:{
      async getProfile(payload){
        const response = await  API.get('api/profile/profile-by-id?User_id='+ payload)
        if(response.status==200){
          this.profileDetail = response.data
        }else{
            useToast(response)
        }
      },
    async updateProfile (payload){
      const apiBaseURL = process.env.VUE_APP_BASE_URL ;
      const response = await  axios.post(`${apiBaseURL}api/profile/update-user-profile`, payload)
      if(response.status==200){
        useToast(response,'success')
      }else{
          useToast(response)
      }
    }
    }
})