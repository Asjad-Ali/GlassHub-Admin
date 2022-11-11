<template>
    <div class="col-xl-9 pd-30 bg-w">
        <div class="col-md-6">
            <h1 class="pb-2">Audit Request Details</h1>
        </div>
        <div class="col-xl-12 bg-w ">
            <ul class="topmenutabs  nav nav-tabs nav-line-tabs mb-5 fs-6">
                <li @click="loadAuditTabList(tab.value)" v-for="(tab,index) in tabsName" :key="index" class="nav-item">
                    <a class="nav-link cursor-pointer" :class="{'activeTab': activeTab == tab.value }"><h5> {{ tab.name }} </h5></a>
                </li>
            </ul>
        </div>
        <div class="row mb-2">
            <div class="col-md-6">
                <div class="d-flex">
                    <label for="row#" class="me-2 mt-4">Enter Row</label>
                    <input v-on:keyup.enter="searchAuditDetailListing" v-model="data.RowNo" type="text" class="form-control form-control-lg form-control-solid w-25" name="row#" placeholder="Row#" />
                    <button @click="searchAuditDetailListing"  class="btn btn-sm btn-primary mx-2" > Get </button>
                    <button @click="createPDF" class="btn btn-sm btn-primary mx-2" > Get PDF </button>
                </div>
            </div>
            <div class="col-md-6">
                <div class="position-relative">
                    <span  class="svg-icon svg-icon-1 svg-icon-primary position-absolute top-50 translate-middle ms-9">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <rect opacity="0.5" x="17.0365" y="15.1223" width="8.15546" height="2" rx="1" transform="rotate(45 17.0365 15.1223)" fill="black" />
                            <path d="M11 19C6.55556 19 3 15.4444 3 11C3 6.55556 6.55556 3 11 3C15.4444 3 19 6.55556 19 11C19 15.4444 15.4444 19 11 19ZM11 5C7.53333 5 5 7.53333 5 11C5 14.4667 7.53333 17 11 17C14.4667 17 17 14.4667 17 11C17 7.53333 14.4667 5 11 5Z" fill="black" />
                        </svg>
                    </span>
                    <div class="d-flex">
                        <input  v-on:keyup.enter="searchAuditDetailListing" v-model="data.search" type="text" class="form-control form-control-lg form-control-solid ps-14" name="search" placeholder="Search" />
                        <button @click="searchAuditDetailListing"  class="btn btn-sm btn-primary ms-2" >Search</button>
                    </div>                 
                </div>
            </div>
        </div>
        <PageLoader v-if="store.loader" />
        <div v-else-if="store.auditDetailListing?.length" class="tab-content" id="myTabContent">
            <div v-if="activeTab == 'null' || activeTab == 0 " id="printTable" >
                <div class="table-responsive">
                    <table  class="table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4">
                        <thead>
                            <tr class="fw-bolder text-muted">
                                <th class="fw-bolder text-gray-800">CODE</th>
                                <th class="fw-bolder text-gray-800">Date</th>
                                <th class="fw-bolder text-gray-800">Customer Name</th>
                                <th class="fw-bolder text-gray-800">Type</th>
                                <th class="fw-bolder text-gray-800">Audit For</th>
                                <th class="fw-bolder text-gray-800">Compliance</th>
                                <th class="fw-bolder text-gray-800">Audit As</th>
                                <th class="fw-bolder text-gray-800">RFQ</th>
                                <th class="fw-bolder text-gray-800">RFQ Status</th>
                                <th class="fw-bolder text-gray-800">Quotation</th>
                                <th class="fw-bolder text-gray-800">Quotation Status</th>
                                <th class="fw-bolder text-gray-800">Audit PO</th>
                                <th class="fw-bolder text-gray-800">PO Status</th>
                                <th class="fw-bolder text-gray-800">Payment</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(audit,index) in store.auditDetailListing" :key="index">
                                <td>{{ audit.aud_req_code }}</td>
                                <td>{{ audit.start_date?.substring(0,10) }}</td>
                                <td>
                                    <div class="d-flex align-items-center">
                                        <div @click="profileview(  audit.RegD_id_frm )"  class="d-flex justify-content-start flex-column">
                                            <span class="text-primary cursor-pointer fw-bold  d-block fs-7 "  @click="ShowprofileModel()"> {{ audit.RegD_name_frm  }}</span>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    Supplier
                                </td>
                                <td>
                                    <span> {{ audit.Requested_type_name }} </span>
                                </td>
                                <td>
                                    <a href="#" @click="ViewComplianceFun" >View Compliance</a>
                                </td>
                                <td>
                                    <div class="d-flex align-items-center">
                                        <div @click="profileview(  audit.RegD_id_to )"  class="d-flex justify-content-start flex-column">
                                            <span class="text-primary cursor-pointer fw-bold  d-block fs-7 "  @click="ShowprofileModel()"> {{ audit.RegD_name_to  }}</span>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <span @click="ViewAuditRFQ(audit.aud_RFQ_id)" class="btn btn-outline btn-outline-dashed btn-outline-default me-2 mb-2" >RFQ</span>
                                </td>
                                <td>
                                    <span class="badge badge-primary cursor_pointer"> {{ audit.RFQ_status_name }} </span>
                                </td>
                                <td>
                                    <span v-if="audit.aud_Qutation_id" @click="openViewQuotationModel(audit.aud_Qutation_id)" class="btn btn-outline btn-outline-dashed btn-outline-default me-2 mb-2"  >Quotation</span>
                                </td>
                                <td>
                                    <span class="badge badge-primary cursor_pointer"> {{ audit.Qutation_status_name }} </span>
                                </td>
                                <td>
                                    <span v-if="audit.aud_PO_id" @click="Show_audit_po_view_Model(audit.aud_PO_id)" class="btn btn-outline btn-outline-dashed btn-outline-default me-2 mb-2" >PO</span>
                                </td>
                                <td>
                                    <span class="badge badge-primary cursor_pointer"> {{ audit.PO_status_name }} </span>
                                </td>
                                <td>
                                    <span @click="Show_payment__list_Model(audit.aud_req_id)" class="btn btn-outline btn-outline-dashed btn-outline-default me-2 mb-2">Payments</span>
                                </td>
                            </tr>
                        </tbody>

                    </table>
                </div>
            </div>
            <div v-else  id="printTable" >
                <div class="table-responsive">
                    <!--begin::Table-->
                    <table class="table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4">
                        <thead>
                            <tr class="fw-bolder text-muted">
                                <th class="fw-bolder text-gray-800">CODE</th>
                                <th class="fw-bolder text-gray-800">Date</th>
                                <th class="fw-bolder text-gray-800">Customer Name</th>
                                <th class="fw-bolder text-gray-800">Type</th>
                                <th class="fw-bolder text-gray-800">Audit Progress</th>
                                <th class="fw-bolder text-gray-800">Compliance Criteria</th>
                                <th class="fw-bolder text-gray-800">Audit Status</th>
                                <th class="fw-bolder text-gray-800">Rating</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(audit,index) in store.auditDetailListing" :key="index">
                                <td>{{ audit.aud_req_code }}</td>
                                <td>{{ audit.start_date?.substring(0,10) }}</td>
                                <td>
                                    <div class="d-flex align-items-center">
                                        <div @click="profileview(  audit.RegD_id_frm )"  class="d-flex justify-content-start flex-column">
                                            <span class="text-primary cursor-pointer fw-bold  d-block fs-7 "  @click="ShowprofileModel()"> {{ audit.RegD_name_frm  }}</span>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    Supplier
                                </td>
                                <td>
                                    <div class="align-items-center w-200px w-sm-300px flex-column mt-3">
                                        <div class="d-flex justify-content-between w-100 mt-auto mb-2">
                                            <span class="fw-bold fs-6 text-gray-400">Compleation Percentage</span>
                                            <span class="fw-bolder fs-6">50%</span><br>
                                        </div>
                                        <div class="h-5px w-100 bg-light mb-3 ml-0">
                                            <div class="bg-success rounded h-5px" role="progressbar" style="width: 50%;" aria-valuenow="50" aria-valuemin="0" aria-valuemax="50"></div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <router-link to="/audit-Request/comp-criteria" >View Details</router-link>
                                </td>
                                <td>
                                    <span class="badge badge-primary cursor_pointer"> {{ audit.audit_status_name }} </span>
                                </td>
                                <td data-bs-toggle="modal" data-bs-target="#rating_view">
                                    <i class="fa fa-star text-warning"></i>
                                    <i class="fa fa-star text-warning"></i>
                                    <i class="fa fa-star text-warning"></i>
                                    <i class="fa fa-star text-warning"></i>
                                    <i class="fa fa-star"></i>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        <RecordNotAvailable v-else />
        <teleport to="body">
            <AuditRFQView  v-if="openViewAuditRFQModel"  @closeViewAuditRFQModel="closeViewAuditRFQModel" />
            <ViewCompliance  v-if="openViewComplianceModel"  @closeViewComplianceModel="closeViewComplianceModel" />
            <ViewAuditQuotationModal  v-if="open_quotation_model"  @closeViewQuotationModel="closeViewQuotationModel" />
            <ProfileModal :profileData="regStore.ProfileView" v-if="open_profile_model"  @closeprofileModel="closeprofileModel" />
            <AuditPOView  v-if="open_audit_po_model"  @Close_audit_po_view_Model="Close_audit_po_view_Model" />
            <AuditPaymentList  v-if="open_payment_list"  @closePaymentsList="closePaymentsList" /> 
        </teleport>
    </div>

</template>

<script setup>
import { useAuditRequestStore } from "@/store/audit.store";
import { computed, onMounted, ref } from "@vue/runtime-core";
import PageLoader from "@/components/Global/PageLoader.vue";
import RecordNotAvailable from "@/components/Global/RecordNotAvailable.vue";
import ProfileModal from '@/components/Modal/ProfileModal.vue';
import AuditRFQView from '@/components/AuditRequest/Modal/AuditRFQView.vue'
import ViewCompliance from '@/components/AuditRequest/Modal/ViewCompliance.vue'
import AuditPaymentList from '@/components/AuditRequest/Modal/AuditPaymentList.vue'
import AuditPOView from '@/components/AuditRequest/Modal/AuditPOView.vue'
import ViewAuditQuotationModal from '@/components/AuditRequest/Modal/ViewAuditQuotation.vue';
import { useregistrationsStore } from "@/store/registrationsList.store";
import printPdf from '@/composables/printPdf'


const activeTab = ref("null")
const open_profile_model = ref(false)
const open_audit_po_model = ref(false)
const open_quotation_model = ref(false)
const open_payment_list = ref(false)
const openViewAuditRFQModel = ref(false)
const openViewComplianceModel = ref(false)


const tabsName = [ 
    {value: "null", name: "All"}, 
    {value: "0", name: "Audit Request"}, 
    {value: "1", name: "Audit In Process"}, 
    {value: "2", name: "Audit Cancelled"}, 
    {value: "3", name: "Audit Completed"}, 
]
const store = useAuditRequestStore()
const regStore = useregistrationsStore()
const audit = computed(() =>{
    return JSON.parse(localStorage.getItem('audit'))
})

const data = ref({
    RegD_id: 0,
    aud_RFQ_id: 0,
    PageNo: 1,
    RowNo:10,
    search: null,
    audit_status_id: null
})
function createPDF() {
    var sTable = document.getElementById('printTable').innerHTML;
    printPdf(sTable, "Audit Details List")
}
const loadAuditTabList = (tab) => {
    activeTab.value = tab
    data.value.audit_status_id = tab
    data.value.PageNo = 1
    data.value.search = null
    loadAuditDetailListing()
}
const searchAuditDetailListing = () => {
    if(data.value.search == ''){
        data.value.search = null
    }    
    data.value.PageNo = 1
    loadAuditDetailListing()
}

// open profile model
const profileview = (RegDId) => {
    open_profile_model.value = true
    regStore.loadProfileView(RegDId);
};
const closeprofileModel =(event)=>{
    open_profile_model.value=event
}

// Audit rfq view
const ViewAuditRFQ = (aud_RFQ_id) => {
    store.loadAuditRFQ(aud_RFQ_id)
    openViewAuditRFQModel.value = true
}

const closeViewAuditRFQModel =(event)=>{
    openViewAuditRFQModel.value=event
}
// Audit compliance
const ViewComplianceFun = () => {
    openViewComplianceModel.value = true
}

const closeViewComplianceModel =(event)=>{
    openViewComplianceModel.value=event
}

//  open quotation view
const openViewQuotationModel = (qo_id) => {
store.loadAuditQuotation(qo_id)
open_quotation_model.value = true
}

const closeViewQuotationModel =(event)=>{
open_quotation_model.value=event
}

// po view 
const Show_audit_po_view_Model = (po_id) => {
    store.loadAuditPO(po_id)
    open_audit_po_model.value = true
}

const Close_audit_po_view_Model =(event)=>{
    open_audit_po_model.value=event
}

// Payments View
const Show_payment__list_Model = (aud_req_id) => {
    store.loadAuditPaymentList(aud_req_id)
    open_payment_list.value = true
}

const closePaymentsList =(event)=>{
    open_payment_list.value=event
}

const loadAuditDetailListing = () =>{
    data.value.RegD_id =  audit.value.RegD_id_frm,
    data.value.aud_RFQ_id = audit.value.Aud_RFQ_id,
    store.loadAuditDetailsList(data.value)
}

onMounted(() => {
    loadAuditDetailListing()
})
</script>
