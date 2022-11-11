<template>
  
  <div class="modal fade show" tabindex="-1"   style="display:block;background:rgba(0,0,0,0.5);opacity:1 !important">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Project Detail</h5>

                    <!--begin::Close-->
                    <div class="btn btn-icon btn-sm btn-active-light-primary ms-2" @click="closeModel()">
                        <i class="fa fa-times" aria-hidden="true"></i>
                    </div>
                    <!--end::Close-->
                </div>

                <div v-if="projectstore.ViewData != {}" class="modal-body">
                    <div class="row">
                        <div class="row">                                
                            <div class="table-responsive">
                                <!--begin::Table-->
                                <table class="table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4">
                                    <thead>
                                        <tr class="fw-bolder text-muted">
                                            <th class="min-w-130px">ID</th>        
                                            <th class="min-w-150px">Project</th>
                                            <th class="min-w-100px">Authorized Audit Firms</th>
                                            <th class="min-w-140px">Compliance</th>
                                            <th class="min-w-100px">Attachments</th>
                                            <th class="min-w-100px">Project Details</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>{{ projectstore.ViewData.Bid_id }} </td>
                                            <td> {{ projectstore.ViewData.Bid_title }} </td>
                                            <td>{{ projectstore.ViewData.Auditfirm_name }}</td>
                                            <td>{{ projectstore.ViewData.Compliance_name }}</td>
                                            <td> <a :href="projectstore.ViewData.doc_attachment" target="_Blank"> {{ projectstore.ViewData.doc_attachment?.substring(projectstore.ViewData.doc_attachment.indexOf('-') + 2) }} </a> </td>
                                            <td v-html="projectstore.ViewData.Bid_detail"> </td>
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

</template>

<script setup>
import { defineEmits } from 'vue'
import { useProjectStore } from '@/store/projects.store'

const emit = defineEmits(['closeModel']);
const projectstore = useProjectStore()

const closeModel = () => {
    emit('closeModel', false)
}

</script>

