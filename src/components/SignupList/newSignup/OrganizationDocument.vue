<template>
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
                      <input type="file" class="form-control RGDOU" :class="'orgDou'+x.Document_type"  @change="onFileChange(index,$event,x.SettingD_id)"/>
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
                          <input class="form-control form-control-solid"   v-model="docu.name" />
                        </div>
                      </div>
                    </td>
                    <td>
                      <input type="file" :id="'file'+index" class="form-control AddDOU" @change="onFileChangeADD(index,$event,docu.name)"/>
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
                <!-- <i class="fas fa-plus fa-2x" aria-hidden="true"></i>  -->
                Add Additional Document
                
              </button>


                 <div class="row fv-row mb-10 fv-plugins-icon-container">
                        <div class="col-md-12 pb-5">
                            <div class="d-flex">
                                <div class="me-5">
                                    <label class="fs-6 fw-bold form-label">Are you authorized to operate company account?</label>
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
                            <a class="image-link" :href="url"  target="_blank" > Show / </a>
                            <a class="image-link" :href="url" download >Download</a>
                        </b>
                    </div>
                        </div>
                    </div>
</template>
<script setup>
 /* eslint-disable */
 
import {defineProps, watch, computed,ref, onUpdated,reactive} from 'vue'
import {useMainCategoryStore} from '@/store/signupStore/mainCategory'
import showToast from '@/composables/useToast'
const props = defineProps(['Account_type','RegistrationDocuments_submit',])
const emit = defineEmits(['formData','cancel'])
const store = useMainCategoryStore()

const Registration_Path =ref([])
const Registration_info =ref([])

const AddtionDoc=ref([])
const AdditionDoc_Path =ref([])
const url = ref('')
const Authorized = ref('')
// const account_plan  = ref(0)
let formData = reactive({
        Auth_file_path: null,
        data:{}
    })
let RegistrationDocument=computed(()=>{
  return store.RegistrationSettingD
})

// watch(RegistrationDocument,()=>{
//     if(RegistrationDocument.value?.length > 0){
//   emit('cancel', false)  
//     }
 
// })

//  let signupData ={
//        RegistrationM:{
//        ...RegistrationM.value,
//        RegistrationD:[RegistrationD.value],
//        RegistrationCategories:RegistrationCategories.value,
//        Office_Branches:Office_Branches.value,
       
//        RegistrationDocument:RegistrationDocument.value,
//        AdditionalDoc:AdditionalDoc.value    
//        } 
//     }


//     formData.data = JSON.stringify(signupData)
//     console.log('arslan4')
//     store.AddSignup(formData)
//         .then(response => {
//             if (response.status == 200) {
//                 router.push({ path: '/signups' })
//             }
//         })

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
name:'Document',
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
    url.value=URL.createObjectURL(formData.Auth_file_path)
}


    const onsubmit=()=>{
      let  madantory_doument = document.getElementsByClassName('orgDou1')
       if(madantory_doument.length>0){
      let madantory_doument_check = false
      for (let md of  madantory_doument){
        if(!md.value){
           showToast('Mandatory document is required')
           emit('cancel', false)
        }else{
           madantory_doument_check=true
        }
      }  
     if (madantory_doument_check){
      let RegistrationDocument=[];
        for(let x of Registration_info.value){
          RegistrationDocument.push({Account_type:props.Account_type,RegD_id:1,SettingD_id:x.Setting_id})
        }
        emit('formData', {Registration_info:RegistrationDocument,Registration_Path:Registration_Path.value,
        AdditionDoc_info:AddtionDoc.value,AdditionDoc_Path:AdditionDoc_Path.value,
        Authorized:Authorized.value,file:formData.Auth_file_path
        })
       }
      }
       }

onUpdated(()=>{
    emit('cancel', false)
})

</script>
