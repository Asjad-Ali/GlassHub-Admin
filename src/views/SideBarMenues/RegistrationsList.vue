<template>
    <div class="col-xl-9 bg-w pd-30">
        <div>
            <div class="row mb-5">
                <h1 class="pb-2">Registrations</h1>
                <ul class="topmenutabs nav nav-tabs nav-line-tabs mb-5 fs-6">
                    <li @click="loadList(account.status)" v-for="account in accountType" :key="account"  class="nav-item">
                        <a :class="{'activeTab': account.status == showField }" class="nav-link cursor-pointer" data-bs-toggle="tab">
                            <h5>  {{ account.name }} </h5>
                        </a>
                    </li>
                </ul>
            </div>
            <div class="row mb-2">
                <div class="col-md-6">
                    <div class="d-flex">
                        <label for="row#" class="me-2 mt-4">Enter Row</label>
                        <input v-on:keyup.enter="searchRegistrationList" v-model="data.RowNo" type="text" class="form-control form-control-lg form-control-solid w-25" name="row#" placeholder="Row#" />
                        <button @click="searchRegistrationList"  class="btn btn-sm btn-primary mx-2" > Get </button>
                        <button @click="createPDF"  class="btn btn-sm btn-primary mx-2" > Get PDF </button>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="position-relative">
                        <span class=" svg-icon svg-icon-1 svg-icon-primary position-absolute top-50 translate-middle ms-9">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <rect opacity="0.5" x="17.0365" y="15.1223" width="8.15546" height="2" rx="1"
                                    transform="rotate(45 17.0365 15.1223)" fill="black" />
                                <path
                                    d="M11 19C6.55556 19 3 15.4444 3 11C3 6.55556 6.55556 3 11 3C15.4444 3 19 6.55556 19 11C19 15.4444 15.4444 19 11 19ZM11 5C7.53333 5 5 7.53333 5 11C5 14.4667 7.53333 17 11 17C14.4667 17 17 14.4667 17 11C17 7.53333 14.4667 5 11 5Z"
                                    fill="black" />
                            </svg>
                        </span>
                        <div class="d-flex">
                            <input v-on:keyup.enter="searchRegistrationList" v-model="data.Search" type="text" class="form-control form-control-lg form-control-solid ps-14" name="search" placeholder="Search" />
                            <button @click="searchRegistrationList"  class="btn btn-sm btn-primary ms-2" >Search</button>
                        </div>             
                    </div>
                </div>
            </div>
            <div class="tab-content" id="myTabContent">
                <PageLoader v-if="registrationstore.loader" />
                <div v-else>
                    <div id="printTable" v-if="registrationstore.registrationsList.length">
                        <div  class="tab-pane fade show active"  >
                            <table class=" table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4">
                                <thead>
                                    <tr class="fw-bolder">
                                        <th class="min-w-130px">ID</th>
                                        <th class="min-w-140px">Date</th>
                                        <th class="min-w-150px">Company Name</th>
                                        <th class="min-w-140px">Type</th>
                                        <th v-show="
                                            showField == null ||
                                            showField == 1 ||
                                            showField == 3 ||
                                            showField == 2
                                        " class="min-w-140px">
                                            Registered Organizations
                                        </th>
                                        <th v-show="
                                            showField == null || showField == 0 || showField == 3
                                        " class="min-w-140px">
                                            Registered Suppliers
                                        </th>
                                        <th v-show="showField == null || showField == 0" class="min-w-140px">
                                            Registered Freelancer
                                        </th>
                                        <th v-show="
                                            showField == null ||
                                            showField == 0 ||
                                            showField == 1 ||
                                            showField == 4
                                        " class="min-w-140px">
                                            Registered Audit Firms
                                        </th>
                                        <th v-show="showField == null || showField == 3" class="min-w-140px">
                                            Registered Regulators
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(page, index) in registrationstore.registrationsList" :key="page">
                                        <td>{{ index + 1 }}</td>
                                        <td>{{ page.Start_date.substring(0, 10) }}</td>
                                        <td>
                                            <div class="d-flex align-items-center">
                                                <div @click="profileview(  page.RegD_id )"  class="d-flex justify-content-start flex-column">
                                                    <span class="text-primary cursor-pointer fw-bold  d-block fs-7 "> {{ page.Company_name }}</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <span class="fw-bold d-block fs-7">
                                                {{ page.Account_type_name }}</span>
                                        </td>
                                        <td  v-show="showField == null || showField == 1 || showField == 3 ||  showField == 2" >
                                            <span :class="{'cursor-none': page.organization == 0 }"  class="badge badge-light cursor-pointer" @click="
                                                RegisteredListFun(  page.RegD_id,Account_type=0,  title = 'Organization')
                                            " >{{ page.organization }} </span>
                                        </td>
                                        <td  v-show=" showField == null || showField == 0 || showField == 3" >
                                            <span :class="{'cursor-none': page.supplier == 0 }" class="badge badge-light cursor-pointer" @click="
                                                RegisteredListFun(page.RegD_id,Account_type=1, title = 'Supplier')
                                            ">{{ page.supplier }}
                                            </span>
                                        </td>
                                        <td  v-show="showField == null || showField == 0">
                                            <span :class="{'cursor-none': page.freelancer == 0 }" class="badge badge-light cursor-pointer" @click="
                                                RegisteredListFun(page.RegD_id,Account_type=2, title = 'FreeLancer')
                                            ">{{ page.freelancer }}</span>
                                        </td>
                                        <td  v-show="showField == null ||  showField == 0 ||  showField == 1 ||  showField == 4">
                                            <span :class="{'cursor-none': page.auditfirm == 0 }" class="badge badge-light cursor-pointer" @click="
                                                RegisteredListFun(page.RegD_id,Account_type=3, title = 'Audit Firm')
                                            " >{{ page.auditfirm }}</span>
                                        </td>
                                        <td  v-show="showField == null || showField == 3">
                                            <span :class="{'cursor-none': page.regulator == 0 }" class="badge badge-light cursor-pointer" 
                                            @click="RegisteredListFun(page.RegD_id, Account_type=4, title = 'Regulator')
                                            " >{{ page.regulator }}</span>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <RecordNotAvailable v-else />
                </div>
            </div>
            <div class="col-md-12">
                <div class="col-md-12">
                    <div style="display:flex ; justify-content:center; margin-top:10px">
                        <v-pagination v-if="registrationstore.totalPages >= 1"
                        v-model="data.PageNo"
                        :pages="registrationstore.totalPages"
                        :range-size="1"
                        active-color="#DCEDFF"
                        @update:modelValue="loadRegistrationList"
                        />
                    </div>
                </div>  
            </div>
        </div>
        <teleport to="body">
            <RegisteredListModal  v-if="open_model"   @closeModel="closeModel" />
            <ProfileMdal :profileData="regStore.ProfileView" v-if="open_profile_model"  @closeprofileModel="closeprofileModel" />
        </teleport>
</div>
       
     
    
</template>

<script setup>
import VPagination from "@hennge/vue3-pagination";
import "@hennge/vue3-pagination/dist/vue3-pagination.css";
import ProfileMdal from '@/components/Modal/ProfileModal.vue';

import RegisteredListModal from '@/components/Modal/registration/RegisteredListModal.vue'
import { useregistrationsStore } from "@/store/registrationsList.store";
import { onMounted, ref } from "@vue/runtime-core";
import PageLoader from "@/components/Global/PageLoader.vue";
import RecordNotAvailable from "@/components/Global/RecordNotAvailable.vue";
import printPdf from '@/composables/printPdf'


const registrationstore = useregistrationsStore();
const showField = ref(null);
const title = ref()
const open_model = ref(false)
const open_profile_model = ref(false)
let data = ref({
    Search: null,
    PageNo: 1,
    RowNo: 10,
    Account_type: null,
})

const accountType = [
        {status: null, name:"All"},
        {status: 0, name:"Organization" },
        {status: 1, name:"Supplier" },
        {status: 2, name:"FreeLancer"},
        {status: 3, name:"Audit Firms"},
        {status: 4, name:"Regulator"}
    ]

const loadList = (id) => {
    showField.value = id;
    data.value.Account_type = id,
    data.value.Search = null,
    loadRegistrationList()
};
const searchRegistrationList = () => {
    if(data.value.Search == ''){
        data.value.Search = null
    }    
    data.value.PageNo = 1,
    loadRegistrationList()
};
   function createPDF() {
        var sTable = document.getElementById('printTable').innerHTML;
        printPdf(sTable, "Registration List")
    }
	
const RegisteredListFun = (regdId, accountType) => {
    open_model.value = true
    const data = {
        RegD_id: regdId,
        Account_type: accountType
    }
    registrationstore.loadRegisteredList(data);
    // console.log(registrationstore.RegisteredList);
};


    const closeModel =(event)=>{
     open_model.value=event
    };

const profileview = (RegDId) => {
    open_profile_model.value = true
    registrationstore.loadProfileView(RegDId);
};
const closeprofileModel =(event)=>{
    open_profile_model.value=event
}

const loadRegistrationList = () => {
    registrationstore.loadRegistrationListing(data.value);
}

onMounted(() => {
    loadRegistrationList()
});
</script>



<style scoped>
.Modal_Width {
    width: 130%;
}
</style>