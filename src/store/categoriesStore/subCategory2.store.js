import { defineStore } from 'pinia'
import useToast from '@/composables/useToast.js'
import API from '@/services/API'

export const useSubCategory2Store = defineStore('subCategory2Store',{
    state: () => ({
        subCategory2List: [],
        btnLoader: false,
        loader: false
    }),
    actions:{
        async loadSubCategory2List(){
            if(this.subCategory2List.length) return
            this.loader = true
            const response = await API.get('api/SubCategories2/GetFullList')
            this.loader = false
            if(response.status == 200) {
                this.subCategory2List = response.data
            }
        },
        async insertUpdateSubCategory2(data, update = false){
            this.btnLoader = true
            const response = await API.post("api/SubCategories2/InsertUpdate",data)
            this.btnLoader = false
            if(response.status == 200){
                if(update){
                    useToast("Sub Category2 Updated Successfully",'success');
                    const Index =  this.subCategory2List.findIndex( (cat) => cat.Scat2_id === response.data.Scat2_id)
                      if (Index !== -1){
                          this.subCategory2List[Index] = response.data
                      }
                }else{
                    useToast("Sub Category2 Added Successfully",'success');
                    this.subCategory2List.push(response.data)
                } 
            }
            else{
                useToast(response);
            }
            return response
        },
        async deleteSubCategory2 (id) {
            const response = await API.delete( `api/SubCategories2/Delete/${id}`)
            if( response.status == 200 ){
                this.subCategory2List = this.subCategory2List.filter( cat => cat.Scat2_id != id )
                useToast("Sub Category2 Deleted Successfully",'success');
            }else{
                useToast(response);
            }
            return response
        },

    }
})