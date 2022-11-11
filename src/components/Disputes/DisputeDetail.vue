<template>
    <div class=" col-xl-9 pd-30 bg-w bg-lg py-5 py-lg-5" id="kt_toolbar">
        <div id="kt_toolbar">
                <div class="card-body">
                    <PageLoader v-if="store.loader" />
                    <div v-else class="d-flex flex-column flex-xl-row p-0">
                        <div class="flex-lg-row-fluid me-xl-15 mb-20 mb-xl-0">
                            <div class="mb-0">
                                <div class="mb-15">
                                    <div class="row mb-10">
                                        <div class="col-md-12">
                                            <router-link to="/disputes" class="fa fa-arrow-left " ></router-link>
                                        </div>
                                    </div>
                                    <div class="row mb-2">
                                        <div class="col-md-5 fv-row mb-5">
                                            <label class="fs-6 fw-bold mb-2">Assign To</label>
                                            <div v-if="store.adminListLoader" class="text-center"> <span class="spinner-border"></span></div>
                                            <select v-else @change="assignTo($event)" 
                                            class="form-select form-select-solid" data-control="select2" data-hide-search="true" data-placeholder="Assign to" name="user">
                                                <option v-for="admin in store.AdminUserList" :value="store.disputeDetail[0].Assign_To" :key="admin"> {{ admin.User_fullname }} </option>
                                            </select>
                                        </div>
                                        <div class="col-sm-4 fv-row mb-4">
                                            <label class="fs-6 fw-bold mb-2">Status</label>
                                            <select  @change="changeStatus($event)" v-model="store.disputeDetail[0].Dispute_status" class="form-select form-select-solid" data-control="select2" data-placeholder="Status" data-hide-search="true">
                                                <option :value="index" v-for="(status,index) in statusTable" :key="index"> {{status}} </option>
                                            </select>
                                        </div>
                                        <div class="col-sm-3 fv-row mb-3">
                                            <label class="fs-6 fw-bold mb-2">Priority</label>
                                            <select @change="changePriority($event)" v-model="store.disputeDetail[0].Dispute_Prority" class="form-select form-select-solid" data-control="select2" data-placeholder="Open" data-hide-search="true">
                                                <option v-for="priority in priorityTable" :key="priority" :value="priority.value" selected="selected"> {{ priority.name }}</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="row mb-7">
                                        <div class="col-md-6 fv-row mb-6">
                                            <label class="fs-6 fw-bold mb-2">Raised by</label>
                                            <input v-model="store.disputeDetail[0].RaisedBy_name"  class="form-control form-control-solid" name="message" readonly>
                                        </div>
                                        <div class="col-md-6 fv-row mb-6">
                                            <label class="fs-6 fw-bold mb-2">Raised Against</label>
                                            <input v-model="store.disputeDetail[0].RaisedAgnst_name"  class="form-control form-control-solid" name="message"  readonly>
                                        </div>
                                    </div>
                                    <div class="mb-0">
                                        <div class="col-md-3 fv-row mb-3">
                                            <label class="fs-6 fw-bold mb-2">Message Send to</label>
                                            <select class="form-select form-select-solid" data-control="select2" data-placeholder="Open" data-hide-search="true">
                                                <option value="1" selected="selected">Both</option>
                                                <option value="2">Supplier 1</option>
                                                <option value="3">Supplier 2</option>
                                            </select>
                                            </div>
                                            <textarea class="form-control form-control-solid placeholder-gray-600 fw-bolder fs-4 ps-9 pt-7" rows="6" name="message" placeholder="{{COMPANY_Name}}'s Message"></textarea>
                                            <button type="submit" class="btn btn-primary mt-n20 mb-20 position-relative float-end me-7">Send</button>
                                        </div>
                                </div>
                                <DisputeDemoChat />
                            </div>
                        </div>

                        <div class="flex-column flex-lg-row-auto w-100 mw-lg-300px mw-xxl-350px">
                            <div class="position-relative mb-15">
                                <span class="svg-icon svg-icon-1 svg-icon-primary position-absolute top-50 translate-middle ms-9">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                        <rect opacity="0.5" x="17.0365" y="15.1223" width="8.15546" height="2" rx="1" transform="rotate(45 17.0365 15.1223)" fill="black" />
                                        <path d="M11 19C6.55556 19 3 15.4444 3 11C3 6.55556 6.55556 3 11 3C15.4444 3 19 6.55556 19 11C19 15.4444 15.4444 19 11 19ZM11 5C7.53333 5 5 7.53333 5 11C5 14.4667 7.53333 17 11 17C14.4667 17 17 14.4667 17 11C17 7.53333 14.4667 5 11 5Z" fill="black" />
                                    </svg>
                                </span>
                                <!--end::Svg Icon-->
                                <div class="d-flex">
                                    <input  type="text" class="form-control form-control-lg form-control-solid ps-14" name="search" placeholder="Search" />
                                    <button  class="btn btn-sm btn-primary ms-2" >Search</button>
                                </div>                             
                                </div>
                            <div class="card-rounded bg-primary bg-opacity-5 p-10 mb-10">
                                <!--begin::Title-->
                                <h2 class="text-dark fw-bolder mb-11">Dispute Details</h2>
                                <div class="d-flex align-items-center mb-5">
                                    <div class="d-flex flex-column">
                                        <h5 class="text-gray-800 fw-bolder">TKID</h5>
                                        <p> {{ store.disputeDetail[0].Dispute_Code }} </p>

                                    </div>
                                </div>
                                <div class="d-flex align-items-center mb-5">
                                    <div class="d-flex flex-column">
                                        <h5 class="text-gray-800 fw-bolder">Date</h5>
                                        <p>
                                            {{ store.disputeDetail[0].dispute_date ? store.disputeDetail[0].dispute_date.substring(0, 10) : 'Date not Exist' }}

                                        </p>

                                    </div>
                                </div>
                                <div class="d-flex align-items-center mb-5">
                                    <div class="d-flex flex-column">
                                        <h5 class="text-gray-800 fw-bolder">Raised By</h5>
                                        <p>
                                            {{ store.disputeDetail[0].RaisedBy_name }}
                                        </p>
                                    </div>
                                </div>
                                <div class="d-flex align-items-center mb-5">
                                    <div class="d-flex flex-column">
                                        <h5 class="text-gray-800 fw-bolder">Raised Against</h5>
                                        <p> {{ store.disputeDetail[0].RaisedAgnst_name }} </p>

                                    </div>
                                    <!--end::Info-->
                                </div>

                            </div>
                            <div class="card-rounded bg-primary bg-opacity-5 p-10 mb-10">
                                <div class="d-flex align-items-center mb-5">

                                    <h5 class="text-gray-800 fw-bolder"> Status</h5>
                                    <select v-model="store.disputeDetail[0].Dispute_status" class="form-select form-select-sm form-select-solid" data-control="select2" data-placeholder="Select..." data-allow-clear="true" data-hide-search="true">
                                        <option :value="index" v-for="(status,index) in statusTable" :key="index"> {{status}} </option>
                                    </select>
                                </div>
                                <div class="d-flex align-items-center mb-5 Accept box">

                                    <select v-model="updateDispute.Resolved_for" class="form-select form-select-sm form-select-solid" data-control="select2" data-placeholder="Select..." data-allow-clear="true" data-hide-search="true">
                                        <option value="" disabled>Select Type</option>
                                        <option :value="1">Raised By</option>
                                        <option :value="2">Raised Against</option>
                                    </select>
                                </div>
                                <div class="text-danger"> {{ updateDisputeError.Resolved_for }} </div>
                                <div class="d-flex align-items-center mb-5">
                                    <h5 class="text-gray-800 fw-bolder">Resolved For</h5>
                                    <select v-model="updateDispute.Resolved_forName" class="form-select form-select-sm form-select-solid" data-control="select2" data-placeholder="Select..." data-allow-clear="true" data-hide-search="true">
                                        <option value="" disabled> Select Name </option>
                                        <option :value="store.disputeDetail[0].RaisedBy_name"> {{store.disputeDetail[0].RaisedBy_name }} </option>
                                        <option :value="store.disputeDetail[0].RaisedAgnst_name" selected> {{ store.disputeDetail[0].RaisedAgnst_name }} </option>
                                    </select>
                                </div>
                                <div class="text-danger"> {{ updateDisputeError.Resolved_forName }} </div>
                                <div class="d-flex align-items-center mb-5">
                                    <h5 class="text-gray-800 fw-bolder">comment</h5>
                                    <textarea v-model="updateDispute.Admin_comment" class="form-control form-control-solid placeholder-gray-600 fw-bolder fs-4 ps-9 pt-7" rows="3" name="message" placeholder="Admin comment"></textarea>
                                </div>
                                <button :disabled="!Object.values(updateDisputeError).every( val => !val)" @click="onSubmit" type="button" class="btn btn-primary text-right">
                                <span style="width: 1.5rem; height: 1.5rem;" v-if="store.btnLoader" class="spinner-border p-0 mx-5"></span>
                                <span v-else>Submit</span></button>
                            </div>
                        </div>
                    </div>
                </div>
        </div>
    </div>
</template>

<script setup>
import API from "@/services/API";
import PageLoader from "@/components/Global/PageLoader.vue";
import DisputeDemoChat from "./DisputeDemoChat.vue";
const { useDisputesStore }=require("@/store/disputes.store")
const { onBeforeMount, reactive, computed, watch }=require("@vue/runtime-core")
const { useRoute }=require("vue-router")

const route = useRoute()
const store = useDisputesStore()
const user = JSON.parse(localStorage.getItem('user'))
const DID = route.params.id
const currentStatus = computed(() => {
    if(store.disputeDetail.length){
        return store.disputeDetail[0].Dispute_status
    }
})
const statusTable = ['Open', 'Pending', 'In Process', 'Resolved' ]
const priorityTable = [
    {name: "Low", value: 1 },
    {name: "Medium", value: 2 },
    {name: "High", value: 3 },
    {name: "Urgent", value: 4 }
]

const updateDispute = reactive({
    Dispute_status: currentStatus,
    Dispute_Code: DID,
    Updated_by: user.User.User_id,
    Admin_comment: '',
    Resolved_for: '',
    Resolved_forName:''

})
const updateDisputeError = reactive({
    Resolved_for: '',
    Resolved_forName:''
})

watch(updateDispute, (current) => {
    if(current.Resolved_for){
        updateDisputeError.Resolved_for = null
    }
    if(current.Resolved_forName){
        updateDisputeError.Resolved_forName = null
    }
})


const assignTo = async (e) => {
    const data = {
        Dispute_Code: DID,
        Updated_by: user.User.User_id,
        Assign_To: e.target.value
    }
    console.log(data)
    const response = await API.post("api/dispute/updateAssign_To",data)
    if(response.status == 200 ){
        store.disputeDetail[0].Assign_To = e.target.value
    }
}
const changeStatus = async (e) => {
    currentStatus.value = e.target.value
    const data = {
        Dispute_Code: DID,
        Updated_by: user.User.User_id,
        Dispute_status: e.target.value
    }
    console.log(data)
    const response = await API.post("api/dispute/updateStatus",data)
    if( response.status == 200 ) {
        store.disputeDetail[0].Dispute_status = e.target.value
        const index = computed(() => store.disputesList.findIndex(dis => dis.Dispute_Code == DID) )
        store.disputesList[index.value].Dispute_status = e.target.value
    }
}
const changePriority = async (e) => {
    const data = {
        Dispute_Code: DID,
        Updated_by: user.User.User_id,
        Dispute_Pro_name: priorityTable[e.target.value-1].name,
        Dispute_Prority: e.target.value
    }
    console.log(data)
    const response = await API.post("api/dispute/updateProirity",data)
    if( response.status == 200 ){
        store.disputeDetail[0].Dispute_Prority = e.target.value
    }
}

const onSubmit = () => {
    if(updateDispute.Resolved_for){
            if(updateDispute.Resolved_forName){
                console.log(updateDispute)
                store.updateDisputeDetail(updateDispute)
            }else{
                updateDisputeError.Resolved_forName = "Name is required"
            }
    }else{
        updateDisputeError.Resolved_for = "Type is required"
    }
}


const COMPANY_Name = computed(() => process.env.VUE_APP_COMPANY_Name ); 
console.log("Company name",COMPANY_Name.value)

onBeforeMount(() => {
    store.loadDisputeDetail(route.params.id)
    store.loadDisputeAdminUserList()

})

</script>