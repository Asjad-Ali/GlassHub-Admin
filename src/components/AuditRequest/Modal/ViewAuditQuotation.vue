<template>
    <div  class="modal fade show" style="display:block; background:rgba(0,0,0,0.5); opacity:1 !important" >
        <div class="modal-dialog mt-20" >
            <div class="modal-content">
                <div class="modal-header px-5 py-2">
                    <h5 class="modal-title">Audit Quotation</h5>
                    <div class="btn btn-icon btn-sm btn-active-light-primary ms-2"  @click="CloseModel" >
                        <i  class="fa fa-times"></i>
                    </div>
                </div>
                <PageLoader v-if="store.quotationLoader" />
                <div v-else-if="store.qoDetails.audit_qutation?.length"  class="modal-body">
                    <div class="row">
                        <div class="col-md-6">
                            <h3 class="d-flex mb-3 text-muted">Quotation#: {{ store.qoDetails.audit_qutation[0].aud_qutation_code }} </h3>
                            <h3 class="d-flex mb-3"> Quotation From:  {{ store.qoDetails.audit_qutation[0].RegD_comp_name }}  </h3>
                            <div class="table-responsive">
                                <!--begin::Table-->
                                <table class="table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4">
                                    <tbody>
                                        <tr>
                                            <td>Email:</td>
                                            <td>  {{ store.qoDetails.audit_qutation[0].sender_email  }} </td>
                                        </tr>
                                        <tr>
                                            <td>Head Office Address:</td>
                                            <td>   {{ store.qoDetails.audit_qutation[0].sender_head_office_address }}  </td>
                                        </tr>
                                        <tr>
                                            <td>Quotation Title:</td>
                                            <td>  {{ store.qoDetails.audit_qutation[0].aud_qutation_title }}  </td>
                                        </tr>
                                        <tr>
                                            <td>Date:</td>
                                            <td>  {{ store.qoDetails.audit_qutation[0].aud_qutation_datetime.substring(0, 10) }}  </td>
                                        </tr>
                                        <tr>
                                            <td>Attachment: </td>
                                            <td>  
                                                <a :href="store.qoDetails?.audit_qutation[0]?.aud_qutation_document" target="_blank">  
                                                {{ docName(store.qoDetails.audit_qutation[0].aud_qutation_document) }}</a>  
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div class="col-md-12">
                            <p v-html="store.qoDetails.audit_qutation[0].aud_qutation_template"></p>
                        </div>
                        <!-- <div class="col-md-12 mb-10">
                            <div v-if="store.qoDetails.aud_qutation_paymenth.length" id="table" class="table-editable mb-10">
                                <table class="table table-bordered table-responsive-md table-striped text-center">
                                    <thead>
                                        <tr>
                                            <th class="text-center fw-bolder text-gray-800"> {{ store.qoDetails.aud_qutation_paymenth[0].Col_1 }} </th>
                                            <th class="text-center fw-bolder text-gray-800"> {{ store.qoDetails.aud_qutation_paymenth[0].Col_2 }} </th>
                                            <th class="text-center fw-bolder text-gray-800"> {{ store.qoDetails.aud_qutation_paymenth[0].Col_3 }} </th>
                                            <th class="text-center fw-bolder text-gray-800"> {{ store.qoDetails.aud_qutation_paymenth[0].Col_4 }} </th>
                                            <th class="text-center fw-bolder text-gray-800"> {{ store.qoDetails.aud_qutation_paymenth[0].Col_5 }} </th>
                                            <th class="text-center fw-bolder text-gray-800"> {{ store.qoDetails.aud_qutation_paymenth[0].Col_6 }} </th>
                                            <th class="text-center fw-bolder text-gray-800"> {{ store.qoDetails.aud_qutation_paymenth[0].Col_7 }} </th>
                                        </tr>
                                    </thead>
                                    <tbody v-if="store.qoDetails.aud_qutation_paymentd.length">
                                        <tr v-for="value in store.qoDetails.aud_qutation_paymentd" :key="value" >
                                            <td> {{ value.Col_1 }} </td>
                                            <td> {{ value.Col_2 }} </td>
                                            <td> {{ value.Col_3 }} </td>
                                            <td> {{ value.Col_4 }} </td>
                                            <td> {{ value.Col_5 }} </td>
                                            <td> {{ value.Col_6 }} </td>
                                            <td> {{ value.Col_7 }} </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div> -->

                    </div>
                </div>
                <RecordNotAvailable v-else />
                <div class="modal-footer px-5 py-2">
                    <button @click="CloseModel" type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { defineEmits } from 'vue'
import { useAuditRequestStore } from '@/store/audit.store';
import PageLoader from "@/components/Global/PageLoader.vue";
import RecordNotAvailable from "@/components/Global/RecordNotAvailable.vue";
const emit = defineEmits(['closeViewQuotationModel'])
const CloseModel = () => {
    emit('closeViewQuotationModel', false)
}
const store = useAuditRequestStore()
function docName(str){
    const fname = str.substring(str.lastIndexOf('/') +1 );
    const name = fname.substring(fname.indexOf('-') +2 );
    return name
}
</script>