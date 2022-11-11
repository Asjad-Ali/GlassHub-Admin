<template>
    <div class="modal fade show"  style="display:block;background:rgba(0,0,0,0.5);opacity:1 !important">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">View Document</h5>

                        <!--begin::Close-->
                        <div class="btn btn-icon btn-sm btn-active-light-primary ms-2"  @click="closeModel()" aria-label="Close">
                            <i class="fa fa-times" aria-hidden="true"></i>
                        </div>
                        <!--end::Close-->
                    </div>

                    <div class="modal-body">
                        <embed src="../assets/admin/media/quotation_template.pdf" frameborder="0" width="100%" height="500px">
                    </div>

                    <div class="modal-footer">
                        <button type="button" class="btn btn-primary" @click="closeModel()">Close</button>
                    </div>
                </div>
            </div>
        </div>
</template>

<script setup>
import { defineEmits } from 'vue'

const emit = defineEmits(['closeModel']);

const closeModel = () => {
    emit('closeModel', false)
}



</script>