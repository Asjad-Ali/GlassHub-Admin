<template>
    <div class="col-xl-9 pd-30 bg-w">
        <div class="card-body pb-0">
            <div class="row">
            <div class="col-md-6">
                <h1 class="pb-2"> Star Rating</h1>
            </div>
            <div class="col-md-6 text-right">
                <router-link to="/star-rating/add-star-rating"><button class="btn btn-primary">Add Template</button></router-link>
            </div>
             <div class="col-md-6 offset-md-6 mt-4">
                <div class="position-relative">
                    <span class="svg-icon svg-icon-1 svg-icon-primary position-absolute top-50 translate-middle ms-9 ">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <rect opacity="0.5" x="17.0365" y="15.1223" width="8.15546" height="2" rx="1" transform="rotate(45 17.0365 15.1223)" fill="black" />
                            <path d="M11 19C6.55556 19 3 15.4444 3 11C3 6.55556 6.55556 3 11 3C15.4444 3 19 6.55556 19 11C19 15.4444 15.4444 19 11 19ZM11 5C7.53333 5 5 7.53333 5 11C5 14.4667 7.53333 17 11 17C14.4667 17 17 14.4667 17 11C17 7.53333 14.4667 5 11 5Z" fill="black" />
                        </svg>
                    </span>
                    <div class="d-flex">
                        <input v-on:keyup.enter="searchStarRatingListing" v-model="data.Search" type="text" class="form-control form-control-lg form-control-solid ps-14 mx-2" name="search" placeholder="Search" />
                        <button @click="searchStarRatingListing" class="btn btn-sm btn-primary" >Search</button>
                    </div>
    
                </div>
            </div>
            </div>
            <PageLoader v-if="store.loader" />
            <div v-else>
                <div class="row mt-5">
                    <div class="table-responsive">
                        <table class="table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4">
                            <thead>
                                <tr class="fw-bolder text-muted">
                                    <th class="min-w-130px">SR</th>
                                    <th class="min-w-140px">Date</th>
                                    <th class="min-w-140px">Account Type</th>
                                    <th class="min-w-150px">Category</th>
                                    <th class="min-w-140px">Added by</th>
                                    <th class="min-w-100px text-end">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(star,index) in store.starRatingsList" :key="index">
                                     <td v-if="data.PageNo == 1"><span class="text-muted fw-bold text-muted d-block fs-7">{{index+1}}</span></td>
                                    <td v-else><span class="text-muted fw-bold text-muted d-block fs-7">{{index+1+(10*(data.PageNo-1))}}</span></td>
                                    <!-- <td><span class="text-muted fw-bold text-muted d-block fs-7"> {{ star.AdminRating_id }} </span></td> -->
                                    <td><span class="text-muted fw-bold text-muted d-block fs-7"> {{ star.created_at.substring(0, 10) }} </span></td>
                                    <td>
                                        <span class="text-muted fw-bold text-muted d-block fs-7"> {{ accountType[ star.Account_id ] }} </span>
                                    </td>
                                    <td>
                                        <span class="text-muted fw-bold text-muted d-block fs-7"> {{ star.Cat_name }} </span>
                                    </td>
                                    <td>
                                        <span class="text-muted fw-bold text-muted d-block fs-7"> {{ star.User_fullname }} </span>
                                    </td>
                                    <td class="text-end">
                                        <ul class="userslist_action_icons">
                                            <!-- <li><i class="fa fa-eye cursor-pointer" aria-hidden="true"></i></li> -->
                                            <li><i @click="editStarRating(star)" class="fa fa-pencil-square cursor-pointer" aria-hidden="true"></i></li>
                                            <li @click="ShowModel()"><i @click=" id = star.AdminRating_id " class="fa fa-trash cursor-pointer" aria-hidden="true"></i></li>
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
                            @update:modelValue="loadStarRatingListing"
                            />
                        </div>
                    </div>
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
import DeleteModal from '@/components/Modal/DeleteModal.vue';
import PageLoader from "@/components/Global/PageLoader.vue";
import { useRouter } from "vue-router";
const { useStarRatingStore }=require("@/store/starRating.store");
const { onMounted, ref }=require("@vue/runtime-core");

const store = useStarRatingStore()
const router = useRouter()
const accountType = ['Organization','Supplier','Freelancer','AuditFirm','Regulator']
const id = ref()
const open_model = ref(false)

const deleteRecord = () =>{
    store.deleteStarRatingList(id.value)
}

const editStarRating = (editStarData) =>{
    localStorage.setItem('editStarRating',JSON.stringify(editStarData))
    router.push ({ name: "EditStarRating", params:{id : editStarData.AdminRating_id } })
}
let data = ref({
    Search: null,
    PageNo: 1,
    RowNo: 10
})
const searchStarRatingListing = () =>{
    if(data.value.Search == ''){
        data.value.Search = null
    }
    data.value.PageNo = 1
    loadStarRatingListing()
}

const loadStarRatingListing = () => {
    store.loadStarRatingList(data.value)
}

const ShowModel = () => {
     open_model.value = true
    }

    const closeModel =(event)=>{
     open_model.value=event
    }

onMounted(() =>{
    loadStarRatingListing()
    localStorage.removeItem('editStarRating')
} )
</script>

<style>

</style>