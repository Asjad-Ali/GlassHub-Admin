<template>
    <div class="modal fade" tabindex="-1" id="subCategory6Modal" >
        <div class="modal-dialog" style="max-width:750px">
            <div class="modal-content" >
                <div class="modal-header">
                    <h5 class="modal-title">Add Sub Category6</h5>
                    <div class="btn btn-icon btn-sm btn-active-light-primary ms-2" aria-label="Close">
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
                                <select @change="parentCatInfo($event)" v-model="category.Scat5_id" name="business_type" class="form-select form-select-lg form-select-solid" data-control="select2" data-placeholder="Select..." data-allow-clear="true" data-hide-search="true">
                                    <option selected value="" disabled>Select Parent Category</option>
                                    <option v-for="cat in mainCatStore.subCategory5 " :key="cat" :value="cat.Scat5_id" >{{cat.Scat5_name}}</option>
                                </select>
                                <div class="text-danger"> {{ categoryError.Scat5_id }} </div>
                            </div>
                            <div class="col-md-3 vertical_text_mid">
                                <label class="form-label mb-0 required">SubCategory6 Name</label>
                            </div>
                            <div class="col-md-9 my-2">
                                <input maxlength="150" v-model="category.Scat6_name" type="text" placeholder="Name/Description" class="form-control form-control-lg form-control-solid">
                                <div class="text-danger"> {{ categoryError.Scat6_name }} </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button @click="update = false " type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                            <button @click="insertUpdateSubCategory" type="button" class="btn btn-primary">
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
                                                    <tr v-for="cat in store.subCategory6List" :key="cat">
                                                        <td> {{ cat.Scat6_id }} </td>
                                                        <td> {{ cat.Scat5_name }} </td>
                                                        <td>{{ cat.Scat6_name }} </td>
                                                        <td class="text-end">
                                                            <ul class="userslist_action_icons">
                                                                <li><i @click="updateSubCategory(cat)" class="fa fa-pencil-square cursor-pointer" aria-hidden="true"></i></li>
                                                                <li><i @click="deleteCat = cat.Scat6_id" data-bs-toggle="modal" data-bs-target="#subCategory6Delete" class="fa fa-trash cursor-pointer" aria-hidden="true"></i></li>
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

    <!-- Delete Confirmation Modal -->
    <div class="modal fade" id="subCategory6Delete" aria-hidden="true" aria-labelledby="subCategory6Delete" tabindex="-1" >
        <div class="modal-dialog" style="max-width:500px">
            <div class="modal-content" >
                <div class="modal-header">
                    <h5 class="modal-title">Delete Sub Category 6</h5>
                    <div class="btn btn-icon btn-sm btn-active-light-primary ms-2" data-bs-dismiss="modal" aria-label="Close">
                        <i class="fa fa-times" aria-hidden="true"></i>
                    </div>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="row">
                            <div class="col-12">
                                <h6>Are you Sure you want to Delete This Category</h6>
                            </div>
                        </div>
                        <div class="modal-footer pb-0">
                            <button  type="button" class="btn btn-light" data-bs-toggle="modal" data-bs-target="#subCategory6Modal">No</button>
                            <button @click="deleteSubCategory" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#subCategory6Modal">Yes</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<script setup>
import { useSubCategory6Store } from '@/store/categoriesStore/subCategory6.store';
import { reactive, ref } from '@vue/reactivity'
import { computed, watch } from '@vue/runtime-core';
import { useMainCategoryStore } from '../../../store/categoriesStore/mainCategory.store';
import {useAuthStore} from '@/store/auth.store'

const store = useSubCategory6Store()
const auth = useAuthStore()
const mainCatStore = useMainCategoryStore()
const update = ref(false)
let deleteCat = ref()
const category = reactive({
    Cat_id: '',
    Scat_id:'',
    Scat1_id:'',
    Scat2_id:'',
    Scat3_id:'',
    Scat4_id:'',
    Scat5_id:'',
    Scat6_id: 0,
    Scat6_name:"",
    Scat6_code: null,
    created_by:auth.authUser.User.User_id,
    updated_by:auth.authUser.User.User_id,
})

const parentCatInfo = (e) => {
    console.log(e.target.value)
    const parentCategory = computed(() => mainCatStore.subCategory5.filter(cat => cat.Scat5_id == e.target.value))
    console.log("Parent cat3",parentCategory.value)
    
    category.Cat_id = parentCategory.value[0].Cat_id
    category.Scat_id = parentCategory.value[0].Scat_id
    category.Scat1_id = parentCategory.value[0].Scat1_id
    category.Scat2_id = parentCategory.value[0].Scat2_id
    category.Scat3_id = parentCategory.value[0].Scat3_id
    category.Scat4_id = parentCategory.value[0].Scat4_id
}


const categoryError = reactive({
    Scat5_id: null,
    Scat6_name: null,
})
watch(category,(current) => {
    if(current.Scat5_id){
        categoryError.Scat5_id = null
    }
    if(current.Scat6_name){
        categoryError.Scat6_name = null
    }
})

const insertUpdateSubCategory = () => {
    if( category.Scat5_id ){
        let parent_id = category.Scat5_id
        if(category.Scat6_name){
            if(!update.value){
                category.Scat6_id = 0
            }
            console.log(category)
            store.insertUpdateSubCategory6(category, update.value).then(res => {
                if(res.status == 200){
                    mainCatStore.loadSubCategory6(parent_id)
                }
            })
            category.Scat6_name = ''
            category.Scat5_id = ''
            update.value = false
        } else {
            categoryError.Scat6_name = "Sub Category6 is Required"
        }
    } else {
        categoryError.Scat5_id = "Parent Category is Required"
    }
};


const updateSubCategory = (cat) => {
    update.value = true
    category.Scat5_id = cat.Scat5_id;
    category.Scat6_id = cat.Scat6_id;
    category.Scat6_name = cat.Scat6_name;
};

const deleteSubCategory = () => {
    store.deleteSubCategory6(deleteCat.value.Scat6_id).then(res => {
        if(res.status == 200){
            mainCatStore.loadSubCategory6(deleteCat.value.Scat5_id)
        }
    })
}



</script>

<style>

</style>