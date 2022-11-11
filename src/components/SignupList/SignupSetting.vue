<template>
    <div class="col-xl-9 bg-w pd-30">
        <h1 class="pb-2">Signup Documents Oblique Approval</h1>
        <div>
            <div class="col-md-12 pb-5">
                <h2 class="fw-bolder d-flex align-items-center text-dark mt-5">Account Type</h2>
                <div class="accounttype_ofwizerd mt-5">
                    <ul class="topmenutabs nav nav-tabs nav-line-tabs mb-5 fs-6">
                        <li v-for="(account,index) in accountType" :class="{ 'activeTab': accountTypeValue == index }"  :key="index" class="nav-item">
                            <a @click="selectAccount(index)" class="nav-link cursor-pointer"> <h5> {{ account }} </h5> </a>
                        </li>
                    </ul>
                </div>
            </div>
            <PageLoader v-if="loader" />
            <div v-else >
                <div class="tab-pane fade show">
                    <div class="row mb-5">
                        <div class="col-md-12">
                            <div class="col-md-6">
                                <div class="d-flex flex-stack">
                                    <div class="me-5">
                                        <label class="fs-6 fw-bold form-label"> {{ accountType[accountTypeValue] }} signup without admin approval</label>
                                    </div>
                                    <label class="form-check form-switch form-check-custom form-check-solid">
                                        <input v-model="formData.RegistrationSettingM.Account_approval" class="form-check-input" type="checkbox" :value="true">
                                    </label>
                                </div>
                            </div>
                            <div class="col-md-6 mt-5">
                                <div class="d-flex flex-stack">
                                    <div class="me-5">
                                        <label class="fs-6 fw-bold form-label"> No documents required for signups </label>
                                    </div>
                                    <label class="form-check form-switch form-check-custom form-check-solid">
                                        <input v-model="formData.RegistrationSettingM.Is_doc_signup" class="form-check-input" 
                                        @click="formData.RegistrationSettingM.Is_doc_signup = !formData.RegistrationSettingM.Is_doc_signup" type="checkbox" >
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
        
                    <div class="row mt-5" v-show="!formData.RegistrationSettingM.Is_doc_signup">
                        <div class="col-md-8">
                            <label class="form-label required">Required Document Title</label>
                            <input maxlength="150" v-model="addDoc.DocTitle" type="text" name="title" placeholder="Dcoument Title" 
                            class="form-control form-control-lg form-control-solid">
                            <div class="text-danger">{{ addDocError.DocTitle }}</div>
                        </div>
                        <div class="col-md-3">
                            <label class="form-label required">Required Type</label>
                            <select name="company_size" v-model="addDoc.DocType" class="form-select form-select-lg form-select-solid" data-control="select2"  data-placeholder="Select..." data-allow-clear="true" data-hide-search="true">
                                <option value="" selected disabled>Select One</option>
                                <option :value="0">Optional</option>
                                <option :value="1">Mandatory</option>
                            </select>
                            <div class="text-danger">{{ addDocError.DocType }}</div>
                        </div>
                        <div class="col-md-1">
                            <label class="form-label">Add</label>
                            <button :disabled="!Object.values(addDocError).every(value => !value)" @click="addDocument" class="btn btn-primary plustoadd_btn">+</button>
                        </div>
        
                        <div class="table-responsive mt-10">
                            <table class="table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4">
                                <tbody>
                                    <tr v-for="(setting,index) in formData.RegistrationSettingD" :key="index">
                                        <td>{{ setting.Document_title }}</td>
                                        <td class="text">
                                            <div class=" flex-stack">
                                                <div class="me-5 d-flex">
                                                    <label class="fs-6 pt-2 fw-bold form-label me-5"> AI Auto Check</label>
                                                    <label class="form-check form-switch form-check-custom form-check-solid ">
                                                        <input @click="setting.AI_check = !setting.AI_check" v-model="setting.AI_check" class="form-check-input btn-clr" data-bs-toggle="modal"
                                                        data-bs-target="#kt_modal_select_users" type="checkbox" >
                                                    </label>
                                                </div>
                                            </div>
                                        </td>
                                        <td class="text">
                                            <div class=" flex-stack">
                                                <div class="me-5 d-flex">
                                                    <label class="fs-6 pt-2 fw-bold form-label me-5"> AI Expiry Check</label>
                                                    <label class="form-check form-switch form-check-custom form-check-solid ">
                                                        <input @click="setting.AI_expiry = !setting.AI_expiry" v-model="setting.AI_expiry" class="form-check-input btn-clr" data-bs-toggle="modal"
                                                        data-bs-target="#kt_modal_select_users" type="checkbox" >
                                                    </label>
                                                </div>
                                            </div>
                                        </td>
                                        <td><span class="badge badge-primary">{{ setting.Document_type == 0 ? 'Optional' : 'Mandatory' }}</span></td>
                                        <td><span @click="removeDataD(index)" class="badge badge-danger cursor-pointer">Remove</span></td>                                   
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <h3 class="my-10">Password</h3>
                <div class="tab-content">
                    <div class="tab-pane fade show active pb-5"  role="tabpanel">
                        <div class="col-md-6 d-flex  mb-4">
                            <div v-for="(password,index) in passwordType" :key="index" class="me-5" >
                                <label class="fs-6  fw-bold form-label me-2">{{password.type}}</label>
                                <input v-model="formData.RegistrationSettingM.Psw_type" class="form-check-input" type="radio" name="pass" :value="index">
                            </div>
                        </div>
                        <div class="col-md-6 d-flex  mb-4">
                            <input maxlength="150" type="text" name="" id="pass_value"
                                v-model="passwordType[formData.RegistrationSettingM.Psw_type].value" class="form-control form-control-lg form-control-solid" readonly>
                        </div>
        
        
                        <div class="row">
                            <div class="col-md-5">
                                <label class="form-label">Password hint </label>
                                <input maxlength="150" v-model="formData.RegistrationSettingM.Psw_hint" type="text" name=""   class="form-control form-control-lg form-control-solid">
                            </div>
                            <div class="col-md-5">
                                <label class="form-label">Character Length</label>
                                <input maxlength="150" v-model="formData.RegistrationSettingM.Psw_length" type="text" name="" placeholder="8" class="form-control form-control-lg form-control-solid">
                            </div>
                        </div>
        
                        <h3 class="my-10">Send OTP Configuration</h3>
                        <div class="row">
                            <div class="col-md-5">
                                <label class="form-label">Email</label>
                                <input maxlength="150" type="email" name="" placeholder="yourdomain@gmailcom"
                                        class="form-control form-control-lg form-control-solid">
                            </div>
                            <div class="col-md-5">
                                <label class="form-label">Masking / Phone Number</label>
                                <input maxlength="150" type="number" name="" placeholder="+924543456"  class="form-control form-control-lg form-control-solid">
                            </div>
                        </div>
                        <div class="row my-10">
                            <div class="col-12 text-right">
                                <router-link to="/signups"><button class="btn btn-secondary me-2">cancel</button> </router-link>
                                <button :disabled="store.btnLoader" @click="submit" type="submit" class="btn btn-primary">
                                <span style="height: 1.5rem; width:1.5rem" v-if="store.btnLoader" class="spinner-border p-0 my-0 mx-5"></span>
                                {{store.btnLoader ? '' : 'Submit' }}</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
     
</template>

<script setup>
import { useSignupsStore } from '@/store/signups.store'
import { useRouter } from 'vue-router'
import PageLoader from '@/components/Global/PageLoader.vue';
import API from '@/services/API';
const { reactive, ref, onBeforeMount, watch }=require("@vue/runtime-core")
const loader = ref(false)
const store = useSignupsStore()
const router = useRouter()
const accountTypeValue = ref(0)
let formData = reactive({
    RegistrationSettingM:{
        Account_type:0,
        Account_approval:true,
        Is_doc_signup:false,
        Psw_type:1,
        Psw_hint:"",
        Psw_length:"8"
    },
    RegistrationSettingD:[
        {
            Document_title:"",
            Document_type:"",
            AI_check:false,
            AI_expiry:true
        }
    ]
})
let sampleData = reactive({
    RegistrationSettingM:{
        Account_type:0,
        Account_approval:false,
        Is_doc_signup:false,
        Psw_type:1,
        Psw_hint:"",
        Psw_length:""
    },
    RegistrationSettingD:[
        {
            Document_title:"",
            Document_type:"",
            AI_check:false,
            AI_expiry:false
        }
    ]
})
const passwordType = reactive([
    {value:'Chracters entery only', type:'Simple'},
    {value:'Chracters and digits both', type:'Medium'},
    {value:'Chracters, digits and special character entery', type:'Strong'}
])
const accountType = ['Organization','Supplier','Freelancer','AuditFirm','Regulator']
 const addDoc = reactive({
        DocTitle : '',
        DocType : '',
    })
    const addDocError = {
        DocTitle : null,
        DocType : null,
    }

    watch(addDoc,(current) => {
        console.log(current)
        if(!current.DocTitle){
            addDocError.DocTitle = "Document Title is Required"
        } else{
            addDocError.DocTitle = null
        }
        if(current.DocType == "0" || current.DocType == "1" ){
            addDocError.DocType = null
        } else {
            addDocError.DocType = "Document Type is Required"
        }
    })

    const addDocument = () => {
        const add = {
            Document_title : addDoc.DocTitle,
            Document_type : addDoc.DocType,
            AI_check:false,
            AI_expiry:false
        }
        if(addDoc.DocTitle && (addDoc.DocType == 0 || addDoc.DocType == 1 ) ){
            formData.RegistrationSettingD.unshift(add)
        }
        addDoc.DocTitle = ' '
        addDoc.DocTitle = ' '
    }

    const removeDataD = (index) => {
        console.log(index)
        formData.RegistrationSettingD.splice(index, 1);
    }
    const loadSignupSetting = async (account_type) => {
        loader.value = true
          const response = await API.get(`api/RegistrationSetting/GetAccountBase/${account_type}`)
          if(response.status == 200){
            if(response.data.RegistrationSettingM?.length){
                formData.RegistrationSettingM = response.data.RegistrationSettingM[0]
                formData.RegistrationSettingD = response.data.RegistrationSettingD
            }else{
                formData.RegistrationSettingD = sampleData.RegistrationSettingD
                formData.RegistrationSettingM = sampleData.RegistrationSettingM
            }
          }
        loader.value = false
      }
    const selectAccount = (index) => {
        accountTypeValue.value = index;
        loadSignupSetting(index);
    }

    const submit = () => {
        formData.RegistrationSettingM.Account_type = accountTypeValue.value
        store.insertSignupSetting(formData).then((response) => {
            if( response.status == 200 ){
                router.push({ path: '/signups' })
            }
        })
    }

onBeforeMount(() => {
    formData.RegistrationSettingD = sampleData.RegistrationSettingD
    formData.RegistrationSettingM = sampleData.RegistrationSettingM
    loadSignupSetting(0);
})


</script>
