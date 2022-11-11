<template>
    
<div class="modal show fade" tabindex="-1" style="display:block;background:rgba(0,0,0,0.5);opacity:1 !important">
    <div class="modal-dialog">
        <div class="modal-content Modal_Width">
            <div class="modal-header">
                <h5 class="modal-title">{{ title }}</h5>

                <div class="btn btn-icon btn-sm btn-active-light-primary ms-2" @click="closeModel()">
                    <i class="fa fa-times" aria-hidden="true"></i>
                </div>
            </div>
            <div  id="kt_toolbar_container" class="container-xxl py-5">
            <PageLoader v-if="store?.regListLoader" />
                <div v-else class="row gy-0 gx-10">
                    <div v-if="store?.RegisteredList?.length">
                        <div v-for="user in store.RegisteredList" :key="user"
                            class="row supplier_lists_shot_view">
                            <div class="col-md-5">
                                <h4>
                                    <span 
                                    @click="profileview( currentUser.User.RegD_id ==  user.RegD_id_frm ? user.RegM_id_to : user.RegM_id_frm )">
                                    <a href="#" class="text-hover-primary fs-2 me-1"> {{ currentUser.User.RegD_id ==  user.RegD_id_frm ? user.RegM_Name_to : user.RegM_Name_frm }} </a></span>
                                </h4>

                                <p >Business Category:{{ currentUser.User.RegD_id ==  user.RegD_id_frm ? user.Category_to : user.Category_frm }}</p>
                            </div>
                            <div class="col-md-4">
                                <h4>Fullfilled Compliance</h4>
                                <p class="mb-0"></p>
                            </div>
                            <div class="col-md-3 suppliers-lastcol-contact-section">
                                <ul>
                                    <li>
                                        <span class="cursor_pointer" data-bs-toggle="modal"
                                            data-bs-target="#">Chat</span>
                                    </li>
                                    <li>
                                        <a href="">Inbox</a>
                                    </li>
                                    <li>
                                        <span class=" cursor_pointer btn btn-sm btn-outline btn-outline-dashed btn-outline-success btn-active-light-success" 
                                        data-bs-toggle="modal" data-bs-target="#">RFQ</span>
                                    </li>
                                </ul>
                                <ul>
                                    <span  class="form-select form-select-sm form-select-solid">
                                    {{user.registred_status_name}}
                                    </span>
                                </ul>
                            </div>
                            <div class="col-md-12 supplier_statsandrating">
                                <ul>
                                    <li>Completed Projects: <b></b></li>
                                    <li>
                                        Rating: 
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                    </div>
                </div>
            </div>

            <div class="modal-footer">
                <button type="button" class="btn btn-light" @click="closeModel()">
                    Close
                </button>
            </div>
        </div>
    </div>
</div>

<teleport to="body">
    <ProfileModal :profileData="store.ProfileView" v-if="open_profile_model"   @closeprofileModel="closeprofileModel" />
</teleport>

</template>
<script setup>
import { defineEmits } from 'vue'
import PageLoader from "@/components/Global/PageLoader.vue";
import ProfileModal from '@/components/Modal/ProfileModal.vue'
import { useregistrationsStore } from '@/store/registrationsList.store';
import {  ref } from "@vue/runtime-core";

const store = useregistrationsStore()
const currentUser = JSON.parse(localStorage.getItem('user'))
const emit = defineEmits(['closeModel']);
const open_profile_model = ref(false)

// const profileview = () => {
//     emit('profileview', false)
// }

const closeModel = () => {
    emit('closeModel', false)
}

const profileview = (RegDId) => {
    open_profile_model.value = true
    store.loadProfileView(RegDId);
};
    const closeprofileModel =(event)=>{
     open_profile_model.value=event
    }
</script>
