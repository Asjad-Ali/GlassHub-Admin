<template>
<div class="col-xl-9 pd-30 bg-w">
    <div class="col-md-12">
        <div class="row pb-5">
            <div class="col-md-4">
                <!--<h5 class="text-muted">Lorem ipsum dolor sit amet, consectetur adipiscing</h5>-->
                <h5>How often do you get them tested? </h5>
                <p class="response"><b>Supplier Response:</b> Monthly</p>
                <span class="dateandtime">31-01-2022 | 15:10 PM</span>
            </div>
            <div class="col-md-6 text-right">
                <input type="text" class="form-control form-control-lg form-control-solid">
                <span class="mt-2 badge badge-primary">Add Note</span>
            </div>
            <div class="col-md-2 text-right">
                <select name="" class="form-select form-select-sm form-select-solid" data-control="select1" data-placeholder="Select..." data-allow-clear="true" data-hide-search="true">
                    <option>Select...</option>
                    <option value="1">Accepted</option>
                    <option value="1">Rejected</option>
                    <option value="3">Required Details</option>
                </select>
            </div>
        </div>
        <div class="separator separator-dashed border-gray-300 my-1"></div>
        <div class="row pb-5">
            <div class="col-md-4">
                <h5>How often do you get them tested? </h5>
                <p class="response"><b>Supplier Response:</b> Monthly</p>
                <span class="dateandtime">31-01-2022 | 15:10 PM</span>
            </div>
            <div class="col-md-6 text-right">
                <input type="text" class="form-control form-control-lg form-control-solid">
                <span class="mt-2 badge badge-primary">Add Note</span>
            </div>
            <div class="col-md-2 text-right">
                <select name="" class="form-select form-select-sm form-select-solid" data-control="select1" data-placeholder="Select..." data-allow-clear="true" data-hide-search="true">
                    <option>Select...</option>
                    <option value="1">Accepted</option>
                    <option value="1">Rejected</option>
                    <option value="3">Required Details</option>
                </select>
            </div>
        </div>
        <div class="separator separator-dashed border-gray-300 my-1"></div>
        <div class="row pb-5">
            <div class="col-md-4">
                <h5>How often do you get them tested? </h5>
                <p class="response"><b>Supplier Response:</b> Monthly</p>
                <span class="dateandtime">31-01-2022 | 15:10 PM</span>
            </div>
            <div class="col-md-6 text-right">
                <input type="text" class="form-control form-control-lg form-control-solid">
                <span class="mt-2 badge badge-primary">Add Note</span>
            </div>
            <div class="col-md-2 text-right">
                <select name="" class="form-select form-select-sm form-select-solid" data-control="select1" data-placeholder="Select..." data-allow-clear="true" data-hide-search="true">
                    <option>Select...</option>
                    <option value="1">Accepted</option>
                    <option value="1">Rejected</option>
                    <option value="3">Required Details</option>
                </select>
            </div>
        </div>
        <div class="separator separator-dashed border-gray-300 my-1"></div>
    </div>
    <div class="col-md-4">                                
    </div>

    <div class="col-md-12">  
        <div class="table-responsive">
                <!--begin::Table-->
                <table class="table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4">
                    <thead>
                        <tr>
                            <th class="fw-bolder text-gray-800">Title</th>
                            <th class="fw-bolder text-gray-800">Image</th>
                            <th class="fw-bolder text-gray-800">Status</th>
                            <th class="fw-bolder text-gray-800">Regulator Verification</th>
                            <th class="fw-bolder text-gray-800">Remarks</th>
                            <th class="fw-bolder text-gray-800">Regulator Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>ISO9001</td>
                            <td>
                                <span data-bs-toggle="modal" data-bs-target="#viewimage">View</span>
                            </td>
                            <td>
                                <select name="" class="form-select form-select-sm form-select-solid" data-control="select1" data-placeholder="Select..." data-allow-clear="true" data-hide-search="true">
                                    <option></option>
                                    <option value="1" selected>Pending</option>
                                    <option value="1">Re Submit</option>
                                    <option value="2">Verified</option>
                                    <option value="4">Rejected</option>
                                </select>
                            </td>
                            <td>
                                <div class="d-flex align-items-sm-center mb-2">
                                    <div data-bs-toggle="modal" data-bs-target="#messagetoregulator" class="d-flex align-items-center flex-row-fluid flex-wrap">
                                        <div class="flex-grow-1 me-2">
                                            <p><input class="form-check-input" type="radio"><span class="pl-5">Required</span></p>

                                        </div>
                                    </div>
                                </div>
                                <div class="d-flex align-items-sm-center mb-2">
                                    <div class="d-flex align-items-center flex-row-fluid flex-wrap">
                                        <div class="flex-grow-1 me-2">
                                            <p><input class="form-check-input" type="radio"><span class="pl-5">Not Required</span></p>

                                        </div>
                                    </div>
                                </div>
                            </td>
                            <td><a href="audit_remarks.html" target="_blank">View</a></td>
                            <td>
                                <select name="" class="form-select form-select-sm form-select-solid" data-control="select1" data-placeholder="Select..." data-allow-clear="true" data-hide-search="true">
                                    <option></option>
                                    <option value="2">Pending</option>
                                    <option value="2">Verified</option>
                                    <option value="4" selected>Rejected</option>
                                </select>
                            </td>
                        </tr>
                    </tbody>
            </table>
        </div>
        
        <div data-bs-toggle="modal" data-bs-target="#askformoredocs" class="d-flex align-items-sm-center mb-2">
            <div class="d-flex align-items-center flex-row-fluid flex-wrap">
                <div class="flex-grow-1 me-2">
                    <p @click="openAskForDocumentModel"><input class="form-check-input" type="radio"><span class="pl-5">Ask for more documents</span></p>
                </div>
            </div>												
        </div>
        
    </div>
    <teleport to="body">
        <AskForDocument  v-if="openAskForDocument"  @closeAskForDocumentModel="closeAskForDocumentModel" />
    </teleport>
</div>
</template>

<script setup>
import AskForDocument from '@/components/AuditRequest/Modal/AskForDocuments.vue'
import { ref } from 'vue';

const openAskForDocument = ref(false)

// open profile model
const openAskForDocumentModel = () => {
    openAskForDocument.value = true
};
const closeAskForDocumentModel =(event)=>{
    openAskForDocument.value=event
}
</script>