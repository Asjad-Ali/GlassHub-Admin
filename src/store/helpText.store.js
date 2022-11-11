import { defineStore } from 'pinia'
import API from '@/services/API'
import useToast from '@/composables/useToast.js'

export const useHelpTextStore = defineStore('helpText',{
    state: () => ({
        menuList:[],
        sectionList:[],
        fieldList:[],
        helpTextList: [],
        btnLoading:'',
        totalPages: 0,
        loader: false
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
        async insertHelpText(data){
            this.btnLoading = true
            const response = await API.post("api/HelpingTool/InsertUpdate",data)
            this.btnLoading = false
            if(response.status == 200){
                useToast("Data added Successfully",'success');
                this.helpTextList.push(response.data)
                this.sectionList.push({H_type: response.data.H_type})
                console.log(response)
            }else {                
                console.log("response",response)
                useToast(response);
            }
            return response
        },
        async loadHelpTextList(data){
            this.btnLoading = true
            const response = await API.get(`api/HelpingTool/GetList/${data.Search}/${data.PageNo}/${data.RowNo}`)
            this.btnLoading = false
            if(response.status == 200){
                this.totalPages = Math.ceil(response.data.TotalRows/data.RowNo)
                this.helpTextList = response.data.Pagination
            }
        },
        async loadHelpTextSectionList(){
            if(this.sectionList.length) return
            const response = await API.get(`api/HelpingTool/GetSectionList`)
            if(response.status == 200){
                this.sectionList = response.data
            }
        },
        async loadHelpTextFieldList(){
            if(this.sectionList.length) return
            const response = await API.get(`api/HelpingTool/GetFieldList`)
            if(response.status == 200){
                this.fieldList = response.data
            }
        },
        async deleteHelpText(id){
            this.loader = true
            const response = await API.delete(`api/HelpingTool/Delete/${id}`)
            this.loader = false
            if(response.status == 200){
                useToast("Data Deleted Successfully",'success');
                this.helpTextList = this.helpTextList.filter(issue => issue.H_id != id)
            }else{
                useToast(response);
            }
        }
    }
})