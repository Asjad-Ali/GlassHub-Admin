<template>
    <div class="col-xl-9 pd-30 bg-w">
        <div class="card-body p-0">
            <div class="col-md-8">
                <h1 class="pb-2">Categories</h1>
            </div>
            <PageLoader v-if="store.mainCategoryLoader" />
            <div v-else class="row fv-row mb-5 fv-plugins-icon-container">
                <div class="col-md-12 ">
                    <div class="form-label required">Category <a class="float-end cursor-pointer" @click="ShowModel()">Add Category</a></div>
                    <select name="business_type" class="form-select form-select-lg form-select-solid" data-control="select2" data-placeholder="Select..."
                    @change="loadSubCategories($event)" data-allow-clear="true" data-hide-search="true">
                        <option selected value="" disabled>Select category</option>
                        <option v-for="cat in store.mainCategoryList" :key="cat" :value="cat.Cat_id" >{{cat.Cat_name}}</option>
                    </select>
                    <div class="mt-2"> 
                        <a class="float-end cursor-pointer" @click="loadSubCategoryAllList" >Add Sub Category</a> 
                    </div>
                </div>
                <div v-if="store.subCatLoader" class="text-center"> <span class="spinner-border"></span></div>
                <div v-else>
                    <div v-if="store.subCategory.length" class="col-md-12  category box">
                        <div class="form-label required">Sub-Category </div>
                        <select name="business_type" class="form-select form-select-lg form-select-solid" data-control="select2" data-placeholder="Select..."
                        @change="loadSubCategory1($event)" data-allow-clear="true" data-hide-search="true">
                            <option selected value="" disabled>Select Sub-Category</option>
                            <option v-for="cat in store.subCategory" :key="cat" :value="cat.Scat_id" >{{cat.Scat_name}}</option>
                        </select>
                        <div class="mt-2"> 
                            <a  class="float-end cursor-pointer" @click="loadSubCategory1AllList">Add Sub-Category1</a>
                        </div>
                    </div>
                </div>
                <div v-if="store.subCat1Loader" class="text-center mt-3"> <span class="spinner-border"></span></div>
                <div v-else>
                    <div v-if="store.subCategory1.length" class="col-md-12  category box">
                        <div class="form-label required">Sub-Category 1 </div>
                        <select name="business_type" class="form-select form-select-lg form-select-solid" data-control="select2" data-placeholder="Select..."
                        @change="loadSubCategory2($event)" data-allow-clear="true" data-hide-search="true">
                            <option selected value="" disabled>Select Sub-Category 1</option>
                            <option v-for="cat in store.subCategory1" :key="cat" :value="cat.Scat1_id" >{{cat.Scat1_name}}</option>
                        </select>
                        <div class="mt-2"> <a  class="float-end cursor-pointer" @click="loadSubCategory2AllList" 
                        data-bs-toggle="modal" data-bs-target="#subCategory2Modal">Add Sub-Category2</a></div>
                    </div>
                </div>
                <div v-if="store.subCat2Loader" class="text-center mt-3"> <span class="spinner-border"></span></div>
                <div v-else>
                    <div v-if="store.subCategory2.length" class="col-md-12 category box">
                        <div class="form-label required">Sub-Category 2 </div>
                        <select name="business_type" class="form-select form-select-lg form-select-solid" data-control="select2" data-placeholder="Select..."
                        @change="loadSubCategory3($event)" data-allow-clear="true" data-hide-search="true">
                            <option selected value="" disabled>Select Sub-Category 2</option>
                            <option v-for="cat in store.subCategory2" :key="cat" :value="cat.Scat2_id" 
                            >{{cat.Scat2_name}}</option>
                        </select>
                        <div class="mt-2"> <a  class="float-end cursor-pointer" @click="loadSubCategory3AllList" 
                        data-bs-toggle="modal" data-bs-target="#subCategory3Modal">Add Sub-Category3</a></div>
                    </div>
                </div>
                <div v-if="store.subCat3Loader" class="text-center mt-3"> <span class="spinner-border"></span></div>
                <div v-else>
                    <div v-if="store.subCategory3.length" class="col-md-12  category box">
                        <div class="form-label required">Sub-Category 3</div>
                        <select name="business_type" class="form-select form-select-lg form-select-solid" data-control="select2" data-placeholder="Select..."
                        @change="loadSubCategory4($event)" data-allow-clear="true" data-hide-search="true">
                            <option selected value="" disabled>Select Sub-Category 3</option>
                            <option v-for="cat in store.subCategory3" :key="cat" :value="cat.Scat3_id" 
                            >{{cat.Scat3_name}}</option>
                        </select>
                        <div class="mt-2"> <a  class="float-end cursor-pointer" @click="loadSubCategory4AllList" 
                        data-bs-toggle="modal" data-bs-target="#subCategory4Modal">Add Sub-Category4</a></div>
                    </div>
                </div>
                <div v-if="store.subCat4Loader" class="text-center mt-3"> <span class="spinner-border"></span></div>
                <div v-else>
                    <div v-if="store.subCategory4.length" class="col-md-12  category box">
                        <div class="form-label required">Sub-Category 4 </div>
                        <select  name="business_type" class="form-select form-select-lg form-select-solid" data-control="select2" data-placeholder="Select..."
                        @change="loadSubCategory5($event)" data-allow-clear="true" data-hide-search="true">
                            <option selected value="" disabled>Select Sub-Category 4</option>
                            <option v-for="cat in store.subCategory4" :key="cat" :value="cat.Scat4_id" 
                            >{{cat.Scat4_name}}</option>
                        </select>
                        <!-- <div class="mt-2"> <a  class="float-end cursor-pointer" @click="loadSubCategory5AllList" 
                        data-bs-toggle="modal" data-bs-target="#subCategory5Modal">Add Sub-Category5</a></div> -->
                    </div>
                </div>
                <!-- <div v-if="store.subCat5Loader" class="text-center mt-3"> <span class="spinner-border"></span></div>
                <div v-else>
                    <div v-if="store.subCategory5.length" class="col-md-12  category box">
                        <div class="form-label required">Sub-Category 5</div>
                        <select  name="business_type" class="form-select form-select-lg form-select-solid" data-control="select2" data-placeholder="Select..."
                        @change="loadSubCategory6($event)" data-allow-clear="true" data-hide-search="true">
                            <option selected value="" disabled>Select Sub-Category 5</option>
                            <option v-for="cat in store.subCategory5" :key="cat" :value="cat.Scat5_id" 
                            >{{cat.Scat5_name}}</option>
                        </select>
                        <div class="mt-2"> <a  class="float-end cursor-pointer" @click="loadSubCategory6AllList" 
                        data-bs-toggle="modal" data-bs-target="#subCategory6Modal">Add Sub-Category6</a></div>
                    </div>
                </div>
                <div v-if="store.subCat6Loader" class="text-center mt-3"> <span class="spinner-border"></span></div>
                <div v-else>
                    <div v-if="store.subCategory6.length" class="col-md-12  category box">
                        <div class="form-label required">Sub-Category 6 </div>
                        <select  name="business_type" class="form-select form-select-lg form-select-solid" data-control="select2" data-placeholder="Select..."
                         data-allow-clear="true" data-hide-search="true">
                            <option selected value="" disabled>Select Sub-Category 6</option>
                            <option v-for="cat in store.subCategory6" :key="cat" :value="cat.Scat6_id" 
                            >{{cat.Scat6_name}}</option>
                        </select>
                    </div>
                </div> -->
            </div>
        </div>
       

        <teleport to="body">
        <MainCategory  v-if="open_model" @close_Model="close_Model" />
        </teleport>
        <SubCategory   v-if="open_subcat_model" @close_subcat_Model="close_subcat_Model"/>
        <SubCategory1  v-if="open_subcat1_model" @close_subcat1_Model="close_subcat1_Model" />
        <SubCategory2  v-if="open_subcat2_model" @close_subcat2_Model="close_subcat2_Model" />
        <SubCategory3Modal  v-if="open_subcat3_model" @close_subcat3_Model="close_subcat3_Model" />
        <SubCategory4  v-if="open_subcat4_model" @close_subcat3_Model="close_subcat4_Model" />
        <!-- <SubCategory5 v-if="store.subCategory4.length" />
        <SubCategory6 v-if="store.subCategory5.length" /> -->
    </div>
</template>

<script setup>
import { useMainCategoryStore } from '@/store/categoriesStore/mainCategory.store';
import MainCategory from '@/components/Categories/Modal/CategoryMain.vue';
import SubCategory from '@/components/Categories/Modal/SubCategory.vue';
import SubCategory1 from '@/components/Categories/Modal/SubCategory1.vue';
import SubCategory2 from '@/components/Categories/Modal/SubCategory2.vue';
import SubCategory3Modal from '@/components/Categories/Modal/SubCategory3Modal.vue';
import SubCategory4 from '@/components/Categories/Modal/SubCategory4.vue';
import { ref } from '@vue/runtime-core'
// import SubCategory5 from '@/components/Categories/Modal/SubCategory5.vue';
// import SubCategory6 from '@/components/Categories/Modal/SubCategory6.vue';

import { useSubCategoryStore } from '@/store/categoriesStore/subCategory.store'
import { useSubCategory1Store } from '@/store/categoriesStore/subCategory1.store'
import { useSubCategory2Store } from '@/store/categoriesStore/subCategory2.store'
import { useSubCategory3Store } from '@/store/categoriesStore/subCategory3.store'
import { useSubCategory4Store } from '@/store/categoriesStore/subCategory4.store'
import PageLoader from '../../components/Global/PageLoader.vue'
// import { useSubCategory5Store } from '@/store/categoriesStore/subCategory5.store'
// import { useSubCategory6Store } from '@/store/categoriesStore/subCategory6.store'
const { onMounted }=require("@vue/runtime-core");

const open_model = ref(false)
const open_subcat_model = ref(false)
const open_subcat1_model = ref(false)
const open_subcat2_model = ref(false)
const open_subcat3_model = ref(false)
const open_subcat4_model = ref(false)

onMounted(() => store.loadCategory())

 const store = useMainCategoryStore()
    const subCatStore = useSubCategoryStore()
    const subCat1Store = useSubCategory1Store()
    const subCat2Store = useSubCategory2Store()
    const subCat3Store = useSubCategory3Store()
    const subCat4Store = useSubCategory4Store()
    // const subCat5Store = useSubCategory5Store()
    // const subCat6Store = useSubCategory6Store()

    const loadSubCategories = (e) => {
        store.loadSubCategories(e.target.value)
    }
    const loadSubCategory1 = (e) => {
        store.loadSubCategory1(e.target.value)
    }
    const loadSubCategory2 = (e) => {
        store.loadSubCategory2(e.target.value)
    }
    const loadSubCategory3 = (e) => {
        store.loadSubCategory3(e.target.value)
    }
    const loadSubCategory4 = (e) => {
        store.loadSubCategory4(e.target.value)
    }
    // const loadSubCategory5 = (e) => {
    //     store.loadSubCategory5(e.target.value)
    // }
    // const loadSubCategory6 = (e) => {
    //     store.loadSubCategory6(e.target.value)
    // }

    const loadSubCategoryAllList = () =>{ 
        open_subcat_model.value = true
        subCatStore.loadSubCategoryList()

    }
    const loadSubCategory1AllList = () =>{
         open_subcat1_model.value = true
        subCat1Store.loadSubCategory1List()
    }
    const loadSubCategory2AllList = () =>{
         open_subcat2_model.value = true
        subCat2Store.loadSubCategory2List()
    }
    const loadSubCategory3AllList = () =>{
         open_subcat3_model.value = true
        subCat3Store.loadSubCategory3List()
    }
    const loadSubCategory4AllList = () =>{
         open_subcat4_model.value = true
        subCat4Store.loadSubCategory4List()
    }
    // const loadSubCategory5AllList = () =>{
    //     subCat5Store.loadSubCategory5List()
    // }
    // const loadSubCategory6AllList = () =>{
    //     subCat6Store.loadSubCategory6List()
    // }



const ShowModel = () => {
     open_model.value = true
    }

    const close_Model =(event)=>{
     open_model.value=event
    }

    const close_subcat_Model =(event)=>{
     open_subcat_model.value=event
    }

    const close_subcat1_Model =(event)=>{
     open_subcat1_model.value=event
    }

    const close_subcat2_Model =(event)=>{
     open_subcat2_model.value=event
    }

    const close_subcat3_Model =(event)=>{
     open_subcat3_model.value=event
    }

    const close_subcat4_Model =(event)=>{
     open_subcat4_model.value=event
    }
</script>

<style>

</style>