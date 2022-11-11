<template>
    <div class="col-xl-9 bg-w pd-30">
        <h3 class="mb-10">Add Evaluate Supplier Template</h3>
        <div class="tab-content" id="myTabContent">
            <div class="tab-pane fade show active" id="organizationdoc" role="tabpanel">
                <Form @submit="add" :validation-schema="addEvaluateRules" v-slot="{ errors }">
                    <div class="row fv-row mb-10 fv-plugins-icon-container">
                            <div class="col-md-6 pb-5">
                                <label class="form-label required">Category</label>
                                <div v-if="categoryStore.categoriesLoader" class="text-center"> <span class="spinner-border"></span></div>
                                <Field v-else v-model="Cat"  :class="{ 'is-invalid': errors.mainCategory }" as="select" name="mainCategory" class="form-select form-select-lg form-select-solid" data-control="select2"
                                data-placeholder="Select..." data-allow-clear="true" data-hide-search="true">
                                    <option selected value="" disabled>Select Category</option>
                                    <option v-for="category in mainCategoryList" :key="category" :value="category.Cat_id"> {{ category.Cat_name }} </option>
                                </Field>
                                <div class="fv-plugins-message-container invalid-feedback">{{errors.mainCategory}}</div>
                            </div>
                            <div class="col-md-6 pb-5">
                            </div>
                            <template v-for="(list,index) in addValue" :key="index">
                            <div class="col-md-3 pb-5">
                                <label class="form-label ">Add point</label>
                                <input maxlength="500" :class="{ 'is-invalid': errors.addPoint }"  name="addPoint" v-model="list.Add_Point" placeholder="Add point" class="form-control form-control-lg form-control-solid" />
                                <div class="fv-plugins-message-container invalid-feedback">{{errors.addPoint}}</div>
                           </div>
                            <div class="col-md-3 pb-5 ">
                                <label class="form-label required">Request Type</label>
                                <select v-model="list.Request_Type" :class="{ 'is-invalid': errors.requestType }" as="select" name="requestType"  
                                class="form-select form-select-lg form-select-solid" data-control="select2" data-placeholder="Select..." data-allow-clear="true" data-hide-search="true">
                                    <option  selected value="" disabled>Select Request Type</option>
                                    <option :value="0"> Optional </option>
                                    <option :value="1"> Mandatory</option>
                                </select>
                                <div class="fv-plugins-message-container invalid-feedback">{{errors.requestType}}</div>
                            </div>
                            <div class="col-md-3 pb-5 ">
                                <label class="form-label required">Ans Type</label>
                                <select v-model="list.Ans_Type" :class="{ 'is-invalid': errors.ansType }" as="select" name="ansType" class="form-select form-select-lg form-select-solid" 
                                data-control="select2" data-placeholder="Select..." data-allow-clear="true" data-hide-search="true">
                                    <option  selected value="" disabled>Select Ans Type</option>
                                    <option v-for="(name,index) in ansType" :key="index" :value="index"> {{ name }} </option>

                                </select>
                                <div class="fv-plugins-message-container invalid-feedback">{{errors.ansType}}</div>
                            </div>

                             <div class="col-md-3 pb-5 ">
                                 <button v-if="index+1 == addValue.length"  type="button"  class="btn btn-primary me-2 " style="margin-top:28px" @click="AddRows(index)"> Add </button>
                                  <button v-if="index+1 != addValue.length" type="button"  class="btn btn-primary me-2 " style="margin-top:28px" @click="removeRows(index)"> Remove </button>
                             </div>
                            </template>
                    </div>
                <div class="row">
                <div class="col-md-9 pb-5">
                </div>
                    <div class="col-md-3 text-right" >
                        <label class="form-label "></label>
                        <button @click="router.push({ path: '/evaluate-supplier' })"  type="button" class="btn btn-secondary me-2"> cancel </button>
                        <button v-if="addBtn" type="submit" :disabled="!Object.values(errors).every(value => !value)" class="btn btn-primary ">
                         Submit</button>
                         <button v-if="!addBtn" type="button"  @click="update()"  class="btn btn-primary ">
                        Update</button>
                    </div>
                </div>
                </Form>
                <div class="row">
                    <div class="table-responsive" v-show="addedEvaluations.evaluate_supplierD.length">
                        <table class="table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4">
                            <thead>
                                <tr class="fw-bolder text-muted">
                                    <th class="min-w-140px">Category</th>
                                    <th class="min-w-150px">Points</th>
                                    <th class="min-w-140px">Request Type</th>
                                    <th class="min-w-140px">Ans Type</th>
                                    <th class="min-w-100px text-end">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(evaluate,index) in addedEvaluations.evaluate_supplierD" :key="index">
                                    <td>
                                        <span class="text-muted fw-bold text-muted d-block fs-7"> {{ getCatgoryName(evaluate.Category_id) }} </span>
                                    </td>
                                    <td>
                                        <span class="text-muted fw-bold text-muted d-block fs-7"> {{ evaluate.Add_Point }} </span>
                                    </td>
                                    <td>
                                        <span class="text-muted fw-bold text-muted d-block fs-7"> {{ evaluate.Request_Type == 0 ? 'Optional' : 'Mandatory'  }} </span>
                                    </td>
                                    <td>
                                        <span class="text-muted fw-bold text-muted d-block fs-7"> {{ ansType[evaluate.Ans_Type]  }} </span>
                                    </td>
                                    <td class="text-end">
                                        <ul class="userslist_action_icons">
                                            <li><i @click="editData(index)" class="fa fa-pencil-square cursor-pointer" aria-hidden="true"></i></li>
                                            <li><i @click="remove(index)" class="fa fa-trash cursor-pointer" aria-hidden="true"></i></li>
                                        </ul>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div class="row" v-show="addedEvaluations.evaluate_supplierD.length">
                    <div class="col-md-6">
                    </div>
                    <div class="col-md-6 text-right">
                        <button @click="router.push({ path: '/evaluate-supplier' })"  type="button" class="btn btn-secondary me-2"> cancel </button>
                        <button  @click="submitTemplate" class="btn btn-primary" >
                        <span style="width: 1.5rem; height: 1.5rem;" v-if="evaluateStore.btnLoader" class="spinner-border p-0 mx-15"></span>
                        <span v-else>Submit Template</span></button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { configure, Form, Field } from 'vee-validate';
import useValidation from '../../composables/useValidations'
import useAddEvaluateSupplier from '@/composables/useAddEvaluateSupplier'
import { useEvaluateSupplierStore } from '@/store/evaluateSupplier.store';
import { useRouter } from 'vue-router';
import { useMainCategoryStore } from '@/store/categoriesStore/mainCategory.store';

const evaluateStore = useEvaluateSupplierStore()
const categoryStore = useMainCategoryStore()
configure({
  validateOnBlur: true,
  validateOnChange: true,
  validateOnInput: true,
  validateOnModelUpdate: true,
});
const { addEvaluateRules } = useValidation();
const router = useRouter()
const {
    addedEvaluations,
    ansType,
    addValue,
    add,
    remove,
    mainCategoryList,
    getCatgoryName,
    submitTemplate,
    editData,
    addBtn,
    removeRows,
    AddRows,
    Cat,
    update

} = useAddEvaluateSupplier()


</script>

<style>

</style>