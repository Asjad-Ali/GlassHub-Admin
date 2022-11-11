<template>
    <div class="modal fade show" tabindex="-1"  style="display:block;background:rgba(0,0,0,0.5);opacity:1 !important" >
        <div class="modal-dialog" style="max-width:750px">
            <div class="modal-content" >
                <div class="modal-header">
                    <h5 class="modal-title">Add Sub Category</h5>
                    <div class="btn btn-icon btn-sm btn-active-light-primary ms-2" @click="close_subcat_Model()">
                        <i class="fa fa-times" aria-hidden="true"></i>
                    </div>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-md-12">
                        </div>
                        <div class="row">
                            <div class="col-md-3 vertical_text_mid">
                                <label class="form-label mb-0 required">Parent Category</label>
                            </div>
                            <div class="col-md-9">
                                <select v-model="category.Cat_id" name="business_type" class="form-select form-select-lg form-select-solid" 
                                data-control="select2" data-placeholder="Select..." data-allow-clear="true" data-hide-search="true">
                                    <option selected value="" disabled>Select Parent Category</option>
                                    <option v-for="cat in mainCatStore.mainCategoryList" :key="cat" :value="cat.Cat_id" >{{cat.Cat_name}}</option>
                                </select>
                                <div class="text-danger"> {{categoryError.Cat_id}} </div>
                            </div>
                            <div class="col-md-3 vertical_text_mid">
                                <label class="form-label mb-0 required">SubCategory Name</label>
                            </div>
                            <div class="col-md-9 my-2">
                                <input maxlength="150" v-model="category.Scat_name" type="text" placeholder="Name/Description" class="form-control form-control-lg form-control-solid">
                                <div class="text-danger"> {{categoryError.Scat_name}} </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button @click="update = false " type="button" class="btn btn-secondary"><span  @click="close_subcat_Model()">Cancel</span></button>
                            <button @click="insertUpdateSubCategory" :disabled="!Object.values(categoryError).every(value => !value)" type="button" class="btn btn-primary">
                            <span style="width: 1.5rem; height: 1.5rem;" v-if="store.btnLoader" class="spinner-border p-0 mx-5"></span>
                            <span v-else> {{ update ? 'Update' : 'Save' }} </span></button>
                        </div>

                        <!-- Listing -->
                        <ModalLoader v-if="store.loader" />
                        <div v-else>
                            <div class="col-md-12 ">
                                <div class="row">
                                    <div class="col-md-12">
                                        <div class="table-responsive">
                                            <!--begin::Table-->
                                            <table class="table table-row-dashed table-row-gray-300 align-middle">
                                                <thead>
                                                    <tr>
                                                        <th>Sr#</th>
                                                        <th>Parent Category</th>
                                                        <th>Sub Category Name</th>
                                                        <th class="text-end">Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr v-for="cat in store.subCategoryList" :key="cat">
                                                        <td> {{ cat.Scat_id }} </td>
                                                        <td> {{ cat.Cat_name }} </td>
                                                        <td>{{ cat.Scat_name }} </td>
                                                        <td class="text-end">
                                                            <ul class="userslist_action_icons">
                                                                <li><i @click="updateSubCategory(cat)" class="fa fa-pencil-square cursor-pointer" aria-hidden="true"></i></li>
                                                                <li  @click="ShowModel()"><i @click="deleteCat = cat" class="fa fa-trash cursor-pointer" aria-hidden="true"></i></li>
                                                            </ul>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                               
                                </div>
                            </div>
                        </div> 
                    </div>
                </div>
            </div>
        </div>
    </div>


<teleport to="body">
        <DeleteModal  v-if="open_model" @deleteRecord="deleteRecord"  @closeModel="closeModel" />
</teleport>

</template>

<script setup>
import { reactive, ref } from '@vue/reactivity'
import { useSubCategoryStore } from '@/store/categoriesStore/subCategory.store'
import { useMainCategoryStore } from '@/store/categoriesStore/mainCategory.store';
import {useAuthStore} from '@/store/auth.store'
import DeleteModal from '@/components/Modal/DeleteModal.vue';
import ModalLoader from '@/components/ModalLoader.vue';
import { watch } from '@vue/runtime-core';
import { defineEmits } from 'vue'

const store = useSubCategoryStore()
const auth = useAuthStore()
const emit = defineEmits(['close_subcat_Model']);
const open_model = ref(false)
const mainCatStore = useMainCategoryStore()
const update = ref(false)
let deleteCat = ref()

let category = reactive({
    Cat_id: '',
    Cat_name: '',
    Scat_id: 0,
    Scat_name: '',
    Scat_code: null,
    created_by:auth.authUser.User.User_id,
    updated_by:auth.authUser.User.User_id,
})

const categoryError = reactive({
    Cat_id: null,
    Scat_name: null,
})
watch(category,(current) => {
    if(current.Cat_id){
        categoryError.Cat_id = null
    }
    if(current.Scat_name){
        categoryError.Scat_name = null
    }
})

const insertUpdateSubCategory = () => {
    if( category.Cat_id ){
        let parent_id = category.Cat_id
        if(category.Scat_name){
            if(!update.value){
                category.Scat_id = 0
            }
            console.log(category)
            store.insertUpdateSubCategory(category, update.value).then(res => {
                if(res.status == 200){
                    mainCatStore.loadSubCategories(parent_id)
                }
            })
            category.Scat_name = ''
            category.Cat_id = ''
            update.value = false
        } else {
            categoryError.Scat_name = "Sub Category is Required"
        }
    } else {
        categoryError.Cat_id = "Parent Category is Required"
     }
};

const updateSubCategory = (cat) => {
    update.value = true
    category.Cat_id = cat.Cat_id;
    category.Scat_id = cat.Scat_id;
    category.Scat_name = cat.Scat_name;
};

const deleteRecord = () => {
    store.deleteSubCategory(deleteCat.value).then(res => {
        if(res.status == 200){
            mainCatStore.loadSubCategories(deleteCat.value.Cat_id)
        }
    })
}

const close_subcat_Model = () => {
    emit('close_subcat_Model', false)
}

const ShowModel = () => {
     open_model.value = true
    }

const closeModel =(event)=>{
    open_model.value=event
}

</script>

<style>

</style>