import { defineStore } from 'pinia'
import useToast from '@/composables/useToast.js'
import API from '@/services/API'

export const useSubCategory6Store = defineStore('subCategory6Store',{
    state: () => ({
        subCategory6List: [],
        btnLoader: false,
        loader: false
    }),
    actions:{
        async loadSubCategory6List(){
            if(this.subCategory6List.length) return
            this.loader = true
            const response = await API.get('api/SubCategories6/GetFullList')
            this.loader = false
            if(response.status == 200) {
                this.subCategory6List = response.data
            }
        },
        async insertUpdateSubCategory6(data, update = false){
            this.btnLoader = true
            const response = await API.post("api/SubCategories6/InsertUpdate",data)
            this.btnLoader = false
            if(response.status == 200){
                if(update){
                    useToast("Sub Category6 Updated Successfully",'success');
                    const Index =  this.subCategory6List.findIndex( (cat) => cat.Scat6_id === response.data.Scat6_id)
                      if (Index !== -1){
                          this.subCategory6List[Index] = response.data
                      }
                }else{
                    useToast("Sub Category6 Added Successfully",'success');
                    this.subCategory6List.push(response.data)
                } 
            }
            else{
                useToast(response);
            }
            return response
        },
        async deleteSubCategory6 (id) {
            const response = await API.delete( `api/SubCategories6/Delete/${id}`)
            if( response.status == 200 ){
                this.subCategory6List = this.subCategory6List.filter( cat => cat.Scat6_id != id )
                useToast("Sub Category6 Deleted Successfully",'success');
            }else{
                useToast(response);
            }
            return response
        },

    }
})