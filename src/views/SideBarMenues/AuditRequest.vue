<template>
    <div class="col-xl-9 pd-30 bg-w">
        <div class="col-md-6">
            <h1 class="pb-2">Audit Request</h1>
        </div>
        <div class="row mb-2">
            <div class="col-md-6">
                <div class="d-flex">
                    <label for="row#" class="me-2 mt-4">Enter Row</label>
                    <input v-on:keyup.enter="searchAuditRequestListing" v-model="data.RowNo" type="text" class="form-control form-control-lg form-control-solid w-25" name="row#" placeholder="Row#" />
                    <button @click="searchAuditRequestListing"  class="btn btn-sm btn-primary mx-2" > Get </button>
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
                        <input  v-on:keyup.enter="searchAuditRequestListing" v-model="data.Search" type="text" class="form-control form-control-lg form-control-solid ps-14" name="search" placeholder="Search" />
                        <button @click="searchAuditRequestListing"  class="btn btn-sm btn-primary ms-2" >Search</button>
                    </div>                 
                </div>
            </div>
        </div>
        <PageLoader v-if="store.loader" />  
        <div v-else-if="store.auditListing.length">
            <div id="printTable" class="table-responsive">
                <table class="table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4">
                    <thead>
                        <tr>
                            <th class="fw-bolder text-gray-800">CODE</th>
                            <th class="fw-bolder text-gray-800">Date</th>
                            <th class="fw-bolder text-gray-800">Supplier Name</th>
                            <th class="fw-bolder text-gray-800">Audit For</th>
                            <th class="fw-bolder text-gray-800">Email</th>
                            <th class="fw-bolder text-gray-800">Location</th>
                            <th class="fw-bolder text-gray-800 text-end">Detail</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(audit,index) in store.auditListing" :key="index">
                            <td><span @click="auditDetails(audit)" class="text-primary cursor-pointer">{{ audit.Aud_RFQ_code }}</span></td>
                            <td>{{ audit.start_date?.substring(0,10) }}</td>
                            <td>
                                <div class="d-flex align-items-center">
                                    <div @click="profileview(  audit.RegD_id_frm )"  class="d-flex justify-content-start flex-column">
                                        <span class="text-primary cursor-pointer fw-bold  d-block fs-7 "  @click="ShowprofileModel()"> {{ audit.Company_name  }}</span>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <span> {{ audit.Requested_type_name }} </span><br>
                            </td>
                            <td>
                                <span class="text-muted fw-bold  d-block fs-7 ">
                                    <a :href="`mailto:${  audit.Comp_email  }`" target="_blank">{{  audit.Comp_email  }} </a>
                                </span>
                            </td>
                            <td>
                                <a v-if="audit.Head_office_address" :href="`https://maps.google.com/?q=${audit.Head_office_lat},${audit.Head_office_long}`" target="_blank" class="d-flex align-items-center text-gray-600 text-hover-primary me-5 mb-2">
                                    <span class="svg-icon svg-icon-4 me-1">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                            <path opacity="0.3" d="M18.0624 15.3453L13.1624 20.7453C12.5624 21.4453 11.5624 21.4453 10.9624 20.7453L6.06242 15.3453C4.56242 13.6453 3.76242 11.4453 4.06242 8.94534C4.56242 5.34534 7.46242 2.44534 11.0624 2.04534C15.8624 1.54534 19.9624 5.24534 19.9624 9.94534C20.0624 12.0453 19.2624 13.9453 18.0624 15.3453Z" fill="black"></path>
                                            <path d="M12.0624 13.0453C13.7193 13.0453 15.0624 11.7022 15.0624 10.0453C15.0624 8.38849 13.7193 7.04535 12.0624 7.04535C10.4056 7.04535 9.06241 8.38849 9.06241 10.0453C9.06241 11.7022 10.4056 13.0453 12.0624 13.0453Z" fill="black"></path>
                                        </svg>
                                    </span>
                                    {{ audit.Head_office_address }} 
                                </a>
                            </td>
                            <td class="text-end">
                                <ul class="userslist_action_icons">
                                    <li><span @click="auditDetails(audit)"><i class="fa fa-eye cursor-pointer" aria-hidden="true"></i></span></li>
                                </ul>
                            </td>

                        </tr>

                    </tbody>

                </table>
            </div>
            <div class="col-md-12">
                <div style="display:flex ; justify-content:center; margin-top:10px">
                    <v-pagination v-if="store.totalPages >= 1"
                    v-model="data.PageNo"
                    :pages="store.totalPages"
                    :range-size="1"
                    active-color="#DCEDFF"
                    @update:modelValue="loadAuditListing"
                    />
                </div>
            </div>
        </div>
        <RecordNotAvailable v-else />
        <teleport to="body">
            <ProfileMdal :profileData="regStore.ProfileView" v-if="open_profile_model"  @closeprofileModel="closeprofileModel" />
        </teleport>
    </div>
</template>

<script setup>
import VPagination from "@hennge/vue3-pagination";
import "@hennge/vue3-pagination/dist/vue3-pagination.css";
import { onMounted, ref } from '@vue/runtime-core'
import PageLoader from '@/components/Global/PageLoader.vue';
import RecordNotAvailable from '@/components/Global/RecordNotAvailable.vue'
import ProfileMdal from '@/components/Modal/ProfileModal.vue';
import printPdf from '@/composables/printPdf'
import { useAuditRequestStore } from "@/store/audit.store";
import { useregistrationsStore } from "@/store/registrationsList.store";
import { useRouter } from "vue-router";

const router = useRouter()
const store = useAuditRequestStore()
const regStore = useregistrationsStore()


const open_profile_model = ref(false)

let data = ref({
    Search: null,
    PageNo: 1,
    RowNo: 10
})
// open profile model
const profileview = (RegDId) => {
    open_profile_model.value = true
    regStore.loadProfileView(RegDId);
};
const closeprofileModel =(event)=>{
    open_profile_model.value=event
}

const auditDetails = (audit) => {
    console.log(audit)
    localStorage.setItem('audit',JSON.stringify(audit))
    router.push({path: '/audit-Request/audit-Details'})
}

function createPDF() {
    var sTable = document.getElementById('printTable').innerHTML;
    printPdf(sTable, "Audit Request List")
}
const loadAuditListing = () => {
    store.loadAuditRequestList(data.value)
}	

const searchAuditRequestListing = () => {
    if(data.value.Search == ''){
        data.value.Search = null
    }    
    data.value.PageNo = 1
    loadAuditListing()
}

 onMounted(() => {
     loadAuditListing()
     localStorage.removeItem('editLegalPage')
 }  )


</script>