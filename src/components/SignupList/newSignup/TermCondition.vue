<template>
         <div class="modal fade show" tabindex="-1"  style="display:block;background:rgba(0,0,0,0.5); opacity:1">
                    <div class="modal-dialog modal-lg">
                        <div class="modal-content" style="margin-top:120px">
                            <div class="modal-body p-3">
                                <span @click="closeModel()" class="close">&times;</span>
                                <div v-html="props.discription" class="mt-4"></div>
                               <button @click="accetp()" class="btn btn-lg btn-primary me-3"> Accept</button>
                            </div>
                        </div>
                    </div>
         </div>                   
</template>
<script setup>

import {defineProps,defineEmits} from '@vue/runtime-core';
const props = defineProps(['discription'])
const emit = defineEmits(['acceptTerm','close'])

const accetp=()=>{
    emit('acceptTerm',true)
}

const closeModel = ()=>{
     emit('close')
}

</script>
<style scoped>
.close{
    font-size: 30px;
    position: absolute;
    right: 15px;
    top: 0px
}
</style>