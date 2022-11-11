<template>
  <div class="col-xl-9 pd-30 bg-w">
        <div class="card-body p-0">
            <div class="row mb-5">
                <div class="col-md-8">
                    <h1 class="pb-2"> Users</h1>
                </div>
                <div class="col-md-4 text-right text-hover-white">
                    <router-link to="/admin-user/add-new-user" class="btn btn-primary text-hover-white">Add New User</router-link>
                </div>
                <ul class="topmenutabs  nav nav-tabs nav-line-tabs mb-5 fs-6">
                    <li v-for="(admin,index) in adminType" :key="index" @click="loadList(admin.status, index)" class="nav-item">
                        <a :class="{'activeTab': index == active }" class="nav-link cursor-pointer"  >
                        <h5> {{ admin.name }} </h5>
                        </a>
                    </li>
                </ul>
            </div>
            <div class="row mb-2">
                <div class="col-md-6">
                    <div class="d-flex">
                        <label for="row#" class="me-2 mt-4">Enter Row</label>
                        <input v-on:keyup.enter="searchAdminListing" v-model="data.RowNo" type="text" class="form-control form-control-lg form-control-solid w-25" name="row#" placeholder="Row#" />
                        <button @click="searchAdminListing"  class="btn btn-sm btn-primary mx-2" > Get </button>
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
                            <input v-on:keyup.enter="searchAdminListing" v-model="data.Search" type="text" class="form-control form-control-lg form-control-solid ps-14" name="search" placeholder="Search" />
                            <button @click="searchAdminListing"  class="btn btn-sm btn-primary ms-2" >Search</button>
                        </div>             
                    </div>
                </div>
            </div>

            <PageLoader v-if="store.loader"  />
            <div v-else>
                <div v-if="store.alladminUsersList.length">
                    <div id="printTable" class="row">
                        <div  class="table-responsive">
                            <!--begin::Table-->
                            <table class="table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4">
                                <!--begin::Table head-->
                                <thead>
                                    <tr class="fw-bolder text-muted">
                                        <th class="min-w-130px">Sr</th>
                                        <th class="min-w-140px">Date</th>
                                        <th class="min-w-150px">Name</th>
                                        <th class="min-w-140px">Email</th>
                                        <th class="min-w-140px">Phone</th>
                                        <th class="min-w-140px">Status</th>
                                        <th class="min-w-100px text-end">Actions</th>
                                    </tr>
                                </thead>
                                <!--end::Table head-->
                                <!--begin::Table body-->
                                <tbody>
                                    <tr v-for="(user,index) in store.alladminUsersList" :key="user">
                                        <td>
                                            <span class="text-muted fw-bold text-muted d-block fs-7">{{ index+1 }}</span>
                                        </td>
                                        <td>
                                            <span class="text-muted fw-bold text-muted d-block fs-7">{{ user?.Start_date?.substring(0,10) }}</span>
                                        </td>
                                        <td>
                                            <span class="text-muted fw-bold  d-block fs-7 " s> {{ user.User_fullname }} </span>
                                        </td>
                                        <td>
                                            <span class="text-muted fw-bold text-muted d-block fs-7">{{ user.User_email }}</span>
                                        </td>
                                        <td>
                                            <span class="text-muted fw-bold text-muted d-block fs-7">{{ user.User_phone }}</span>
                                        </td>
                                        <td>
                                            <select name="" v-model="user.Isactive"  @change="statusUpdate($event, user.User_id)" class="form-select form-select-sm form-select-solid" data-control="select1" data-placeholder="Select..." data-allow-clear="true" data-hide-search="true">
                                                <option value="true">Active</option>
                                                <option value="false">Deactive</option>
                                            </select>
                                        </td>
                                        <td class="text-end">
                                            <ul class="userslist_action_icons">
                                                <li><i @click="editRecord(user)" class="fa fa-pencil-square" aria-hidden="true"></i></li>
                                                <li @click="ShowModel()"><i @click="id = user.User_id " class="fa fa-trash"    aria-hidden="true"></i></li>
                                            </ul>
                                        </td>
                                    </tr>

                                </tbody>
                                <!--end::Table body-->
                            </table>
                            <!--end::Table-->
                        </div>

                    </div>
                    <div class="col-md-12">
                        <div style="display:flex ; justify-content:center; margin-top:10px">
                            <v-pagination v-if="store.totalPages >= 1"
                            v-model="data.PageNo"
                            :pages="store.totalPages"
                            :range-size="1"
                            active-color="#DCEDFF"
                            @update:modelValue="loadAdminListing"
                            />
                        </div>
                    </div>
                </div>
                <record-not-available v-else />
            </div>
        </div>
    </div>
   
    <teleport to="body">
        <!-- <ProfileMdal :profileData="regStore.ProfileView" v-if="open_profile_model"  @closeprofileModel="closeprofileModel" /> -->
        <DeleteModal  v-if="open_model" @deleteRecord="deleteRecord"  @closeModel="closeModel" />
    </teleport>
</template>

<script setup>
import VPagination from "@hennge/vue3-pagination";
import "@hennge/vue3-pagination/dist/vue3-pagination.css";
import { useadminUsersStore } from '@/store/adminUsers.store'
import DeleteModal from '@/components/Modal/DeleteModal.vue';
import { onMounted, ref } from '@vue/runtime-core'
import PageLoader from '@/components/Global/PageLoader.vue';
import RecordNotAvailable from '@/components/Global/RecordNotAvailable.vue';
import { useRouter } from 'vue-router';
import printPdf from '@/composables/printPdf'
// import ProfileMdal from '@/components/Modal/ProfileModal.vue';
// import { useregistrationsStore } from "@/store/registrationsList.store";

// const regStore = useregistrationsStore()
// const open_profile_model = ref(false)
const router = useRouter()
const store = useadminUsersStore()
const showField = ref(null)
let active = ref(0)
const id = ref()
 const open_model = ref(false)

const statusUpdate = (e, id) =>{
    const data = {
        Updated_by:id,
        Isactive: e.target.value,
        User_id: id
    }
    store.updateIsactive(data)
}
const adminType = [
        {status: null, name:"All"},
        {status: true, name:"Active" },
        {status: false, name:"Deactive" },
    ]

const deleteRecord = () => {
    store.deleteComplianceList(id.value)
}

const editRecord = (user) => {
    localStorage.setItem('edit-newuser', JSON.stringify(user) )
    router.push({ name: 'EditNewUser', params: { id: user.User_id }})
}

// const profileview = (RegDId) => {
//     open_profile_model.value = true
//     regStore.loadProfileView(RegDId);
// };
// const closeprofileModel =(event)=>{
//     open_profile_model.value=event
// }
                                       




let data = ref({
    Search: null,
    PageNo: 1,
    RowNo: 10,
    Isactive: null,
})
const loadList = (accStatus, index) => {
    active.value = index
    showField.value = id
    data.value.Isactive = accStatus
    data.value.PageNo = 1,
    data.value.Search = null,
    loadAdminListing()
}
const searchAdminListing = () => {
    if(data.value.Search == ''){
        data.value.Search = null
    }    
    data.value.PageNo = 1,
    loadAdminListing()
}
function createPDF() {
        var sTable = document.getElementById('printTable').innerHTML;
        printPdf(sTable, "Admin User List")
    }

const loadAdminListing = () =>{
    store.loadAdminUsers(data.value)
}

const ShowModel = () => {
     open_model.value = true
    }

    const closeModel =(event)=>{
     open_model.value=event
    }

onMounted(() =>{
    loadAdminListing()
})


</script>

<style>

</style>