<template>
      <div class="current" >
                <div class="w-100">
                    <div class="pb-10 pb-lg-15">
                        <h2 class="fw-bolder d-flex align-items-center text-dark">
                            Basic Information
                        </h2>
                    </div>
                    <div class="row fv-row mb-10 fv-plugins-icon-container">
                        <div class="col-md-6 pb-5">
                            <label class="form-label required">Full Name</label>
                            <input name="fullname"  maxlength="50" v-model="signUpForm.RegistrationM.Fullname" :class="{'is-invalid':validate.Fullname.$error}"
                                placeholder="Full Name" class="form-control form-control-lg form-control-solid" />
                            
                            <div v-for="(error, index) in validate.Fullname.$errors" :key="index" class="mt-1">
                                <span class="text-danger ">{{error.$message}}</span>
                            </div>
                        </div>
                        <div v-if="props.Account_type != 2" class="col-md-6 pb-5">
                            <label class="form-label required">Designation</label>
                            <input name="designation"   maxlength="50" v-model="signUpForm.RegistrationM.Designation"
                              placeholder="IT Experts" :class="{'is-invalid':validate.Designation.$error}"
                                class="form-control form-control-lg form-control-solid" />

                           <div v-for="(error, index) in validate.Designation.$errors" :key="index" class="mt-1">
                                <span class="text-danger ">{{error.$message}}</span>
                            </div>
                        </div>
                        <div class="col-md-6 pb-5">
                            <label class="form-label required">Email</label>
                            <input name="email"  maxlength="50"  v-model="signUpForm.RegistrationM.Email" 
                                placeholder="email@yourdomain.com" :class="{'is-invalid':validate.Email.$error}"
                                class="form-control form-control-lg form-control-solid" />
                            
                            <div v-for="(error, index) in validate.Email.$errors" :key="index" class="mt-1">
                                <span class="text-danger ">{{error.$message}}</span>
                            </div>
                            <span class="text-danger mt-2">{{Email_error_message}}</span>
                        </div>
                        <div class="col-md-6 pb-5">
                            <label class="form-label required">Phone</label>
                            <div class="signup">
                            <input @change="country_change($event)" type="tel" name="phone"   maxlength="20" v-model="signUpForm.RegistrationM.Phone" :class="{'is-invalid':validate.Phone.$error}"
                                placeholder="+966 00 000 000" style="width:100%" class="form-control form-control-lg form-control-solid" id="telephone"/>
                            </div>
                            <div v-for="(error, index) in validate.Phone.$errors" :key="index" class="mt-1">
                                <span class="text-danger ">{{error.$message}}</span>
                            </div>
                        </div>
                        <div class="col-md-6 pb-5">
                            <label class="form-label required">
                                {{ props.Account_type == 0  ? "Organization Name"
                                    : props.Account_type == 1
                                    ? "Company Name" : props.Account_type == 2
                                    ? "Company Name"  : props.Account_type == 3
                                    ? "Organization Name"    : "Company Name"
                                }}
                            </label>
                            <input name="organizationname"  maxlength="50" placeholder="Company Name" v-model="validate.Company_name.$model"
                               :class="{'is-invalid': validate.Company_name.$error}" class="form-control form-control-lg form-control-solid"  />
                            <div v-for="(error, index) in validate.Company_name.$errors" :key="index" class="mt-1">
                                <span class="text-danger ">{{error.$message}}</span>
                            </div>
                        </div>
                        <div class="col-md-6 pb-5">
                            <label class="form-label required">Password</label>
                            <input v-model="validate.Password.$model"   maxlength="50"
                                class="form-control form-control-lg form-control-solid" placeholder="*****"
                                type="password" name="password" autocomplete="off" :class="{'is-invalid':validate.Password.$error}"/>
                            <div v-for="(error, index) in validate.Password.$errors" :key="index" class="mt-1">
                                <span class="text-danger ">{{error.$message}}</span>
                            </div>
                           
                        </div>
                        <div class="col-md-6 pb-5">
                            <label class="form-label required">Retype Password</label>
                            <input 
                                class="form-control form-control-lg form-control-solid"  maxlength="50" placeholder="*****"
                                type="password" name="confirmPassword" autocomplete="off" v-model="validate.confirm_password.$model"   :class="{'is-invalid':validate.confirm_password.$error}"/>
                              <div v-for="(error, index) in validate.confirm_password.$errors" :key="index" class="mt-1">
                                <span class="text-danger ">{{error.$message}}</span>
                            </div>
                        </div>
                         <!-- flex-stack -->
                        <div class="col-md-12 pb-5">
                            <div class="d-flex ">
                                <div class="me-5">
                                    <label class="fs-6 fw-bold form-label">Please accept our <a href="#" @click="TermCon()" style="font-weight: 900;text-decoration: underline;">terms and
                                            conditions</a> to
                                        proceed?</label>
                                </div>
                                <label class="form-check form-switch form-check-custom form-check-solid ">
                                    <input class="form-check-input"  v-model="signUpForm.RegistrationM.Term_accept" type="checkbox" value="0" />
                                </label>
                            </div>
                        </div>
                        <!-- <div class="col-md-12 pb-5">
                            <h3>CAPTCHA HERE</h3>
                            <div>
                                <vue-recaptcha ref="recaptcha"  @verify="verifyMethod" @expired="expiredMethod" :loadRecaptchaScript="true" sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI" />
                            </div>
                        </div> -->
                    </div>
                </div>
            </div>
            <!--end::Step 1-->
            <term-condition v-if="showModel" :discription="discription" @acceptTerm="acceptTerm" @close="closeModel"></term-condition>
</template>
<script setup>
/* eslint-disable */
import getCountryCode from '@/composables/getCountryCode';
import TermCondition from './TermCondition.vue'
// import {VueRecaptcha } from 'vue-recaptcha';
import 'intl-tel-input/build/css/intlTelInput.css';
import 'intl-tel-input/build/js/intlTelInput.js';
import intlTelInput from 'intl-tel-input';
// import { useReCaptcha } from 'vue-recaptcha-v3'
import { useVuelidate } from "@vuelidate/core";
import { required,email ,helpers,minLength,sameAs} from "@vuelidate/validators";
import { useMainCategoryStore } from "@/store/signupStore/mainCategory";
import { reactive, ref, computed, onMounted ,defineProps,watch,defineEmits, onUpdated} from "vue";
import API from '@/services/API'
import axios from 'axios'
import showToast from "@/composables/useToast";
// const { executeRecaptcha, recaptchaLoaded } = useReCaptcha()
const props = defineProps(['Account_type','basicInfo_submit'])
const emit = defineEmits(['formData','cancel'])
const store = useMainCategoryStore();
const current_country = ref('');
const Email_error_message = ref("");
const error_message = ref('');
const passwpord_lentgh = ref('');
const passwordHintMessage = ref('');
const recaptcha = ref('')
const showModel = ref(false)
const isVerify = ref(false);
const discription = ref("");
let signUpForm = reactive({
    RegistrationM:{
        Fullname: "",
        Designation: "",
        Email: "",
        Phone: "",
        Password: "",
        confirm_password:'',
        Company_name:'',
        Term_accept: false,        
        Isactive: true,
        Google_token:  null,
        Facebook_token:  null,
        Linkedin_token:  null,
        remember_token:  null,
    },
})
const VerifyEmail =(value) => {
          if(value){
         return  store.setEmailExist(value).then(res=>{
              if(res.data?.emailExist){
                Email_error_message.value=res.data?.emailExist[0]?.email_exist;
                return false
                // response=false
              }else{
                Email_error_message.value='';
                return true
                // response=true
              }             
         })
          }
            
        } 

  let pass2 =helpers.regex()
      const  passwordHint=()=>{
          store.setRegistrationSetting(props.Account_type)
            store.setRegistrationSetting(props.Account_type).then((resp) => {
              if(resp.data && resp.data.RegistrationSettingM &&  resp.data.RegistrationSettingM.length > 0){
                  let validationData=resp.data.RegistrationSettingM[0]
                  passwordHintMessage.value = validationData.Psw_hint
                  if(validationData.Psw_type==0){
                    pass2 = helpers.regex();
                     passwpord_lentgh.value= validationData.Psw_length
                  }else if(validationData.Psw_type==1){
                     pass2 = helpers.regex(/^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9!@#$%^&*]+)$/)
                      passwpord_lentgh.value= validationData.Psw_length
                      error_message.value="Password must contain at least one letter and one number"
                  }else if(validationData.Psw_type==2){
                    pass2 = helpers.regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).*$/)
                      passwpord_lentgh.value= validationData.Psw_length
                      error_message.value="Password must contain at least one special character, one number, one letter and uppercase letter"
                  }
              }
            })
        }
       
const DesignationCheck =(value)=>{
   if(props.Account_type==2)
   {
    return true
   }else if (value){
    return true
   }
}

const rules =computed(()=>{
     return {
    Fullname:{required:helpers.withMessage('Full Name is Required',required)},
    Designation:{DesignationCheck:helpers.withMessage('Designation is Required',DesignationCheck)},
    Email:{email,VerifyEmail,required:helpers.withMessage('Email is Required',required)},
    Phone:{required:helpers.withMessage('Phone is Required',required)},
    Company_name:{required:helpers.withMessage('Company Name is Required',required)},
    Password:{required:helpers.withMessage('Password is Required',required),
    minLength:helpers.withMessage(`${passwordHintMessage.value}` , minLength(passwpord_lentgh.value)),
     pass2:helpers.withMessage(`${error_message.value}`,pass2),
    },
     confirm_password:{ required: helpers.withMessage("comfirm_password is required", required),sameAs:sameAs(signUpForm.RegistrationM.Password)},
    }
})

const validate = useVuelidate(rules, signUpForm.RegistrationM) 

watch( props,()=>{
  passwordHint()
  FatchTerm()
  if(props.basicInfo_submit){
     onsubmit()
  }
})

watch(signUpForm,()=>{
   emit('cancel', false)  
})

 const verifyMethod =()=>{
  isVerify.value=true
 }

const expiredMethod =()=>{
  recaptcha.value.click()
}
//  const recaptcha = async () => {
//       // (optional) Wait until recaptcha has been loaded.
//       await recaptchaLoaded()

//       // Execute reCAPTCHA with action "login".
//       const token = await executeRecaptcha('login')
//       console.log(token)
//       // Do stuff with the received token.
//     }
const TermCon=()=>{
    showModel.value=true
}
const acceptTerm =(value)=>{
    signUpForm.RegistrationM.Term_accept=value
    showModel.value=false
}
const closeModel =()=>
{
     showModel.value=false
}
const setphone=()=>{
  setTimeout(()=>{
    const input = document.querySelector("#telephone");
    
     intlTelInput(input, {
        // initialCountry: "auto",
          // any initialisation options go here
           preferredCountries: [current_country.value],
        //     mode: "international",
        });
  })
}
const country_change = (e) => {
    console.log("valudfgsdfgdfg fd",e)
}
const currentLocation= ()=>{
    axios.get('https://ipinfo.io/json?token=af0391037d7bdc').then(response=>{
       current_country.value=response.data.country
       signUpForm.RegistrationM.Phone = getCountryCode(current_country.value)
       setphone()
    })
}

const FatchTerm = async ()=>{
let resp = await API.get(`api/userlegal/latest-legal?Account_id=${props.Account_type}&Page_Name=${0}`);
discription.value= resp.data[0]?.Description;
}

const onsubmit = () => {
     validate.value.$touch();
     if(!validate.value.$invalid){
        if(!signUpForm.RegistrationM.Term_accept)
        {
             alert('Please Accept Terms Terms and Conditions')
            // showToast('Please Accept Terms Terms and Conditions')
            emit('cancel', false)
            return false
        }
        //   if(!isVerify.value)
        //   {
        //     showToast('invalid captcha')
        //     emit('cancel', false)
        //     return false
        //   }
        emit('formData', signUpForm)
     }else{
        emit('cancel', false)
     }
}

onUpdated(()=>{
     emit('cancel', false)
})

onMounted(()=>{
   currentLocation()
   passwordHint()
   FatchTerm()

   
})


</script>