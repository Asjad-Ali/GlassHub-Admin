import { defineStore } from 'pinia'
import useToast from '@/composables/useToast.js'
import API from '../services/API'

const user = localStorage.getItem('user')


export const useAuthStore = defineStore('authStore', {
  state: () => ({
    authUser: JSON.parse( user ),
    buttonLoader:'',
    term_condition:null,
    loader: false
  }),

  actions: {
    async login(payload){
      this.buttonLoader = true
      const response = await API.post("api/User/AdminLogin",payload)
      this.buttonLoader = false
        if(response.status == 200){
          localStorage.setItem("TOKEN", response.data.token);
          localStorage.setItem("auth", response.data.auth);
          localStorage.setItem("user",JSON.stringify(response.data))
        }else{
          useToast(response.method);
        }
        return response
    },

    async FatchTerm(data){
        this.loader = true
        let response = await API.get(`api/userlegal/latest-legal?Account_id=${5}&Page_Name=${data?.page_id}`);
        this.loader = false
        if(response.status == 200){
         this.term_condition = response.data[0]?.Description;
        } else{
          useToast(response.message)
        }
  }
    // async FatchTerm(data) {
    //   try{
    //     let resp = await API.get(`api/userlegal/latest-legal?Account_id=${5}&Page_Name=${data?.page_id}`);
    //     this.term_condition=null;
    //   }catch(error){
    //     useToast(error.message)
    //   }
    
    // },
  }
})
