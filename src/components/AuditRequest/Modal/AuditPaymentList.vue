<template>
  <div class="modal fade show"  style="display:block; background:rgba(0,0,0,0.5); opacity:1 !important">
        <div class="modal-dialog mt-20">
            <div class="modal-content">
                <div class="modal-header px-5 py-2">
                    <h5 class="modal-title">Payments History</h5>
                    <div @click="CloseModel" class="btn btn-icon btn-sm btn-active-light-primary ms-2" data-bs-dismiss="modal" aria-label="Close">
                        <i class="fa fa-times" aria-hidden="true"></i>
                    </div>
                </div>
                <div class="modal-body">
                    <PageLoader style="height:30vh !important"  v-if="store.paymentLoader" />
                    <div v-else>
                        <div v-if="store.auditPaymentList.length" class="table-responsive project_payments_history">        
                            <table class="table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4">
                                <thead>
                                    <tr>
                                        <th class="fw-bolder text-gray-800">SR</th>
                                        <th class="fw-bolder text-gray-800">Date</th>
                                        <th class="fw-bolder text-gray-800">Methods</th>
                                        <th class="fw-bolder text-gray-800">PIN/ID</th>
                                         <th class="fw-bolder text-gray-800">Image</th>
                                        <th class="fw-bolder text-gray-800">Total Amount</th>
                                        <th class="fw-bolder text-gray-800">Status Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(payment,index) in store.auditPaymentList" :key="index" >
                                        <td> {{ index+1 }} </td>
                                        <td> {{ payment.aud_Pay_start_date.substring(0, 10) }} </td>
                                        <td> {{ payment.aud_Pay_method_name }} </td>
                                        <td>{{ payment.Istrument_no }}</td>
                                        <td ><a v-if="payment.aud_Pay_Attachment" :href="payment.aud_Pay_Attachment" target="_blank"> {{ docName(payment.aud_Pay_Attachment) }} </a></td>
                                        <td>{{ payment.Amount }}</td>
                                        <td>
                                            <span v-if="payment.pay_confirm == 0" class="badge badge-success">Received</span>
                                            <span v-else class="badge badge-success">Received</span>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <RecordNotAvailable style="height: 50vh !important" v-else />
                    </div>
                </div>
                <div class="modal-footer px-5 py-2">
                    <button @click="CloseModel" type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { defineEmits } from "vue";
import RecordNotAvailable from "@/components/Global/RecordNotAvailable.vue";
import PageLoader from "@/components/Global/PageLoader.vue";
import { useAuditRequestStore } from "@/store/audit.store";
const emit = defineEmits(['closePaymentsList'])
const CloseModel = () => {
    emit('closePaymentsList', false)
}
const store = useAuditRequestStore()

function docName(str){
    const fname = str.substring(str.lastIndexOf('/') +1 );
    const name = fname.substring(fname.indexOf('-') +2 );
    return name
}


</script>

<style>

</style>