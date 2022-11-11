import { defineStore } from 'pinia'
import useToast from '@/composables/useToast.js'

import API from '@/services/API'

export const useSignupsStore = defineStore('signups', {
  state: () => ({
      loader:false,
      btnLoader:false,
      allSignupsList:[],
      signupSetting: [],
    //   settingM : [],
    //   settingD : [],
      totalPages: 0,
  }),
  actions: {
      async loadSignupsList(data){
          this.loader = true
          const response = await API.get(`api/adminlisting/get-by-pagination`,data)
          this.loader = false
          if(response.status == 200){
              this.totalPages = Math.ceil(response.data.TotalRows/data.RowNo)
              this.allSignupsList = response.data.Pagination  
          }
      },
      
      async insertSignupSetting(data){
        this.btnLoader = true
        const response = await API.post("api/RegistrationSetting/InsertUpdateSetting",data)
        this.btnLoader = false
        if(response.status == 200){
            useToast("Setting Updated Successfully",'success');
        }else{
            useToast(response);
        }
        return response
      }
  }
})
