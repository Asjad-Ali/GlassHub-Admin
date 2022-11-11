import { defineStore } from 'pinia'
import useToast from '@/composables/useToast.js'
import API from '@/services/API'

export const useSubCategoryStore = defineStore('subCategoryStore',{
    state: () => ({
        subCategoryList: [],
        btnLoader: false,
        loader: false
    }),
    actions:{
        async loadSubCategoryList(){
            if(this.subCategoryList.length) return
            this.loader = true
            const response = await API.get('api/SubCategories/GetFullList')
            this.loader = false
            if(response.status == 200) {
                this.subCategoryList = response.data
            }
        },
        async insertUpdateSubCategory(data, update = false){
            this.btnLoader = true
            const response = await API.post("api/SubCategories/InsertUpdate",data)
            this.btnLoader = false
            if(response.status == 200){
                if(update){
                    useToast("Sub Category Updated Successfully",'success');
                    const Index =  this.subCategoryList.findIndex( (cat) => cat.Cat_id === response.data.Cat_id)
                      if (Index !== -1){
                          this.subCategoryList[Index] = response.data
                      }
                }else{
                    useToast("Sub Category Added Successfully",'success');
                    this.subCategoryList.push(response.data)
                } 
            }
            else{
                useToast(response);
            }
            return response
        },
        async deleteSubCategory (Cat) {
            const response = await API.delete( `api/SubCategories/Delete/${Cat.Scat_id}`)
            if( response.status == 200 ){
                this.subCategoryList = this.subCategoryList.filter( cat => cat.Scat_id != Cat.Scat_id )
                useToast("Sub Category Deleted Successfully",'success');
            }else{
                useToast(response);
            }
            return response
        },

    }
})