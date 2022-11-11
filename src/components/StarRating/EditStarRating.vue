<template>
    <div class="col-xl-9 bg-w pd-30">
        <h1 class="pb-2">Update Star Rating Template</h1>
        <div class="tab-content" id="myTabContent">
            <div class="tab-pane fade show active" id="organizationdoc" role="tabpanel">

                <Form @submit="updateStarRating" :validation-schema="starRatingRules" v-slot="{ errors }">
                    <div class="row fv-row mb-10 fv-plugins-icon-container">

                        <div class="col-md-6 pb-5">
                            <div class="form-label required">Account Type </div>
                            <Field :class="{ 'is-invalid': errors.AccountType }" as="select" name="AccountType" class="form-select form-select-lg form-select-solid" 
                                v-model="editStar.Account_id"  >
                                <option selected value="" disabled> Select Account Type </option>
                                <option v-for="(account,index) in accountType" :key="index" :value="index"> {{ account }} </option>
                            </Field>
                            <div class="fv-plugins-message-container invalid-feedback">{{ errors.AccountType }}</div>
                        </div>

                        <div class="col-md-6 pb-5">
                            <label  class="form-label required">Category </label>
                                <div v-if="categoryStore.categoriesLoader" class="text-center"> <span class="spinner-border"></span></div>
                                <Field v-model="editStar.Category_id"  :class="{ 'is-invalid': errors.mainCategory }" as="select" name="mainCategory" class="form-select form-select-lg form-select-solid" data-control="select2"
                                data-placeholder="Select..." data-allow-clear="true" data-hide-search="true">
                                    <option selected value="" disabled>Select Category</option>
                                    <option v-for="category in mainCategoryList" :key="category" :value="category.Cat_id"> {{ category.Cat_name }} </option>
                                </Field>
                            <div class="fv-plugins-message-container invalid-feedback">{{ errors.mainCategory }}</div>
                        </div>
                      <template v-for="(list,index) in store.editstarRatingsList?.rating_adminD" :key="index">
                        <div class="col-md-3 pb-5">
                            <label class="form-label required">Add Question</label>
                            <input :class="{ 'is-invalid': errors.AddQuestion }" name="AddQuestion" v-model="list.Add_Question" placeholder="Add Question"
                                class="form-control form-control-lg form-control-solid"/>
                                <div class="fv-plugins-message-container invalid-feedback">{{ errors.AddQuestion }}</div>
                        </div>

                        <div class="col-md-3 pb-5">
                            <label class="form-label required">Request Type</label>
                            <select  :class="{ 'is-invalid': errors.requestType }" as="select" name="requestType" v-model="list.Request_Type" class="form-select form-select-lg form-select-solid"
                                data-control="select2" data-placeholder="Select..." data-allow-clear="true"
                                data-hide-search="true">
                                <option selected disabled value="">Select Request</option>
                                <option :value="0"> Optional </option>
                                <option :value="1"> Mandatory</option>
                            </select>
                            <div class="fv-plugins-message-container invalid-feedback">{{ errors.requestType }}</div>
                        </div>

                        <div class="col-md-3 pb-5 ">
                            <label class="form-label ">Star Rating</label>
                            <input v-model="list.StarRating" name="" placeholder="5" class="form-control form-control-lg form-control-solid" readonly />
                        </div>
                        <div class="col-md-3 pb-5 ">
                            <button type="button"  class="btn btn-primary me-2 " style="margin-top:28px" @click="removeRows(index)"> Remove </button>
                        </div>
                      </template>
                        <div class="col-md-9 pb-5 ">
                        </div>

                        <div class="col-md-3 text-right ">
                            <label class="form-label "></label>
                            <button @click="router.push({ path: '/star-rating' })"  type="button" class="btn btn-secondary mt-8 me-2"> cancel </button>
                            <button :disabled="!Object.values(errors).every(value => !value)" type="submit" class="btn btn-primary mt-8">
                            <span style="width: 1.5rem; height: 1.5rem;" v-if="store.btnLoader" class="spinner-border p-0 mx-6"></span>
                            <span v-else>Update</span> </button>
                        </div>
                    </div>
                </Form>
            </div>
        </div>
    </div>
</template>

<script setup>
import { configure, Form, Field } from 'vee-validate';
import useValidation from '@/composables/useValidations.js'
import { reactive } from '@vue/reactivity';
import { useStarRatingStore } from '@/store/starRating.store';
import { computed, onMounted } from '@vue/runtime-core';
import { useRouter ,useRoute} from 'vue-router';
import { useMainCategoryStore } from '@/store/categoriesStore/mainCategory.store';

const store = useStarRatingStore()
const categoryStore = useMainCategoryStore()
const router = useRouter()
const route = useRoute()
configure({
  validateOnBlur: true,
  validateOnChange: true,
  validateOnInput: true,
  validateOnModelUpdate: true,
});
let editStar = reactive(JSON.parse(localStorage.getItem("editStarRating")))
const accountType = ['Organization','Supplier','Freelancer','AuditFirm','Regulator']
// const user = JSON.parse(localStorage.getItem('user'))
const mainCategoryList = computed(() => categoryStore.mainCategoryList)
const { starRatingRules } = useValidation();


const removeRows =(index)=>{
    store.editstarRatingsList?.rating_adminD.splice(index,1)
}


const updateStarRating = () => {
       let data={
        rating_admin:store.editstarRatingsList.rating_admin[0],
        rating_adminD:[...store.editstarRatingsList.rating_adminD]
    }
    // console.log(data)
     store.insertUpdateStarRatingList(data).then((res) => {
        if(res.status == 200 ){
            store.starRatingsList = []
            router.push({path: '/star-rating'})
        }
    })
}

onMounted(() =>{
    categoryStore.loadCategory()
    store.EditStarRatingList(route.params.id)
} )

</script>
<style>

</style>