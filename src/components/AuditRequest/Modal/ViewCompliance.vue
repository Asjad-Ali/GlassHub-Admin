<template>
  <div class="modal fade show"  style="display:block; background:rgba(0,0,0,0.5); opacity:1 !important">
         <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Compliance Criteria</h5>
                    <div @click="CloseModel" class="btn btn-icon btn-sm btn-active-light-primary ms-2" data-bs-dismiss="modal" aria-label="Close">
                        <i class="fa fa-times" aria-hidden="true"></i>
                    </div>
                </div>

                <div class="modal-body">
                    <div class="table-responsive">
                        <table class="table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4">
                            <tbody>
                                <tr>
                                    <td><label class="form-label">Lorem ipsum dolor sit amet, consectetur adipiscing</label></td>
                                </tr>
                                <tr>
                                    <td><label class="form-label">Lorem ipsum dolor sit amet, consectetur adipiscing</label></td>
                                </tr>
                                <tr>
                                    <td><label class="form-label">Lorem ipsum dolor sit amet, consectetur adipiscing</label></td>
                                </tr>
                                <tr>
                                    <td><label class="form-label">Lorem ipsum dolor sit amet, consectetur adipiscing</label></td>
                                </tr>
                                <tr>
                                    <td><label class="form-label">Lorem ipsum dolor sit amet, consectetur adipiscing</label></td>
                                </tr>

                            </tbody>
                        </table>
                    </div>
                    <h5>Documents</h5>
                    <a href="#">PMP Certificate</a><br>
                    <a href="#">ISO2001 Certificate</a><br>
                    <a href="#">CompTIA Security Certificate</a><br>
                </div>

                <div class="modal-footer">
                    <button @click="CloseModel" type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { defineEmits } from "vue";
const emit = defineEmits(['closeViewComplianceModel'])
const CloseModel = () => {
    emit('closeViewComplianceModel', false)
}
</script>
