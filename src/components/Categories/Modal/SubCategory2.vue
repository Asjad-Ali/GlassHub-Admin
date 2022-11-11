<template>
    <div class="modal fade show" tabindex="-1"  style="display:block;background:rgba(0,0,0,0.5);opacity:1 !important" >
        <div class="modal-dialog" style="max-width:750px">
            <div class="modal-content" >
                <div class="modal-header">
                    <h5 class="modal-title">Add Sub Category2</h5>
                    <div class="btn btn-icon btn-sm btn-active-light-primary ms-2"  @click="close_subcat2_Model()">
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
                                <select @change="parentCatInfo($event)" v-model="category.Scat1_id" name="business_type" class="form-select form-select-lg form-select-solid" data-control="select2" data-placeholder="Select..." data-allow-clear="true" data-hide-search="true">
                                    <option selected value="" disabled>Select Parent Category</option>
                                    <option v-for="cat in mainCatStore.subCategory1" :key="cat" :value="cat.Scat1_id" >{{cat.Scat1_name}}</option>
                                </select>
                                <div class="text-danger"> {{ categoryError.Scat1_id }} </div>
                            </div>
                            <div class="col-md-3 vertical_text_mid">
                                <label class="form-label mb-0 required">SubCategory2 Name</label>
                            </div>
                            <div class="col-md-9 my-2">
                                <input maxlength="150" v-model="category.Scat2_name" type="text" placeholder="Name/Description" class="form-control form-control-lg form-control-solid">
                                <div class="text-danger"> {{ categoryError.Scat2_name }} </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button @click="update = false " type="button" class="btn btn-secondary" ><span  @click="close_subcat2_Model()">Cancel</span></button>
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
                                                    <tr v-for="cat in store.subCategory2List" :key="cat">
                                                        <td> {{ cat.Scat2_id }} </td>
                                                        <td> {{ cat.Scat1_name }} </td>
                                                        <td>{{ cat.Scat2_name }} </td>
                                                        <td class="text-end">
                                                            <ul class="userslist_action_icons">
                                                                <li><i @click="updateSubCategory(cat)" class="fa fa-pencil-square cursor-pointer" aria-hidden="true"></i></li>
                                                                <li @click="ShowModel()"><i @click=" deleteCat = cat.Scat2_id" data-bs-toggle="modal" data-bs-target="#subCategory2Delete" class="fa fa-trash cursor-pointer" aria-hidden="true"></i></li>
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
import { useMainCategoryStore } from '@/store/categoriesStore/mainCategory.store';
import { useSubCategory2Store } from '@/store/categoriesStore/subCategory2.store';
import {useAuthStore} from '@/store/auth.store'
import DeleteModal from '@/components/Modal/DeleteModal.vue';
import { reactive, ref } from '@vue/reactivity'
import { computed, watch } from '@vue/runtime-core';
import { defineEmits } from 'vue'

const mainCatStore = useMainCategoryStore()
const emit = defineEmits(['close_subcat2_Model']);
const open_model = ref(false)
const store = useSubCategory2Store()
const auth = useAuthStore()
const update = ref(false)
let deleteCat = ref()

const category = reactive({
    Cat_id: '',
    Scat_id:'',
    Scat1_id:'',
    Scat2_id: 0,
    Scat2_name:"",
    Scat2_code: null,
    created_by:auth.authUser.User.User_id,
    updated_by:auth.authUser.User.User_id,
})


const parentCatInfo = (e) => {
    console.log(e.target.value)
    const parentCategory = computed(() => mainCatStore.subCategory1.filter(cat => cat.Scat1_id == e.target.value))
    console.log(parentCategory.value)

    category.Cat_id = parentCategory.value[0].Cat_id
    category.Scat_id = parentCategory.value[0].Scat_id
}


const categoryError = reactive({
    Scat1_id: null,
    Scat2_name: null,
})
watch(category,(current) => {
    if(current.Scat1_id){
        categoryError.Scat1_id = null
    }
    if(current.Scat2_name){
        categoryError.Scat2_name = null
    }
})

const insertUpdateSubCategory = () => {
    if( category.Scat1_id ){
        let parent_id = category.Scat1_id
        if(category.Scat2_name){
            if(!update.value){
                category.Scat2_id = 0
            }
            console.log(category)
            store.insertUpdateSubCategory2(category, update.value).then(res => {
                if(res.status == 200){
                    mainCatStore.loadSubCategory2(parent_id)
                }
            })
            category.Scat2_name = ''
            category.Scat1_id = ''
            update.value = false
        } else {
            categoryError.Scat2_name = "Sub Category2 is Required"
        }
    } else {
        categoryError.Scat1_id = "Parent Category is Required"
    }
};

const updateSubCategory = (cat) => {
    update.value = true
    console.log(cat)

    category.Scat1_id = cat.Scat1_id;
    category.Scat2_id = cat.Scat2_id;
    category.Scat2_name = cat.Scat2_name;
        console.log(category)
};

const deleteRecord = () => {
    store.deleteSubCategory2(deleteCat.value.Scat2_id).then(res => {
        if(res.status == 200){
            mainCatStore.loadSubCategory2(deleteCat.value.Scat1_id)
        }
    })
}

const close_subcat2_Model = () => {
    emit('close_subcat2_Model', false)
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