<template>
    <!--Add New Categories Modal -->
    <div class="modal fade show" tabindex="-1" style="display:block;background:rgba(0,0,0,0.5);opacity:1 !important" >
        <div class="modal-dialog" style="max-width:750px">
            <div class="modal-content" >
                <div class="modal-header">
                    <h5 class="modal-title">Add Main Category</h5>
                    <div class="btn btn-icon btn-sm btn-active-light-primary ms-2" @click="close_Model()">
                        <i class="fa fa-times" aria-hidden="true"></i>
                    </div>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-md-12">
                        </div>
                        <div class="row">
                            <div class="col-md-3 vertical_text_mid">
                                <label class="form-label mb-0">Name</label>
                            </div>
                            <div class="col-md-9 mb-2">
                                <input maxlength="150" type="text" v-model="category.Cat_name" placeholder="Name/Description" class="form-control form-control-lg form-control-solid">
                                <div class="text-danger"> {{categoryError.Cat_name}} </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button @click="update = false" type="button" class="btn btn-secondary" > <span  @click="close_Model()">Cancel</span></button>
                            <button @click="insertCategory"  :disabled="!Object.values(categoryError).every(value => !value)" type="submit" class="btn btn-primary">
                            <span style="width: 1.5rem; height: 1.5rem;" v-if="store.btnLoader" class="spinner-border p-0 mx-5"></span>
                            <span v-else> {{ update ? 'Update' : 'Save' }} </span></button>
                        </div>
                        <!-- Listing -->
                        <div class="col-md-12 ">
                            <div class="row">
                                <div class="col-md-12">
                                    <div class="table-responsive">
                                        <table class="table table-row-dashed table-row-gray-300 align-middle">
                                            <thead>
                                                <tr>
                                                    <th>Sr#</th>
                                                    <th>Name</th>
                                                    <th class="text-end">Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr v-for="cat in store.mainCategoryList" :key="cat">
                                                    <td>{{cat.Cat_id}}</td>
                                                    <td>{{cat.Cat_name}}</td>
                                                    <td class="text-end">
                                                        <ul class="userslist_action_icons">
                                                            <li><i @click="updateCategory(cat)"  class="fa fa-pencil-square cursor-pointer" aria-hidden="true"></i></li>
                                                            <li @click="ShowModel()"><i @click="category.Cat_id = cat.Cat_id" class="fa fa-trash cursor-pointer" aria-hidden="true"></i></li>
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

     <teleport to="body">
        <DeleteModal  v-if="open_model" @deleteRecord="deleteRecord"  @closeModel="closeModel" />
        </teleport>
</template>

<script setup>
import { useMainCategoryStore } from '@/store/categoriesStore/mainCategory.store';
import {useAuthStore} from '@/store/auth.store'
import DeleteModal from '@/components/Modal/DeleteModal.vue';
import { reactive, ref } from '@vue/reactivity'
import { watch } from '@vue/runtime-core';
import { defineEmits } from 'vue'

const emit = defineEmits(['close_Model']);
const store = useMainCategoryStore()
const auth = useAuthStore()
const update = ref(false)
const open_model = ref(false)
const category = reactive({
    Cat_id: 0,
    Cat_code: null,
    Cat_name:"",
    created_by:auth.authUser.User.User_id,
    updated_by:auth.authUser.User.User_id,
})
const categoryError = reactive({
    Cat_name:"",
})
watch(category,(current) => {
    if(current.Cat_name){
        categoryError.Cat_name = null
    }
})
const insertCategory = () => {
    if(category.Cat_name){
        if(!update.value){
        category.Cat_id = 0
        }
        store.insertUpdateMainCategory(category, update.value)
        update.value = false
        category.Cat_name = ""
    }else{
        categoryError.Cat_name = "Category Name is Required"
    }
};

const updateCategory = (cat) => {
    update.value = true
    category.Cat_id = cat.Cat_id;
    category.Cat_name = cat.Cat_name;
};

const deleteRecord = () => {
    store.deleteMainCategory(category.Cat_id)
}

const close_Model = () => {
    emit('close_Model', false)
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