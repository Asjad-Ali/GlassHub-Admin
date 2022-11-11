import { defineStore } from 'pinia'
import useToast from '@/composables/useToast.js'
import API from '@/services/API'
import {  ref } from "@vue/reactivity";
import axios from 'axios';
// import axios from 'axios';

export const useMainCategoryStore = defineStore('categoryStoreSignup',{
    state: () => ({
        mainCategoryList:   ref([]),
        CountryList:   ref([]),
        btnLoading: false,
        btnLoader: false,
        mainCategoryLoader: false,
        countryLoader: false,
        RegistrationSettingD :' ',      
 
    }),
     
    actions:{
                    // Mian category functions    
        async loadCategory(){
            // if(this.mainCategoryList.length) return
            this.mainCategoryLoader = true
            const response = await API.get('api/CategoriesDef/GetFullList')
            this.mainCategoryLoader = false
            if(response.status == 200) {
                this.mainCategoryList = response.data
            }
        },

        async getCountry(){
            // if(this.mainCategoryList.length) return
            this.countryLoader = true
            const response = await API.get('api/Signup/GetCountry')
            this.countryLoader = false
            if(response.status == 200) {
                this.CountryList = response.data
            }
        },

        async setEmailExist(email){
            let resp = await API.get('api/Signup/EmailExist?email='+ email)
            return resp;
          },
          async setRegistrationSetting(payload){
            let resp = await API.get('api/RegistrationSetting/GetAccountBase/'+ payload)
            this.RegistrationSettingD =resp?.data?.RegistrationSettingD
            return resp;
          },

          async SendEmail (data){
            
            await API.get(`api/Forgot_logs/templateemail/${data.RegistrationM.Email}/null/null/${data.RegistrationM.Company_name}/${data.RegistrationM.RegistrationD[0].Account_type}/Sign up Email/signup/1/${data.RegistrationM.Fullname}/${data.RegistrationM.RegistrationD[0].Account_type_name}/null/null`)
          },

        async AddSignup(data){
            this.btnLoading = true
            let formData = new FormData()
            formData.append('Company_logo',data.Company_logo)
    formData.append('auth_file_path',data.auth_file_path)
   for(let x in data.RegDocument_path)
   {
    formData.append('RegDocument_path', data.RegDocument_path[x])
   }
    for(let x in data.AddDoc_path){
    formData.append('AddDoc_path',data.AddDoc_path[x])
    }
           formData.append('data', data.data)
            const response = await axios.post('https://apis.glasshub.ai/api/Signup/Insert',formData)
            this.btnLoading = false
            if( response.status == 200 ){
                useToast("Data added Successfully",'success');
                this.SendEmail(JSON.parse(data.data))
            }else{
                useToast(response);
            }
            return response
        },

        
    }
})