<template>
    <div class="col-xl-9 pd-30 bg-w">
        <sign-up-with @Account_info="Account_info"></sign-up-with>
       
        <div class="card-body w-100">
            <basic-info :Account_type="Account_detail.id" :basicInfo_submit="basicInfo_submit" @formData="basicInfo_form" @cancel="basicInfo_cancel"></basic-info>
          
          <categories-form :CatInfo_submit="CatInfo_submit" @formData="CatInfo_form" @CancelCatRes="CancelCatRes"></categories-form>
          
            <business-info :Account="Account_detail" :businessInfo_submit="businessInfo_submit" @formData="businessInfo_form" @cancel="businessInfo_cancel"></business-info>
                <!-- <div class="w-100">
                    <div class="pb-10 pb-lg-15">
                        <h2 class="fw-bolder text-dark">Documents</h2>
                        <div class="text-muted fw-bold fs-6">
                            Please upload required documents
                        </div>
                    </div>
                     <OrganizationDocument :Account_type="Account_detail.id" :RegistrationDocuments_submit="RegistrationDocuments_submit" @formData="RegistrationDocuments_form" @cancel="RegistrationDocuments_cancel" /> 
                   <AdditionalDocument :Account_type="Account_detail.id" :Documents_submit="Documents_submit"  @formData="Document_Info" @CancelDocRes="CancelDocRes" />
                     <Documents :authDocuments_submit="authDocuments_submit" @formData="authDocument_Info" @CancelDocRes="CancelAuthDoc"/>
                    <div class="d-flex flex-stack pt-10 text-right">
                        <div class="w-100 text-right">
                            <button @click="onsubmit"  type="button" class="btn btn-lg btn-primary me-3"> Signup </button>
                        </div>
                    </div>
                </div> -->
                    <div class="col-md-12 pb-5">
                            <h3>CAPTCHA HERE</h3>
                            <div>
                                <vue-recaptcha ref="recaptcha" @verify="verifyMethod" :loadRecaptchaScript="true" sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI" />
                            </div>
                    </div>
                  <div class="d-flex flex-stack pt-10 text-right">
                        <div class="w-100 text-right">
                            <button @click="onsubmit" :disabled="store.btnLoading"  type="button" class="btn btn-lg btn-primary me-3"> Signup <btn-loader v-if="store.btnLoading"></btn-loader></button>
                        </div>
                    </div>
            

        </div>
    </div>
</template>

<script setup>
import SignUpWith from './SignUpWith.vue'
import BasicInfo from './BasicInfo.vue'
import CategoriesForm from './CategoriesForm.vue'
import BusinessInfo from './BusinessInfo.vue'
import btnLoader from '@/components/Global/BtnLoader.vue'
import {VueRecaptcha } from 'vue-recaptcha';
import showToast from "@/composables/useToast";
// import OrganizationDocument from './OrganizationDocument.vue'
// import AdditionalDocument from './AdditionalDocument.vue'
// import Documents from './DocumentForm.vue'
import { ref , reactive} from 'vue'
import { useMainCategoryStore } from "@/store/signupStore/mainCategory";
import {   useRouter } from "vue-router";
const store = useMainCategoryStore();
const router = useRouter();
const RegistrationM = ref('')
const RegistrationCategories = ref('')
const RegistrationD = ref('')
const Office_Branches = ref('')
const RegistrationDocument= ref('')
const AdditionalDoc=ref('')

// const Docs = ref('')
const Account_detail = reactive({
    id:'',
    name:'',
})
let formData = reactive({
        Company_logo:null,
        RegDocument_path:null,
        AddDoc_path:null,
        auth_file_path: null,
        data:{}
   
    })
const basicInfo_submit = ref(false)
const CatInfo_submit = ref (false)
const businessInfo_submit = ref(false)
const isVerify = ref(false);
// const RegistrationDocuments_submit = ref(false)
// const Documents_submit = ref(false)
// const authDocuments_submit = ref(false)

 const verifyMethod =()=>{
  isVerify.value=true
  }

const basicInfo_form= (value)=>{
 RegistrationM.value=value.RegistrationM
 basicInfo_submit.value = true
  if(!CatInfo_submit.value){
     CatInfo_submit.value = true
     return false
}

}
const CatInfo_form= (value)=>{
  RegistrationCategories.value = value.RegistrationCategories
  CatInfo_submit.value=true
   if(!businessInfo_submit.value)
    {
         businessInfo_submit.value=true
         return false
    }
}
const businessInfo_form=(value)=>{
    RegistrationD.value= value.RegistrationD
    Office_Branches.value =value.signUpForm.Office_Branches
    formData.Company_logo=value.RegistrationD.company_logo
    RegistrationDocument.value= value.Registration_info
    formData.RegDocument_path=value.Registration_Path
    formData.AddDoc_path=value.AdditionDoc_Path
    AdditionalDoc.value=value.AdditionDoc_info
    businessInfo_submit.value=true
    formData.auth_file_path=value.file

    let signupData ={
       RegistrationM:{
       ...RegistrationM.value,
       RegistrationD:[RegistrationD.value],
       RegistrationCategories:RegistrationCategories.value,
       Office_Branches:Office_Branches.value,
       
       RegistrationDocument:RegistrationDocument.value||[],
       AdditionalDoc:AdditionalDoc.value||[]    
       } 
    }
   
        formData.data = JSON.stringify(signupData)
         if(!isVerify.value)
          {
            showToast('invalid captcha')
            return false
          }
       store.AddSignup(formData)
        .then(response => {
            if (response.status == 200) {
                router.push({ path: '/signups' })
            }
        })


}

// const RegistrationDocuments_form=(value)=>{
  
//     RegistrationDocument.value= value.Registration_info
//     formData.RegDocument_path=value.Registration_Path
//     // RegistrationDocuments_submit.value=true
//     // Documents_submit.value=true
     
// }

// const Document_Info=(value)=>{
    
//     formData.AddDoc_path=value.AdditionDoc_Path
//     AdditionalDoc.value=value.AdditionDoc_info
//     Documents_submit.value=true
//     console.log('arslan5')
//     authDocuments_submit.value=true
 
// }


// const authDocument_Info = (value)=>{
//     formData.auth_file_path=value.file
   
// }

const basicInfo_cancel =(value)=>{
  basicInfo_submit.value = value
//   authDocuments_submit.value=false;
//   Documents_submit.value=false
}

const CancelCatRes = (value)=>{
    CatInfo_submit.value= value
    // authDocuments_submit.value=false;
    // Documents_submit.value=false
}

const businessInfo_cancel= (value)=>{
    businessInfo_submit.value=value

    // authDocuments_submit.value=false;
    // Documents_submit.value=false
}
// const RegistrationDocuments_cancel= (value)=>{
//     RegistrationDocuments_submit.value=value
 
//     // authDocuments_submit.value=false;
//     // Documents_submit.value=false
// }


// const CancelDocRes = (value)=>{
//     Documents_submit.value=value
//      RegistrationDocuments_submit.value=false
//        businessInfo_submit.value=false
//     basicInfo_submit.value = false
//      CatInfo_submit.value= false
//     authDocuments_submit.value=false;
// }

// const CancelAuthDoc = (value)=>{
//      authDocuments_submit.value=value
//      Documents_submit.value=false
//      RegistrationDocuments_submit.value=false
//      businessInfo_submit.value=false
//      basicInfo_submit.value = false
//      CatInfo_submit.value= false
//}

const onsubmit = () => {
    //    businessInfo_submit.value = false;
    //    CatInfo_submit.value=false;
    //    RegistrationDocuments_submit.value=false;
    //    authDocuments_submit.value=false;
    //    Documents_submit.value=false
     if(!basicInfo_submit.value)
    {
      basicInfo_submit.value=true
      return false
    }

    //   if(!Documents_submit.value)
    // {
      
    //   Documents_submit.value= true
    //    return false
    // }
    // if(!authDocuments_submit.value){
    //     authDocuments_submit.value=true
    //     return false
    // }
   
   
  
  

//  let signupData ={
//        RegistrationM:{
//        ...RegistrationM.value,
//        RegistrationD:[RegistrationD.value],
//        RegistrationCategories:RegistrationCategories.value,
//        Office_Branches:Office_Branches.value,
       
//        RegistrationDocument:RegistrationDocument.value,
//        AdditionalDoc:AdditionalDoc.value    
//        } 
//     }


//     formData.data = JSON.stringify(signupData)
//     store.AddSignup(formData)
//         .then(response => {
//             if (response.status == 200) {
//                 router.push({ path: '/signups' })
//             }
//         })
         
};
const Account_info =(value)=>{
     Account_detail.id = value.id
     Account_detail.name = value.name
}


</script>

<style>
 .signup .iti{
    width:100%
}
</style>