<template>
    <div class="col-xl-9 pd-30 bg-w">
        <div class="card-body pb-0">
            <h1 class="pb-2"> Add Payment Methods</h1>
            <div class="separator separator-dashed border-gray-300 my-8"></div>
            <div class="row ">
                <div class="col-md-12 pb-5">
                    <div class="form-label ">Payment Name </div>
                    <input type="text" v-model="formData.Pay_name"  placeholder="Payment Name" :class="{'is-invalid border-danger':validate.Pay_name.$error}" class="form-control form-control-lg form-control-solid" />
                    <div v-for="(error, index) in validate.Pay_name.$errors" :key="index" class="mt-1">
                        <span class="text-danger ">{{error.$message}}</span>
                    </div>
                </div>
                <div class="col-md-12 pb-5">
                    <div class="form-label ">Payment Description </div>
                    <textarea type="text" v-model="formData.Pay_description" placeholder="Payment Description" :class="{'is-invalid border-danger':validate.Pay_description.$error}" class="form-control form-control-lg form-control-solid" ></textarea>
                    <div v-for="(error, index) in validate.Pay_description.$errors" :key="index" class="mt-1">
                        <span class="text-danger ">{{error.$message}}</span>
                    </div>
                </div>
                <div class="row mt-10">
                    <div class="col-md-12 text-right">
                        <router-link to="/payment-methods"><button class="btn btn-secondary me-2">cancel</button> </router-link>
                        <button v-if="route.params.id" @click="onSubmit"  type="" class="btn btn-primary">
                        <span style="width: 1.5rem; height: 1.5rem;" v-if="store.btnLoader" class="spinner-border"></span>
                        <span v-else>Update</span></button>
                        <button v-else type="" @click="onSubmit" class="btn btn-primary">
                        <span style="width: 1.5rem; height: 1.5rem;" v-if="store.btnLoader" class="spinner-border"></span>
                        <span v-else>Add</span></button>
                    </div>
                </div>
             </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useVuelidate } from "@vuelidate/core";
import { required ,helpers} from "@vuelidate/validators";
import { usePaymentMethodsStore } from "@/store/paymentMethod.store";
import { useRoute, useRouter } from "vue-router";
import API from "@/services/API.js";

const user = JSON.parse(localStorage.getItem('user'))
const store = usePaymentMethodsStore()
const router = useRouter()
const route = useRoute()
let formData = ref({
    Pay_id: 0,
    Pay_name: "",
    Pay_description: "",
    created_by: user.User.User_id,
    updated_by: user.User.User_id,
    userid: user.User.User_id,
})

const rules = {
    Pay_name:{required:helpers.withMessage('Template Type is Required',required)},
    Pay_description:{required:helpers.withMessage('Account Type is Required',required)},
};

const validate = useVuelidate(rules, formData) 

const onSubmit = () => {
   validate.value.$touch();
    if(!validate.value.$invalid){
    store.insertPaymentMethods(formData.value)
    .then(response => {
        if(response.status == 200){
            router.push({ path: '/payment-methods' })
        }
    })
}
}

onMounted( async ()  => {
    if(route.params.id){
        if(store.allPaymentMethodsList.length){
            const index = store.allPaymentMethodsList.findIndex(pay => pay.Pay_id == route.params.id)
            formData.value = store.allPaymentMethodsList[index]
        }else{
            const response = await API.get(`api/payment_method/GetById/${route.params.id}`)
            formData.value = response.data
        }
    }
})

</script>
