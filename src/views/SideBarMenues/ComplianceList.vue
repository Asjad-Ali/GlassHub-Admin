<template>
    <div class="col-xl-9 bg-w pd-30">
        <div class="row">
            <div class="col-md-6">
                <h1 class="pb-2">Compliance</h1>
            </div>
            <div class="col-md-6 text-right">
                <router-link to="/compliance/add-compliance"><button class="btn btn-primary">Add</button></router-link>
            </div>
        </div>
        <div class="row mb-5">
            <ul class="topmenutabs   nav nav-tabs nav-line-tabs mb-5 fs-6">
                <li @click="loadList([4,0])" class="nav-item ">
                    <a class="nav-link cursor-pointer" :class="{'activeTab': showField.toString() === '4,0'}" ><h5>All</h5></a>
                </li>
                <li @click="loadList([0])" :class="{'activeTab': showField.toString() === '0'}" class="nav-item">
                    <a class="nav-link cursor-pointer" ><h5>Organization</h5></a>
                </li>
                <li @click="loadList([4])" :class="{'activeTab': showField.toString() === '4'}" class="nav-item">
                    <a class="nav-link cursor-pointer" ><h5>Regulator</h5></a>
                </li>
            </ul>
        </div>
        <div class="row mb-2">
            <div class="col-md-6">
                <div class="d-flex">
                    <label for="row#" class="me-2 mt-4">Enter Row</label>
                    <input v-on:keyup.enter="searchComplianceListing" v-model="data.RowNo" type="text" class="form-control form-control-lg form-control-solid w-25" name="row#" placeholder="Row#" />
                    <button @click="searchComplianceListing"  class="btn btn-sm btn-primary mx-2" > Get </button>
                    <button @click="createPDF"  class="btn btn-sm btn-primary mx-2" > Get PDF </button>
                </div>
            </div>
            <div class="col-md-6">
                <div class="position-relative">
                    <!--begin::Svg Icon | path: icons/duotune/general/gen021.svg-->
                    <span class="svg-icon svg-icon-1 svg-icon-primary position-absolute top-50 translate-middle ms-9">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <rect opacity="0.5" x="17.0365" y="15.1223" width="8.15546" height="2" rx="1" transform="rotate(45 17.0365 15.1223)" fill="black" />
                            <path d="M11 19C6.55556 19 3 15.4444 3 11C3 6.55556 6.55556 3 11 3C15.4444 3 19 6.55556 19 11C19 15.4444 15.4444 19 11 19ZM11 5C7.53333 5 5 7.53333 5 11C5 14.4667 7.53333 17 11 17C14.4667 17 17 14.4667 17 11C17 7.53333 14.4667 5 11 5Z" fill="black" />
                        </svg>
                    </span>
                    <!--end::Svg Icon-->
                        <div class="d-flex">
                            <input v-on:keyup.enter="searchComplianceListing" v-model="data.Search" type="text" class="form-control form-control-lg form-control-solid ps-14" name="search" placeholder="Search" />
                            <button @click="searchComplianceListing"  class="btn btn-sm btn-primary ms-2" >Search</button>
                        </div>         
                </div>
            </div>
        </div>

        
        <div >
            <PageLoader v-if="store.loader"  />
            <div id="printTable" v-else>
                <div v-if="store.allcomplianceList.length" class="tab-pane fade show active" >
                    <!--begin::Table-->
                    <table class="table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4">
                        <!--begin::Table head-->
                        <thead>
                            <tr class="fw-bolder">
                                <th class="min-w-140px"> Sr#</th>
                                <th class="min-w-140px">Compliance Name</th>
                                <th class="min-w-140px">Compliance For</th>
                                <th class="min-w-150px">Category</th>
                                <th v-show="showField != 4" class="min-w-140px"> Certificate</th>
                                <th class="min-w-140px">Introductory Date</th>
                                <th class="min-w-140px">Defined Compliance</th>
                                <th  class="min-w-100px text-end">Actions</th>
                            </tr>
                        </thead>
                        <!--end::Table head-->
                        <!--begin::Table body-->
                        <tbody>
                        
                        <tr v-for="(page,index) in store?.allcomplianceList" :key="page">
                                
                                <td><span class="fw-bold d-block fs-7">{{ index+1 }}</span></td>
                                <td>
                                    <span class="fw-bold d-block fs-7"> {{ page.Compliance_name }}</span>
                                </td>
                                <td>
                                    <div class="d-flex align-items-center">
                                        <div @click="profileview(  page.RegD_id )"  class="d-flex justify-content-start flex-column">
                                            <span class="text-primary cursor-pointer fw-bold  d-block fs-7 "> {{ page.company_name }}</span>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <div class="d-flex align-items-center">
                                        <div class="d-flex justify-content-start flex-column">
                                            <span class="fw-bold d-block fs-7">{{ page.category_names }}</span>
                                        </div>
                                    </div>
                                </td>
                                <td v-show="showField != 4"><span  class="fw-bold d-block fs-7">{{ page.certificate_names }}</span></td>

                                <td><span class="fw-bold d-block fs-7">{{ page?.created_at?.substring(0,10) }}</span></td>
                                <td><span class="fw-bold d-block fs-7">{{ page.Regulatory_Auth_name }}</span></td>
                                

                                <td v-if="page.AdminCompliance" class="text-end">
                                    <ul class="userslist_action_icons">
                                        <li> <i @click="editRecord(page)" class="fa fa-pencil-square" aria-hidden="true"></i></li>
                                        <li @click="ShowModel()"><i   @click="id = page.Compliance_id "  class="fa fa-trash" aria-hidden="true"></i></li>
                                    </ul>
                                </td>
                            </tr>
                        </tbody>
                        <!--end::Table body-->
                    </table>
                </div>
                <RecordNotAvailable v-else />
            </div>
                <div v-show="!store.loader" class="col-md-12">
                    <div style="display:flex ; justify-content:center; margin-top:10px">
                        <v-pagination v-if="store.totalPages >= 1"
                        v-model="data.PageNo"
                        :pages="store.totalPages"
                        :range-size="1"
                        active-color="#DCEDFF"
                        @update:modelValue="loadComplianceListing"
                        />
                    </div>
                </div>
        </div>

        </div>

 <!-- Delete Modal -->
    <teleport to="body">
        <DeleteModal  v-if="open_model" @deleteRecord="deleteRecord"  @closeModel="closeModel" />
        <ProfileMdal :profileData="regStore.ProfileView" v-if="open_profile_model"  @closeprofileModel="closeprofileModel" />
    </teleport>

    
</template>

<script setup>
import ProfileMdal from '@/components/Modal/ProfileModal.vue';
import VPagination from "@hennge/vue3-pagination";
import "@hennge/vue3-pagination/dist/vue3-pagination.css";
import { usecomplianceStore } from '@/store/compliance.store'
import DeleteModal from '@/components/Modal/DeleteModal.vue';
import { onMounted,ref } from '@vue/runtime-core'
import PageLoader from '@/components/Global/PageLoader.vue';
import RecordNotAvailable from '@/components/Global/RecordNotAvailable.vue'
import { useRouter } from 'vue-router';
import printPdf from '@/composables/printPdf'
import { useregistrationsStore } from "@/store/registrationsList.store";

const router = useRouter()
const store = usecomplianceStore()
const id = ref()
const open_model = ref(false)
const open_profile_model = ref(false)
const showField = ref([4,0])
// const user = JSON.parse(localStorage.getItem('user'))
const regStore = useregistrationsStore()

const deleteRecord = () => {
    store.deleteComplianceList(id.value)
}

const editRecord = (page) => {
    router.push({ name: 'EditcompliancePage', params: { id: page.Compliance_id }})
}
   function createPDF() {
        var sTable = document.getElementById('printTable').innerHTML;
        printPdf(sTable, "Compliance List")
    }
	
let data = ref({
    Search: null,
    PageNo: 1,
    RowNo: 10,
    Account_id: [4,0],
    RegD_id: null,
})
const loadList = (id) => {
    showField.value = id,
    data.value.Search = null,
    data.value.PageNo = 1,
    data.value.Account_id = id,
    loadComplianceListing()
}
const searchComplianceListing = () => {
    if(data.value.Search == ''){
        data.value.Search = null
    }    
    data.value.PageNo = 1
    loadComplianceListing()
}
const loadComplianceListing = () => {
    store.loadComplianceList(data.value)
}

const profileview = (RegDId) => {
    open_profile_model.value = true
    regStore.loadProfileView(RegDId);
};
const closeprofileModel =(event)=>{
    open_profile_model.value=event
}


const ShowModel = () => {
     open_model.value = true
    }

    const closeModel =(event)=>{
     open_model.value=event
    }
onMounted(() =>{
    loadComplianceListing()
})

</script>

<style>

</style>