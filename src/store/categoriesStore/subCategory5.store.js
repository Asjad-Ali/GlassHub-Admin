import { defineStore } from 'pinia'
import useToast from '@/composables/useToast.js'
import API from '@/services/API'

export const useSubCategory5Store = defineStore('subCategory5Store',{
    state: () => ({
        subCategory5List: [],
        btnLoader: false,
        loader: false
    }),
    actions:{
        async loadSubCategory5List(){
            if(this.subCategory5List.length) return
            this.loader = true
            const response = await API.get('api/SubCategories5/GetFullList')
            this.loader = false
            if(response.status == 200) {
                this.subCategory5List = response.data
            }
        },
        async insertUpdateSubCategory5(data, update = false){
            this.btnLoader = true
            const response = await API.post("api/SubCategories5/InsertUpdate",data)
            this.btnLoader = false
            if(response.status == 200){
                if(update){
                    useToast("Sub Category5 Updated Successfully",'success');
                    const Index =  this.subCategory5List.findIndex( (cat) => cat.Scat5_id === response.data.Scat5_id)
                      if (Index !== -1){
                          this.subCategory5List[Index] = response.data
                      }
                }else{
                    useToast("Sub Category5 Added Successfully",'success');
                    this.subCategory5List.push(response.data)
                } 
            }
            else{
                useToast(response);
            }
            return response
        },
        async deleteSubCategory5 (id) {
            const response = await API.delete( `api/SubCategories5/Delete/${id}`)
            if( response.status == 200 ){
                this.subCategory5List = this.subCategory5List.filter( cat => cat.Scat5_id != id )
                useToast("Sub Category5 Deleted Successfully",'success');
            }else{
                useToast(response);
            }
            return response
        },

    }
})