<template>
    <div class="modal fade show" tabindex="-1" id="subCategory4Modal"  style="display:block;background:rgba(0,0,0,0.5);opacity:1 !important"  >
        <div class="modal-dialog" style="max-width:750px">
            <div class="modal-content" >
                <div class="modal-header">
                    <h5 class="modal-title">Add Sub Category4</h5>
                    <div class="btn btn-icon btn-sm btn-active-light-primary ms-2" data-bs-dismiss="modal" aria-label="Close" @click="close_subcat4_Model()">
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
                                <select @change="parentCatInfo($event)" v-model="category.Scat3_id" name="business_type" class="form-select form-select-lg form-select-solid" data-control="select2" data-placeholder="Select..." data-allow-clear="true" data-hide-search="true">
                                    <option selected value="" disabled>Select Parent Category</option>
                                    <option v-for="cat in mainCatStore.subCategory3 " :key="cat" :value="cat.Scat3_id" >{{cat.Scat3_name}}</option>
                                </select>
                                <div class="text-danger"> {{ categoryError.Scat3_id }} </div>
                            </div>
                            <div class="col-md-3 vertical_text_mid">
                                <label class="form-label mb-0 required">SubCategory4 Name</label>
                            </div>
                            <div class="col-md-9 my-2">
                                <input maxlength="150" v-model="category.Scat4_name" type="text" placeholder="Name/Description" class="form-control form-control-lg form-control-solid">
                                <div class="text-danger"> {{ categoryError.Scat4_name }} </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button @click="update = false " type="button" class="btn btn-secondary" > <span  @click="close_subcat4_Model()">Cancel</span></button>
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
                                                    <tr v-for="cat in store.subCategory4List" :key="cat">
                                                        <td> {{ cat.Scat4_id }} </td>
                                                        <td> {{ cat.Scat3_name }} </td>
                                                        <td>{{ cat.Scat4_name }} </td>
                                                        <td class="text-end">
                                                            <ul class="userslist_action_icons">
                                                                <li><i @click="updateSubCategory(cat)" class="fa fa-pencil-square cursor-pointer" aria-hidden="true"></i></li>
                                                                <li @click="ShowModel()"><i @click="deleteCat = cat.Scat4_id" data-bs-toggle="modal" data-bs-target="#subCategory4Delete" class="fa fa-trash cursor-pointer" aria-hidden="true"></i></li>
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
    <teleport to="body">
        <DeleteModal  v-if="open_model" @deleteRecord="deleteRecord"  @closeModel="closeModel" />
</teleport>

</template>

<script setup>
import { useSubCategory4Store } from '@/store/categoriesStore/subCategory4.store';
import { reactive, ref } from '@vue/reactivity'
import { computed, watch } from '@vue/runtime-core';
import { useMainCategoryStore } from '../../../store/categoriesStore/mainCategory.store';
import {useAuthStore} from '@/store/auth.store'
import DeleteModal from '@/components/Modal/DeleteModal.vue';
import { defineEmits } from 'vue'
const auth = useAuthStore()
const store = useSubCategory4Store()
const mainCatStore = useMainCategoryStore()
const update = ref(false)
let deleteCat = ref()

const emit = defineEmits(['close_subcat4_Model']);
const open_model = ref(false)
const category = reactive({
    Cat_id: '',
    Scat_id:'',
    Scat1_id:'',
    Scat2_id:'',
    Scat3_id:'',
    Scat4_id: 0,
    Scat4_name:"",
    Scat4_code: null,
    created_by:auth.authUser.User.User_id,
    updated_by:auth.authUser.User.User_id,
})

const parentCatInfo = (e) => {
    console.log(e.target.value)
    const parentCategory = computed(() => mainCatStore.subCategory3.filter(cat => cat.Scat3_id == e.target.value))
    console.log(parentCategory.value)
    
    category.Cat_id = parentCategory.value[0].Cat_id
    category.Scat_id = parentCategory.value[0].Scat_id
    category.Scat1_id = parentCategory.value[0].Scat1_id
    category.Scat2_id = parentCategory.value[0].Scat2_id
}


const categoryError = reactive({
    Scat3_id: null,
    Scat4_name: null,
})
watch(category,(current) => {
    if(current.Scat3_id){
        categoryError.Scat3_id = null
    }
    if(current.Scat4_name){
        categoryError.Scat4_name = null
    }
})

const insertUpdateSubCategory = () => {
    if( category.Scat3_id ){
        let parent_id = category.Scat3_id
        if(category.Scat4_name){
            if(!update.value){
                category.Scat4_id = 0
            }
            console.log(category)
            store.insertUpdateSubCategory4(category, update.value).then(res => {
                if(res.status == 200){
                    mainCatStore.loadSubCategory4(parent_id)
                }
            })
            category.Scat4_name = ''
            category.Scat3_id = ''
            update.value = false
        } else {
            categoryError.Scat4_name = "Sub Category4 is Required"
        }
    } else {
        categoryError.Scat3_id = "Parent Category is Required"
    }
};



const updateSubCategory = (cat) => {
    update.value = true
    category.Scat3_id = cat.Scat3_id;
    category.Scat4_id = cat.Scat4_id;
    category.Scat4_name = cat.Scat4_name;
};

const deleteRecord = () => {
    store.deleteSubCategory4(deleteCat.value.Scat4_id).then(res => {
        if(res.status == 200){
            mainCatStore.loadSubCategory4(deleteCat.value.Scat3_id)
        }
    })
}

const close_subcat4_Model = () => {
    emit('close_subcat4_Model', false)
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