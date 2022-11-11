<template>
    <div class="col-xl-9 pd-30 bg-w">
        <div class="card-body pb-0">
            <div class="row mb-5">
                <div class="col-md-6">
                    <h1 class="pb-2">Content Page</h1>
                </div>
                <div class="col-md-6 text-right">
                    <router-link to="/content-page/add-content-page"><button class="btn btn-primary">Add</button></router-link>
                </div>
            </div>
            <div class="row mb-2">
                <div class="col-md-6">
                    <div class="d-flex">
                        <label for="row#" class="me-2 mt-4">Enter Row</label>
                        <input v-on:keyup.enter="searchLegalPageListing" v-model="data.RowNo" type="text" class="form-control form-control-lg form-control-solid w-25" name="row#" placeholder="Row#" />
                        <button @click="searchLegalPageListing"  class="btn btn-sm btn-primary mx-2" > Get </button>
                        <button @click="createPDF"  class="btn btn-sm btn-primary mx-2" > Get PDF </button>
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
                            <input  v-on:keyup.enter="searchLegalPageListing" v-model="data.Search" type="text" class="form-control form-control-lg form-control-solid ps-14" name="search" placeholder="Search" />
                            <button @click="searchLegalPageListing"  class="btn btn-sm btn-primary ms-2">Search</button>
                        </div>                 
                    </div>
                </div>
            </div>                
            <PageLoader v-if="store.loader" />
            <div v-else>
                <div v-if="store.legalPagesList.length">
                    <div id="printTable" class="row">
                        <div class="table-responsive">
                            <!--begin::Table-->
                            <table class="table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4">
                                <!--begin::Table head-->
                                <thead>
                                    <tr class="fw-bolder text-muted">
                                        <th class="min-w-130px">ID</th>
                                        <th class="min-w-140px">Date</th>
                                        <th class="min-w-150px">Page Name</th>
                                        <th class="min-w-140px">Account Name</th>
                                        <th class="min-w-140px">Status</th>
                                        <th class="min-w-100px text-end">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(page,index) in store.legalPagesList" :key="index">
                                          <td v-if="data.PageNo == 1"><span class="text-muted fw-bold text-muted d-block fs-7">{{index+1}}</span></td>
                                          <td v-else><span class="text-muted fw-bold text-muted d-block fs-7">{{index+1+(10*(data.PageNo-1))}}</span></td>
                                        <td>
                                            <span class="text-muted fw-bold text-muted d-block fs-7">{{ page.legal_date.substring(0, 10) }}</span>
                                        </td>
                                        <td>
                                            <span class="text-muted fw-bold text-muted d-block fs-7">{{ pageName[page.Page_Name] }}</span>
                                        </td>
                                        <td>
                                            <span class="text-muted fw-bold text-muted d-block fs-7">{{ page.Account_Name }}</span>
                                        </td>
                                        <td>
                                            <span class="text-muted fw-bold text-muted d-block fs-7">
                                                <input class="form-check-input" disabled type="checkbox" v-model="page.Is_Active"  name="account_plan" :value="page.Is_Active">
                                            </span>
                                        </td>                                
                                        <td class="text-center">
                                            <ul class="userslist_action_icons p-1">
                                                <li><i @click="editRecord(page)" class="fa fa-pencil-square cursor-pointer" aria-hidden="true"></i></li>
                                                <li @click="ShowModel()"><i @click="id = page.Legal_id " class="fa fa-trash cursor-pointer" aria-hidden="true"></i></li>
                                            </ul>
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
                            @update:modelValue="loadLegalPageListing"
                            />
                        </div>
                    </div>
                </div>
                <RecordNotAvailable v-else />
            </div>
        </div>


        <!-- Delete Confirmation Modal -->
        <!-- <div class="modal fade" id="confirmationDelete" aria-hidden="true" aria-labelledby="confirmationDelete" tabindex="-1" >
            <div class="modal-dialog" style="max-width:500px">
                <div class="modal-content" >
                    <div class="modal-header">
                        <h5 class="modal-title">Delete Record</h5>
                        <div class="btn btn-icon btn-sm btn-active-light-primary ms-2" data-bs-dismiss="modal" aria-label="Close">
                        <i class="fa fa-times" aria-hidden="true"></i>
                    </div>
                    </div>
                    <div class="modal-body">
                        <div class="row">
                                <div class="col-12 mb-2">
                                    <h6>Are you Sure you want to delete this record</h6>
                                </div>
                            <div class="modal-footer pb-0">
                                <button type="button" class="btn btn-light" data-bs-toggle="modal" data-bs-target="#addNewCategory">No</button>
                                <button @click="deleteRecord" type="button" class="btn btn-primary" data-bs-toggle="modal" 
                                data-bs-target="#addNewCategory">Yes</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div> -->
    </div>
     <teleport to="body">
        <DeleteModal  v-if="open_model" @deleteRecord="deleteRecord"  @closeModel="closeModel" />
        </teleport>
</template>

<script setup>
import VPagination from "@hennge/vue3-pagination";
import "@hennge/vue3-pagination/dist/vue3-pagination.css";
import { onMounted, ref } from '@vue/runtime-core'
import { useLegalPagesStore } from '@/store/legalPages.store'
import PageLoader from '@/components/Global/PageLoader.vue';
import RecordNotAvailable from '@/components/Global/RecordNotAvailable.vue'
import DeleteModal from '@/components/Modal/DeleteModal.vue';
import { useRouter } from 'vue-router';
import printPdf from '@/composables/printPdf'

const router = useRouter()
const store = useLegalPagesStore()
const id = ref()
const open_model = ref(false)


const deleteRecord = () => {
    store.deleteLegalPage(id.value)
}
let data = ref({
    Search: null,
    PageNo: 1,
    RowNo: 10
})
const pageName = ['Terms&Condition', 'Privacy Policy', 'Cookie Policy', 'Contact', 'About', 'Support']
   function createPDF() {
        var sTable = document.getElementById('printTable').innerHTML;
        printPdf(sTable, "Content Page List")
    }
	
const editRecord = (page) => {
    localStorage.setItem('editLegalPage', JSON.stringify(page))
    router.push({ name: 'EditLegalPage', params: { id: page.Legal_id }})
}
const loadLegalPageListing = () => {
    store.loadLegalPageList(data.value)
}
const searchLegalPageListing = () => {
    if(data.value.Search == ''){
        data.value.Search = null
    }    
    data.value.PageNo = 1
    store.loadLegalPageList(data.value)
}

const ShowModel = () => {
     open_model.value = true
    }

    const closeModel =(event)=>{
     open_model.value=event
    }
 onMounted(() => {
     loadLegalPageListing()
     localStorage.removeItem('editLegalPage')
 }  )
</script>
