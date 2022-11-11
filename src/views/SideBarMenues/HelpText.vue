<template>
    <div class="col-xl-9 pd-30 bg-w">
        <div class="card-body pb-0">
            <div class="row mb-5">
                <div class="col-md-6">
                    <h1 class="pb-2"> Help Text</h1>
                </div>
                <div class="col-md-6 text-right">
                    <router-link to="/help-text/add-help-text"><button class="btn btn-primary">Add</button></router-link>
                </div>
            </div>
            <div class="row mb-2">
                <div class="col-md-6">
                    <div class="d-flex">
                        <label for="row#" class="me-2 mt-4">Enter Row</label>
                        <input v-on:keyup.enter="searchHelpTextListing" v-model="data.RowNo" type="text" class="form-control form-control-lg form-control-solid w-25" name="row#" placeholder="Row#" />
                        <button @click="searchHelpTextListing"  class="btn btn-sm btn-primary mx-2" > Get </button>
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
                            <input v-on:keyup.enter="searchHelpTextListing" v-model="data.Search" type="text" class="form-control form-control-lg form-control-solid ps-14" name="search" placeholder="Search" />
                            <button @click="searchHelpTextListing"  class="btn btn-sm btn-primary ms-2" >Search</button>
                        </div>                  
                    </div>
                </div>
            </div>
            <div class="row">
                <PageLoader v-if="store.btnLoading" />
                <div v-else>
                    <div v-if="store.helpTextList.length" >
                        <div  class="row">
                            <div id="printTable" class="table-responsive">
                                <table class="table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4">
                                    <thead>
                                        <tr class="fw-bolder text-muted">
                                            <th class="min-w-130px">ID</th>
                                            <th class="min-w-130px">Date</th>
                                            <th class="min-w-140px">Accounts Type </th>
                                            <th class="min-w-140px">Page </th>
                                            <th class="min-w-140px">Title</th>
                                            <th class="min-w-140px">Data</th>
                                            <th class="min-w-140px text-end">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="issue in store.helpTextList" :key="issue">
                                            <td><span class="text-muted fw-bold text-muted d-block fs-7">{{issue.H_id}}</span></td>
                                            <td><span class="text-muted fw-bold text-muted d-block fs-7">{{issue.CreatedDate.substring(0, 10)}}</span></td>
                                            <td><span class="text-muted fw-bold text-muted d-block fs-7">{{ accountType[issue.Account_id]}}</span></td>
                                            <td><span class="text-muted fw-bold text-muted d-block fs-7">{{issue.H_page}}</span></td>
                                            <td>
                                                <span class="text-muted fw-bold text-muted d-block fs-7">{{issue.H_title}}</span>
                                            </td>
                                            <td>
                                                <span v-html="issue.H_description" class="text-muted fw-bold text-muted d-block fs-7"> </span>
                                            </td>
                                            <td class="text-end">
                                                <ul class="userslist_action_icons">
                                                    
                                                    <li><i @click="editHelpText(issue)" class="fa fa-pencil-square cursor-pointer" aria-hidden="true"></i></li>
                                                    <li @click="ShowModel()"><i @click="id = issue.H_id " class="fa fa-trash cursor-pointer" aria-hidden="true"></i></li>
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
                                @update:modelValue="loadHelpTextListing"
                                />
                            </div>
                        </div>
                    </div>
                    <record-not-available v-else />
                </div>
            </div>
        </div>
    </div>

     <teleport to="body">
        <DeleteModal  v-if="open_model" @deleteRecord="deleteRecord"  @closeModel="closeModel" />
        </teleport>
</template>

<script setup>
import VPagination from "@hennge/vue3-pagination";
import "@hennge/vue3-pagination/dist/vue3-pagination.css";
import { onMounted, ref } from '@vue/runtime-core'
import { useHelpTextStore } from '@/store/helpText.store'
import DeleteModal from '@/components/Modal/DeleteModal.vue';
import PageLoader from '@/components/Global/PageLoader.vue';
import RecordNotAvailable from '@/components/Global/RecordNotAvailable.vue';
import printPdf from '@/composables/printPdf'
import { useRouter } from 'vue-router';


const accountType = ["Organization", "Suppliers", "Freelancers", "Audit Firms", "Regulator" ]
const router = useRouter()
const store = useHelpTextStore()
const id = ref()
const open_model = ref(false)


const deleteRecord = () => {
    store.deleteHelpText(id.value)
}
const editHelpText = (issue) => {
    console.log(issue)
    localStorage.setItem('editHelpText',JSON.stringify(issue))
    router.push({name: "EditHelpText", params: { id: issue.H_id }})
}
let data = ref({
    Search: null,
    PageNo: 1,
    RowNo: 10
})
const loadHelpTextListing = () => {
    store.loadHelpTextList(data.value)
}
const searchHelpTextListing = () => {
    if(data.value.Search == ''){
        data.value.Search = null
    }
    data.value.PageNo = 1
    loadHelpTextListing()
}

const ShowModel = () => {
     open_model.value = true
    }

    const closeModel =(event)=>{
     open_model.value=event
    }
 onMounted(() => {
     loadHelpTextListing()
     localStorage.removeItem('editHelpText')
 }  )


   function createPDF() {
        var sTable = document.getElementById('printTable').innerHTML;
        printPdf(sTable, "Help Text List")
    }



</script>

<style>

</style>