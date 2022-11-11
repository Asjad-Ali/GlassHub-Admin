<template>
    <div class="col-xl-9 bg-w pd-30">
        <h3 class="mb-10">Documents</h3>
        <div class="table-responsive mt-10">
            <!--begin::Table-->
            <table class="table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4">
                <thead>
                    <tr>
                        <th><h5>Title</h5></th>
                        <th><h5>Documents</h5></th>
                        <th><h5>Documents Status</h5></th>
                        <th><h5>Action</h5></th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Company profile and company pictures</td>
                        <td>
                            <a href="#"  @click="ShowModel()"><i class="fas fa-file-pdf"></i> Company Profile</a>
                        </td>
                        <td>
                            <select name="" class="form-select form-select-sm form-select-solid" data-control="select1" data-placeholder="Select..." data-allow-clear="true" data-hide-search="true">
                                <option value=""></option>
                                <option :value="0">compulsory</option>
                                <option :value="1">Optional</option>
                            </select>
                        </td>
                        <td>
                            <select name="" class="form-select form-select-sm form-select-solid" data-control="select1" data-placeholder="Select..." data-allow-clear="true" data-hide-search="true">
                                <option value=""></option>
                                <option value="1">Approved</option>
                                <option value="2">Not Approved</option>
                                <option value="3">Send Again</option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td>Company profile and company pictures</td>
                        <td>
                            <a href="#" @click="ShowModel()"><i class="fas fa-file-pdf"></i> Company Profile</a>
                        </td>
                        <td>
                            <select name="" class="form-select form-select-sm form-select-solid" data-control="select1" data-placeholder="Select..." data-allow-clear="true" data-hide-search="true">
                                <option value=""></option>
                                <option value="1">compulsory</option>
                                <option value="2">Optional</option>
                            </select>
                        </td>
                        <td>
                            <select name="" class="form-select form-select-sm form-select-solid" data-control="select1" data-placeholder="Select..." data-allow-clear="true" data-hide-search="true">
                                <option value=""></option>
                                <option value="1">Approved</option>
                                <option value="2">Not Approved</option>
                                <option value="3">Send Again</option>
                            </select>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <h3 class="mb-10">Addtional Documents</h3>
        <div class="table-responsive mt-10">
            <!--begin::Table-->
            <table class="table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4">
                <thead>
                    <tr>
                        <th><h5>Title</h5></th>
                        <th><h5>Documents</h5></th>
                        <th><h5>Action</h5></th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Company profile and company pictures</td>
                        <td>
                            <a href="#" @click="ShowModel()"><i class="fas fa-file-pdf"></i> Company Profile</a>
                        </td> 
                        <td>
                            <select name="" class="form-select form-select-sm form-select-solid" data-control="select1" data-placeholder="Select..." data-allow-clear="true" data-hide-search="true">
                                <option value=""></option>
                                <option value="1">Approved</option>
                                <option value="2">Not Approved</option>
                                <option value="3">Send Again</option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td>Company profile and company pictures</td>
                        <td>
                            <a href="#" @click="ShowModel()"><i class="fas fa-file-pdf"></i> Company Profile</a>
                        </td>
                        <td>
                            <select name="" class="form-select form-select-sm form-select-solid" data-control="select1" data-placeholder="Select..." data-allow-clear="true" data-hide-search="true">
                                <option value=""></option>
                                <option value="1">Approved</option>
                                <option value="2">Not Approved</option>
                                <option value="3">Send Again</option>
                            </select>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
 </div>
 
        <teleport to="body">
            <ViewDocument  v-if="open_model"  @closeModel="closeModel" />
        </teleport>
   
</template>

<script setup>
import ViewDocument from '@/components/Modal/ViewDocument.vue';
import {  ref } from '@vue/runtime-core'

const open_model = ref(false)

const ShowModel = () => {
     open_model.value = true
    }

    const closeModel =(event)=>{
     open_model.value=event
    }
</script>

<style>

</style>