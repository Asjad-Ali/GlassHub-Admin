<template>
                <!--begin::Step 3-->
            <div >
                <div class="w-100">
                    <div class="pb-10 pb-lg-12">
                        <h2 class="fw-bolder text-dark">
                            {{
                                    RegistrationD.Account_type == 0
                                        ? "Business Info"
                                        : RegistrationD.Account_type == 1
                                            ? "Business Info"
                                            : RegistrationD.Account_type == 2
                                                ? "Profession Info"
                                                : RegistrationD.Account_type == 3
                                                    ? "Business Info"
                                                    : "Business Info"
                            }}
                        </h2>
                    </div>

                    <div class="row fv-row mb-10 fv-plugins-icon-container">
                        <div v-if="RegistrationD.Account_type != 2 && RegistrationD.Account_type != 4" class="col-md-6 pb-5">
                            <label class="form-label">CR#</label>
                            <input v-model="RegistrationD.CR_number" maxlength="50" name="CRNumber" placeholder="CR#"
                                class="form-control form-control-lg form-control-solid" />
                        </div>
                        <div :class="{ 'col-md-12 pb-5': RegistrationD.Account_type == 2 }" class="col-md-6 pb-5">
                              <div>
                                <div class="row w-100">
                                    <div v-if="!selected_file">
                                        <!-- <ValidationProvider
                                            name="Logo"
                                            rules="image"
                                            v-slot="{ errors }"
                                            ref="provider"
                                        > -->
                                        <label>Logo</label>
                                        <input
                                            type="file"
                                            class="form-control form-control-lg form-control-solid"
                                             accept="image/*"
                                             @change="handleFileChange"
                                            
                                        /> 
                                        <!-- <span class="invalid-feedback" role="alert">
                                        {{ errors[0] }}
                                    </span>
                                </ValidationProvider> -->
                                    </div>

                                    <div
                                        class="symbol symbol-70px symbol-lg-70px col-md-6 floa symbol-fixed position-relative"
                                        v-else
                                    >
                                    <span class="cross-button" @click="ClearImage()" style="position: absolute;right: 19px;font-size: 20px;">X</span>
                                        <img
                                            :src="url"
                                            class="d-flex justify-content-end"
                                            alt="image"
                                            style="width: 122px; height: auto"
                                        />
                                    </div>
                                </div>
                            </div>
                            <!-- <img src="/assets/img/organizations/media/logo-01.jpg"  class="d-flex justify-content-end"
                                alt="image" style="width: 122px; height: auto" /> -->
                        </div>
                        <div class="col-md-6 pb-5">
                            <label class="form-label required">{{
                                    RegistrationD.Account_type == 0
                                        ? "Organization Name"
                                        : RegistrationD.Account_type == 1
                                            ? "Company Name"
                                            : RegistrationD.Account_type == 2
                                                ? "Company Name"
                                                : RegistrationD.Account_type == 3
                                                    ? "Organization Name"
                                                    : "Company Name"
                            }}</label>
                            <input v-model="d_validate.Company_name.$model"  type="text"
                                name="companyName" maxlength="50" placeholder="Company Name" :class="{'is-invalid':d_validate.Company_name.$error}"
                                class="form-control form-control-lg form-control-solid" />
                           <div v-for="(error, index) in d_validate.Company_name.$errors" :key="index" class="mt-1">
                                <span class="text-danger ">{{error.$message}}</span>
                            </div>
                        </div>
                        <div v-if="RegistrationD.Account_type != 2" class="col-md-6 pb-5">
                        <label class="form-label required">{{
                                    RegistrationD.Account_type == 0
                                        ? "Organization"
                                        : RegistrationD.Account_type == 1
                                            ? "Organization"
                                            : RegistrationD.Account_type == 2
                                                ? "FreeLancer"
                                                : RegistrationD.Account_type == 3
                                                    ? "Organization"
                                                    : "Company"
                            }} Size</label>
                            
                            <select v-model="d_validate.Company_size.$model" 
                                name="companySize" class="form-select form-select-lg form-select-solid"
                                data-control="select2" data-placeholder="Select..." data-allow-clear="true"
                                data-hide-search="true" :class="{'is-invalid':d_validate.Company_size.$error}">
                                <option selected disabled value="">Select Company Size</option>
                                <option value="1">5 - 10</option>
                                <option value="2">11 - 20</option>
                                <option value="3">21 - 40</option>
                                <option value="4">41 - 70</option>
                                <option value="5">70 Above</option>
                                <option value="6">100 Above</option>
                            </select>
                           <div v-for="(error, index) in d_validate.Company_size.$errors" :key="index" class="mt-1">
                                <span class="text-danger ">{{error.$message}}</span>
                            </div>
                        </div>
                        <div class="col-md-6 pb-5">
                            <label class="form-label required">Start Date</label>
                            <input v-model="d_validate.Start_date.$model" :class="{'is-invalid':d_validate.Start_date.$error}" name="startDate" type="date"
                               placeholder="Pick date rage" :max="new Date().toISOString().slice(0, 10)" class="form-control form-control-lg form-control-solid" />
                           <div v-for="(error, index) in d_validate.Start_date.$errors" :key="index" class="mt-1">
                                <span class="text-danger ">{{error.$message}}</span>
                            </div>
                        </div>
                        <div v-if="RegistrationD.Account_type != 2 && RegistrationD.Account_type != 4" class="col-md-6 pb-5">
                            <label class="required fs-6 fw-bold mb-2">Global Presence</label>
                            <select @change="add_Location($event)" v-model="d_validate.Coutry_name.$model"
                                 name="globalPresence" :class="{'is-invalid':d_validate.Coutry_name.$error}"
                                placeholder="Country Name" class="form-select form-select-lg form-select-solid">
                               
                                <option selected disabled value="">Select Country</option>
                               <template v-for="(list, index) in store.CountryList" :key="index">
                                    <option v-if="list.name != ''" :value="list.id">
                                        {{ list.name }}
                                    </option>
                                </template>                               
                            </select> 

                            <div v-for="(error, index) in d_validate.Coutry_name.$errors" :key="index" class="mt-1">
                                <span class="text-danger ">{{error.$message}}</span>
                            </div>

                            <div class="compliances_added mt-2">
                                <template v-for="(val, index) in country_names" :key="index">
                                    <p style="margin:3px; padding: 1px 3px;"><span @click="remove_Location(index)" class="closeIcon">x</span> {{ val }} </p>
                               </template>
                        </div>
                        </div>
                        <div class="col-md-6 pb-5">
                            
                            <label class="form-label required">{{
                                    RegistrationD.Account_type == 0
                                        ? "Head Office Address"
                                        : RegistrationD.Account_type == 1
                                            ? "Head Office Address"
                                            : RegistrationD.Account_type == 2
                                                ? "Address"
                                                : RegistrationD.Account_type == 3
                                                    ? "Head Office Address"
                                                    : "Head Office Address"
                            }}</label>
                              <GMapAutocomplete
                                 placeholder="Office No, Lane No, Area, City, Country" @place_changed="setPlace" id="head_office" v-model="RegistrationD.Head_office_address"
                                 name="headOfficeAddress"  class="form-control form-control-lg form-control-solid">
                             </GMapAutocomplete>                             
                        </div>
                        

                         <div class="col-md-6 pb-5">

                              <GMapMap :center="center" :zoom="7" map-type-id="terrain" style="width: 430px; height: 200px">
                                <GMapCluster :zoomOnClick="true">
                                  <GMapMarker :key="index" v-for="(m, index) in markers" :position="m.position"
                                              :clickable="true" :draggable="true" @click="center=m.position" />
                                </GMapCluster>
                              </GMapMap>

                         </div>
                         
                      <template   v-for="(val, index) in signUpForm.Office_Branches" :key="index">
                            <div v-if="RegistrationD.Account_type != 2" class="col-md-6 pb-5"> 
                                <label class="form-label required">Branch Office Address</label>
                                <div style=" align-items: baseline">
                                <GMapAutocomplete
                                 placeholder="Office No, Lane No, Area, City, Country" @place_changed="setPlaceBranch($event, index)"  
                                 name="headOfficeAddress"  class="form-control form-control-lg form-control-solid">
                             </GMapAutocomplete>
                                <!-- <input v-model="val.Office_address"                                           
                                    name="branchOfficeAddress"
                                    placeholder="Office No, Lane No, Area, City, Country"
                                    class="form-control form-control-lg form-control-solid" /> -->
                                   

                                </div>
                                <div v-if="index + 1 != signUpForm.Office_Branches.length">
                                    <div class="text-right mt-3">
                                        <button class="btn btn-xs btn-primary"  @click="remove_branch_Office_Address(index)"> - </button>
                                    </div>
                                </div>
                                <div v-if="index + 1 == signUpForm.Office_Branches.length">
                                    <div class="text-right mt-3">
                                        <button class="btn btn-xs btn-primary"  @click="add_branch_Office_Address()"> + </button>
                                    </div>
                                </div>
                            </div>
                                    
                            <div  v-if="RegistrationD.Account_type != 2" class="col-md-6 pb-5">
                                <GMapMap :center="val.center" :zoom="7" map-type-id="terrain" style="width: 430px; height: 200px" >
                                    <GMapCluster :zoomOnClick="true">
                                    <GMapMarker :key="indexm"   v-for="(m, indexm) in val.markers" :position="m.position" 
                                                :clickable="true" :draggable="true" @click="center=m.position" />
                                    </GMapCluster>
                                </GMapMap>
                            </div>
                                
                       </template>
                        
                        

                        <div class="col-md-12 pb-5">
                            <label class="form-label">Website URL</label>
                            <input name="" v-model="RegistrationD.Website_url"  maxlength="150" placeholder="www.yourwebsite.com"
                                class="form-control form-control-lg form-control-solid" />
                        </div>
                        <div class="col-md-12 pb-5">
                            <label class="form-label">Social Media Links</label>

                            <template v-for="(val, index) in Social_Media_Links" :key="index">
                                <div style="display: flex; align-items: baseline">
                                    <div class="col-md-12">
                                        <input name="" v-model="val.Description" maxlength="150" placeholder=" Linkedin.com/yourcompany"
                                            class="form-control form-control-lg form-control-solid" />
                                        <div v-if="index + 1 != Social_Media_Links.length" class="">
                                            <div class="text-right mt-3">
                                                <button class="btn btn-xs btn-primary" @click="remove_links(index)">
                                                    -
                                                </button>
                                            </div>
                                        </div>
                                        <div v-if="index + 1 == Social_Media_Links.length" class="">
                                            <div class="text-right mt-3">
                                                <button class="btn btn-xs btn-primary" @click="add_links()">
                                                    +
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </template>
                        </div>
                    </div>
                </div>
            </div>


            <!-- doumentes portions -->
                <h2 class="fw-bolder text-dark" >  {{
                                    props.Account_type == 0
                                        ? "Organization Documents"
                                        : props.Account_type == 1
                                            ? "Company Documents"
                                            : props.Account_type == 2
                                                ? "Profession related Documents"
                                                : props.Account_type == 3
                                                    ? "Company Documents"
                                                    : "Company Documents"
                            }}</h2>
          
    <table class="table align-middle gs-0 gy-4">
                <!--begin::Table head-->
                <thead>
                  <tr class="fw-bolder text-muted bg-light">
                    <th class="ps-4 min-w-200px rounded-start">
                      Document Name
                    </th>
                    <th class="min-w-125px">Status</th>
                    <th class="min-w-200px rounded-end">Upload File</th>
                  </tr>
                </thead>
                <!--end::Table head-->
                <!--begin::Table body-->
                <tbody  >
                
                  <tr v-for="(x,index) in RegistrationDocument" :key="index">
                    <td>
                      <div class="d-flex align-items-center">
                        <div class="d-flex justify-content-start flex-column">
                        
                          <input
                          
                          style="background: none;border: none;color: #0000 !important;font-weight: 700;"
                            name="" 
                           :placeholder="x.Document_title"
                            class="form-control form-control-solid"
                            readonly
                          />
                        </div>
                      </div>
                    </td>
                    <td v-if="x.Document_type==0">
                      <span  class="badge badge-light-primary fw-bold">Optional</span>
                    </td>
                    <td v-else>
                      <span class="badge badge-light-danger fw-bold">Mandatory</span >  
                    </td>
                    <td>
                      <input type="file" class="form-control RGDOU" value="" :class="'orgDou'+x.Document_type"  @change="onFileChange(index,$event,x.SettingD_id)"/>
                      <span class="text-muted fw-bold text-muted d-block"
                        >PDF, Doc, Docx, JPG</span > 
                    </td>
                  </tr>
                  <!-- <tr  >
                    <td>
                      <div class="d-flex align-items-center">
                        <div class="d-flex justify-content-start flex-column">
                          <input
                          style="background: none;border: none;color: #0000 !important;font-weight: 700;"
                            name="" placeholder="Form C"
                            class="form-control form-control-solid"
                            readonly
                          />
                        </div>
                      </div>
                    </td>
                    <td>
                      <span class="badge badge-light-danger fw-bold">Mandatory</span >
                      
                    </td>
                    <td>
                    
                      <input type="file" class="form-control RGDOU"/>
                      <span class="text-muted fw-bold text-muted d-block"
                        >PDF, Doc, Docx, JPG</span > 
                    
                    </td>
                  </tr> -->
                </tbody>
                <!--end::Table body-->
              </table>
             <h2 class="fw-bolder text-dark">Additional Documents</h2>
              <table class="table align-middle gs-0 gy-4">
          
                <thead>
                  <tr class="fw-bolder text-muted bg-light">
                    <th class="ps-4 min-w-200px rounded-start">
                      Document Name
                    </th>
                    <th class="min-w-200px">Upload File</th>
                    <th class="min-w-100px rounded-end">Action</th>
                  </tr>
                </thead>
               
                <tbody>
                  <tr v-for="(docu,index) in AddtionDoc" :key="index">
                    <td>
                      <div class="d-flex align-items-center">
                        <div class="d-flex justify-content-start flex-column">
                          <input class="form-control form-control-solid"   v-model="docu.Doc_name" />
                        </div>
                      </div>
                    </td>
                    <td>
                      <input type="file" :id="'file'+index" class="form-control AddDOU" @change="onFileChangeADD(index,$event,docu.Doc_name)"/>
                      <span class="text-muted fw-bold text-muted d-block" >PDF, Doc, Docx, JPG</span>
                    </td>
                    <td>
                     <label :for="'file'+index"><a
                       
                        class="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1">
                        <span class="svg-icon svg-icon-3">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                          >
                            <path
                              opacity="0.3"
                              d="M21.4 8.35303L19.241 10.511L13.485 4.755L15.643 2.59595C16.0248 2.21423 16.5426 1.99988 17.0825 1.99988C17.6224 1.99988 18.1402 2.21423 18.522 2.59595L21.4 5.474C21.7817 5.85581 21.9962 6.37355 21.9962 6.91345C21.9962 7.45335 21.7817 7.97122 21.4 8.35303ZM3.68699 21.932L9.88699 19.865L4.13099 14.109L2.06399 20.309C1.98815 20.5354 1.97703 20.7787 2.03189 21.0111C2.08674 21.2436 2.2054 21.4561 2.37449 21.6248C2.54359 21.7934 2.75641 21.9115 2.989 21.9658C3.22158 22.0201 3.4647 22.0084 3.69099 21.932H3.68699Z"
                              fill="black"
                            />
                            <path
                              d="M5.574 21.3L3.692 21.928C3.46591 22.0032 3.22334 22.0141 2.99144 21.9594C2.75954 21.9046 2.54744 21.7864 2.3789 21.6179C2.21036 21.4495 2.09202 21.2375 2.03711 21.0056C1.9822 20.7737 1.99289 20.5312 2.06799 20.3051L2.696 18.422L5.574 21.3ZM4.13499 14.105L9.891 19.861L19.245 10.507L13.489 4.75098L4.13499 14.105Z"
                              fill="black"
                            />
                          </svg>
                        </span>
                      </a>
                      </label> 
                      <a class="btn btn-icon  btn-bg-light btn-active-color-primary btn-sm " @click="deleteDocument(index)" >
                      
                        <span class="svg-icon svg-icon-3">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                          >
                            <path
                              d="M5 9C5 8.44772 5.44772 8 6 8H18C18.5523 8 19 8.44772 19 9V18C19 19.6569 17.6569 21 16 21H8C6.34315 21 5 19.6569 5 18V9Z"
                              fill="black"
                            />
                            <path
                              opacity="0.5"
                              d="M5 5C5 4.44772 5.44772 4 6 4H18C18.5523 4 19 4.44772 19 5V5C19 5.55228 18.5523 6 18 6H6C5.44772 6 5 5.55228 5 5V5Z"
                              fill="black"
                            />
                            <path
                              opacity="0.5"
                              d="M9 4C9 3.44772 9.44772 3 10 3H14C14.5523 3 15 3.44772 15 4V4H9V4Z"
                              fill="black"
                            />
                          </svg>
                        </span>
                       
                      </a>
                    </td>
                  </tr>
                </tbody>
                
              </table>

               <button class="btn btn-lg btn-primary w-100 mb-3" type="button" @click="AddDocument()">
        
                Add Additional Document
                
              </button>


                 <div class="row fv-row mb-10 fv-plugins-icon-container">
                        <div class="col-md-12 pb-5">
                            <div class="d-flex">
                                <div class="me-5">
                                    <label class="fs-6 fw-bold form-label required">Are you authorized to operate company account?</label>
                                </div>
                                    <label class="form-check form-switch form-check-custom form-check-solid">
                                    <input class="form-check-input" v-model="Authorized" type="checkbox" value="0" name="account_plan"/>
                                </label>
                            </div>
                        </div>

                        <h3 class="fw-bolder text-dark mb-3 mt-3 user_doc"   > User Documents </h3>

                        <div class="col-md-12 pb-5" v-if="Authorized">
                            <label class="form-label">Upload Company's Authorization on Letterhead
                            </label>
                            <a
                    class="image-link mb-5"
                    style="color: sandybrown"
                   href="/assets/img/avatars/titlehead.PNG"
                    download
                    >(Download Sample Draft)</a >
                            <input type="file" @change="onFileChangeAUth($event)" class="form-control form-control-lg form-control-solid" />
                            <span>PDF, Doc, Docx, JPG</span>
                    <div class="col-md-12" style="padding-left: 80%">
                        <b>
                            <a class="image-link" :href="Authurl"  target="_blank" > Show / </a>
                            <a class="image-link" :href="Authurl" download >Download</a>
                        </b>
                    </div>
                        </div>
                    </div>
    
</template>
<script setup>
import { useVuelidate } from "@vuelidate/core";
import { required,helpers} from "@vuelidate/validators";
import {ref,reactive, onMounted,defineProps, watch,defineEmits, onUpdated,computed} from 'vue'
import { useMainCategoryStore } from "@/store/signupStore/mainCategory";
import showToast from "@/composables/useToast";
const props = defineProps(['Account','businessInfo_submit'])
const emit = defineEmits(['formData','cancel'])
const store = useMainCategoryStore();
const User = JSON.parse(localStorage.getItem("user"));
const markers = ref([]);
const center= ref({ lat: 10, lng: 10 });
// const branch_office = ref()

const country_names = reactive([]);
const Coutry_name = ref("");
const selected_file = ref('')
const url = ref('')

const Registration_Path =ref([])
const Registration_info =ref([])
const madantory_doument = ref('')


const AddtionDoc=ref([])
const AdditionDoc_Path =ref([])
const Authurl = ref('')
const Authorized = ref('')
// const account_plan  = ref(0)
let formData = reactive({
        Auth_file_path: null,
        data:{}
    })

//  const  branchOffices= reactive([
//         {
//           RegD_id: 1,
//           Office_address: "",
//           Office_lat: "",
//           Office_long: "",
//           markers: [],
//           center: { lat: 10, lng: 10 },
//         },
//       ])

let RegistrationD=reactive({
            RegM_id:User.User.RegM_id,
            Account_type: "",
            Account_type_name: "",
            Coutry_name:'',
            CR_number: "",
            Company_name: "",
            company_logo:'',
            Company_size: "",
            Start_date: "",
            Country_id: [],
            Head_office_address: "",
            Head_office_lat: 0,
            Head_office_long: 0,
            Website_url: "",
            Social_media_url1: "",
            Social_media_url2: "",
            Social_media_url3: "",
            Social_media_url4: "",
            Social_media_url5: "",
            Social_media_url6: "",
            Account_status: 1,
            Authorized: true,
            Phone_otp: null,
            Email_otp: null,
            RegD_Role:0
});

 const Social_Media_Links = reactive ([
        {
            Description: "",
        },
    ])

let signUpForm = reactive({
    Office_Branches: [
        { 
          RegD_id: 1,
          Office_address:"null",
          Office_lat:0,
          Office_long:0,
          markers: [],
          center: { lat: 10, lng: 10 },
        },
    ],
})

const contryvalidation =(value)=>{
   if(RegistrationD.Account_type==2 || RegistrationD.Account_type==4)
   {
    return true
   }else if (value){
    return true
   }
}

const comSize =(value)=>{
   if(RegistrationD.Account_type==2)
   {
    return true
   }else if (value){
    return true
   }
}

const d_rules = {
    Company_name:{required:helpers.withMessage('Company Name is Required',required)},
    Company_size:{comSize:helpers.withMessage('Password is Required',comSize)},
    Start_date:{required:helpers.withMessage('Start Date is Required',required)},
    Coutry_name:{contryvalidation:helpers.withMessage('Country Name is Required',contryvalidation)},
};


const d_validate = useVuelidate(d_rules, RegistrationD) 




watch(props,()=>{
   RegistrationD.Account_type = props.Account.id 
   RegistrationD.Account_type_name = props.Account.name
     if(props.businessInfo_submit){
     onsubmit()
  }
})

watch(RegistrationD,()=>{
   emit('cancel', false)  
})

    const handleFileChange=(e)=> {
        const file = e.target.files[0];
        selected_file.value = e.target.files[0];
        RegistrationD.company_logo= selected_file.value
        url.value = URL.createObjectURL(file);
    }

   const   ClearImage = ()=>{
      url.value = "";
      selected_file.value = "";
    }


const add_Location = (e) => {
     const found =  RegistrationD.Country_id.some( el => el == e.target.value)
  if (!found) {
      RegistrationD.Country_id.push(e.target.value);
      const index = store.CountryList.findIndex( contry => contry.id == e.target.value)
      if(index != -1){
          country_names[country_names.length] = store.CountryList[index].name
      }
    }
};

const remove_Location = (index) => {
    RegistrationD.Country_id.splice(index, 1);
    country_names.splice(index, 1);
    Coutry_name.value = " ";
};

const add_links = () => {
    if(Social_Media_Links.length >= 6 ) return
    Social_Media_Links.push({
        Description: "",
    });
};

const remove_links = (index) => {
    Social_Media_Links.splice(index, 1);
};

const add_branch_Office_Address = () => {
    signUpForm.Office_Branches.push({
          RegD_id: 1,
          Office_address:"null",
          Office_lat:0,
          Office_long:0,
          markers: [],
          center: { lat: 10, lng: 10 },
    });
};

const remove_branch_Office_Address = (index) => {
    signUpForm.Office_Branches.splice(index, 1);
};

 const setPlace=(place)=> {
    const marker = {
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
      };
      // this.getmapImages(marker).then((response) => {
      //   this.google_image = response.data.data
      // })
      markers.value[0] = { position: marker };
      center.value = marker;
    }

 const setPlaceBranch =(place, index)=> {
      signUpForm.Office_Branches[index].Office_address = place.formatted_address;
      signUpForm.Office_Branches[index].Office_lat = place.geometry.location.lat();
      signUpForm.Office_Branches[index].Office_long = place.geometry.location.lat();
      const marker = {
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
      };
     
      signUpForm.Office_Branches[index].markers[0]={ position: marker };
      signUpForm.Office_Branches[index].center = marker;
    }

    //   updateCoordinates=(place)=> {
    //   getTown(place.latLng.lat(), place.latLng.lng());
    // }

//    const  getTown =function (lat, lng) {
//       var latlng = new google.maps.LatLng(lat, lng);
//       // This is making the Geocode request
//       var geocoder = new google.maps.Geocoder();
//       geocoder.geocode({ latLng: latlng }, (results, status) => {
//         if (status !== google.maps.GeocoderStatus.OK) {
//         }
//         if (status == google.maps.GeocoderStatus.OK) {
//           var address = results[0].formatted_address;
//           this.$refs.head_office.$el.value = address;
//           this.businessInfo.Head_office_address = address;
//           this.businessInfo.Head_office_lat = lat;
//           this.businessInfo.Head_office_long = lng;
//         }
//       });
//     }

//    const  updateCoordinatesbranch =(place, index)=> {
//       let lat = place.latLng.lat();
//       let lng = place.latLng.lng();
//       var latlng = new google.maps.LatLng(lat, lng);
//       var geocoder = new google.maps.Geocoder();
//       geocoder.geocode({ latLng: latlng }, (results, status) => {
//         if (status !== google.maps.GeocoderStatus.OK) {
//         }
//         if (status == google.maps.GeocoderStatus.OK) {
//           var address = results[0].formatted_address;
//           branch_office[index].value = address;
//           signUpForm.Office_Branches[index].Office_address = address;
//           signUpForm.Office_Branches[index].Office_lat = lat;
//           signUpForm.Office_Branches[index].Office_long = lng;
//         }
//       });
//     }


let RegistrationDocument=computed(()=>{
  
  return store.RegistrationSettingD
})


watch(RegistrationDocument,()=>{
    madantory_doument.value = document.getElementsByClassName('orgDou1')
})
const onFileChange=(index,e,SetD_id)=>{
       const fileSize = Math.floor(e.target?.files[0]?.size/1000); 
        if(fileSize>300)
        {
          showToast('file size exceed to 300kb')
              e.target.value =""
              return false  
        }
       if(Registration_info.value.filter(({SettingD_id})=>SettingD_id==SetD_id).length==0){
          let value = RegistrationDocument.value.filter(({SettingD_id})=>SettingD_id==SetD_id)
           Registration_info.value.push(...value);
           Registration_Path.value.push(e.target?.files[0])
       }else{
       
        if(fileSize){
             Registration_Path.value[index]=e.target?.files[0]
        }else{
               
               Registration_info.value.splice(1,index);
               Registration_Path.value.splice(1,index);
        }
       } 
}


const onFileChangeADD=(index,e)=>{
       const fileSize = Math.floor(e.target?.files[0]?.size/1000); 
        if(fileSize>300)
        {
          showToast('file size exceed to 300kb')
              e.target.value =""
              return false  
        }
        
        if(fileSize){
             AdditionDoc_Path.value[index]=e.target?.files[0]
        }else{
              AdditionDoc_Path.value[index]=null
        }
}

const AddDocument =()=>{
AddtionDoc.value.push({
Doc_name:'Document',
RegD_id:1
},)
}

const deleteDocument =(index)=>{
AddtionDoc.value.splice(index,1);
AdditionDoc_Path.value.splice(index,1);
}


const onFileChangeAUth = (e) => {
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      formData.Auth_file_path =  files[0]
    Authurl.value=URL.createObjectURL(formData.Auth_file_path)
}

//  const  madantory_doument_alert=()=>{
//         showToast('Mandatory document is required')
//      }

const onsubmit = () => {
 
    d_validate.value.$touch();
      if( !d_validate.value.$invalid  ){
            let head_office_data =  document.getElementById("head_office").value;
            if(!head_office_data){
           showToast('headOffice address required')
        }
    RegistrationD.Social_media_url1 = Social_Media_Links[0]?.Description ? Social_Media_Links[0].Description : null
    RegistrationD.Social_media_url2 = Social_Media_Links[1]?.Description ? Social_Media_Links[1].Description : null
    RegistrationD.Social_media_url3 = Social_Media_Links[2]?.Description ? Social_Media_Links[2].Description : null
    RegistrationD.Social_media_url4 = Social_Media_Links[3]?.Description ? Social_Media_Links[3].Description : null
    RegistrationD.Social_media_url5 = Social_Media_Links[4]?.Description ? Social_Media_Links[4].Description : null
    RegistrationD.Social_media_url6 = Social_Media_Links[5]?.Description ? Social_Media_Links[5].Description : null



    //   showToast('Mandatory document is required')
    //   alert('Mandatory document is required')
    //   console.log(madantory_doument.value.length)
    
      let l = madantory_doument.value.length
       let madantory_doument_check = false
       if(l > 0){
     
      for(let i=0; i<l ; i++){
        if(!madantory_doument.value[i].value){
            // madantory_doument_alert()
            // //  showToast('Mandatory document is required')
            alert('Mandatory document is required')
            // showToast('Mandatory document is required')
            emit('cancel', false)
        }
        else{
            madantory_doument_check=true
        }
      }
       }
     if (madantory_doument_check  || l <= 0){
      if(Authorized.value==false){
         alert(' please comfirm Are you authorized to operate company')
        // showToast(' please comfirm Are you authorized to operate company')
         emit('cancel', false)
        return false
      }
      if(!Authurl.value){
          alert(' Companys Authorization Letter is required')
        //  showToast(' Companys Authorization Letter is required' )
         emit('cancel', false)
        return false
      }
      let RegistrationDocument=[];
        for(let x of Registration_info.value){
          RegistrationDocument.push({Account_type:RegistrationD.Account_type,RegD_id:1,SettingD_id:x.Setting_id})
        }
       emit('formData', {RegistrationD:RegistrationD,signUpForm:signUpForm,Registration_info:RegistrationDocument
       ,Registration_Path:Registration_Path.value,AdditionDoc_info:AddtionDoc.value,AdditionDoc_Path:AdditionDoc_Path.value,
        Authorized:Authorized.value,file:formData.Auth_file_path})
       }   
   }else{
      emit('cancel', false)
   }
  
}

onUpdated(()=>{
     emit('cancel', false)
     
})

onMounted(()=>{
     store.getCountry()

})
</script>