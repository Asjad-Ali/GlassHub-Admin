<template>
    
    <div class="modal fade show" tabindex="-1" style="display:block;background:rgba(0,0,0,0.5);opacity:1 !important">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Supplier</h5>

                    
                    <div class="btn btn-icon btn-sm btn-active-light-primary ms-2" @click="SupplercloseModel()">
                        <i class="fa fa-times" aria-hidden="true"></i>
                    </div>
                   
                </div>
                <PageLoader v-if="projectstore.projectSupplier" />
                <div v-else>
                    <div v-if="projectstore.SupplierData.length" class="modal-body">
                        <div class="row">
                            <div class="row">                                
                                    <div class="table-responsive">
                                        
                                        <table class="table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4">
                                            <thead>
                                                <tr class="fw-bolder text-muted">
                                                    <th class="min-w-130px">PRJID</th>
                                                    <th class="min-w-130px">Title</th>
                                                    <th class="min-w-140px">Started by</th>
                                                    <th class="min-w-140px">Start Date</th>
                                                    <th class="min-w-140px">Status</th>
                                                    <th class="min-w-100px">Evaluation</th>
                                                    <th class="text-center min-w-100px">Attachments</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr v-for="user in projectstore.SupplierData" :key="user" >
                                                    <td>{{ user.Bid_id }} </td>
                                                    <td>{{ user.Bid_title }} </td>
                                                    <td> {{ user.RegD_comp_name }} </td>
                                                    <td>{{ user?.start_date?.substring(0,10)}}</td>
                                                    <td>{{ user.Bid_status_name }}</td>
                                                    <td></td>
                                                    <td> <a :href="user.doc_attachment" target="_blank"> {{ user.doc_attachment.substring(user.doc_attachment.indexOf('-') + 2) }} </a> </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>                        
                            </div>
                        </div>                  
                    </div>                  
                </div>  
            </div>
        </div>
    </div>
</template>

<script setup>
import { useProjectStore } from '@/store/projects.store'
import PageLoader from "@/components/Global/PageLoader.vue";
import { defineEmits } from 'vue'

const emit = defineEmits(['SupplercloseModel']);
const projectstore = useProjectStore()

const SupplercloseModel = () => {
    emit('SupplercloseModel', false)
}

</script>
