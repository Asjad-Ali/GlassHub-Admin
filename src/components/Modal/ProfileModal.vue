<template>


<div class="modal fade show" tabindex="-1" style="display:block;background:rgba(0,0,0,0.5);opacity:1 !important">
    <div class="modal-dialog">
        <div class="modal-content ">
        <div class="modal-header px-5 py-2">
            <h5 class="modal-title">Profile</h5>
           <div class="btn btn-icon btn-sm btn-active-light-primary ms-2" @click="closeprofileModel()">
                <i class="fa fa-times" aria-hidden="true"></i>
           </div>
        </div>
        <PageLoader v-if="store.profileLoader" />
        <div v-else class="modal-body">
            <div v-if="profileData.RegistrationD?.length">
                <div class="d-flex flex-wrap flex-sm-nowrap">
                    <div class="me-7 mb-4">
                        <div class="symbol symbol-70px symbol-lg-70px symbol-fixed position-relative">
                                <img :src="!profileData.RegistrationD[0].company_logo.includes(null) ? profileData.RegistrationD[0].company_logo : '/assets/img/organizations/media/logo-01.jpg'" alt="image" />
                            <div class="position-absolute translate-middle bottom-0 start-100 mb-6 bg-success rounded-circle border border-4 border-white h-20px w-20px"></div>
                        </div>
                    </div>
                    <div class="flex-grow-1">
                        <div class="d-flex justify-content-between align-items-start flex-wrap mb-2">
                            <div class="d-flex flex-column">
                                <div class="d-flex align-items-center mb-2">
                                    <a href="#" class="text-gray-900 text-hover-primary fs-2 fw-bolder me-1"> {{ profileData.RegistrationD[0].Company_name }} </a>
                                    <a v-show="profileData.RegistrationD[0].email_verified==true && profileData.RegistrationD[0].phone_verified==true" href="#">
                                        <span class="svg-icon svg-icon-1 svg-icon-primary">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24">
                                                <path d="M10.0813 3.7242C10.8849 2.16438 13.1151 2.16438 13.9187 3.7242V3.7242C14.4016 4.66147 15.4909 5.1127 16.4951 4.79139V4.79139C18.1663 4.25668 19.7433 5.83365 19.2086 7.50485V7.50485C18.8873 8.50905 19.3385 9.59842 20.2758 10.0813V10.0813C21.8356 10.8849 21.8356 13.1151 20.2758 13.9187V13.9187C19.3385 14.4016 18.8873 15.491 19.2086 16.4951V16.4951C19.7433 18.1663 18.1663 19.7433 16.4951 19.2086V19.2086C15.491 18.8873 14.4016 19.3385 13.9187 20.2758V20.2758C13.1151 21.8356 10.8849 21.8356 10.0813 20.2758V20.2758C9.59842 19.3385 8.50905 18.8873 7.50485 19.2086V19.2086C5.83365 19.7433 4.25668 18.1663 4.79139 16.4951V16.4951C5.1127 15.491 4.66147 14.4016 3.7242 13.9187V13.9187C2.16438 13.1151 2.16438 10.8849 3.7242 10.0813V10.0813C4.66147 9.59842 5.1127 8.50905 4.79139 7.50485V7.50485C4.25668 5.83365 5.83365 4.25668 7.50485 4.79139V4.79139C8.50905 5.1127 9.59842 4.66147 10.0813 3.7242V3.7242Z" fill="#00A3FF"></path>
                                                <path class="permanent" d="M14.8563 9.1903C15.0606 8.94984 15.3771 8.9385 15.6175 9.14289C15.858 9.34728 15.8229 9.66433 15.6185 9.9048L11.863 14.6558C11.6554 14.9001 11.2876 14.9258 11.048 14.7128L8.47656 12.4271C8.24068 12.2174 8.21944 11.8563 8.42911 11.6204C8.63877 11.3845 8.99996 11.3633 9.23583 11.5729L11.3706 13.4705L14.8563 9.1903Z" fill="white"></path>
                                            </svg>
                                        </span>
                                    </a>
                                </div>
                                <div class="d-flex flex-wrap fw-bold fs-6 mb-4 pe-2">
                                    <a :href="`https://maps.google.com/?q=${profileData.RegistrationD[0].Head_office_lat},${profileData.RegistrationD[0].Head_office_long}`" target="_blank" class="d-flex align-items-center text-gray-400 text-hover-primary me-5 mb-2">
                                        <span class="svg-icon svg-icon-4 me-1">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                <path opacity="0.3" d="M18.0624 15.3453L13.1624 20.7453C12.5624 21.4453 11.5624 21.4453 10.9624 20.7453L6.06242 15.3453C4.56242 13.6453 3.76242 11.4453 4.06242 8.94534C4.56242 5.34534 7.46242 2.44534 11.0624 2.04534C15.8624 1.54534 19.9624 5.24534 19.9624 9.94534C20.0624 12.0453 19.2624 13.9453 18.0624 15.3453Z" fill="black"></path>
                                                <path d="M12.0624 13.0453C13.7193 13.0453 15.0624 11.7022 15.0624 10.0453C15.0624 8.38849 13.7193 7.04535 12.0624 7.04535C10.4056 7.04535 9.06241 8.38849 9.06241 10.0453C9.06241 11.7022 10.4056 13.0453 12.0624 13.0453Z" fill="black"></path>
                                            </svg>
                                        </span>
                                        {{ profileData.RegistrationD[0].global_presence }} 
                                    </a>
                                    <a :href="`mailto:${profileData.RegistrationD[0].Email}`" target="_blank" class="d-flex align-items-center text-gray-400 text-hover-primary mb-2">
                                        <!--begin::Svg Icon | path: icons/duotune/communication/com011.svg-->
                                        <span class="svg-icon svg-icon-4 me-1">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                <path opacity="0.3" d="M21 19H3C2.4 19 2 18.6 2 18V6C2 5.4 2.4 5 3 5H21C21.6 5 22 5.4 22 6V18C22 18.6 21.6 19 21 19Z" fill="black"></path>
                                                <path d="M21 5H2.99999C2.69999 5 2.49999 5.10005 2.29999 5.30005L11.2 13.3C11.7 13.7 12.4 13.7 12.8 13.3L21.7 5.30005C21.5 5.10005 21.3 5 21 5Z" fill="black"></path>
                                            </svg>
                                        </span>
                                        {{ profileData.RegistrationD[0].Email }}
                                    </a>
                                </div>
                            </div>

                            <div class="d-flex my-4">
                                <div class="align-items-center w-200px w-sm-300px flex-column mt-3">
                                    <div class="d-flex justify-content-between w-100 mt-auto mb-2">
                                        <span class="fw-bold fs-6 text-gray-400">Profile Compleation</span>
                                        <span class="fw-bolder fs-6">100%</span>
                                    </div>
                                    <div class="h-5px w-100 bg-light mb-3 ml-0">
                                        <div class="bg-success rounded h-5px" role="progressbar" style="width: 100%;" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

                <div class=" mb-5 mb-xxl-8" > 
                    <div class="card-body pb-0">
                        <div class="row">
                            <div class="col-md-6">
                                <div class="table-responsive">
                                    <table class="table table-row-dashed table-row-gray-200 align-middle gs-0 gy-4">
                                        <tbody>
                                            <tr>
                                                <td>
                                                    <span class="text-muted fw-bold d-block">Company Name:</span>
                                                </td>
                                                <td>
                                                    <span class=" fw-bold d-block"> {{ profileData.RegistrationD[0].Company_name }} </span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <span class="text-muted fw-bold d-block">Company Start Date:</span>
                                                </td>
                                                <td>
                                                    <span class="fw-bold d-block"> {{ profileData.RegistrationD[0].Start_date.substring(0, 10) }} </span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <span class="text-muted fw-bold d-block">Account Type:</span>
                                                </td>
                                                <td>
                                                    <span class=" fw-bold d-block"> {{ profileData.RegistrationD[0].Account_type_name }} </span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <span class="text-muted fw-bold d-block">Business Category:</span>
                                                </td>
                                                <td>
                                                    <span class=" fw-bold d-block"> {{ profileData.RegistrationD[0].Company_name }} </span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <span class="text-muted fw-bold d-block">Company Size:</span>
                                                </td>
                                                <td>
                                                    <span class=" fw-bold d-block"> {{ profileData.RegistrationD[0].Company_size }} </span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <span class="text-muted fw-bold d-block">Global Presence:</span>
                                                </td>
                                                <td>
                                                    <span class=" fw-bold d-block"> {{ profileData.RegistrationD[0].global_presence }} </span>
                                                </td>
                                            </tr>
                                            <tr >
                                                <td>
                                                    <span class="text-muted fw-bold d-block">Head Office Address:</span>
                                                </td>
                                                <td>
                                                    <a :href="`https://maps.google.com/?q=${profileData.RegistrationD[0].Head_office_lat},${profileData.RegistrationD[0].Head_office_long}`" target="_blank" class="d-flex mt-0 align-items-center text-gray-700 text-hover-primary ">
                                                        <span class="svg-icon mt-0 svg-icon-4 me-1">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none">
                                                                <path opacity="0.3" d="M18.0624 15.3453L13.1624 20.7453C12.5624 21.4453 11.5624 21.4453 10.9624 20.7453L6.06242 15.3453C4.56242 13.6453 3.76242 11.4453 4.06242 8.94534C4.56242 5.34534 7.46242 2.44534 11.0624 2.04534C15.8624 1.54534 19.9624 5.24534 19.9624 9.94534C20.0624 12.0453 19.2624 13.9453 18.0624 15.3453Z" fill="black" />
                                                                <path d="M12.0624 13.0453C13.7193 13.0453 15.0624 11.7022 15.0624 10.0453C15.0624 8.38849 13.7193 7.04535 12.0624 7.04535C10.4056 7.04535 9.06241 8.38849 9.06241 10.0453C9.06241 11.7022 10.4056 13.0453 12.0624 13.0453Z" fill="black" />
                                                            </svg>
                                                        </span>
                                                    <span> {{ profileData.RegistrationD[0].Head_office_address }} </span>
                                                    </a>                                      
                                                </td>
                                            </tr>
                                            <tr >
                                                <td>
                                                    <span class="text-muted fw-bold d-block">Website:</span>
                                                </td>
                                                <td>
                                                     <a :href="`https://${profileData.RegistrationD[0].Website_url}`" target="_blank" >  {{ profileData.RegistrationD[0].Website_url }} </a>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="table-responsive">
                                    <table class="table table-row-dashed table-row-gray-200 align-middle gs-0 gy-4">
                                        <tbody >
                                            <template v-for="office in profileData.Office_Branches" :key="office">
                                            <tr v-if="office.Office_address !='address'">
                                                <td>
                                                    <span class="text-muted fw-bold d-block">Branch Office Address:</span>
                                                </td>
                                                <td>
                                                    <a :href="`https://maps.google.com/?q=${office.Office_lat},${office.Office_long}`" target="_blank" class="d-flex mt-0 align-items-center text-gray-700 text-hover-primary ">
                                                        <span class="svg-icon mt-0 svg-icon-4 me-1">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none">
                                                                <path opacity="0.3" d="M18.0624 15.3453L13.1624 20.7453C12.5624 21.4453 11.5624 21.4453 10.9624 20.7453L6.06242 15.3453C4.56242 13.6453 3.76242 11.4453 4.06242 8.94534C4.56242 5.34534 7.46242 2.44534 11.0624 2.04534C15.8624 1.54534 19.9624 5.24534 19.9624 9.94534C20.0624 12.0453 19.2624 13.9453 18.0624 15.3453Z" fill="black" />
                                                                <path d="M12.0624 13.0453C13.7193 13.0453 15.0624 11.7022 15.0624 10.0453C15.0624 8.38849 13.7193 7.04535 12.0624 7.04535C10.4056 7.04535 9.06241 8.38849 9.06241 10.0453C9.06241 11.7022 10.4056 13.0453 12.0624 13.0453Z" fill="black" />
                                                            </svg>
                                                        </span>
                                                    <span> {{ office.Office_address }} </span>
                                                    </a>                                    
                                                </td>
                                            </tr>
                                            </template>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class=" mb-5 mb-xxl-8">
                    <div class="card-body pb-0">
                        <div class="row">
                            <div class="col-md-12"><h4>Verified SMS & Email</h4></div>
                            <div class="col-md-12">
                                <div class="table-responsive">
                                    <table class="table table-row-dashed table-row-gray-200 align-middle gs-0 gy-4">
                                        <tbody>
                                            <tr>
                                                <td>
                                                    <span class="text-muted fw-bold d-block"><b style="color:#000">Email:</b> {{profileData.RegistrationD[0].Email}}	</span>
                                                </td>
                                                <td>
                                                    
                                                    <span v-if="profileData.RegistrationD[0].email_verified==true" class="badge badge-primary">
                                                        <span>&#10003;</span>
                                                        Verified
                                                    </span>
                                                    <span v-else class="badge badge-danger">
                                                        <span>&#10003;</span>
                                                        Not-Verified
                                                    </span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <span class="text-muted fw-bold d-block"><b style="color:#000">Phone:</b> {{profileData.RegistrationD[0].Phone}} </span>
                                                </td>
                                                <td>
                                                    <span v-if="profileData.RegistrationD[0].phone_verified==true" class="badge badge-primary">
                                                        <span>&#10003;</span>
                                                        Verified
                                                    </span>
                                                    <span v-else class="badge badge-danger">
                                                        <span>&#10003;</span>
                                                        Not-Verified
                                                    </span>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div class="col-md-6">
                            </div>
                        </div>
                    </div>
                </div>
                <div v-if="profileData.company_Doc.length" class=" mb-5 mb-xxl-8">
                    <div class="card-body pb-0">
                        <div class="row">
                            <div class="col-md-12"><h4>Documents</h4></div>
                            <div class="col-md-12">
                                <div class="table-responsive">
                                    <table class="table table-row-dashed table-row-gray-200 align-middle gs-0 gy-4">
                                        <thead>
                                            <tr>
                                                <th>Title</th>
                                                <th>Document</th>
                                                <th>Status</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="(doc) in profileData.company_Doc" :key="doc">
                                                <td>
                                                    <span class="text-muted fw-bold d-block"> {{ doc.Document_title }}	</span>
                                                </td>
                                                <td>
                                                    <span class="text-muted fw-bold d-block"><a :href="doc.document_path" target="_blank"> {{ doc.Document_title }} </a> </span>
                                                </td>
                                                <td>
                                                    <!-- <span class="badge badge-primary">Not Approved</span> -->
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div class="col-md-6">
                            </div>
                        </div>
                    </div>
                </div>
                <div v-if="profileData.LegalPages.length" class=" mb-5 mb-xxl-8">
                    <div class="card-body pb-0">
                        <div class="row">
                            <div class="col-md-12"><h4>Accepted Content Page</h4></div>
                            <div class="col-md-12">
                                <div class="table-responsive">
                                    <table class="table table-bordered table-responsive-md table-striped ">
                                        <thead>
                                            <tr>
                                                <th class="fw-bolder">ID</th>
                                                <th class="fw-bolder">Acceptance Date</th>
                                                <th class="fw-bolder">Page Name</th>
                                                <th class="fw-bolder">View</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="(legalPage, index) in profileData.LegalPages" :key="legalPage">
                                                <td> {{ index+1 }} </td>
                                                <td> {{ legalPage.Accept_Date?.substring(0, 10) }} </td>
                                                <td> {{ legalPage.Account_Name }} </td>
                                                <td> <span v-html="legalPage.Description"></span> </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div class="col-md-6">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>                    
        </div>
    </div>
</div>

</template>

<script setup>
import { useregistrationsStore } from '@/store/registrationsList.store';
import { defineProps, toRefs,defineEmits } from 'vue'
import PageLoader from "@/components/Global/PageLoader.vue";

const store = useregistrationsStore()
const props = defineProps({
  profileData: {
    type: Object,
    required: true
  }
})

let { profileData } = toRefs(props);

const emit = defineEmits(['closeprofileModel'])
const closeprofileModel = () => {
    emit('closeprofileModel', false)
}

</script>

<style>

</style>