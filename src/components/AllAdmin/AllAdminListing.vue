<template>
    <div>
        <div class="row mb-10">
            <div class="col-md-6">
                <h1 class="pb-2"> {{ pageTitle }} </h1>
            </div>
            <ul class="topmenutabs  nav nav-tabs nav-line-tabs fs-6">
                <li @click="accStatusLoad(account.value, index)" :class="{'activeTab': activeStatus == index }"
                v-for="(account,index) in accountStatus"  :key="index" class="nav-item">
                    <a  class="nav-link cursor-pointer"><h5> {{ account.name }}</h5></a>
                </li>
            </ul>
        </div>
        <div class="row mb-2">
            <div class="col-md-6">
                <div class="d-flex">
                    <label for="row#" class="me-2 mt-4">Enter Row</label>
                    <input v-on:keyup.enter="searchAllAdminListing" v-model="data.RowNo" type="text" class="form-control form-control-lg form-control-solid w-25" name="row#" placeholder="Row#" />
                    <button @click="searchAllAdminListing"  class="btn btn-sm btn-primary mx-2" > Get </button>
                    <button @click="createPDF"  class="btn btn-sm btn-primary mx-2" > Get PDF </button>
                </div>
            </div>
            <div class="col-md-6">
                <div class="position-relative  mb-2">
                    <span class="svg-icon svg-icon-1 svg-icon-primary position-absolute top-50 translate-middle ms-9">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <rect opacity="0.5" x="17.0365" y="15.1223" width="8.15546" height="2" rx="1" transform="rotate(45 17.0365 15.1223)" fill="black" />
                            <path d="M11 19C6.55556 19 3 15.4444 3 11C3 6.55556 6.55556 3 11 3C15.4444 3 19 6.55556 19 11C19 15.4444 15.4444 19 11 19ZM11 5C7.53333 5 5 7.53333 5 11C5 14.4667 7.53333 17 11 17C14.4667 17 17 14.4667 17 11C17 7.53333 14.4667 5 11 5Z" fill="black" />
                        </svg>
                    </span>
                    <div class="d-flex">
                        <input v-on:keyup.enter="searchAllAdminListing" v-model="data.Search" type="text" class="form-control form-control-lg form-control-solid ps-14" name="search" placeholder="Search" />
                        <button @click="searchAllAdminListing" class="btn btn-sm btn-primary ms-2" >Search</button>
                    </div>            
                </div>
            </div>
        </div>

        <PageLoader v-if="store.loader" />
        <div v-else class="d-flex justify-content-center align-items-center">
            <div v-if="store.adminListing.length">
                <div id="printTable" class="row">
                        <div class="table-responsive">
                            <table class="table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4">
                                <thead>
                                    <tr class="fw-bolder text-muted">
                                        <th class="min-w-130px">SR</th>
                                        <th class="min-w-140px">Date</th>
                                        <th class="min-w-140px">Name</th>
                                        <th class="min-w-140px">Location</th>
                                        <th class="min-w-140px">Email</th>
                                        <th class="min-w-140px">Messages</th>
                                        <th v-if="pageTitle == 'Organization'" class="min-w-140px">  Sup. Graph Access</th>
                                        <th class="min-w-140px">LegalPage acceptance</th>	
                                        <th class="min-w-100px text-center">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(admin,index) in store.adminListing" :key="admin">
                                        <td>
                                            <span class="text-muted fw-bold text-muted d-block fs-7">{{ index+1 }}</span>
                                        </td>  
                                        <td> 
                                            <span class="text-muted fw-bold  d-block fs-7"> {{ admin.Start_date.substring(0, 10) }} </span></td>
                                        <td>
                                            <div class="d-flex align-items-center">
                                                <div @click="profileview(  admin.RegD_id )"  class="d-flex justify-content-start flex-column">
                                                    <span class="text-primary cursor-pointer fw-bold  d-block fs-7 "> {{ admin.Company_name }}</span>
                                                </div>
                                            </div>
                                        </td>
                                    <td> 
                                        <span class="text-muted fw-bold  d-block fs-7">
                                            <a :href="`https://maps.google.com/?q=${admin.Head_office_lat},${admin.Head_office_long}`" target="_blank">  {{ admin.Head_office_address }} </a>
                                        </span>
                                    </td>
                                    <td>
                                        <span class="text-muted fw-bold  d-block fs-7">
                                            <a :href="`mailto:${ admin.Email }`" target="_blank">{{ admin.Email }} </a>
                                        </span>
                                    </td>
                                    <td>
                                        <a  @click="ShowModel()"><i class="far fa-comment-dots cursor-pointer"></i></a>
                                    </td>
                                    <td v-if="pageTitle == 'Organization'">
                                            <select name="" class="form-select form-select-sm form-select-solid" data-control="select1" data-placeholder="Select..." data-allow-clear="true" data-hide-search="true">
                                            <option :value="2" selected>No Access</option>
                                            <option :value="3">Granted</option>
                                            <option :value="4">Stoped</option>
                                        </select>
                                    </td>
                                    <td>
                                        <span class="text-muted fw-bold  d-block fs-7"> {{ admin.Term_accept }} </span>
                                    </td>
                                    <td>
                                            <select  v-model="admin.Account_status"  @change="statusUpdate($event, admin.RegD_id)" name="" class="form-select form-select-sm form-select-solid" data-control="select1" data-placeholder="Select..." data-allow-clear="true" data-hide-search="true">
                                            <option :value="2" selected>Active</option>
                                            <option :value="3">Blocked</option>
                                            <option :value="4">Suspended</option>
                                        </select>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                    <div class="col-md-12">
                        <div style="display:flex ; justify-content:center; margin-top:10px">
                            <v-pagination v-if="store.totalPages >= 1"
                            v-model="data.PageNo"
                            :pages="store.totalPages"
                            :range-size="1"
                            active-color="#DCEDFF"
                            @update:modelValue="loadAllAdminList"
                            />
                        </div>
                    </div>
            </div>
            <RecordNotAvailable v-else />
        </div>

        <teleport to="body">
        <ChatModal  v-if="open_model"  @closeModel="closeModel" />
        <ProfileMdal :profileData="regStore.ProfileView" v-if="open_profile_model"  @closeprofileModel="closeprofileModel" />
        </teleport>

    </div>
</template>

<script setup>
import VPagination from "@hennge/vue3-pagination";
import "@hennge/vue3-pagination/dist/vue3-pagination.css";
import { useAdminListingStore } from '@/store/adminListing.store';
import { defineProps, ref, toRefs } from 'vue'
import PageLoader from '@/components/Global/PageLoader.vue';
import ChatModal from '@/components/Modal/ChatModal.vue';
import ProfileMdal from '@/components/Modal/ProfileModal.vue';
import RecordNotAvailable from '@/components/Global/RecordNotAvailable.vue';
import { useregistrationsStore } from "@/store/registrationsList.store";
import printPdf from '@/composables/printPdf'

const store = useAdminListingStore()
const regStore = useregistrationsStore()
const activeStatus = ref(0)
const open_model = ref(false)
const open_profile_model = ref(false)
const accountStatus = [
    {value: null, name:'All' },
    {value: 2, name:'Active' },
    {value: 3, name:'Blocked' },
    {value: 4, name:'Suspended' }
]
const props = defineProps({
  pageTitle: String
})
const { pageTitle } = toRefs(props);
const statusUpdate = (e, id) =>{
    const data = {
        Account_status: e.target.value,
        RegD_id: id
    }
    store.updateAccountStatus(data)
}
let data = ref({
    Search: null,
    PageNo: 1,
    RowNo: 10,
    Account_status: null,
    Account_type: 0
})
const profileview = (RegDId) => {
    open_profile_model.value = true
    regStore.loadProfileView(RegDId);
};
const accStatusLoad = (accountStatus, index = 0 ) => {
    data.value.Search = null,
    data.value.PageNo = 1,
    data.value.RowNo = 10,
    data.value.Account_status = accountStatus
    activeStatus.value = index
    if(pageTitle.value == "Supplier"){
        data.value.Account_type = 1
    }else if(pageTitle.value == "Freelancer"){
        data.value.Account_type = 2
    }else if(pageTitle.value == "Audit Firms"){
        data.value.Account_type = 3
    }else if(pageTitle.value ==  "Regulators"){
        data.value.Account_type = 4
    }else{
        data.value.Account_type = 0
    }
    store.loadAdminListing(data.value) 
}
const searchAllAdminListing = () => {
    data.value.PageNo = 1
    store.loadAdminListing(data.value) 
}

   function createPDF() {
        var sTable = document.getElementById('printTable').innerHTML;
        printPdf(sTable, pageTitle)
    }

     const ShowModel = () => {
     open_model.value = true
    }

    const closeModel =(event)=>{
     open_model.value=event
    }
	
    const closeprofileModel =(event)=>{
     open_profile_model.value=event
    }

const loadAllAdminList = () => {
    store.loadAdminListing(data.value) 
}
</script>

<style>

</style>