<template>
    <div class="col-xl-9 pd-30 bg-w">
        <div class="row mb-5">
            <div class="col-md-6">
                <h1 class="pb-2">Organization Projects</h1>
            </div>
            <ul class="topmenutabs nav nav-tabs nav-line-tabs mb-5 fs-6">
                <li @click="loadList(tab.value)" v-for="tab in tabs" :key="tab"   class="nav-item">
                    <a class="nav-link cursor-pointer" :value="tab.value" :class="{'activeTab': data.Bid_status == tab.value}"><h5> {{ tab.name }} </h5></a>
                </li>
            </ul>

        </div>
        <div class="row mb-2">
            <div class="col-md-6">
                <div class="d-flex">
                    <label for="row#" class="me-2 mt-4">Enter Row</label>
                    <input v-on:keyup.enter="searchProjectListing" v-model="data.RowNo" type="text" class="form-control form-control-lg form-control-solid w-25" name="row#" placeholder="Row#" />
                    <button @click="searchProjectListing"  class="btn btn-sm btn-primary mx-2" > Get </button>
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
                            <input v-on:keyup.enter="searchProjectListing" v-model="data.Search" type="text" class="form-control form-control-lg form-control-solid ps-14" name="search" placeholder="Search" />
                            <button @click="searchProjectListing"  class="btn btn-sm btn-primary ms-2" >Search</button>
                        </div>         
                </div>
            </div>
        </div>
        <PageLoader v-if="projectstore.loader"  />
        <div id="printTable" v-else>
            <div v-if="projectstore.allprojectList.length"  class="row">
                <div class="table-responsive">
                    <!--begin::Table-->
                    <table class="table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4">
                        <!--begin::Table head-->
                        <thead>
                            <tr class="fw-bolder text-muted">
                                <th class="min-w-130px">Sr#</th>
                                <th class="min-w-140px">Date</th>
                                <th class="min-w-150px">Organization Name</th>
                                <th class="min-w-100px">Supplier</th>
                                <th class="min-w-140px">Status</th>
                                <th class="min-w-100px text-end">Actions</th>
                            </tr>
                        </thead>
                        <!--end::Table head-->
                        <!--begin::Table body-->
                        <tbody>
                            <tr  v-for="(page,index) in projectstore.allprojectList" :key="page">
                                <td>{{index+1}}</td>
                                <td>{{ page.start_date.substring(0, 10) }}</td>
                                <td>
                                    <div class="d-flex align-items-center">
                                        <div @click="profileview(  page.RegD_id )"  class="d-flex justify-content-start flex-column">
                                            <span class="text-primary cursor-pointer fw-bold  d-block fs-7 "> {{ page.RegD_comp_name }}</span>
                                        </div>
                                    </div>
                                </td>
                                <td >
                                    <a href="#">
                                        <div class="d-flex align-items-center">
                                            <div class="d-flex justify-content-start flex-column">
                                                <span @click="SupplierData(page.RegD_id)" >{{page.supplier}}</span>
                                            </div>
                                        </div>
                                    </a>
                                </td>
                                <td>

                                    <div class="d-flex align-items-center">
                                        <div class="d-flex justify-content-start flex-column">
                                            <span >{{page.Bid_status_name}}</span>
                                        </div>
                                    </div>
                                </td>
                                <td class="text-end">
                                    <ul class="userslist_action_icons">
                                        <li @click="ShowModel()"><i class="fa fa-eye cursor-pointer" @click="getRowDAta(page.RegD_id)"  aria-hidden="true"></i></li>
                                    </ul>
                                </td>
                            </tr>
                            

                        </tbody>
                        <!--end::Table body-->
                    </table>
                    <!--end::Table-->
                </div>
            </div>
            <RecordNotAvailable v-else />
        </div>
            <div class="col-md-12">
                <div style="display:flex ; justify-content:center; margin-top:10px">
                    <v-pagination v-if="projectstore.totalPages >= 1"
                    v-model="data.PageNo"
                    :pages="projectstore.totalPages"
                    :range-size="1"
                    active-color="#DCEDFF"
                    @update:modelValue="loadProjectListing"
                    />
                </div>
            </div>
    </div>

     <teleport to="body">
        <SupplierDetail  v-if="open_supplier_model"   @SupplercloseModel="SupplercloseModel" />
        <ProfileMdal :profileData="regStore.ProfileView" v-if="open_profile_model"  @closeprofileModel="closeprofileModel" />
        <ProjectDetai  v-if="open_model"   @closeModel="closeModel" />
   </teleport>
   
</template>

<script setup>
import ProfileMdal from '@/components/Modal/ProfileModal.vue';
import VPagination from "@hennge/vue3-pagination";
import "@hennge/vue3-pagination/dist/vue3-pagination.css";
import ProjectDetai from '@/components/Modal/project/ProjectDetai.vue';
import SupplierDetail from '@/components/Modal/project/SupplierDetail.vue';
import { useProjectStore } from '@/store/projects.store'
import { computed, onMounted, ref } from '@vue/runtime-core'
import PageLoader from '@/components/Global/PageLoader.vue';
import RecordNotAvailable from '@/components/Global/RecordNotAvailable.vue'
import printPdf from '@/composables/printPdf'
import { useregistrationsStore } from "@/store/registrationsList.store";

const regStore = useregistrationsStore()

const projectstore = useProjectStore()
const open_model = ref(false)
const open_profile_model = ref(false)
const open_supplier_model = ref(false)

const getRowDAta = (id) => {
    const index = computed(() =>  projectstore.allprojectList.findIndex( user => user.RegD_id == id ) )
    projectstore.ViewData = projectstore.allprojectList[index.value]
}
const tabs = [
    {value: null, name: "All"},
    {value: 0, name: "In-Process"},
    {value: 3, name: "Completed"},
    {value: 4, name: "Cancelled"}
]
const SupplierData = (id) => {
    open_supplier_model.value = true
    projectstore.loadProjectSupplierList(id)
    console.log(projectstore.SupplierData)
}
let data = ref({
    Search: null,
    PageNo: 1,
    RowNo: 10,
    Bid_status: null
})
   function createPDF() {
        var sTable = document.getElementById('printTable').innerHTML;
        printPdf(sTable, "Projects List")
    }
const loadList = (status) => {
    data.value.Search = null,
    data.value.Bid_status = status
    loadProjectListing()
}
const searchProjectListing = () => {
    if(data.value.Search == ''){
        data.value.Search = null
    }    
    data.value.PageNo = 1
    loadProjectListing()
}
const profileview = (RegDId) => {
    open_profile_model.value = true
    regStore.loadProfileView(RegDId);
};
const closeprofileModel =(event)=>{
    open_profile_model.value=event
}

const loadProjectListing = () => {
    projectstore.loadProjectList(data.value)
}

const ShowModel = () => {
     open_model.value = true
    }

    const closeModel =(event)=>{
     open_model.value=event
    }

    // const ShowSupplierModel = () => {
    //  open_supplier_model.value = true
    // }

     const SupplercloseModel =(event)=>{
     open_supplier_model.value=event
    }

onMounted(() =>{
    loadProjectListing()
})

</script>


<style>

</style>