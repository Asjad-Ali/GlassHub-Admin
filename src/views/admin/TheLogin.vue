<template>
  <div id="kt_body" class="bg-body">
    <div class="d-flex flex-column flex-root">
      <div class="d-flex flex-column flex-column-fluid">
        <div
          class="d-flex flex-center flex-column flex-column-fluid p-10 pb-lg-10">
          <a href="index.html" class="mb-12 loginlogo">
            <img :src="COMPANY_LOGO" />
          </a>
          <div
            class="w-lg-500px bg-body rounded shadow-sm p-10 p-lg-15 mx-auto">
            <Form 
              @submit="login"
              class="form w-100"
              :validation-schema="LoginRules" v-slot="{ errors }"
              id="kt_sign_in_form">
              <div class="text-center mb-10">
                <h1 class="text-dark mb-3">Sign In</h1>
                <!-- <div class="text-gray-400 fw-bold fs-4">
                  New Here? <a href="#">Create an Account</a>
                </div> -->
              </div>
              <div class="fv-row mb-10">
                <label class="form-label fs-6 fw-bolder text-dark">Email</label>
                <Field
                  class="form-control form-control-lg form-control-solid"
                  type="text"
                  as="input"
                  :class="{ 'is-invalid border-danger': errors.email }"
                  name="email"
                  autocomplete="off"
                  placeholder="email@yourdomain.com" v-model="user.User_email"
                />
                <div class="invalid-feedback">{{errors.email}}</div>
              </div>
              <div class="fv-row mb-10">
                <div class="d-flex flex-stack mb-2">
                  <label class="form-label fw-bolder text-dark fs-6 mb-0">Type Password</label>
                  <!-- <a href="#">Forgot Password ?</a> -->
                </div>
                <Field
                  class="form-control form-control-lg form-control-solid"
                  placeholder="password"
                  type="password"
                  as="input"
                  :class="{ 'is-invalid border-danger': errors.password }"
                  name="password"
                  autocomplete="off" v-model="user.User_password"
                />
                <div class="invalid-feedback">{{errors.password}}</div>
              </div>
              <div class="text-center loginbtn">
                <button
                  type="submit"
                  :disabled="!Object.values(errors).every(value => !value) || store.buttonLoader == 1"
                  class="btn btn-lg btn-primary w-100 mb-5"><span style="height: 1.5rem; width: 1.5rem" v-if="store.buttonLoader" class="spinner-border p-0 m-0"></span>
                  {{store.buttonLoader ? '' : 'Login' }}
                </button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="row footerlogin text-center">
        <div class="col-md-12">
        <p class="text-gray-800 text-hover-primary">2022© {{COMPANY_Name}}</p>
          <ul class="p-0">
           <li><a @click="TremCondition(4)" class="cursor-pointer">About</a></li>
            <li><a @click="TremCondition(5)" class="cursor-pointer">Support</a></li>
            <li><a @click="TremCondition(3)" class="cursor-pointer">Contact</a></li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { configure, Form, Field } from 'vee-validate';
import useValidation from '../../composables/useValidations'
import { onMounted } from "@vue/runtime-core";
import { useAuthStore } from "../../store/auth.store";
import { useRouter } from "vue-router";
const { reactive } = require("@vue/reactivity");


const store = useAuthStore();
const router = useRouter()

const { computed }=require("@vue/runtime-core");
const COMPANY_Name = computed(() => process.env.VUE_APP_COMPANY_Name ); 
console.log("Company name",COMPANY_Name.value)
const COMPANY_LOGO = computed(() => process.env.VUE_APP_COMPANY_LOGO ); 
console.log("Company Logo",COMPANY_LOGO.value)

configure({
  validateOnBlur: true,
  validateOnChange: true,
  validateOnInput: true,
  validateOnModelUpdate: true,
});

const user = reactive({
  User_email: "",
  User_password: "",
});

const { LoginRules } = useValidation();

const TremCondition=(page_id)=>{
  router.push('/footer')
  store.FatchTerm({page_id:page_id})
}

onMounted(() => {
  const isAuthenticated = localStorage.getItem('TOKEN') ? true : false;
  if(isAuthenticated){
    router.push({path: "/"})
  }
})

function login  ()  {
  store.login(user)
  .then((response) => {
    if(response.status == 200){
      window.open('/',"_self")
    }
  })
}


</script>

