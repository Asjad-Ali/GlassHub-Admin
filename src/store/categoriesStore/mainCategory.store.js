import { defineStore } from 'pinia'
import useToast from '@/composables/useToast.js'
import API from '@/services/API'

export const useMainCategoryStore = defineStore('mainCategoryStore',{
    state: () => ({
        mainCategoryList: [],
        subCategory: [],
        subCategory1: [],
        subCategory2: [],
        subCategory3: [],
        subCategory4: [],
        subCategory5: [],
        subCategory6: [],

        btnLoader: false,
        mainCategoryLoader: false,
        subCatLoader: false,
        subCat1Loader: false,
        subCat2Loader: false,
        subCat3Loader: false,
        subCat4Loader: false,
        subCat5Loader: false,
        subCat6Loader: false,

    }),
    
    actions:{
                    // Mian category functions    
        async loadCategory(){
            this.mainCategoryLoader = true
            const response = await API.get('api/categories/GetFullList')
            this.mainCategoryLoader = false
            if(response.status == 200) {
                this.mainCategoryList = response.data
                this.subCategory = [],
                this.subCategory1 = [],
                this.subCategory2 = [],
                this.subCategory3 = [],
                this.subCategory4 = [],
                this.subCategory5 = [],
                this.subCategory6 = [],
                this.subCatLoader = false,
                this.subCat1Loader = false,
                this.subCat2Loader = false,
                this.subCat3Loader = false,
                this.subCat4Loader = false,
                this.subCat5Loader = false,
                this.subCat6Loader = false
            }
        },
        async insertUpdateMainCategory(data, update = false){
            this.btnLoader = true
            const response = await API.post("api/categories/InsertUpdate",data)
            this.btnLoader = false
            if(response.status == 200){
                if(update){
                    useToast("Category Updated Successfully",'success');
                    const Index =  this.mainCategoryList.findIndex( (cat) => cat.Cat_id === response.data.Cat_id)
                      if (Index !== -1){
                          this.mainCategoryList[Index] = response.data
                      }
                }else{
                    useToast("Category Added Successfully",'success');
                    this.mainCategoryList.push(response.data)
                } 
            }
            else{
                useToast(response);

            }
        },
        async deleteMainCategory (id) {
            const response = await API.delete( `api/categories/Delete/${id}`)
            if( response.status == 200 ){
                this.mainCategoryList = this.mainCategoryList.filter( cat => cat.Cat_id != id )
                useToast("Category Deleted Successfully",'success');
            }else if(response.status == 504 ){
                useToast("Delete Failure, It's Parent Category");
            }else{
                useToast(response);
            }
        },

                    //  Sub category functions    get by id

        async loadSubCategories(id){
            this.subCatLoader = true
            const response = await API.get(`api/SubCategories/GetByParent/${id}`)
            this.subCatLoader = false
            if(response.status == 200){
                console.log("sub category",response.data)
                this.subCategory = response.data
                this.subCategory1 = [],
                this.subCategory2 = [],
                this.subCategory3 = [],
                this.subCategory4 = [],
                this.subCategory5 = [],
                this.subCategory6 = [],
                this.subCat1Loader = false,
                this.subCat2Loader = false,
                this.subCat3Loader = false,
                this.subCat4Loader = false,
                this.subCat5Loader = false,
                this.subCat6Loader = false
            }
        },

        async loadSubCategory1(id){
            this.subCat1Loader = true
            const response = await API.get(`api/SubCategories1/GetByParent/${id}`)
            this.subCat1Loader = false
            if(response.status == 200){
                this.subCategory1 = response.data
                this.subCategory2 = [],
                this.subCategory3 = [],
                this.subCategory4 = [],
                this.subCategory5 = [],
                this.subCategory6 = [],
                this.subCat2Loader = false,
                this.subCat3Loader = false,
                this.subCat4Loader = false,
                this.subCat5Loader = false,
                this.subCat6Loader = false
            }
        },

        async loadSubCategory2(id){
            this.subCat2Loader = true
            const response = await API.get(`api/SubCategories2/GetByParent/${id}`)
            this.subCat2Loader = false
            if(response.status == 200){
                this.subCategory2 = response.data
                this.subCategory3 = [],
                this.subCategory4 = [],
                this.subCategory5 = [],
                this.subCategory6 = [],
                this.subCat3Loader = false,
                this.subCat4Loader = false,
                this.subCat5Loader = false,
                this.subCat6Loader = false
            }
        },

        async loadSubCategory3(id){
            this.subCat3Loader = true
            const response = await API.get(`api/SubCategories3/GetByParent/${id}`)
            this.subCat3Loader = false
            if(response.status == 200){
                this.subCategory3 = response.data
                this.subCategory4 = [],
                this.subCategory5 = [],
                this.subCategory6 = [],
                this.subCat4Loader = false,
                this.subCat5Loader = false,
                this.subCat6Loader = false
            }
        },

        async loadSubCategory4(id){
            this.subCat4Loader = true
            const response = await API.get(`api/SubCategories4/GetByParent/${id}`)
            this.subCat4Loader = false
            if(response.status == 200){
                this.subCategory4 = response.data
                this.subCategory5 = [],
                this.subCategory6 = [],
                this.subCat5Loader = false,
                this.subCat6Loader = false
            }
        },

        async loadSubCategory5(id){
            this.subCat5Loader = true
            const response = await API.get(`api/SubCategories5/GetByParent/${id}`)
            this.subCat5Loader = false
            if(response.status == 200){
                this.subCategory5 = response.data
                this.subCategory6 = [],
                this.subCat6Loader = false
            }
        },
        async loadSubCategory6(id){
            this.subCat6Loader = true
            const response = await API.get(`api/SubCategories6/GetByParent/${id}`)
            this.subCat6Loader = false
            if(response.status == 200){
                this.subCategory6 = response.data
            }
        },

    }
})