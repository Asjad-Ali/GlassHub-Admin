<template>
    <div class="bg-lg">
        <div id="kt_content_container" class="d-flex flex-column-fluid align-items-start container-xxl">
            <!--begin::Post-->
            <div class="content flex-row-fluid" id="kt_content">
                <div class="card mb-5 mb-xl-10">
                    <div class="col-md-12">
                        <i @click="router.go(-1)" style="font-size: 20px; color: #5241a1" class="fa fa-arrow-left cursor-pointer px-5 pt-4" ></i>
                    </div>
                    <div class="card-header border-0 cursor-pointer" role="button" data-bs-toggle="collapse" data-bs-target="#kt_account_profile_details" aria-expanded="true" aria-controls="kt_account_profile_details">
                        <div class="card-title m-0">
                            <h3 class="fw-bolder m-0">Profile Details</h3>
                        </div>
                    </div>
                    <div id="kt_account_profile_details" class="collapse show">
                        <!--begin::Form-->
                        <form id="kt_account_profile_details_form" class="form">
                            <!--begin::Card body-->
                            <div class="card-body border-top p-9">
                                <div class="row mb-6">
                                    <!--begin::Label-->
                                    <label class="col-lg-4 col-form-label fw-bold fs-6">Admin Picture</label>
                                    <!--end::Label-->
                                    <!--begin::Col-->
                                    <div class="col-lg-8">
                                        <!--begin::Image input-->
                                        <div class="image-input image-input-outline" data-kt-image-input="true" style="background-image: url(assets/media/avatars/blank.png)">
                                            <!--begin::Preview existing avatar-->
                                            <div class="image-input-wrapper w-125px h-125px" :style='{ backgroundImage: `url("${user_image}")`}'></div>
                                            <!--end::Preview existing avatar-->
                                            <!--begin::Label-->
                                            <label class="btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow" data-kt-image-input-action="change" data-bs-toggle="tooltip" title="Change avatar">
                                                <i class="fas fa-pencil-alt"></i>
                                               
                                                <input type="file"   @change="profileimage($event)" name="avatar" accept=".png, .jpg, .jpeg" />
                                                <input type="hidden" name="avatar_remove" />
                                              
                                            </label>
                                            <!--end::Label-->
                                            <!--begin::Cancel-->
                                            <!-- <span class="btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow" data-kt-image-input-action="cancel" data-bs-toggle="tooltip" title="Cancel avatar">
                                                <i class="fa fa-close"></i>
                                            </span> -->
                                            <!--end::Cancel-->
                                            <!--begin::Remove-->
                                            <span  @click="clearImge()" class="btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow" data-kt-image-input-action="remove" data-bs-toggle="tooltip" title="Remove avatar">
                                                <i class="fa fa-close" ></i>
                                            </span>
                                            <!--end::Remove-->
                                        </div>
                                        <!--end::Image input-->
                                        <!--begin::Hint-->
                                        <!-- <div class="form-text">Allowed file types: png, jpg, jpeg.</div> -->
                                        <!--end::Hint-->
                                    </div>
                                    <!--end::Col-->
                                </div>
                                <div class="row mb-6">
                                    <label class="col-lg-4 col-form-label required fw-bold fs-6">Full Name</label>
                                    <div class="col-lg-8">
                                        <!--begin::Row-->
                                        <div class="row">
                                            <!--begin::Col-->
                                            <div class="col-lg-12 fv-row">
                                                <input type="text" v-model="formdata.User_fullname" name="fname" class="form-control form-control-lg form-control-solid mb-3 mb-lg-0" placeholder="First name" />
                                            </div>
                                            <!--end::Col-->
                                            <!--begin::Col-->
                                            <!-- <div class="col-lg-6 fv-row">
                                                <input type="text" name="lname" class="form-control form-control-lg form-control-solid" placeholder="Last name" value="Smith" />
                                            </div> -->
                                            <!--end::Col-->
                                        </div>
                                        <!--end::Row-->
                                    </div>
                                    <!--end::Col-->
                                </div>
                                <!--end::Input group-->
                                <!--begin::Input group-->
                                <div class="row mb-6">
                                    <!--begin::Label-->
                                    <label class="col-lg-4 col-form-label required fw-bold fs-6">Role Name</label>
                                    <!--end::Label-->
                                    <!--begin::Col-->
                                    <div class="col-lg-8 fv-row">
                                        <input type="text" v-model="formdata.User_role" name="company" class="form-control form-control-lg form-control-solid" placeholder="Role name" />
                                    </div>
                                    <!--end::Col-->
                                </div>
                                <!--end::Input group-->
                                <!--begin::Input group-->
                                <div class="row mb-6">
                                    <!--begin::Label-->
                                    <label class="col-lg-4 col-form-label fw-bold fs-6">
                                        <span class="required">Contact No</span>
                                        <i class="fas fa-exclamation-circle ms-1 fs-7" data-bs-toggle="tooltip" title="Phone number must be active"></i>
                                    </label>
                                    <!--end::Label-->
                                    <!--begin::Col-->
                                    <div class="col-lg-8 fv-row">
                                        <input type="tel" v-model="formdata.User_phone"  name="phone" class="form-control form-control-lg form-control-solid" placeholder="Phone number"   />
                                    </div>
                                    <!--end::Col-->
                                </div>
                                <!--end::Input group-->
                                <!--begin::Input group-->
                                <div class="row mb-6">
                                    <!--begin::Label-->
                                    <label class="col-lg-4 col-form-label fw-bold fs-6">Email</label>
                                    <!--end::Label-->
                                    <!--begin::Col-->
                                    <div class="col-lg-8 fv-row">
                                        <input type="text" :value="formdata.User_email" name="website" class="form-control form-control-lg form-control-solid" placeholder="Email" />
                                    </div>
                                    <!--end::Col-->
                                </div>
                                <div class="col-md-12 pb-5 ">
                               <button type="button"  class="btn btn-primary  " style="margin-top:28px;margin-left: auto; display: block;" @click="updateData()"> Save </button>
                              </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { profileStore } from '@/store/profile';
import { computed, onMounted, reactive,watch,ref} from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter()
const store = profileStore()
const profileDetail = computed(()=>{
    return store.profileDetail
})

const imageFile = ref('')
const user_image=ref('')
const formdata= reactive({
    User_fullname:'',
    User_role:'',
    User_phone:'',
    User_email:'',
    Updated_by:'',
    User_id:'',
})

const profileimage = (e) => {
      let files = e.target.files || e.dataTransfer.files
      imageFile.value=files[0]
      user_image.value=URL.createObjectURL(files[0])
    };

const urlToObject= async(UserImage)=> {
const response = await fetch(UserImage);
const blob = await response.blob();
let index = UserImage.indexOf("--")
let name = UserImage.substr(index+2,UserImage.length)
imageFile.value= new File([blob],  name,{type:"image/png", lastModified:new Date().getTime(),});
}
    
const clearImge=()=>{
    user_image.value=''
}



watch(profileDetail,()=>{
    user_image.value=profileDetail.value[0]?.user_image;
    urlToObject(user_image.value)
    formdata.User_fullname=profileDetail.value[0]?.User_fullname;
    formdata.User_role=profileDetail.value[0]?.User_Role;
    formdata.User_phone=profileDetail.value[0]?.Phone;
    formdata.User_email=profileDetail.value[0]?.User_email
})

const updateData=()=>{
      const uploadeProfile = new FormData();
      uploadeProfile.append('user_image',imageFile.value)
      uploadeProfile.append('data',JSON.stringify(formdata))
      console.log(...uploadeProfile)
store.updateProfile(uploadeProfile)
}


onMounted(()=>{
    let user =  JSON.parse(localStorage.getItem('user'))
    formdata.Updated_by=user.User.User_id;
    formdata.User_id=user.User.User_id;
    store.getProfile(user.User.User_id)
})
</script>

<style>

</style>