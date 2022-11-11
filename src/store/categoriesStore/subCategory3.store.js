import { defineStore } from 'pinia'
import useToast from '@/composables/useToast.js'
import API from '@/services/API'

export const useSubCategory3Store = defineStore('subCategory3Store',{
    state: () => ({
        subCategory3List: [],
        btnLoader: false,
        loader: false
    }),
    actions:{
        async loadSubCategory3List(){
            if(this.subCategory3List.length) return
            this.loader = true
            const response = await API.get('api/SubCategories3/GetFullList')
            this.loader = false
            if(response.status == 200) {
                this.subCategory3List = response.data
            }
        },
        async insertUpdateSubCategory3(data, update = false){
            this.btnLoader = true
            const response = await API.post("api/SubCategories3/InsertUpdate",data)
            this.btnLoader = false
            if(response.status == 200){
                if(update){
                    useToast("Sub Category3 Updated Successfully",'success');
                    const Index =  this.subCategory3List.findIndex( (cat) => cat.Scat3_id === response.data.Scat3_id)
                      if (Index !== -1){
                          this.subCategory3List[Index] = response.data
                      }
                }else{
                    useToast("Sub Category3 Added Successfully",'success');
                    this.subCategory3List.push(response.data)
                } 
            }
            else{
                useToast(response);
            }
            return response
        },
        async deleteSubCategory3 (id) {
            const response = await API.delete( `api/SubCategories3/Delete/${id}`)
            if( response.status == 200 ){
                this.subCategory3List = this.subCategory3List.filter( cat => cat.Scat3_id != id )
                useToast("Sub Category3 Deleted Successfully",'success');
            }else{
                useToast(response);
            }
            return response
        },

    }
})