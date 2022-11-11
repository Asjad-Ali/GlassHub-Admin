<template>
    <div class="col-xl-9 bg-w pd-30" v-if="menu">
    <h3 v-if="route.params.id" class="mb-10">Update Help Text</h3>
    <h3 v-else class="mb-10">Add Help Text</h3>
    <div class="tab-content" id="myTabContent">
        <div class="tab-pane fade show active" id="organizationdoc" role="tabpanel">
            <Form @submit="onSubmit" :validation-schema="helpTextRules" v-slot="{ errors } ">
            <div class="row fv-row mb-10 fv-plugins-icon-container">
                <div class="col-md-6 pb-5">
                    <label class="form-label required">Account Type </label>
                    <Field  @change="loadMenue($event)" v-model="menu.Account_id" :class="{ 'border-danger': errors.Account_id }" as="select" name="Account_id" 
                    class="form-select form-select-lg form-select-solid" data-control="select2" data-placeholder="Select..." data-allow-clear="true" data-hide-search="true">
                        <option selected disabled value="">Select Account Type</option>
                        <option :value="index" v-for="(account,index) in accountType" :key="account">{{ account }}</option>
                    </Field>
                    <div class="fv-plugins-message-container invalid-feedback">{{errors.Account_id}}</div>
                </div>
                <div class="col-md-6 pb-5">
                    <div class="form-label required">Page Name </div>
                    <div v-if="helpTextStore.loader" class="text-center"> <span class="spinner-border"></span></div>
                    <Field @change="loadExistingData" v-show="!helpTextStore.loader" v-model="menu.H_page" :class="{ 'border-danger': errors.pageName }" as="select" name="pageName" 
                    class="form-select form-select-lg form-select-solid" data-control="select2" data-placeholder="Select..." data-allow-clear="true" data-hide-search="true">
                        <option selected disabled value="">Select Page Name</option>
                        <option  :value="menu.Menue_name" v-for="menu in helpTextStore.menuList" :key="menu">{{ menu.Menue_name }}</option>
                    </Field>
                    <div class="fv-plugins-message-container invalid-feedback">{{errors.pageName}}</div>
                </div>
                <div v-if="showSectionName" class="col-md-6 pb-5  ">
                    <div class="form-label ">Section Name <a href="#" @click="showSectionName = false " class="float-end">Add New</a></div>
                    <select @change="loadExistingData" v-model="menu.H_type" name="business_type" class="form-select form-select-lg form-select-solid" data-control="select2" data-placeholder="Select..." data-allow-clear="true" data-hide-search="true">
                        <option selected disabled :value=" null || '' ">Select One</option>
                        <template v-for="menu in helpTextStore.sectionList" :key="menu" >
                            <option v-show="menu.H_type != ''" :value="menu.H_type" >{{ menu.H_type }}</option>
                        </template>
                    </select>
                </div>
                <div v-else class="col-md-6 pb-5">
                    <div class="form-label ">Section Name <a href="#" @click="showSectionName = true " class="float-end">Select Given</a></div>
                    <input type="text" v-model="menu.H_type" placeholder="Section Name" class="form-control form-control-lg form-control-solid">
                </div>
                <div v-if="showFieldName" class="col-md-6 pb-5  ">
                    <div class="form-label ">Field Name <a href="#" @click="showFieldName = false " class="float-end">Add New</a></div>
                    <select v-model="menu.H_field" name="business_type" class="form-select form-select-lg form-select-solid" data-control="select2" data-placeholder="Select..." data-allow-clear="true" data-hide-search="true">
                        <option selected disabled value="">Select Field Name</option>
                        <option :value="menu.H_field" v-show="menu.H_field != ''" v-for="menu in helpTextStore.fieldList" :key="menu">{{ menu.H_field }}</option>
                    </select>
                </div>
                <div v-else class="col-md-6 pb-5">
                    <div class="form-label ">Field Name <a href="#" @click="showFieldName = true " class="float-end">Select Given</a></div>
                    <input type="text" v-model="menu.H_field" placeholder="Section Name" class="form-control form-control-lg form-control-solid">
                </div>
                <div class="col-md-12 pb-5 ">
                    <label class="form-label ">  Short Help</label>
                    <Field name="H_title" v-model="menu.H_title" maxlength="150" placeholder="Enter your helping title" class="form-control form-control-lg form-control-solid"> </Field>
                    <div class="fv-plugins-message-container invalid-feedback">{{errors.H_title}}</div>
                </div>
                <div class="col-md-12 mb-15 flex">
                    <label class="form-label "> Detail Help</label>
                    <QuillEditor name="H_description" maxlength="10" theme="snow" ref="quill" :toolbar="toolbar" :content="menu.H_description" v-model:content="menu.H_description" 
                    :class="{ 'border-danger': errors.H_description }" content-type="html" placeholder="Enter your helping description" id="summernote" class="form-control 
                    form-control-lg form-control-solid"></QuillEditor>
                </div>
            </div>
            <div class="row mt-10">
                <div class="col-md-6">
                    <div class="text-danger"> {{ H_descriptionError }}</div>
                </div>
                <div class="col-md-6 text-right">
                    <router-link to="/help-text"><button class="btn btn-secondary me-2">cancel</button> </router-link>
                    <button v-if="route.params.id" :disabled="!Object.values(errors).every(value => !value)" type="submit" class="btn btn-primary">{{helpTextStore.btnLoading ? 'Loading...' : 'update' }} </button>
                    <button v-else :disabled="!Object.values(errors).every(value => !value) || H_descriptionError" type="submit" class="btn btn-primary">
                    <BtnLoader v-if="helpTextStore.btnLoading"  />
                    <span v-else> Add </span> </button>
                </div>
            </div>
            </Form>
        </div>
    </div>
    </div>
</template>

<script setup>
import { ref } from '@vue/reactivity';
import { configure, Form, Field } from 'vee-validate';
import useValidation from '@/composables/useValidations'
import { useHelpTextStore } from '@/store/helpText.store'
import { useRoute, useRouter } from 'vue-router';
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import BtnLoader from '../Global/BtnLoader.vue';
import API from '@/services/API';

const { onMounted, watch }=require("@vue/runtime-core");
const helpTextStore = useHelpTextStore()
const { helpTextRules } = useValidation();
const router = useRouter()
const route = useRoute()
const user = JSON.parse(localStorage.getItem('user'))

configure({
  validateOnBlur: true,
  validateOnChange: true,
  validateOnInput: true,
  validateOnModelUpdate: true,
});
const accountType = ["Organization", "Suppliers", "Freelancers", "Audit Firms", "Regulator" ]
const showSectionName = ref(true)
const showFieldName = ref(true)
const H_descriptionError = ref(null)
const quill = ref(null) 
let menu = ref({
    H_id:0,
    Account_id:'',
    CreatedBy: user.User.User_id,
    UpdatedBy: user.User.User_id,
    H_page: '',
    H_type: null,
    H_field:"",
    H_title:"",
    H_description:""
})

const loadExistingData = async () => {
    const response = await API.get(`api/HelpingTool/GetExistingData/${menu.value.Account_id}/${menu.value.H_page}/${menu.value.H_type}`)
    if(response.status == 200){
        if(response.data.length == 1){
            menu.value.H_description = response.data[0].H_description
            menu.value.H_title=response.data[0].H_title
            quill.value.setContents(menu.value.H_description)
        }else{
            menu.value.H_description = ""
            menu.value.H_title = ""
            quill.value.setContents(menu.value.H_description)
        }
    }
}
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

const loadMenue = (e) =>{
    helpTextStore.loadMenuList(e.target.value)
    helpTextStore.menuList= '';
    menu.value.H_page = ''
}

watch(
    () => menu.value.H_description,
    () => {
        if ( menu.value.H_description ) {
            if( menu.value.H_description.length >= 5000 ){
                H_descriptionError.value = "Detail Help must be at most 5000 characters"
                console.log("dfsdfsdfds",H_descriptionError.value)
            }else{
                H_descriptionError.value = null
        }
        } 
    },
    { deep: true }
);

onMounted(() => {
    helpTextStore.loadHelpTextSectionList()
    helpTextStore.loadHelpTextFieldList()
    if(route.params.id){
        menu.value = JSON.parse(localStorage.getItem('editHelpText'))
        helpTextStore.loadMenuList(menu.value.Account_id)
        quill.value.setContents( menu.value.H_description )
    }
})

const onSubmit = () => {
    console.log(menu.value)
    helpTextStore.insertHelpText(menu.value)
    .then(response => {
        console.log("In router",response.status)
        if(response.status == 200){
            helpTextStore.helpTextList = []
            helpTextStore.loadHelpTextList()
            router.push({ path: '/help-text' })
        }
    })
}
</script>

<style>

</style>

