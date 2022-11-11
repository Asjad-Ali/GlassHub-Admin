<template>
     <div class="modal fade show"  style="display:block;background:rgba(0,0,0,0.5);opacity:1 !important" aria-hidden="true" aria-labelledby="confirmationDelete" tabindex="-1" >
            <div class="modal-dialog" style="max-width:500px">
                <div class="modal-content" >
                    <div class="modal-header">
                        <h5 class="modal-title">Delete Data</h5>
                        <div class="btn btn-icon btn-sm btn-active-light-primary ms-2" @click="closeModel()">
                <i class="fa fa-times" aria-hidden="true"></i>
           </div>
                    </div>
                    <div class="modal-body">
                        <div class="row">
                                <div class="col-12 mb-2">
                                    <h6>Are you Sure you want to delete this Data</h6>
                                </div>
                            <div class="modal-footer pb-0">
                                <button  @click="closeModel()" type="button"  class="btn btn-light">No</button>
                                <button  @click="deleteRecord(), closeModel()" type="button"  class="btn btn-primary">Yes</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    </div>
</template>
<script setup>
import { defineEmits } from 'vue'

const emit = defineEmits(['closeModel', 'deleteRecord']);

const deleteRecord = () => {
    emit('deleteRecord', false)
}

const closeModel = () => {
    emit('closeModel', false)
}



</script>