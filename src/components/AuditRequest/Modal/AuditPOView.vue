<template>
    <div  class="modal fade show"  style="display:block; background:rgba(0,0,0,0.5); opacity:1 !important" >
        <div class="modal-dialog mt-20" >
            <div class="modal-content">
                <div class="modal-header px-5 py-2">
                    <h5 class="modal-title">PO</h5>
                    <div @click="CloseModel" class="btn btn-icon btn-sm btn-active-light-primary ms-2">
                        <i  class="fa fa-times" aria-hidden="true"></i>
                    </div>
                </div>
                <div class="modal-body">
                    <PageLoader v-if="store.poLoader" />
                    <div v-else-if="store.poDetails.audit_po?.length" class="row">
                        <div class="col-md-12">
                            <h3 class="d-flex mb-3 ">PO#: {{ po[0].aud_PO_code }} </h3>
                            <h3 class="d-flex mb-3"> PO From: {{ po[0].RegD_comp_name }}  </h3>
                            <div class="table-responsive">
                                <table class="table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4">
                                    <tbody>
                                        <tr>
                                            <td>Email:</td>
                                            <td>   
                                                {{ po[0].sender_email }}   
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Head Office Address:</td>
                                            <td>  
                                                {{ po[0].sender_head_office_address }}  
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>PO Title:</td>
                                            <td>  {{ po[0].aud_PO_title }}  </td>
                                        </tr>
                                        <tr>
                                            <td>Date:</td>
                                            <td>  {{ po[0].aud_PO_datetime.substring(0, 10) }}  </td>
                                        </tr>
                                        <tr>
                                            <td>Attachment:</td>
                                            <td> <a :href="po[0]?.aud_po_document" target="_blank">  
                                                {{ docName(po[0].aud_po_document) }}</a>   </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                        </div>
                        <div class="col-md-12">
                            <p v-html="po[0].aud_PO_template"></p>
                        </div>
                        <!-- <div class="col-md-12">
                            <div v-if="store.poDetails.audit_po_paymentd.length" id="table" class="table-editable">
                                <table class="table table-bordered table-responsive-md table-striped text-center">
                                    <thead>
                                        <tr>
                                            <th class="text-center fw-bolder text-gray-800"> {{ store.poDetails.audit_po_paymenth[0].Col_1 }} </th>
                                            <th class="text-center fw-bolder text-gray-800"> {{ store.poDetails.audit_po_paymenth[0].Col_2 }} </th>
                                            <th class="text-center fw-bolder text-gray-800"> {{ store.poDetails.audit_po_paymenth[0].Col_3 }} </th>
                                            <th class="text-center fw-bolder text-gray-800"> {{ store.poDetails.audit_po_paymenth[0].Col_4 }} </th>
                                            <th class="text-center fw-bolder text-gray-800"> {{ store.poDetails.audit_po_paymenth[0].Col_5 }} </th>
                                            <th class="text-center fw-bolder text-gray-800"> {{ store.poDetails.audit_po_paymenth[0].Col_6 }} </th>
                                            <th class="text-center fw-bolder text-gray-800"> {{ store.poDetails.audit_po_paymenth[0].Col_7 }} </th>
                                        </tr>
                                    </thead>
                                    <tbody v-if="store.poDetails.audit_po_paymentd.length">
                                        <tr v-for="value in store.poDetails.audit_po_paymentd" :key="value" >
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
                    <RecordNotAvailable v-else />
                </div>
                <div class="modal-footer px-5 py-2">
                    <button @click="CloseModel" type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import PageLoader from '@/components/Global/PageLoader.vue';
import RecordNotAvailable from '@/components/Global/RecordNotAvailable.vue'
import { useAuditRequestStore } from '@/store/audit.store';
import { computed, defineEmits } from 'vue'
const emit = defineEmits(['Close_audit_po_view_Model'])
const CloseModel = () => {
    emit('Close_audit_po_view_Model', false)
}
const store = useAuditRequestStore()
function docName(str){
    const fname = str.substring(str.lastIndexOf('/') +1 );
    const name = fname.substring(fname.indexOf('-') +2 );
    return name
}
const po = computed(() => {
    return store.poDetails.audit_po
})

console.log(po.value)
</script>

