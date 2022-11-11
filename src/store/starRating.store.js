
import { defineStore } from 'pinia'
import API from '@/services/API'
import useToast from '@/composables/useToast.js'

export const useStarRatingStore = defineStore('starRating',{
    state: () => ({
        starRatingsList : [],
        loader : false,
        totalPages: 1,
        btnLoader: false,
        editstarRatingsList:{}
    }),
    actions:{
        async loadStarRatingList(data) {
            this.loader = true
            const response = await API.get("api/starrating/get-by-pagination",data)
            this.loader = false
            if( response.status == 200 ){
                this.totalPages = Math.ceil(response.data.TotalRows/data.RowNo)
                this.starRatingsList = response.data.Pagination
            }
        },
        async insertUpdateStarRatingList(data) {
            this.btnLoader = true
            const response = await API.post("api/starrating/InsertUpdate",data)
            this.btnLoader = false
            if( response.status == 200 ){
                useToast("Data Inserted Successfully",'success')
            }else{
                useToast(response);
            }
            return response
        },
        async deleteStarRatingList(id) {
            const response = await API.delete(`api/starrating/delete?AdminRating_id=${id}`)
            if( response.status == 200 ){
                useToast("Data Deleted Successfully",'success')
                this.starRatingsList = this.starRatingsList.filter(obj => obj.AdminRating_id != id )
            }else{
                useToast(response);
            }
        },

        async EditStarRatingList(id) {
            const response = await API.get( `api/starrating/get-by-id?AdminRating_id=${id}`)
            if( response.status == 200 ){
               this.editstarRatingsList = response.data
            }else{
                useToast(response);
            }
        }
    }
})