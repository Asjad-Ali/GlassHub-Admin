<template>
    <div class="col-xl-9 pd-30 bg-w">
        <div class="row mb-5">
            <div class="col-md-6">
                <h1 class="pb-2">Disputes</h1>
            </div>
            <ul class="topmenutabs nav nav-tabs nav-line-tabs mb-5 fs-6 cursor-pointer">
                <li @click="loadDisputesStatusList(status.value)"  class="nav-item" v-for="(status,index) in disputesStatus " :key="index"
                :class="{ 'activeTab': activeType == status.value }">
                    <a class="nav-link" ><h5> {{ status.name }} </h5></a>
                </li>
            </ul>
        </div>
        <div class="col-md-6 offset-md-6" >
        <div class="row mb-2">
            <div class="position-relative  mb-2">
                <span class="svg-icon svg-icon-1 svg-icon-primary position-absolute top-50 translate-middle ms-9">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <rect opacity="0.5" x="17.0365" y="15.1223" width="8.15546" height="2" rx="1" transform="rotate(45 17.0365 15.1223)" fill="black" />
                        <path d="M11 19C6.55556 19 3 15.4444 3 11C3 6.55556 6.55556 3 11 3C15.4444 3 19 6.55556 19 11C19 15.4444 15.4444 19 11 19ZM11 5C7.53333 5 5 7.53333 5 11C5 14.4667 7.53333 17 11 17C14.4667 17 17 14.4667 17 11C17 7.53333 14.4667 5 11 5Z" fill="black" />
                    </svg>
                </span>
                <div class="d-flex">
                    <input v-on:keyup.enter="loadDisputeList" v-model="data.Search" type="text" class="form-control form-control-lg form-control-solid ps-14" name="search" placeholder="Search" />
                    <button @click="loadDisputeList"  class="btn btn-sm btn-primary ms-2" >Search</button>
                </div>              
            </div>
        </div>
        </div>
        <PageLoader v-if="store.loader" />
        <div v-else>
            <div v-if="store.disputesList.length">
                <div class="row">
                    <div class="table-responsive">
                        <table class="table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4">
                            <thead>
                                <tr class="fw-bolder text-muted">
                                    <th class="min-w-130px">ID#</th>
                                    <th class="min-w-140px ">TKID</th>
                                    <th class="min-w-140px">Date</th>
                                    <th class="min-w-140px">Raised By</th>
                                    <th class="min-w-140px">Against</th>
                                    <th class="min-w-140px">Reason</th>
                                    <th class="min-w-140px">Status</th>
                                    <th class="min-w-140px text-end">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="dispute in store.disputesList" :key="dispute">
                                    <td>
                                        <span class="text-muted fw-bold text-muted d-block fs-7">{{ dispute.Dispute_id }}</span>
                                    </td>
                                    <td @click="disputeDetail(dispute.Dispute_Code)" class="cursor-pointer">
                                        <span >{{ dispute.Dispute_Code }} </span>
                                    </td>
                                    <td>
                                        <span class="text-muted fw-bold text-muted d-block fs-7"> {{ dispute.dispute_date ? dispute.dispute_date.substring(0, 10) : '' }} </span>
                                    </td>
                                    <td>
                                        <span class="text-muted fw-bold text-muted d-block fs-7"> {{ dispute.RaisedBy_name }} </span>
                                    </td>
                                    <td>
                                        <span class="text-muted fw-bold text-muted d-block fs-7"> {{ dispute.RaisedAgnst_name }} </span>
                                    </td>
                                    <td>
                                        <span class="text-muted fw-bold text-muted d-block fs-7"> {{ dispute.Dispute_Reason }} </span>
                                    </td>
                                    <td>
                                        <select @change="changeStatus($event,dispute.Dispute_Code)" v-model="dispute.Dispute_status" name="" class="form-select form-select-sm form-select-solid" data-control="select1" data-placeholder="Select..." data-allow-clear="true" data-hide-search="true">
                                            <option :value="1">Pending</option>
                                            <option :value="2">In Process</option>
                                            <option :value="3">Resolved</option>
                                        </select>
                                    </td>
                                    <td class="text-muted text-end">
                                        <ul class="userslist_action_icons">
                                            <li class="cursor-pointer" @click="disputeDetail(dispute.Dispute_Code)" ><i class="fa fa-eye me-3" aria-hidden="true"></i></li>
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
                            @update:modelValue="loadLegalPageListing"
                            />
                        </div>
                    </div>
                </div>
            </div>
            <RecordNotAvailable v-else />
        </div>
    </div>
</template>

<script setup>
import VPagination from "@hennge/vue3-pagination";
import "@hennge/vue3-pagination/dist/vue3-pagination.css";
import { useDisputesStore } from '@/store/disputes.store'
import { onMounted, reactive, ref } from '@vue/runtime-core'
import PageLoader from '@/components/Global/PageLoader.vue';
import RecordNotAvailable from '@/components/Global/RecordNotAvailable.vue';
import API from '@/services/API';
const { useRouter }=require("vue-router")

const store = useDisputesStore()
const router = useRouter()
const activeType = ref(null)
const user = JSON.parse(localStorage.getItem('user'))
const disputesStatus = reactive([
    {name: 'All', value: null },
    {name: 'Pending', value: 0 },
    {name: 'InProcess', value: 1 },
    {name: 'Resolved', value: 2 },
])
let data = ref({
    Search: null,
    PageNo: 1,
    RowNo: 10,
    Dispute_status: null
})
const disputeDetail = (DID) => {
    router.push({name: 'DisputeDetail', params: { id: DID } })
}

const changeStatus = async (e, DID) =>{
    const data = {
        Dispute_status: e.target.value,
        Updated_by: user.User.User_id,
        Dispute_id: DID
    }
    await API.post("api/dispute/Updatelisting", data)
 
}

const loadDisputesStatusList = (status) => {
    activeType.value = status,
    data.value.Search = null,
    data.value.Dispute_status = status
    loadDisputeListing()
}
const loadDisputeList = () => {
    if(data.value.Search == ''){
        data.value.Search = null
    }    
    data.value.PageNo = 1
    loadDisputeListing()
}
const loadDisputeListing = () => {
    store.loadDisputesList( data.value )
}
onMounted(() =>{
    loadDisputeListing()
})

</script>

<style>

</style>