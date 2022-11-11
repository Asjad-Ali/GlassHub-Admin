import { defineStore } from 'pinia'
import useToast from '@/composables/useToast.js'
import API from '@/services/API'

export const useSubCategory4Store = defineStore('subCategory4Store',{
    state: () => ({
        subCategory4List: [],
        btnLoader: false,
        loader: false
    }),
    actions:{
        async loadSubCategory4List(){
            if(this.subCategory4List.length) return
            this.loader = true
            const response = await API.get('api/SubCategories4/GetFullList')
            this.loader = false
            if(response.status == 200) {
                this.subCategory4List = response.data
            }
        },
        async insertUpdateSubCategory4(data, update = false){
            this.btnLoader = true
            const response = await API.post("api/SubCategories4/InsertUpdate",data)
            this.btnLoader = false
            if(response.status == 200){
                if(update){
                    useToast("Sub Category4 Updated Successfully",'success');
                    const Index =  this.subCategory4List.findIndex( (cat) => cat.Scat4_id === response.data.Scat4_id)
                      if (Index !== -1){
                          this.subCategory4List[Index] = response.data
                      }
                }else{
                    useToast("Sub Category4 Added Successfully",'success');
                    this.subCategory4List.push(response.data)
                } 
            }
            else{
                useToast(response);
            }
            return response
        },
        async deleteSubCategory4 (id) {
            const response = await API.delete( `api/SubCategories4/Delete/${id}`)
            if( response.status == 200 ){
                this.subCategory4List = this.subCategory4List.filter( cat => cat.Scat4_id != id )
                useToast("Sub Category4 Deleted Successfully",'success');
            }else{
                useToast(response);
            }
            return response
        },

    }
})