import { defineStore } from 'pinia'
import API from '@/services/API'
import useToast from '@/composables/useToast.js'

export const useAuditRequestStore = defineStore('auditRequest',{
    state:() =>({
        totalPages: 0,
        loader: false,
        rfqViewLoader: false,
        quotationLoader: false,
        poLoader: false,
        paymentLoader: false,
        auditRFQ:[],
        auditListing:[],
        qoDetails:[],
        poDetails:[],
        auditPaymentList:[],
        auditDetailListing:[]
    }),
    actions:{
        async loadAuditRequestList(data){
            this.loader = true
            const response = await API.get("api/audit/admin-audit-list",data)
            this.loader = false
            if(response.status == 200 ){
                this.totalPages = Math.ceil(response.data.TotalRows/data.RowNo)
                this.auditListing = response.data.Pagination
            }
        },
        async loadAuditDetailsList(data){
            this.loader = true
            const response = await API.get("api/audit/audit-detail-list",data)
            this.loader = false
            if(response.status == 200 ){
                this.totalPages = Math.ceil(response.data.TotalRows/data.RowNo)
                this.auditDetailListing = response.data.Pagination
            }
        },
        async loadAuditRFQ(rfq_id){
            this.rfqViewLoader = true
            const response = await API.get(`api/audit/view-rfq?Aud_RFQ_id=${rfq_id}`)
            this.rfqViewLoader = false
            if(response.status == 200){
                this.auditRFQ =  response.data   
            }else(
                this.auditRFQ =  [],
                useToast(response)
            )
            return response
        },
        async loadAuditQuotation(qo_id){
            this.quotationLoader = true
            const response = await API.get(`api/audit/view-qutation?aud_qutation_id=${qo_id}`)
            this.quotationLoader = false
            if(response.status == 200){
                this.qoDetails =  response.data   
            }else(
                this.qoDetails =  [],
                useToast(response)        
            )
            return response
        },
        async loadAuditPO(po_id){
            this.poLoader = true
            const response = await API.get(`api/audit/view-po?aud_PO_id=${po_id}`)
            this.poLoader = false
            if(response.status == 200){
                this.poDetails =  response.data   
            }else(
                this.poDetails =  [],
                useToast(response)        
            )
            return response
        },
        async loadAuditPaymentList(aud_req_id){
            this.paymentLoader = true
            const response = await API.get(`api/audit/payment-list?aud_req_id=${aud_req_id}`)
            this.paymentLoader = false
            if( response.status == 200 ){
                this.auditPaymentList = response.data
            }
        },
        async auditPaymentConfirmation(data){
            const response = await API.post("api/audit/pay-confirm",data)
            if( response.status == 200 ){
                useToast("Status Changed Successfully",'success')
            }else{
                useToast(response)   
            }
        },
    }
})