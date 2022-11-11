<template>
     <div class="modal fade show" style="display:block;background:rgba(0,0,0,0.5);opacity:1 !important">
        <div class="modal-dialog mt-15">
            <div class="modal-content">
                <div class="modal-header px-5 py-2">
                    <h5 class="modal-title">RFQ</h5>
                    <div class="btn btn-icon btn-sm btn-active-light-primary ms-2" @click="Close_Model()">
                        <i class="fa fa-times" aria-hidden="true"></i>
                    </div>
                </div>
                <div class="modal-body">
                    <PageLoader v-if="store.rfqViewLoader" />
                    <div v-else-if="store.auditRFQ.control?.length" class="row mb-5">
                        <div class="col-md-12">
                            <table class="table table-row-dashed table-row-gray-300 gs-0 gy-4 ">
                                <tbody>
                                    <tr class="response">
                                        <td class="response">
                                            <div class="row px-5">
                                                <div class="col-md-12 mb-3">
                                                    <h4 class="text-muted">Controls {{currentComp+1}}/{{totalCom}}</h4>
                                                </div>
                                                <div class="col-md-6">
                                                    <label class="form-label text-muted"> Control no </label>
                                                    <p>{{ store.auditRFQ.control[currentComp].Control_no }}</p>
                                                </div>
                                                <div class="col-md-6">
                                                    <label class="form-label text-muted">Refrence no</label>
                                                    <p>{{ store.auditRFQ.control[currentComp].Ref_no }}</p>
                                                </div>
                                                <div class="col-md-6">
                                                    <label class="form-label text-muted">Source</label>
                                                    <p>{{ store.auditRFQ.control[currentComp].Source }}</p>
                                                </div>
                                                <div class="col-md-12">
                                                    <label class="form-label text-muted">Control statement</label>
                                                    <p> {{ store.auditRFQ.control[currentComp].Ctrl_statement }} </p>
                                                </div>
                                                <div class="col-md-12 mb-3">
                                                    <span class="badge badge-light m-5" style="background-color: #5241a1;color:white">Compliance</span>
                                                    <span class="badge badge-light m-5">Non Compliance</span>
                                                    <span class="badge badge-light m-5">Not Acceptable</span>
                                                </div>
                                                <div class="col-md-6 text-start mb-3">
                                                    <button  @click="currentComp = currentComp-1" class="btn btn-secondary" :class="{'cursor-none': currentComp == 0}" >Previous</button>
                                                </div>
                                                <div class="col-md-6 text-end mb-3">
                                                    <button @click="currentComp = currentComp+1" class="btn btn-secondary" :class="{'cursor-none': currentComp+1 == totalCom}" >Next</button>
                                                </div>
                                            </div>

                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div class="col-md-12">
                            <h3 class="d-flex mb-3 text-muted">RFQ#: {{ store.auditRFQ.audit_rfq[0].Aud_RFQ_code }} </h3>
                            <h3 class="d-flex mb-3"> RFQ From:  {{ store.auditRFQ.audit_rfq[0].RegD_comp_name }}  </h3>
                            <div >
                                <!--begin::Table-->
                                <table class="table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4">
                                    <tbody>
                                        <tr>
                                            <td>Email:</td>
                                            <td>   {{ store.auditRFQ.audit_rfq[0].sender_email }}   </td>
                                        </tr>
                                        <tr>
                                            <td>Head Office Address:</td>
                                            <td>  {{ store.auditRFQ.audit_rfq[0].sender_address }}  </td>
                                        </tr>
                                        <tr>
                                            <td>RFQ Title:</td>
                                            <td>  {{ store.auditRFQ.audit_rfq[0].Aud_RFQ_title }}  </td>
                                        </tr>
                                        <tr>
                                            <td>RFQ Date:</td>
                                            <td>  {{ store.auditRFQ.audit_rfq[0].Aud_RFQ_datetime.substring(0, 10) }}  </td>
                                        </tr>
                                        <tr>
                                            <td>End Date:</td>
                                            <td>  {{ store.auditRFQ.audit_rfq[0].end_date?.substring(0, 10) }}  </td>
                                        </tr>
                                        <tr>
                                            <td>Attachment: </td>
                                            <td>  
                                                <a :href="store.auditRFQ.audit_rfq[0]?.aud_rfq_document" target="_blank">  
                                                {{ docName(store.auditRFQ.audit_rfq[0].aud_rfq_document) }}</a>  
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div class="col-md-12">
                            <p>Description:</p>
                            <p v-html="store.auditRFQ.audit_rfq[0].Aud_RFQ_template"></p>
                        </div>
                    </div>
                    <RecordNotAvailable v-else />
                </div>
                <div class="modal-footer px-5 py-2">
                    <button @click="Close_Model()" type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>

</template>

<script setup>
import { computed, defineEmits, ref } from 'vue'
import PageLoader from "@/components/Global/PageLoader.vue";
import RecordNotAvailable from "@/components/Global/RecordNotAvailable.vue";
import { useAuditRequestStore } from '@/store/audit.store';

const store = useAuditRequestStore()
const emit = defineEmits(['closeViewAuditRFQModel'])
const Close_Model = () => {
    emit('closeViewAuditRFQModel', false)
}
const totalCom = computed(() => {
    return store.auditRFQ.control.length
})
const currentComp = ref(0)
function docName(str){
    const fname = str.substring(str.lastIndexOf('/') +1 );
    const name = fname.substring(fname.indexOf('-') +2 );
    return name
}
</script>