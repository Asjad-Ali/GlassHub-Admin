<template>
  <div class="modal fade show"  style="display:block; background:rgba(0,0,0,0.5); opacity:1 !important">
         <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Ask for more documents</h5>

                        <!--begin::Close-->
                        <div @click="CloseModel" class="btn btn-icon btn-sm btn-active-light-primary ms-2" data-bs-dismiss="modal" aria-label="Close">
                            <i class="fa fa-times" aria-hidden="true"></i>
                        </div>
                        <!--end::Close-->
                    </div>

                    <div class="modal-body">
                        <label class="form-label mb-0">Title</label>
                        <input type="text" class="form-control form-control-lg form-control-solid mb-5">
                        <label class="form-label mb-0">Message</label>
                        <textarea class="form-control form-control-lg form-control-solid"></textarea>
                    </div>

                    <div   class="modal-footer text-end">
                        <button @click="CloseModel" class="btn btn-secondary">Close</button>
                        <button class="btn btn-primary">Send</button>
                    </div>
                </div>
            </div>
    </div>
</template>

<script setup>
import { defineEmits } from "vue";
const emit = defineEmits(['closeAskForDocumentModel'])
const CloseModel = () => {
    emit('closeAskForDocumentModel', false)
}
</script>
