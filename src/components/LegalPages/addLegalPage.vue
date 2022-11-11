 <template>
    <div class="col-xl-9 pd-30 bg-w">
        <div class="card-body pb-0">
            <Form  @submit="onSubmit" :validation-schema="legalPageRules" v-slot="{ errors }">
                <div class="col-md-8">
                    <h1 v-if="route.params.id" class="pb-2">Update Content Page</h1>
                    <h1 v-else class="pb-2">Add Content Page</h1>
                </div>
                <div class="row fv-row mb-10 fv-plugins-icon-container">
                    <div class="col-md-6 pb-5">
                        <label class="form-label required">Account Type</label>
                        <Field  v-model="data.Account_id" :class="{ 'is-invalid': errors.Account_id }" as="select" name="Account_id" 
                        class="form-select form-select-lg form-select-solid" data-control="select2" data-placeholder="Select..." data-allow-clear="true" data-hide-search="true">
                            <option selected disabled value="">Select Account Type</option>
                            <option :value="index" v-for="(account,index) in accountType" :key="account">{{ account }}</option>
                        </Field>
                        <div class="fv-plugins-message-container invalid-feedback">{{errors.Account_id}}</div>
                    </div>
                    <div class="col-md-6 pb-5">
                    </div>
                    <div class="col-md-6 pb-5 category box">
                        <div class="form-label required">Select Page</div>
                        <div v-if="helpTextStore.loader" class="text-center"> <span class="spinner-border"></span></div>
                        <Field @change="loadExistingData" v-else v-model="data.Page_Name" :class="{ 'is-invalid': errors.Page_Name }" as="select" name="Page_Name" 
                        class="form-select form-select-lg form-select-solid" data-control="select2" data-placeholder="Select..." data-allow-clear="true" data-hide-search="true">
                            <option selected disabled value="">Select Page Name</option>
                            <option v-for="(pname,index) in pageName" :key="pname" :value="index" > {{ pname }} </option>
                        </Field>
                        <div class="fv-plugins-message-container invalid-feedback">{{errors.Page_Name}}</div>
                    </div>
                    <div class="col-md-6 pb-5 category box">
                        <div class="form-label required">Content Page Date </div>
                        <Field type="date" v-model="data.legal_date" :class="{'is-invalid': errors.legal_date }" name="legal_date" class="form-control form-control-lg form-control-solid"  />
                        <div class="fv-plugins-message-container invalid-feedback">{{errors.legal_date}}</div>
                    </div>
                    <div class="col-md-12 mb-15 section box">
                        <label class="form-label  ">Add Terms & Conditions</label>
                        <QuillEditor theme="snow" ref="quill" :toolbar="toolbar" :content="data.Description" name="description" v-model:content="data.Description" content-type="html" placeholder="Enter your helping description" id="summernote" class="form-control 
                            form-control-lg form-control-solid"></QuillEditor>                    
                            <div class="fv-plugins-message-container invalid-feedback">{{DescriptionError}}</div>
                    </div>
                    <div class="col-md-12 mt-10 pb-5 section box">
                        <input class="form-check-input" type="checkbox" v-model="data.Is_Active" name="account_plan" :value="data.Is_Active">
                        <span class="fs-6 fw-bold text-muted"> Agree All Terms & Conditions</span>
                    </div>                    
                    <div class="col-md-12 pb-5 section box text-right">
                        <router-link to="/content-page" ><button class="btn btn-secondary me-2">cancel</button> </router-link>
                        <button v-if="route.params.id" :disabled="!Object.values(errors).every(value => !value)" class="btn btn-lg btn-primary">{{ legalPagesStore.btnLoading ? 'loading...' : 'update' }}</button>
                        <button v-else :disabled="!Object.values(errors).every(value => !value) || DescriptionError" class="btn btn-lg btn-primary">{{ legalPagesStore.btnLoading ? 'loading...' : 'add' }}</button>
                    </div>
                </div>
            </Form>
        </div>
    </div>
</template>


<script setup>
import { ref } from '@vue/reactivity';
import { configure, Form, Field } from 'vee-validate';
import useValidation from '@/composables/useValidations'
import { useHelpTextStore } from '@/store/helpText.store'
import { useLegalPagesStore } from '@/store/legalPages.store'
import { onMounted, watch } from '@vue/runtime-core';
import { useRoute, useRouter } from 'vue-router';
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css';

configure({
  validateOnBlur: true,
  validateOnChange: true,
  validateOnInput: true,
  validateOnModelUpdate: true,
});

const user = JSON.parse(localStorage.getItem('user'))
const route = useRoute();
const router = useRouter();
const helpTextStore = useHelpTextStore();
const legalPagesStore = useLegalPagesStore();
const { legalPageRules } = useValidation();
const quill = ref(null) 
const DescriptionError = ref(null)
let data = ref({
    Legal_id: 0,
    User_id: user.User.User_id,
    Created_By: user.User.User_id,
    Updated_By: user.User.User_id,
    Account_id:"",
    Account_Name:"",
    Page_Name:"",
    legal_date:"",
    Description:'',
    Is_Active: true
})

const pageName = ['Terms&Condition', 'Privacy Policy', 'Cookie Policy', 'Contact', 'About', 'Support']

const accountType = ["Organization", "Supplier", "Freelancer", "AuditFirm", "Regulator","General"]
watch(
    () => data.value.Description,
    () => {
        if (data.value.Description) {
            if(data.value.Description.length >= 5000){
                DescriptionError.value = "Detail Help must be at most 5000 characters"
            }else{
                DescriptionError.value = null
        }
        } 
    },
    { deep: true }
);
const onSubmit = () => {
    console.log(data.value)
    data.value.Account_Name = accountType[data.value.Account_id]
    legalPagesStore.insertLegalPages(data.value)
    .then(response => {
        if(response.status == 200){
            legalPagesStore.legalPagesList = []        
            router.push({ path: '/content-page' })
        }
    })
    
}

const loadExistingData = () => {
    legalPagesStore.loadExistingLegalPage( data.value.Account_id, data.value.Page_Name ).then(res => {
        if(res.status == 200){
            if(legalPagesStore.existingData.length){
                data.value.legal_date = legalPagesStore.existingData[0].legal_date.substring(0,10)
                data.value.Description = legalPagesStore.existingData[0].Description
                quill.value.setContents( data.value.Description )
            }else{
                data.value.legal_date = "0000/00/00"
                data.value.Description = ""
                quill.value.setContents( data.value.Description )
            }
        }
    })
}

// watch( legalPagesStore.existingData,(current) =>{
//     if(current.length){
//         console.log(current)
//         data.value = current
//     }
// })

const toolbar = [
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
    [{ 'size': ['small', false, 'large', 'huge'] }],
    ['bold', 'italic', 'underline', 'strike'],
    ['blockquote', 'code-block'],
    [{ 'align': [] }],
    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
    [{ 'color': [] }, { 'background': [] }],
    [{ 'font': [] }],
    // ['link', 'image', 'video'],
    ['clean']
];

onMounted(() => {
        if(route.params.id){
        data.value = JSON.parse(localStorage.getItem('editLegalPage'))
        helpTextStore.loadMenuList(data.value.Account_id)
        data.value.legal_date = data.value.legal_date.substring(0,10)
        quill.value.setContents( data.value.Description )
    }
})
</script>

<style>

</style>