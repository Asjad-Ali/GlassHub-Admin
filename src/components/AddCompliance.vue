<template>
    <div class="col-xl-9 bg-w pd-30">
        <h1 v-if="route.params.id" class="pb-2">Update Compliance</h1>
        <h1 v-else class="pb-2">Compliance</h1>
        <ul :class="{'cursor-none': route.params.id}" class="topmenutabs nav nav-tabs nav-line-tabs mb-5 fs-6">
            <li @click="loadList(0)" class="nav-item">
                <a class="nav-link cursor-pointer" :class="{'activeTab': showField == 0}" >
                    <h5>Organization</h5>
                </a>
            </li>
            <li @click="loadList(4)" class="nav-item">
                <a class="nav-link cursor-pointer" :class="{'activeTab': showField == 4}" >
                    <h5>Regulator</h5>
                </a>
            </li>
        </ul>
        <page-loader v-if="loader" />
        <div v-else class="tab-content" id="myTabContent">
            <div class="tab-pane fade show active" >
                
                    <div class="row">
                        <div class="col-md-6 pb-5">
                            <label class="form-label required">Define Compliance For</label>
                            <select @change="get_user_cat($event)" name="Categories_IDs" :class="{'is-invalid border-danger':validate.RegD_id.$error}"
                                v-model="formData.compliance.RegD_id" class="form-select form-select-lg form-select-solid"
                                data-control="select1" data-placeholder="Select..." data-allow-clear="true"
                                data-hide-search="true">
                                <template v-for="(org, index) in def_com_list" :key="index">
                                    <option v-if="org.Company_name != ''" :value="org.RegD_id">
                                        {{ org.Company_name }}
                                    </option>
                                </template>
                            </select>
                            <div v-for="(error, index) in validate.RegD_id.$errors" :key="index" class="mt-1">
                                <span class="text-danger ">{{error.$message}}</span>
                            </div>
                        </div>
                        <div class="col-md-6 pb-5"></div>
                        <div class="col-md-6 pb-5">
                            <label class="form-label required">Compliance Name</label>
                            <input  name="Compliance_name" maxlength="50" :class="{'is-invalid border-danger':validate.Compliance_name.$error}"
                                v-model="formData.compliance.Compliance_name" placeholder="e.g. Constructions company compliance"
                                class="form-control form-control-lg form-control-solid">
                            <div v-for="(error, index) in validate.Compliance_name.$errors" :key="index" class="mt-1">
                                <span class="text-danger ">{{error.$message}}</span>
                            </div>
                        </div>
                        <div class="col-md-6 pb-5">
                            <label class="form-label required">Category</label>
                            <select name="Categories_IDs" :class="{'is-invalid border-danger':validate.Categories_IDs.$error}"
                                v-model="add_cat" class="form-select form-select-lg form-select-solid"
                                data-control="select1" data-placeholder="Select..." data-allow-clear="true"
                                data-hide-search="true">
                                <template v-for="(list, index) in cat_list" :key="index">
                                    <option v-if="list.Cat_name != ''" :value="list.Cat_id">
                                        {{ list.Cat_name }}
                                    </option>
                                </template>
                            </select>
                            <div v-for="(error, index) in validate.Categories_IDs.$errors" :key="index" class="mt-1">
                                <span class="text-danger ">{{error.$message}}</span>
                            </div>
                            <div class="compliances_added mt-2">
                                <template v-for="(val, index2) in cat_name" :key="index2">
                                    <p style="margin-right: 3px">
                                        <span @click="remove_catgory(index2)" style="margin-right: 2px">x</span>{{ val
                                        }}
                                    </p>
                                </template>
                            </div>
                        </div>             
                        <div v-show="showField == 0" class="row my-10">
                            <div class="col-md-12">
                                <h5>Defined Compliance:</h5>
                            </div>
                            <div class="col-md-3">
                                <input @click="defineOwnCompliance" class="ml-20 ms form-check-input me-2"  id="new" type="radio"  value="true" v-model="formData.compliance.comp_own" >
                                <label for="new">Own</label>
                            </div>
                            <div class="col-md-3">
                                <input @click="get_reg"  class="ml-20 ms form-check-input me-2" id="existing" type="radio" value="false" v-model="formData.compliance.comp_own">
                                <label for="existing">Regulatory Authority</label>
                            </div>
                        </div>
                        <div v-show="(formData.compliance.comp_own == 'false' || formData.compliance.comp_own == false) && showField == 0" class="row">
                            <div  class="col-md-6 pb-5">
                                <label class="form-label required">Regulatory Authority</label>
                                <select @change="get_cer()"  :class="{'is-invalid border-danger':validate.Regulatory_Auth.$error}"
                                    name="" v-model="formData.compliance.Regulatory_Auth"
                                    class="form-select form-select-lg form-select-solid" data-control="select2"
                                    data-placeholder="Select..." data-allow-clear="true" data-hide-search="true">
                                    <option value>Select One</option>
                                    <template v-for="(list, index) in reg_list" :key="index">
                                        <option :value="list.RegD_id">
                                            {{ list.Fullname }}
                                        </option>
                                    </template>
                                </select>
                                <div v-for="(error, index) in validate.Regulatory_Auth.$errors" :key="index" class="mt-1">
                                     <span class="text-danger ">{{error.$message}}</span>
                               </div> 
                            </div>
                            <div  class="col-md-6 pb-5">
                                <label class="form-label required">Certificate/Compliance</label>
                                <select @change="loadExistingData" name="Certificate_id" v-model="formData.compliance.Certificate_id" 
                                       :class="{'is-invalid border-danger':validate.Certificate_id.$error}"
                                    class="form-select form-select-lg form-select-solid" data-control="select1"
                                    data-placeholder="Select..." data-allow-clear="true" data-hide-search="true">
                                    <option :value="list.Offering_id" v-for="(list, index) in cer_list" :key="index">
                                        {{ list.Offering_name }}
                                    </option>
                                    </select>
                                    <div v-for="(error, index) in validate.Certificate_id.$errors" :key="index" class="mt-1">
                                     <span class="text-danger ">{{error.$message}}</span>
                               </div>
                            </div>
                        </div>


                        <div class="col-md-6">
                            <div class="row">
                                <div class="col-md-12">
                                    <h5>Compliance for:</h5>
                                </div>
                                <div class="col-md-4">
                                    <input class="form-check-input" v-model="formData.compliance.Registration"
                                        type="checkbox" name="account_plan" value="1" />
                                    <span class="fs-6 fw-bold ms-2 text-muted">Registration</span>
                                </div>
                                <div v-show="showField == 0" class="col-md-3">
                                    <input class="form-check-input" v-model="formData.compliance.Project"
                                        type="checkbox" name="account_plan" value="1" />
                                    <span class="fs-6 fw-bold ms-2 text-muted">Project</span>
                                </div>
                                <div v-show="showField == 4" class="col-md-3">
                                    <input  class="form-check-input" v-model="formData.compliance.Certificate"
                                        type="checkbox" name="account_plan" value="1" />
                                    <span class="fs-6 fw-bold ms-2 text-muted">Certificate</span>
                                </div>
                            </div>
                        </div>
                        <div v-show="showField == 0" class="col-md-6">
                            <div class="row">
                                <div class="col-md-12">
                                    <h5>Account Type:</h5>
                                </div>
                                <div class="col-md-4">
                                    <input class="form-check-input" v-model="formData.compliance.Supplier"
                                        type="checkbox" name="account_plan" value="1" />
                                    <span class="fs-6 fw-bold ms-2 text-muted">Supplier</span>
                                </div>
                                <div class="col-md-4">
                                    <input class="form-check-input" v-model="formData.compliance.AuditFirm"
                                        type="checkbox" name="account_plan" value="1" />
                                    <span class="fs-6 fw-bold ms-2 text-muted">Audit Firm</span>
                                </div>
                                <div class="col-md-4">
                                    <input class="form-check-input" v-model="formData.compliance.Freelancer"
                                        type="checkbox" name="account_plan" value="1" />
                                    <span class="fs-6 fw-bold ms-2 text-muted">Freelancer</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <h4 class="mt-15">Add GuideLines</h4>
                    <div class="separator separator-dashed border-gray-300 my-4"></div>
                    <div class="row">
                        <div class="col-md-10">
                            <div class="row">
                                <div class="col-md-12">
                                    <div class="row">
                                        <div class="col-md-11">
                                            <label class="form-label">GuideLines </label>
                                        </div>

                                        <template v-for="(val, index) in formData.complaice_guidelines" :key="index">
                                            <div style="display: flex; align-items: baseline">
                                                <input name="" v-model="val.Description"
                                                    placeholder=" Enter your GuideLines" maxlength="350"
                                                    class="form-control form-control-lg form-control-solid" />
                                                <div v-if="index + 1 != formData.complaice_guidelines.length" class="col-md-1 vertical_text_mid compliance_ddbtn">
                                                    <button class="btn btn-primary mt-10" @click="remove_guid(index)">
                                                        -
                                                    </button>
                                                </div>
                                                <div v-if="
                                                    index + 1 == formData.complaice_guidelines.length
                                                " class="col-md-1 vertical_text_mid compliance_ddbtn">
                                                    <button class="btn btn-primary mt-10" @click="add_guid()">
                                                        +
                                                    </button>
                                                </div>
                                            </div>
                                        </template>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <h4 class="mt-10">Add Section</h4>

                    <template v-for="(sec, index1) in formData.compliance_section" :key="index1">
                        <h4 class="mt-10" v-if="index1 != 0">Section</h4>
                        <div class="separator separator-dashed border-gray-300 my-4"></div>
                        <div class="row">
                            <div class="col-md-10">
                                <div class="row">
                                    <div class="col-md-12">
                                        <div class="row">
                                            <div class="col-md-11">
                                                <label class="form-label required">Control Heading
                                                </label>
                                                <input :class="{'is-invalid border-danger': s_validate.compliance_section.$each.$response.$errors[index1].Heading.length,}" name="Control_Heading" placeholder="Control Heading" v-model="sec.Heading"
                                                    class="form-control form-control-lg form-control-solid" >
                                                    <div class="text-danger mt-2" v-for="error in s_validate.compliance_section.$each.$response.$errors[index1].Heading" :key="error">
                                                      {{ error.$message }}
                                                    </div>
                                                   
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <h4 class="mt-15">Add Controls</h4>
                            <template v-for="(con, index2) in sec.compliance_control" :key="index2">
                                <div class="separator separator-dashed border-gray-300 my-4"></div>
                                <div class="col-md-10">
                                    <div class="row">
                                        <div class="col-md-12 pb-5">
                                            <div class="row">
                                                <div class="col-md-6">
                                                    <label class="form-label">{{ con.Control_no }}
                                                    </label>
                                                </div>
                                                <div class="col-md-6">
                                                    <label class="form-label required">Refrence No</label>
                                                    <input maxlength="40"  name="Refrence_No" v-model="con.Ref_no"
                                                    :class="{'is-invalid border-danger': c_validate.compliance_section.$each.$response.$errors[index1].compliance_control.length,}"
                                                        class="form-control form-control-lg form-control-solid margin" >
                                                        
                                                    <div class="text-danger mt-2" 
                                                        v-for="error in c_validate.compliance_section.$each.$response.$errors[index1].compliance_control" :key="error">
                                                          {{ error.$message[index1][index2] }}
                                                       </div>
                                                </div>
                                                <div class="col-md-6 mt-3">
                                                    <label class="form-label">Source</label>
                                                    <input maxlength="50" name="" placeholder="Enter your source" v-model="con.Source"
                                                        class="form-control form-control-lg form-control-solid" />
                                                </div>
                                                <div class="col-md-6 mt-3">
                                                    <label class="form-label">Control statement</label>
                                                    <textarea name="" placeholder="Enter your Control statement"
                                                        v-model="con.Ctrl_statement" maxlength="500"
                                                        class="form-control form-control-lg form-control-solid">Third Party must establish, maintain and communicate a</textarea>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-12 text-end" v-if="index2 + 1 != sec.compliance_control.length">
                                        <a class="btn btn-primary margin-top"
                                            @click="remove_control(index1, index2)">Remove Control -</a>
                                    </div>

                                    <div class="col-md-12 text-end" v-if="index2 + 1 == sec.compliance_control.length">
                                        <a class="btn btn-primary margin-top"
                                            @click="save_control(index1, index2 + 1)">Add Control +</a>
                                    </div>
                                </div>
                            </template>
                        </div>
                    </template>
                    <div class="separator separator-dashed border-gray-300 my-4"></div>
                    <div class="col-md-12 text-end">
                        <button class="w-100 btn btn-primary margin-top" @click="save_section()">
                            Add Section +
                        </button>
                    </div>

                    <h4 class="margin-top">Compliance Audit</h4>

                    <div class="row">
                        <div class="col-md-4">
                            <span class="fs-6 fw-bold text-muted">Compliance through audit firm?</span>
                            <input v-model="formData.compliance.Compliance_audit" class="ml-5 form-check-input" type="radio" name="account_plan" value="true">
                        </div>
                    </div>

                    <div class="row mt-5" v-if="formData.compliance.Compliance_audit">
                        <div class="col-md-6">
                            <label class="form-label required">Authorized Audit Firms </label>
                            <select name="Authorized_Audit_Firms" v-model="audit_auth" 
                                class="form-select form-select-lg form-select-solid">
                                <option :value="list.RegD_id" v-for="(list, index) in audit_list" :key="index">
                                    {{ list.Fullname }}
                                </option>
                                </select>
                                <!-- <div v-for="(error, index) in validate.Auth_AuditFirm_IDs.$errors" :key="index" class="mt-1">
                                            <span class="text-danger ">{{error.$message}}</span>
                                        </div> -->
                           
                            
                            <div class="auditfirms_added mt-2">
                                <p style="margin-right: 3px" v-for="(val, index2) in audit_name" :key="index2">
                                    <span @click="remove_auth_audit(index2)" style="margin-right: 2px">x</span>{{ val }}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div class="row mt-5">
                        <div class="col-md-6">
                            <span class="fs-6 fw-bold text-muted">
                                Compliance through any audit firm.
                            </span>
                            <input  v-model="formData.compliance.Compliance_any_audit"  class="ml-5 form-check-input" type="radio"  value="true" name="account_plan">

                        </div>
                    </div>

                    <div class="col-md-12 pb-5 text-left">
                        <h4 class="margin-top">Summary</h4>
                        <div class="separator separator-dashed border-gray-300 my-4"></div>

                        <textarea name="" v-model="formData.compliance.Summary" maxlength="500" placeholder="Please enter your text"
                            class="form-control form-control-lg form-control-solid">The purpose of this cybersecurity assessment is to confirm that Paratech</textarea>
                    </div>
                    <div class="separator separator-dashed border-gray-300 my-4"></div>
                    <div class="col-md-12 pb-5 text-right">
                        <router-link to="/compliance"><button class="btn btn-light pr-5 me-2">Cancel</button></router-link> 
                        <button  @click="submit()"    v-if="route.params.id" class="btn btn-primary"   >Update </button>
                        <button  @click="submit()"   v-else class="btn btn-primary"  >Add </button>
                    </div>
                   
               
            </div>
        </div>
    </div>
</template>

<script setup>
import PageLoader from '@/components/Global/PageLoader.vue'
import { useVuelidate } from "@vuelidate/core";
import { required ,helpers} from "@vuelidate/validators";

import { usecomplianceStore } from "@/store/compliance.store";
import {  useRoute, useRouter } from "vue-router";
import { onMounted, reactive, ref, watch } from "vue";
import Api from "@/services/API";
import API from "@/services/API";
// import axios from "axios";
// import useToast from '@/composables/useToast.js'





const compliancestore = usecomplianceStore();
const router = useRouter();
const route = useRoute();



const showField = ref(0)
const loader = ref(false)

const audit_list = ref([]);
const audit_auth = ref("");
const audit_name = ref([]);
const cat_list = ref([]);
const def_com_list = ref([]);
const cat_name = ref([]);
const add_cat = ref('');
const reg_list = ref([]);
const cer_list = ref([]);

const user = JSON.parse(localStorage.getItem("user"));

let formData = reactive({
    compliance: {
        Compliance_id: 0,
        Compliance_name:"",
        Categories_IDs: [],
        Regulatory_Auth: null,
        Certificate_id: null,
        Registration: false,
        Project: false,
        Certificate: false,
        Supplier: false,
        AuditFirm: false,
        Freelancer: false,
        Organization: false,
        Regulator: false,
        Compliance_audit: true,
        Auth_AuditFirm_IDs: [],
        Compliance_any_audit: false,
        Summary: "",
        Account_id: 0,
        Created_by: user.User.User_id,
        Updated_by: user.User.User_id,
        RegD_id: "",
        AdminCompliance: true,
        comp_own: true,
        Regulatory_Auth_name: "Own"
    },
    complaice_guidelines: [
        {
            Description: "",
            Created_by: parseInt(user.User.User_id),
            Updated_by: parseInt(user.User.User_id),
        },
    ],

    compliance_section: [
        {
            Heading: "Control Heading 1",
            Created_by: parseInt(user.User.User_id),
            Updated_by: parseInt(user.User.User_id),
            compliance_control: [
                {
                    Control_no: "",
                    Ref_no: "TPC1",
                    Source: "",
                    Ctrl_statement: "",
                },
            ],
        },
    ],
});

watch(add_cat, () => {
    console.log(add_cat.value);
    if (add_cat.value != '') add_catagory();
}),
watch(audit_auth, () => {
    if (audit_auth.value != '') add_auth_audit();
});

watch(
    () => formData.compliance.Compliance_any_audit,
    () => {
        if (formData.compliance.Compliance_any_audit) {
            formData.compliance.Compliance_audit = false;
            formData.compliance.Auth_AuditFirm_IDs = [];
            audit_auth.value = "";
            audit_name.value = [];
        }
    },
    { deep: true }
);

watch(
    () => formData.compliance.Compliance_audit,
    () => {
        if (formData.compliance.Compliance_audit) {
            formData.compliance.Compliance_any_audit = false;
        }
    },
    { deep: true }
);

// const check_Regulatory_Auth=(value)=>{
//      if(formData.compliance.Account_id!=4 && value ==null) {
//         return false
//      }else
//      {
//         return true
//      }
// }

// const check_certificate_id = () => {
//     if((formData.compliance.comp_own == 'false' || formData.compliance.comp_own == false) && !formData.compliance.Regulatory_Auth) {
//             console.log("errorrrrrrrr auth")
//             return {required:helpers.withMessage('Regulatory Authority is Required',required)}
//          }else{
//             console.log("no error auth")
//             return {}
//          }    
// }
// const check_reg_auth = () => {
//     if((formData.compliance.comp_own == 'false' || formData.compliance.comp_own == false)  && !formData.compliance.Certificate_id) {
//             console.log("errorrrrrrrr certi")
//             return {required:helpers.withMessage('Certificate/Compliance is Required',required)}
//          }else{
//             console.log("no error certi")
//             return {}
//          }   
// }
const rules = {
    Compliance_name:{required:helpers.withMessage('Compliance Name is Required',required)},
    Categories_IDs:{required:helpers.withMessage('Categoryis Required',required)},
    RegD_id:{required:helpers.withMessage('Defined Compliance Required',required)},
    // Certificate_id: check_certificate_id(),
    // Regulatory_Auth: check_reg_auth(),
    Regulatory_Auth:()=>{
         if(!formData.compliance.comp_own == false && !formData.compliance.Regulatory_Auth) {
            console.log("errorrrrrrrr auth")
            return {required:helpers.withMessage('Regulatory Authority is Required',required)}
         }else{
            console.log("no error auth")
            return {}
         }         
      },
    Certificate_id:()=>{
         if(!formData.compliance.comp_own && !formData.compliance.Certificate_id) {
            console.log("errorrrrrrrr certi")
            return {required:helpers.withMessage('Certificate/Compliance is Required',required)}
         }else{
            console.log("no error certi")
            return {}
         }         
      },
    // Auth_AuditFirm_IDs:{required:helpers.withMessage('Authorized Audit is Required',required)},

};

// const id_rules = {
//     Regulatory_Auth:{check_Regulatory_Auth:helpers.withMessage('Regulatory Authority is Required',check_Regulatory_Auth)},
    
// };

const s_rules={
     compliance_section: {
        $each: helpers.forEach({
          Heading: {
            required:helpers.withMessage('Control Heading Required',required)
          },
        })
      }
}

const c_rules = {
         compliance_section: {
         $each: helpers.forEach({
            compliance_control: {
            $each: helpers.forEach({
              Ref_no: {
            required:helpers.withMessage('Refrence No Required',required)
              },
            })
          }
        })
      }
}
//  let validate 
//  let id_validate 
//   watch(showField,()=>{
//     console
//   id_validate = useVuelidate(id_rules, formData.compliance )
//   })       
const validate = useVuelidate(rules, formData.compliance )  
const s_validate = useVuelidate(s_rules,formData)
 const c_validate = useVuelidate(c_rules, formData)

const add_catagory = () => {
    let c_list = cat_list.value.filter((row) => add_cat.value == row.Cat_id);
    if (formData.compliance.Categories_IDs.includes(c_list[0].Cat_id)) {
        return false;
    } else {
        formData.compliance.Categories_IDs.push(c_list[0].Cat_id);
        cat_name.value.push(c_list[0].Cat_name);
    }
};

const remove_catgory = (index) => {
    formData.compliance.Categories_IDs.splice(index, 1);
    cat_name.value.splice(index, 1);
    add_cat.value = "";
};

const add_auth_audit = () => {
    let auditList = audit_list.value.filter(
        (row) => audit_auth.value == row.RegD_id
    );
    if (formData.compliance.Auth_AuditFirm_IDs.includes(auditList[0].RegD_id)) {
        return false;
    } else {
        formData.compliance.Auth_AuditFirm_IDs.push(auditList[0].RegD_id);
        audit_name.value.push(auditList[0].Fullname);
    }
};

const remove_auth_audit = (index) => {
    formData.compliance.Auth_AuditFirm_IDs.splice(index, 1);
    audit_name.value.splice(index, 1);
    audit_auth.value = "";
};

const add_guid = () => {
    formData.complaice_guidelines.push({
        Description: "",
        Created_by: parseInt(parseInt(user.User.User_id)),
        Updated_by: parseInt(parseInt(user.User.User_id)),
    });
};

const remove_guid = (index) => {
    formData.complaice_guidelines.splice(index, 1);
};


const add_section=()=>{
      formData.compliance_section.push({
           Heading:"",
            Created_by:user.User.User_id,
            Updated_by:user.User.User_id,
            compliance_control:[
                {
                    Control_no:"Control No 1",
                    Ref_no:"TPC1",
                    Source :"",
                    Ctrl_statement:""
                },
            ]
      },)
  }


const add_control = (index, index1) => {
    formData.compliance_section[index].compliance_control.push({
        Control_no: `Control No ${index1 + 1}`,
        Ref_no: "TPC" + (index1 + 1),
        Source: "",
        Ctrl_statement: "",
    });
};




const remove_control = (index1, index2) => {
    formData.compliance_section[index1].compliance_control.splice(index2, 1);
    for (
        let i = 0;
        i <= formData.compliance_section[index1].compliance_control.length;
        i++
    ) {
        formData.compliance_section[index1].compliance_control[
            i
        ].Control_no = `Control No ${i + 1}`;
        formData.compliance_section[index1].compliance_control[i].Ref_no = `TPC ${i + 1}`;
    }
};

const save_control = (index1, index2) => {
    c_validate.value.$touch();
    if(!c_validate.value.$invalid){
    add_control(index1,index2)
    }
};

const save_section = () => {
     s_validate.value.$touch();
         if(!s_validate.value.$invalid){
         add_section()
         }
};

const submit = async () => {
     validate.value.$touch();
    if(!validate.value.$invalid){
     formData.compliance.Account_id = showField.value
    compliancestore.insertComplianceList(formData)
    .then( response => {
        if(response.status == 200 ) {
            router.push({ path: '/compliance' })
        }
    })
}
}

const defineOwnCompliance = () => {
    formData.compliance.Regulatory_Auth_name = 'Own'
    formData.compliance.Certificate_id = null
    formData.compliance.Regulatory_Auth = null
    // cer_list.value = []
    // reg_list.value = []
}

const get_cat = async () => {
    await Api.get("api/CategoriesDef/GetFullList" )
    .then((response) => {
        cat_list.value = response.data.Categories;
        if(route.params.id){
            Edit_compaliance()
        }  
    });
};
const get_user_cat = async (e) => {
    await Api.get(`api/registration/get-catlist/?RegD_id=${e.target.value}`)
    .then((response) => {
        cat_list.value = response.data; 
    });
};
const get_Def_Com = async (id) => {
    await Api.get( `api/compliance/all-company-list?Account_id=${id}` )
    .then((response) => {
        def_com_list.value = response.data; 
    });
};

const get_reg = async () => {
    await Api.get("api/compliance/get-all-regulator").then((response) => {
   reg_list.value = response.data;
    });
};

const get_cer = async () => {
    setEmptyCompliance()
    const index = reg_list.value.findIndex(val => val.RegD_id == formData.compliance.Regulatory_Auth )
    if(index != -1){
        formData.compliance.Regulatory_Auth_name  = reg_list.value[index].Fullname
    }
        await Api.get("api/compliance/get-certificate?RegD_id=" +formData.compliance.Regulatory_Auth).then((response) => {
        cer_list.value = response.data;
    });
};
const get_audit = async () => {
    await Api.get("api/compliance/get-audits").then((response) => {
        audit_list.value = response.data;
    });
};

const edit_category=(data)=>{
    let cat_ids = data.split(",");
    for (let value of cat_ids){
        cat_list.value.filter(row=>{
            if(parseInt(value) == row.Cat_id)
            {
            cat_name.value.push(row.Cat_name)
            add_cat.value=row.Cat_id
            }
        })
        formData.compliance.Categories_IDs.push(parseInt(value));
    }      
}

const edit_auditfirm=(data)=>{
    formData.compliance.Auth_AuditFirm_IDs = []
    audit_name.value = []
    let audit_ids = data.split(",");
    console.log(audit_ids)
    for (let value of audit_ids){
        formData.compliance.Auth_AuditFirm_IDs.push(parseInt(value));
        audit_list.value.filter(row=>{
            if(parseInt(value) == row.RegD_id)
            {
                audit_name.value.push(row.Fullname);
                audit_auth.value=row.RegD_id;
            }
        })
    }
}
const setEmptyCompliance = () => {
    formData.compliance.Registration=false;
    formData.compliance.Project=false;
    formData.compliance.Certificate=false;
    formData.compliance.Supplier=false;
    formData.compliance.AuditFirm=false
    formData.compliance.Freelancer=false;
    formData.compliance.Organization=false;
    formData.compliance.Regulator=false;
    formData.compliance.Compliance_audit=true;
    audit_name.value=[];
    audit_auth.value='';
    formData.compliance.Compliance_any_audit=false;
    formData.compliance.Summary='';
    formData.complaice_guidelines = [
    {
        Description:"",
        Created_by:user.User.User_id,
        Updated_by:user.User.User_id,
    },
    ];
    formData.compliance_section=[{
    Heading:"control heading 1",
    Created_by:user.User.User_id,
    Updated_by:user.User.User_id,
    compliance_control:[
        {
            Control_no:"",
            Ref_no:"TPC1",
            Source :"",
            Ctrl_statement:""
        },
    ]}
    ]
    }
const setComplianceData = (com) => {
    formData.compliance.Registration=com.Registration;
    formData.compliance.Project=com.Project;
    formData.compliance.Certificate=com.Certificate;
    formData.compliance.Supplier=com.Supplier;
    formData.compliance.AuditFirm=com.AuditFirm
    formData.compliance.Freelancer=com.Freelancer;
    formData.compliance.Organization=com.Organization;
    formData.compliance.Regulator=com.Regulator;
    formData.compliance.Compliance_audit=com.Compliance_audit;
    edit_auditfirm(com.Auth_AuditFirm_IDs)
//  formData.compliance.Auth_AuditFirm_IDs=com.Auth_AuditFirm_IDs;
    formData.compliance.Compliance_any_audit=com.Compliance_any_audit;
    formData.compliance.Summary=com.Summary;

          
}
const Edit_compaliance=async()=>{
    loader.value = true
    await Api.get('api/compliance/get-by-id?Compliance_id='+route.params.id)
    .then(response=>{
        loader.value = false
        if(response.status==200){
            let  com = response.data.data.compliance
            showField.value = com.Account_id;
            get_Def_Com(com.Account_id)
            formData.compliance.RegD_id= com.RegD_id;
            formData.compliance.Compliance_name= com.Compliance_name;
            formData.compliance.Compliance_id=com.Compliance_id;
            edit_category(com.Categories_IDs)
            formData.compliance.Regulatory_Auth=com.Regulatory_Auth;
            get_cer()
            formData.compliance.Certificate_id=com.Certificate_id;
            formData.compliance.comp_own=com.comp_own;
            setComplianceData(com)
            formData.complaice_guidelines =  response.data.data.complaice_guidelines
            formData.compliance_section=  response.data.data.compliance_section
        }else{
            setEmptyCompliance()
        }
        loader.value = false

    })
}

const loadExistingData = async () => {
     audit_name.value=[];
     audit_auth.value="";
    const response = await API.get(`api/compliance/get-by-reg?Regulatory_Auth=${formData.compliance.Regulatory_Auth}&Certificate_id=${formData.compliance.Certificate_id}`)
    if( response.status == 200 ){
        let  com = response.data.data.compliance
        setComplianceData(com)
        formData.complaice_guidelines =  response.data.data.complaice_guidelines
        formData.compliance_section=  response.data.data.compliance_section
        }
    }



const setEmptyAllForm = () =>{
    formData.compliance.RegD_id= "";
    formData.compliance.Compliance_name= "";
    formData.compliance.Regulatory_Auth= null ;
    formData.compliance.Certificate_id= null;
    cat_name.value = []
    formData.compliance.Categories_IDs = []
    add_cat.value = "";
    setEmptyCompliance()
}
const loadList = (id) => {
    showField.value = id
    formData.compliance.Account_id = id
    get_Def_Com(id)
    setEmptyAllForm()
};


onMounted(() => {
    if(route.params.id){
        get_cat();
        loader.value = true
    } 
    get_Def_Com(0)
    get_audit();
    get_reg()
});


</script>

<style scoped>
.margin-top {
    margin-top: 20px;
}
</style>
