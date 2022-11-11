<template>
    <div class="col-xl-9 pd-30 bg-w">
        <div class="card-body pb-0">
            <div class="row mb-10">
                <div class="col-12 d-flex justify-content-between">
                    <h1 v-if="route.params.id" class="pb-2">Update New User</h1>
                    <h1 v-else class="pb-2">Add New User</h1>
                </div>
                <div class="col-md-4 text-right text-hover-white">
                </div>
            </div>

            <!-- Begin Hurrairah Malik Dated:23-05-2022 -->

            <Form @submit="submit" :validation-schema="AddNewUser" v-slot="{ errors }">
                <div class="col-md-12 pb-5">
                    <div class="col-12">
                        <div class="row">
                            <div class="col-md-12">
                                <h4 class="pb-2">User Details</h4>
                                <div class="separator separator-dashed border-gray-300 my-2"></div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-6 mb-5">
                                <label class="form-label required">Name</label>
                                <Field maxlength="150" type="text" :class="{ 'is-invalid, is-invalid ': errors.Name }" name="Name"
                                    v-model="addnewuser.User_fullname"
                                    class="form-control form-control-lg form-control-solid mb-5"></Field>
                                <div class="fv-plugins-message-container invalid-feedback">{{ errors.Name }}</div>
                            </div>
                            <div class="col-md-6 mb-5">
                                <label class="form-label required">Email</label>
                                <Field maxlength="150" type="text" :class="{ 'is-invalid': errors.Email, 'is-invalid': EmailExist?.length }" name="Email"
                                    v-model="addnewuser.User_email"
                                    class="form-control form-control-lg form-control-solid mb-5"></Field>
                                <div v-if="errors.Email" class="fv-plugins-message-container invalid-feedback">{{ errors.Email }}</div>
                                <div v-else class="fv-plugins-message-container invalid-feedback">{{ EmailExist?.length ? EmailExist[0].email_exist : null }}</div>
                            </div>
                            <div class="col-md-6 mb-5">
                                <label class="form-label required">Designation</label>
                                <Field maxlength="150" type="text" :class="{ 'is-invalid': errors.Designation }" name="Designation"
                                    v-model="addnewuser.User_designation"
                                    class="form-control form-control-lg form-control-solid mb-5"></Field>
                                <div class="fv-plugins-message-container invalid-feedback">{{ errors.Designation }}
                                </div>
                            </div>
                            <div class="col-md-6 mb-5">
                                <label class="form-label required">Phone</label>
                                <!-- <div style="position: relative;" @click="phoneCode()"> -->
                                    <div class="signup">
                                        <Field type="tel" name="phone"   maxlength="20" v-model="addnewuser.User_phone" :class="{ 'is-invalid': errors.Phone }"
                                            placeholder="+966 00 000 000" style="width:100%" class="form-control form-control-lg form-control-solid" id="telephone">
                                        </Field>
                                    </div>
                                    <!-- <span style="position:absolute;left:50px;top:14px; margin-bottom: 10px;"
                                        v-if="!route.params.id">{{ p_code }}</span> -->
                                <!-- </div> -->
                                <div class="fv-plugins-message-container invalid-feedback">{{ errors.Phone }}</div>
                            </div>
                            <div class="col-md-6 mb-5">
                                <label class="form-label required">Password</label>
                                <Field maxlength="150" type="Password" :class="{ 'is-invalid': errors.Password }" name="Password"
                                    v-model="addnewuser.User_password" placeholder="*********"
                                    class="form-control form-control-lg form-control-solid mb-5"></Field>
                                <div class="fv-plugins-message-container invalid-feedback">{{ errors.Password }}</div>
                            </div>

                            <div class="col-md-6 pb-5">
                                        <label class="form-label required">Start Date</label>
                                        <Field type="date" v-model="addnewuser.Start_date" :class="{ 'is-invalid': errors.startDate }" name="startDate"
                                     placeholder="Pick date rage"  class="form-control form-control-lg form-control-solid" />
                                        <div class="fv-plugins-message-container invalid-feedback">
                                            {{ errors.startDate }}
                                        </div>
                                    </div>
                                

                            <div class="col-md-6 mb-5">
                                <label class="form-label required">Is Active</label>
                                <input type="checkbox" name="" v-model="addnewuser.Isactive"
                                    class="form-check-input mb-5 mx-2" />
                            </div>
                    </div>

                        <div class="text-right text-hover-white">
                            <a class="text-hover-white">

                                <button type="submit" v-if="route.params.id" class="btn btn-primary w-100"   >Update User</button>
                                <button type="submit" v-else class="btn btn-primary w-100">Add User </button>
                            </a>
                        </div>
                    </div>
                </div>
            </Form>

            <!-- Close Hurrairah Malik Dated:23-05-2022 -->



        </div>
    </div>
</template>




<script setup>
import getCountryCode from '@/composables/getCountryCode';
// Begin Hurrairah Malik Dated:23-05-2022
import 'intl-tel-input/build/css/intlTelInput.css';
import 'intl-tel-input/build/js/intlTelInput.js';
import intlTelInput from 'intl-tel-input';
import { configure, Form, Field } from 'vee-validate';
import useValidation from '@/composables/useValidations.js'
import { useRouter, useRoute } from 'vue-router';
import { onMounted, watch, ref, reactive } from "vue"
import { useadminUsersStore } from '@/store/adminUsers.store'
import API from '@/services/API';
import axios from 'axios'

// import API from '@/services/API';
configure({
    validateOnBlur: true,
    validateOnChange: true,
    validateOnInput: true,
    validateOnModelUpdate: true,
});

const user = JSON.parse(localStorage.getItem("user"));
const { AddNewUser } = useValidation();
// const phone = ref(null)
const current_country = ref('')
// const p_code = ref('')
const router = useRouter()
const route = useRoute()
const adminUsers = useadminUsersStore()
const User_id = ref(0)
let EmailExist = ref(null)

let addnewuser = reactive({
    User_id:User_id.value,
    User_fullname: '',
    User_phone: '',
    User_email: '',
    User_designation: '',
    User_password: '',
    Start_date:'',
    Isactive: true,
    Created_by: parseInt(user.User.User_id),
    Updated_by: parseInt(user.User.User_id),
    RegD_id: user.User.RegD_id,
})

// watch(phone, (new_value) => {
//     if (!route.params.id) {
//         if (phone.value == 0) { phone.value = '' }
//         if (phone.value != '') {
//             addnewuser.User_phone = `${p_code.value} ${new_value}`
//         } else {
//             addnewuser.User_phone = ""
//         }
//         document.getElementById("telephone").click();
//     } else {
//         if (phone.value != '') {
//             addnewuser.User_phone = `${new_value}`
//         }
//     }
// });

watch(() => addnewuser.User_email,async (current) => {
    if(!route.params.id){
        const res = await API.get(`api/signup/EmailExist?email=${current}`)
        EmailExist.value = res.data.emailExist
    }
})



// const phoneCode = () => {
//     setTimeout(() => {
//         let tel = document.getElementsByClassName('iti__active')[0];
//         let code = tel.getAttribute("data-dial-code");
//         p_code.value = `+${code}`
//     })
// }

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


const currentLocation= ()=>{
    axios.get('https://ipinfo.io/json?token=af0391037d7bdc').then(response=>{
       current_country.value=response.data.country
       addnewuser.User_phone = getCountryCode(current_country.value)
       setphone()
    })
}

const submit = () => {
    adminUsers.insertAdminUsers(addnewuser)
        .then(response => {
            if (response.status == 200) {
                router.push({ path: '/admin-user' })
            }
        })
}


onMounted(() => {
        // setphone()
       currentLocation()
      if(route.params.id){
        const com = JSON.parse(localStorage.getItem('edit-newuser'))
        addnewuser.User_id= com.User_id;
            addnewuser.User_fullname= com.User_fullname;
            addnewuser.User_phone= com.User_phone;
            addnewuser.User_email= com.User_email;
            addnewuser.User_designation= com.User_designation;
            // addnewuser.User_password= com.User_password;
            addnewuser.Start_date= com.Start_date.substring(0,10);
            addnewuser.Isactive= com.Isactive;
            
        console.log("getitem",addnewuser)
    }

    if(route.params.id) {
         User_id.value=route.params.id
       }


    //    else{
    //        phoneCode()
    //    }

    // const input = document.querySelector("#telephone");
    // intlTelInput(input, {
    //     // any initialisation options go here
    //     preferredCountries: ["us"],
    // });

})


// Close Hurrairah Malik Dated:23-05-2022

</script>
<style scoped>
.error {
    border: 1px solid red;
}

.text_error {
    color: red;
    margin-top: 5px;
}
</style>

<style>
.iti--allow-dropdown {
    width: 100% !important;

    padding-left: 40px;

}
</style>