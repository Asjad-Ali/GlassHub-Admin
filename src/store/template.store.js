import API from '@/services/API'
import { defineStore } from 'pinia'
import useToast from '@/composables/useToast.js'

export const usetemplatestore = defineStore('templatestore',{
    state: () => ({
        menuList:[],
        allTemplateList : [],
        pagenameList:[],
        loader : false,
        totalPages: 0,
        btnLoading: false,
        
    }),

    actions:{
        async loadMenuList(id){
            this.loader = true            
            const data = {
                Account_id: id
            }
            const response = await API.get("api/menue/all-list",data)
            this.loader = false 
            if(response.status == 200){
                response.data[response.data.length] = {Menue_name: "Signup"}
                console.log("pages list", response.data)
                this.menuList = response.data
            }
        },


        async loadTemplateList(data){
            this.loader = true
            const response = await API.get("api/template/get-by-pagination",data)
            this.loader = false
            if(response.status == 200 ){
                this.totalPages = Math.ceil(response.data.TotalRows/data.RowNo)
                this.allTemplateList = response.data.Pagination            
            }
        },

        async loadPageNameList(){
            this.loader = false 
            const response = await API.get(`api/template/get-pages-name`)
            if(response.status == 200){
                this.pagenameList = response.data
            }
        },       

        async deleteTemplateList(id) {
            const response = await API.delete( `api/template/delete?Template_id=${id}`)
            if( response.status == 200 ){
                this.allTemplateList = this.allTemplateList.filter(page => page.Template_id != id )
                useToast(" Data Deleted Successfully",'success')
            }else{
                useToast(response)
            }
        },

        async insertTemplate(data){
            this.btnLoading = true
            const response = await API.post("api/template/InsertUpdate",data)
            this.btnLoading = false
            console.log(response)
            if( response.status == 200 ){
                useToast("Data added Successfully",'success');
                this.allTemplateList.push(response.data)
            }else{
                useToast(response);
            }
            return response
        },
    }

})