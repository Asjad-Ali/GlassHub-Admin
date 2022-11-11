<template>
                    
                    <div class="row fv-row mb-10 fv-plugins-icon-container">
                        <div class="col-md-12 pb-5">
                            <div class="d-flex">
                                <div class="me-5">
                                    <label class="fs-6 fw-bold form-label">Are you authorized to operate company account?</label>
                                </div>
                                    <label class="form-check form-switch form-check-custom form-check-solid">
                                    <input class="form-check-input" v-model="Authorized" type="checkbox" value="0" name="account_plan"/>
                                </label>
                            </div>
                        </div>

                        <h3 class="fw-bolder text-dark mb-3 mt-3 user_doc"   > User Documents </h3>

                        <div class="col-md-12 pb-5" v-if="Authorized">
                            <label class="form-label">Upload Company's Authorization on Letterhead
                            </label>
                            <a
                    class="image-link mb-5"
                    style="color: sandybrown"
                   href="/assets/img/avatars/titlehead.PNG"
                    download
                    >(Download Sample Draft)</a >
                            <input type="file" @change="onFileChange($event)" class="form-control form-control-lg form-control-solid" />
                            <span>PDF, Doc, Docx, JPG</span>
                    <div class="col-md-12" style="padding-left: 80%">
                        <b>
                            <a class="image-link" :href="url"  target="_blank" > Show / </a>
                            <a class="image-link" :href="url" download >Download</a>
                        </b>
                    </div>
                        </div>
                    </div>
</template>
<script setup>
import {ref,reactive,watch,defineProps,defineEmits, onUpdated} from 'vue'
const props = defineProps(['authDocuments_submit'])
const emit = defineEmits(['formData','CancelDocRes'])
const url = ref('')
const Authorized = ref('')
// const account_plan  = ref(0)
let formData = reactive({
        Auth_file_path: null,
        data:{}
    })
watch(props,()=>{
   
       if(props.authDocuments_submit){
     onsubmit()
  }
})



const onFileChange = (e) => {
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      formData.Auth_file_path =  files[0]
    url.value=URL.createObjectURL(formData.Auth_file_path)
}

const onsubmit=()=>{
emit('formData', {Authorized:Authorized.value,file:formData.Auth_file_path})
}
onUpdated(()=>{
    emit('CancelDocRes',false)
})
</script>