<template>
    <div class="col-xl-9 bg-w pd-30">
        <h3 class="mb-10">Update Evaluate Supplier Template</h3>
        <div class="tab-content" id="myTabContent">
            <div class="tab-pane fade show active" >
                <Form @submit="add" :validation-schema="addEvaluateRules" v-slot="{ errors }">
                    <div class="row fv-row mb-10 fv-plugins-icon-container">
                        <div class="col-md-6 pb-5">
                            <label class="form-label required">Category</label>
                            <!-- <div v-if="categoryStore.categoriesLoader" class="text-center"> <span class="spinner-border"></span></div> -->
                            <Field v-model="editEvaluate.Category_id"  :class="{ 'is-invalid': errors.mainCategory }" as="select" name="mainCategory" class="form-select form-select-lg form-select-solid" data-control="select2"
                            data-placeholder="Select..." data-allow-clear="true" data-hide-search="true">
                                <option selected value="" disabled>Select Category</option>
                                <option v-for="category in mainCategoryList" :key="category" :value="category.Cat_id"> {{ category.Cat_name }} </option>
                            </Field>
                            <div class="fv-plugins-message-container invalid-feedback">{{errors.mainCategory}}</div>
                        </div>
                        <div class="col-md-6 pb-5">
                        </div>
                        <template v-for="(list,index) in evaluateStore.editEvaluationList?.evaluate_supplierD" :key="index">
                        <div class="col-md-3 pb-5">
                            <label class="form-label ">Add point</label>
                            <input :class="{ 'is-invalid': errors.addPoint }"  name="addPoint" v-model="list.Add_Point" placeholder="Add point" class="form-control form-control-lg form-control-solid" />
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
                            {{list.Ans_Type}}
                            <select v-model="list.Ans_Type" :class="{ 'is-invalid': errors.ansType }" as="select" name="ansType" class="form-select form-select-lg form-select-solid" 
                            data-control="select2" data-placeholder="Select..." data-allow-clear="true" data-hide-search="true">
                                <option  selected value="" disabled>Select Ans Type</option>
                                <option v-for="(name,index) in ansType" :key="index" :value="index"> {{ name }} </option>
                            </select>
                            <div class="fv-plugins-message-container invalid-feedback">{{errors.ansType}}</div>
                        </div>
                        <div class="col-md-3 pb-5 ">
                            <button type="button"  class="btn btn-primary me-2 " style="margin-top:28px" @click="removeRows(index)"> Remove </button>
                        </div>
                        </template>
                    </div>
                    <div class="row">
                    <div class="col-md-9 pb-5">
                    </div>
                        <div class="col-md-3 text-right" >
                            <label class="form-label "></label>
                            <button @click="router.push({path : '/evaluate-supplier'})" type="button" class="btn btn-secondary me-2 "> Cancel</button>
                            <button @click="updateEvaluate"  type="submit" :disabled="!Object.values(errors).every(value => !value)" 
                            class="btn btn-primary "><span style="height: 1.5rem; width: 1.5rem" v-if="evaluateStore.btnLoader" class="spinner-border p-0 my-0 mx-6"></span>
                            <span v-else>Update</span></button>
                        </div>
                    </div>
                </Form>
            </div>
        </div>
    </div>
</template>

<script setup>
import { configure, Form, Field } from 'vee-validate';
import useValidation from '../../composables/useValidations'
import useAddEvaluateSupplier from '@/composables/useAddEvaluateSupplier'
import { reactive } from '@vue/reactivity';
import { useRouter,useRoute } from 'vue-router';
import { useEvaluateSupplierStore } from '@/store/evaluateSupplier.store';
import {onMounted} from 'vue'

configure({
  validateOnBlur: true,
  validateOnChange: true,
  validateOnInput: true,
  validateOnModelUpdate: true,
});
// const user = JSON.parse(localStorage.getItem('user'))
const router = useRouter()
const route = useRoute()
const evaluateStore = useEvaluateSupplierStore()
let editEvaluate = reactive(JSON.parse(localStorage.getItem("editEvaluate")))
const { addEvaluateRules } = useValidation();

const {
    ansType,
    add,
    mainCategoryList,
} = useAddEvaluateSupplier()

const removeRows =(index)=>{
    evaluateStore.editEvaluationList?.evaluate_supplierD.splice(index,1)
}

const updateEvaluate = () => {
    let data={
        evaluate_supplier:evaluateStore.editEvaluationList.evaluate_supplier[0],
        evaluate_supplierD:[...evaluateStore.editEvaluationList.evaluate_supplierD]
    }
    evaluateStore.insertEvaluationList(data).then((res) => {
        if(res.status == 200 ){
            router.push({path: '/evaluate-supplier'})
        }
    })
}


onMounted(()=>{
   evaluateStore.EditEvaluate(route.params.id)
})



</script>