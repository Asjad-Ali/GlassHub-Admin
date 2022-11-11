<template>
    <div class="col-xl-9 pd-30 bg-w">
        <div class="row mb-5">
            <div class="col-md-6">
                <h1 class="pb-2">All SignUps</h1>
            </div>
            <div class="col-md-6 text-right">
                <router-link to="/signups/signup-setting" class="btn btn-lg btn-primary me-3 " >Signup Settings</router-link>
                <router-link to="/signups/new-signup" class="btn btn-lg btn-primary  mr-10" >New SignUp</router-link>
            </div>
        </div>
        <div class="row mb-5">
            <div class="col-md-12">
                <ul class="topmenutabs nav nav-tabs nav-line-tabs mb-5 fs-6">
                    <li class="nav-item cursor-pointer" v-for="account in accounts" :key="account">
                        <a class="nav-link " :class="{'activeTab': account.status == activeAccount }" @click="loadAccountData(account.status)"><h5>{{ account.name }}</h5></a>
                    </li>
                </ul>
            </div>
        </div>
        <div class="row mb-2">
            <div class="col-md-6">
                <div class="d-flex">
                    <label for="row#" class="me-2 mt-4">Enter Row</label>
                    <input v-on:keyup.enter="searchSignupListing" v-model="data.RowNo" type="text" class="form-control form-control-lg form-control-solid w-25" name="row#" placeholder="Row#" />
                    <button @click="searchSignupListing"  class="btn btn-sm btn-primary mx-2" > Get </button>
                    <button @click="createPDF"  class="btn btn-sm btn-primary mx-2" > Get PDF </button>
                </div>
            </div>
            <div class="col-md-6">
                <div class="position-relative">
                    <span class="svg-icon svg-icon-1 svg-icon-primary position-absolute top-50 translate-middle ms-9">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <rect opacity="0.5" x="17.0365" y="15.1223" width="8.15546" height="2" rx="1" transform="rotate(45 17.0365 15.1223)" fill="black" />
                            <path d="M11 19C6.55556 19 3 15.4444 3 11C3 6.55556 6.55556 3 11 3C15.4444 3 19 6.55556 19 11C19 15.4444 15.4444 19 11 19ZM11 5C7.53333 5 5 7.53333 5 11C5 14.4667 7.53333 17 11 17C14.4667 17 17 14.4667 17 11C17 7.53333 14.4667 5 11 5Z" fill="black" />
                        </svg>
                    </span>
                    <div class="d-flex">
                        <input v-on:keyup.enter="searchSignupListing" v-model="data.Search" type="text" class="form-control form-control-lg form-control-solid ps-14" name="search" placeholder="Search" />
                        <button @click="searchSignupListing" class="btn btn-sm btn-primary ms-2" >Search</button>
                    </div>
    
                </div>
            </div>
        </div>
        <PageLoader v-if="store.loader" />
        <div v-else >
            <div v-if="store.allSignupsList.length">
                <div class="row">
                    <div id="printTable" class="table-responsive">
                        <table class="table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4">
                            <thead>
                                <tr class="fw-bolder text-muted">
                                    <th class="min-w-30px">ID</th>
                                    <th class="min-w-150px">Date</th>
                                    <th class="min-w-150px">Name</th>
                                    <th class="min-w-140px">User Type</th>
                                    <th class="min-w-140px">Documents</th>
                                    <th class="min-w-140px">Messages</th>
                                    <th class="min-w-100px text-end">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(user,index ) in store.allSignupsList" :key="index">
                                    <td v-if="data.PageNo == 1"><span class="text-muted">{{index+1}}</span></td>
                                    <td v-else><span class="text-muted">{{index+1+(10*(data.PageNo-1))}}</span></td>
                                    <td><span class="text-muted fw-bold text-muted d-block fs-7">{{user.Start_date.substring(0,10)}}</span></td>
                                    <td>
                                        <div class="d-flex align-items-center">
                                            <div @click="profileview(  user.RegM_id )"  class="d-flex justify-content-start flex-column">
                                                <span class="text-primary cursor-pointer fw-bold  d-block fs-7 "  @click="ShowprofileModel()"> {{ user.Company_name }}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <span class="text-muted fw-bold text-muted d-block fs-7">{{user.Account_type_name}}</span>
                                    </td>
                                    <td class="text-start view_pending_project ">
                                        <router-link to="/signups/signup-preview">
                                            <i class="fa fa-eye"></i>
                                        </router-link>
                                    </td>
                                    <td>
                                        
                                        <span class="cursor_pointer"   @click="ShowModel()"><i class="far fa-comment-dots"></i></span>
                                    </td>
                                    <td>
                                        <div v-if="adminListingStore.statusLoader == user.RegD_id " class="text-center">
                                        <span style="height: 1.5rem; width:1.5rem"  class="spinner-border p-0 ms-2"></span></div>                                    
                                        <select v-else @change="statusUpdate( $event, user.RegD_id )" v-model="user.Account_status" name="" class="form-select form-select-sm form-select-solid"
                                        data-control="select1" data-placeholder="Select..." data-allow-clear="true" data-hide-search="true">
                                            <option :value="0">Pending</option>
                                            <option :value="1">In Process</option>
                                            <option :value="2">Approved</option>
                                            <option :value="3">Blocked</option>
                                        </select>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                        <div class="col-md-12 mt-3">
                            <div style="display:flex ; justify-content:center; margin-top:10px">
                                <v-pagination v-if="store.totalPages >= 1"
                                v-model="data.PageNo"
                                :pages="store.totalPages"
                                :range-size="1"
                                active-color="#DCEDFF"
                                @update:modelValue="loadSignupsListing"
                            />
                        </div>
                        </div>
                </div>
            </div>
            <RecordNotFound v-else />
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
import { useSignupsStore } from '@/store/signups.store'
import { onMounted, ref } from '@vue/runtime-core'
import PageLoader from '@/components/Global/PageLoader.vue';
import ChatModal from '@/components/Modal/ChatModal.vue';
import { useAdminListingStore } from '@/store/adminListing.store';
import RecordNotFound from '@/components/Global/RecordNotAvailable.vue';
import printPdf from '@/composables/printPdf'
import { useregistrationsStore } from "@/store/registrationsList.store";
import ProfileMdal from '@/components/Modal/ProfileModal.vue';

const store = useSignupsStore()
const regStore = useregistrationsStore()
 const open_model = ref(false)
// const user = JSON.parse(localStorage.getItem('user'))
const adminListingStore = useAdminListingStore()
const activeAccount = ref("null")
const open_profile_model = ref(false)
const accounts = [
        {status:"null", name:"All"},
        {status:"0", name:"Pending" },
        {status:"1", name:"In Process" },
        {status:"2", name:"Approved"},
        {status:"3", name:"Blocked"},
        {status:"4", name:"Deactivate"}
    ]
//     For signup all: all list: null; PendingList:0; InprocessList:1; 
// ApprovedList:2; BlockedList:3; DeActList:5
let data = ref({
    Search: null,
    PageNo: 1,
    RowNo: 10,
    Account_status: null,
    Account_type: null
})
const loadAccountData = (status) =>{
    activeAccount.value = status
    data.value.Account_status = status
    data.value.Search = null
    loadSignupsListing()
}

const searchSignupListing = () =>{
    if(data.value.Search == ''){
        data.value.Search = null
    }
    data.value.PageNo = 1
    loadSignupsListing()
}


const profileview = (RegDId) => {
    open_profile_model.value = true
    regStore.loadProfileView(RegDId);
};
const closeprofileModel =(event)=>{
    open_profile_model.value=event
}
   function createPDF() {
        var sTable = document.getElementById('printTable').innerHTML;
        printPdf(sTable, "Signup List")
    }
const statusUpdate = (e, id) =>{
    const data = {
        Account_status: e.target.value,
        RegD_id: id
    }
    console.log(data)
    adminListingStore.updateAccountStatus(data)

}
const loadSignupsListing = () => {
    store.loadSignupsList(data.value)
}

  const ShowModel = () => {
     open_model.value = true
    }

    const closeModel =(event)=>{
     open_model.value=event
    }

onMounted(() => {
    loadSignupsListing()
})

</script>

<style>

</style>