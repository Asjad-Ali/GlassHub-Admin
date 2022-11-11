import { defineStore } from 'pinia'
import useToast from '@/composables/useToast.js'
import API from '@/services/API'

export const useSubCategory1Store = defineStore('subCategory1Store',{
    state: () => ({
        subCategory1List: [],
        btnLoader: false,
        loader: false
    }),
    actions:{
        async loadSubCategory1List(){
            if(this.subCategory1List.length) return
            this.loader = true
            const response = await API.get('api/SubCategories1/GetFullList')
            this.loader = false
            if(response.status == 200) {
                this.subCategory1List = response.data
            }
        },
        async insertUpdateSubCategory1(data, update = false){
            this.btnLoader = true
            const response = await API.post("api/SubCategories1/InsertUpdate",data)
            this.btnLoader = false
            if(response.status == 200){
                if(update){
                    useToast("Sub Category1 Updated Successfully",'success');
                    const Index =  this.subCategory1List.findIndex( (cat) => cat.Scat1_id === response.data.Scat1_id)
                      if (Index !== -1){
                          this.subCategory1List[Index] = response.data
                      }
                }else{
                    useToast("Sub Category1 Added Successfully",'success');
                    this.subCategory1List.push(response.data)
                } 
            }
            else{
                useToast(response);
            }
            return response
        },
        async deleteSubCategory1 (id) {
            const response = await API.delete( `api/SubCategories1/Delete/${id}`)
            if( response.status == 200 ){
                this.subCategory1List = this.subCategory1List.filter( cat => cat.Scat1_id != id )
                useToast("Sub Category1 Deleted Successfully",'success');
            }else{
                useToast(response);
            }
            return response
        },

    }
})