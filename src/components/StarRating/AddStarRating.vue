<template>
    <div class="col-xl-9 bg-w pd-30">
        <h1 class="pb-2">Add Star Rating Template</h1>
        <div class="tab-content" id="myTabContent">
            <div class="tab-pane fade show active" id="organizationdoc" role="tabpanel">

                <Form @submit="add" :validation-schema="starRatingRules" v-slot="{ errors }">
                    <div class="row fv-row mb-10 fv-plugins-icon-container">

                        <div class="col-md-6 pb-5">
                            <div class="form-label required">Account Type </div>
                            <Field :class="{ 'is-invalid': errors.AccountType }" as="select" name="AccountType" class="form-select form-select-lg form-select-solid" 
                                v-model="acc_type"  >
                                <option selected value="" disabled> Select Account Type </option>
                                <option v-for="(account,index) in accountType" :key="index" :value="index"> {{ account }} </option>
                            </Field>
                            <div class="fv-plugins-message-container invalid-feedback">{{ errors.AccountType }}</div>
                        </div>

                        <div class="col-md-6 pb-5">
                            <label class="form-label required">Category </label>
                                <Field v-model="Cat"  :class="{ 'is-invalid': errors.mainCategory }" as="select" name="mainCategory" class="form-select form-select-lg form-select-solid" data-control="select2"
                                data-placeholder="Select..." data-allow-clear="true" data-hide-search="true">
                                    <option selected value="" disabled>Select Category</option>
                                    <option v-for="category in mainCategoryList" :key="category" :value="category.Cat_id"> {{ category.Cat_name }} </option>
                                </Field>
                            <div class="fv-plugins-message-container invalid-feedback">{{ errors.mainCategory }}</div>
                        </div>
                        <template v-for="(list,index) in addStar" :key="index">
                        <div class="col-md-3 pb-5">
                            <label class="form-label required">Add Question</label>
                            <input :class="{ 'is-invalid': errors.AddQuestion }" maxlength="1000" name="AddQuestion" v-model="list.Add_Question" placeholder="Add Question"
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
                                 <button v-if="index+1 == addStar.length"  type="button"  class="btn btn-primary me-2 " style="margin-top:28px" @click="AddRows(index)"> Add </button>
                                  <button v-if="index+1 != addStar.length" type="button"  class="btn btn-primary me-2 " style="margin-top:28px" @click="removeRows(index)"> Remove </button>
                             </div>
                       </template>
                        <div class="col-md-12 text-right ">
                            <label class="form-label "></label>
                            <button @click="router.push({ path: '/star-rating' })"  type="button" class="btn btn-secondary mt-8 me-2"> cancel </button>
                            <button v-if="addBtn" :disabled="!Object.values(errors).every(value => !value)" type="submit" class="btn btn-primary mt-8"> Add Point  </button>
                            <button v-else :disabled="!Object.values(errors).every(value => !value)" type="button" @click="update()"   class="btn btn-primary mt-8"> Update Point</button>
                        </div>

                        <!-- Template Table -->

                        <div v-if="addStarTemplate.rating_adminD.length">
                            <div class="row ">
                                <div class="table-responsive ">
                                    <table class="table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4">
                                        <thead>
                                            <tr class="fw-bolder text-muted">
                                                <th class="min-w-130px">SR</th>
                                                <th class="min-w-140px">Account Type</th>
                                                <th class="min-w-150px">Category</th>
                                                <th class="min-w-140px"> Question</th>
                                                <th class="min-w-140px"> Request Type</th>
                                                <th class="min-w-140px"> Star Rating</th>
                                                <th class="min-w-100px text-end">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="(starRating,index) in addStarTemplate.rating_adminD" :key="starRating">
                                                <td>
                                                    <span class="text-muted fw-bold text-muted d-block fs-7"> {{ index }} </span>
                                                </td>
                                                <td>
                                                    <span class="text-muted fw-bold text-muted d-block fs-7"> {{ accountType[ starRating.Account_id ] }} </span>
                                                </td>
                                                <td>
                                                    <span class="text-muted fw-bold text-muted d-block fs-7"> {{ getCatgoryName(starRating.Category_id) }} </span>
                                                </td>
                                                <td>
                                                    <span class="text-muted fw-bold text-muted d-block fs-7"> {{ starRating.Add_Question }} </span>
                                                </td>
                                                <td>
                                                    <span class="text-muted fw-bold text-muted d-block fs-7"> {{ starRating.Request_Type == 1 ? 'Mandatory' : 'Optional' }} </span>
                                                </td>
                                                <td>
                                                    <span class="text-muted fw-bold text-muted d-block fs-7"> {{ starRating.StarRating }} </span>
                                                </td>
                                                <td class="text-end">
                                                    <ul class="userslist_action_icons">
                                                        <li><i @click="editAddStarTemplate(index)" class="fa fa-pencil-square cursor-pointer" aria-hidden="true"></i></li>
                                                        <li><i @click="removeAddStarTemplate(index)" class="fa fa-trash cursor-pointer" aria-hidden="true"></i></li>
                                                    </ul>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-6">
                                    <h1 class="pb-2"></h1>
                                </div>
                                <div class="col-md-6 text-right">
                                    <button @click="router.push({ path: '/star-rating' })"  type="button" class="btn btn-secondary me-2"> cancel </button>
                                    <button @click="submitTemplate"  class="btn btn-primary" >
                                     <span style="width: 1.5rem; height: 1.5rem;" v-if="store.btnLoader" class="spinner-border p-0 mx-10"></span>
                                    <span v-else>Submit Template</span></button>
                                </div>
                            </div>
                        </div>
                    </div>
                </Form>
            </div>

        </div>
    </div>
</template>

<script setup>
import useAddStarRating from '@/composables/useAddStarRating'
import { configure, Form, Field } from 'vee-validate';
import useValidation from '@/composables/useValidations.js'
import { useStarRatingStore } from '@/store/starRating.store';
import { useRouter } from 'vue-router';

configure({
  validateOnBlur: false,
  validateOnChange: false,
  validateOnInput: false,
  validateOnModelUpdate: false,
});

const router = useRouter()

const store = useStarRatingStore()
const accountType = ['Organization','Supplier','Freelancer','AuditFirm','Regulator']

const { starRatingRules } = useValidation();


const{
    addStar,
    add,
    addBtn,
    mainCategoryList,
    addStarTemplate,
    getCatgoryName,
    removeAddStarTemplate,
    editAddStarTemplate,
    Cat,
    acc_type,
    AddRows,
    removeRows,
    update

} = useAddStarRating()

    const submitTemplate = () => {
    
        store.insertUpdateStarRatingList(addStarTemplate).then((res) => {
            if(res.status == 200 ){
                store.starRatingsList = []
                router.push({path: '/star-rating'})
            }
        })
    }

</script>
<style>

</style>