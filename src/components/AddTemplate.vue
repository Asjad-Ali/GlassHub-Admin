<template>
    <div class="col-xl-9 pd-30 bg-w">
        <div class="card-body pb-0">
            <h1 class="pb-2"> Template</h1>
            <div class="separator separator-dashed border-gray-300 my-8"></div>
            <div class="row ">
                <div class="col-md-6 pb-5">
                    <label class="form-label "> Template Type</label>
                    <select @change="loadTemplate($event)" name="" :class="{'is-invalid':validate.Template_type.$error}" class="form-select form-select-lg form-select-solid" data-control="select1"
                        data-placeholder="Select..." v-model="menu.Template_type" data-allow-clear="true" data-hide-search="true">
                        <option selected disabled value="">Select Template Type</option>
                        <option :value="index" v-for="(template,index) in templateType" :key="template">{{ template }}</option>                        
                    </select>
                    <div v-for="(error, index) in validate.Template_type.$errors" :key="index" class="mt-1">
                                <span class="text-danger ">{{error.$message}}</span>
                            </div>
                </div>

                <div class="col-md-6 pb-5">
                    <label class="form-label "> Account Type</label>
                    <select name="" @change="loadMenue($event)" :class="{'is-invalid':validate.Account_id.$error}" class="form-select form-select-lg form-select-solid" data-control="select1"
                        data-placeholder="Select..." v-model="menu.Account_id" data-allow-clear="true" data-hide-search="true">
                        <option selected disabled value="">Select Account Type</option>
                        <option :value="index" v-for="(account,index) in accountType" :key="account">{{ account }}</option>
                    </select>
                    <div v-for="(error, index) in validate.Account_id.$errors" :key="index" class="mt-1">
                                <span class="text-danger ">{{error.$message}}</span>
                            </div>
                </div>

                 <div  v-if="showPageName"  class="col-md-6 pb-5">
                  <div class="form-label">Page Name <a href="#" @click="showPageName = false " class="float-end">Add New</a></div>
                     <select  name=""  class="form-select form-select-lg form-select-solid" data-control="select1"
                        data-placeholder="Select..." v-model="menu.Page_name" data-allow-clear="true" data-hide-search="true">
                        <option selected disabled value="">Select Page Name</option>
                         <template v-for="list in store.pagenameList" :key="list">
                             <option :selected="menu.Page_name == list.Page_name" v-show="list.Page_name != 'undefined' "  :value="list.Page_name">{{ list.Page_name }}</option>
                         </template>
                    </select>
                </div>
                <div v-else class="col-md-6 pb-5">
                    <div class="form-label ">Page Name <a href="#" @click="showPageName = true " class="float-end">Select Given</a></div>
                    <input type="text" v-model="menu.Page_name" placeholder="Page Name" class="form-control form-control-lg form-control-solid">
                </div>

                <div class="col-md-12 mb-10">
                    <label class="form-label ">Template Design</label>
                    <QuillEditor theme="snow" ref="quill" :toolbar="toolbar" :content="menu.Template_design" v-model:content="menu.Template_design" 
                       content-type="html" class="form-control form-control-lg form-control-solid" placeholder="Enter your Template description" />
                </div>

                <div class="col-md-12 mt-15">
                    <label class="form-label required">Is Active</label>
                    <input type="checkbox" name="" v-model="menu.Is_Active"  class="form-check-input mb-5 mx-2"/>
                </div>  
                
                <div class="col-md-12 ">
                    <h3 class="col-md-12 pb-5 text-danger"> Important Note</h3>
                    <ul>
                        <li>
                            For Name [NNNNNN]
                        </li>
                        <li>
                            For Company [CCCCCC]
                        </li>
                        <li>
                            For Email [EEEEEE]
                        </li>
                        <li>
                            For User [UUUUUU]
                        </li>
                        <li>
                            For Account Type [AAAAAA]
                        </li>
                        <li>
                            For Account Requested [RRRRRR]
                        </li>
                        <li>
                            For OTP [OOOOOO]
                        </li>
                        <li>    
                            For Category [TTTTTT]
                        </li>
                        <li>
                           Sender Email [SSSSSS]
                        </li>
                    </ul>

                </div>

                <div class="row mt-10">
                 <div class="col-md-6">
                    <div class="text-danger"> {{ Template_designError }}</div>
                </div>
                <div class="col-md-6 text-right">
                    <router-link to="/template"><button class="btn btn-secondary me-2">cancel</button> </router-link>
                    <button v-if="route.params.id" @click="onSubmit"  type="" class="btn btn-primary">Update</button>
                    <button v-else type="" @click="onSubmit" class="btn btn-primary"> Add </button>
                </div>
                </div>
             </div>
        </div>
    </div>
</template>

<script setup>
import { QuillEditor } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";
import { usetemplatestore } from '@/store/template.store'
import { useRoute, useRouter } from 'vue-router';
import { ref } from "vue";
import { useVuelidate } from "@vuelidate/core";
import { required ,helpers} from "@vuelidate/validators";


const { onMounted, watch }=require("@vue/runtime-core");


const accountType = ["Organization", "Suppliers", "Freelancers", "Audit Firms", "Regulator" ]
const templateType = ["SMS", "Email" ]
const showPageName = ref(true)
const store = usetemplatestore()
const router = useRouter()
const route = useRoute()
const quill = ref(null) 
const Template_designError = ref(null)
const user = JSON.parse(localStorage.getItem('user'))

let menu = ref({
    
    Account_id:'',
    Created_by: user.User.User_id,
    Updated_by: user.User.User_id,
    Template_id: "0",
    Template_type:'' ,
    Template_type_name: "",
    Account_name:'',
    Template_design: "",
    Page_name: "",
    Is_Active: true,
})

const rules = {
    Template_type:{required:helpers.withMessage('Template Type is Required',required)},
     Account_id:{required:helpers.withMessage('Account Type is Required',required)},
};

const validate = useVuelidate(rules, menu) 


const toolbar = [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ size: ["small", false, "large", "huge"] }],
    ["bold", "italic", "underline", "strike"],
    ["blockquote", "code-block"],
    [{ align: [] }],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ color: [] }, { background: [] }],
    [{ font: [] }],
    // ['link', 'image', 'video'],
    ["clean"],
];

watch(
    () => menu.value.Template_design,
    () => {
        if ( menu.value.Template_design ) {
            if( menu.value.Template_design.length >= 5000 ){
                Template_designError.value = "Detail Help must be at most 5000 characters"
                console.log("dfsdfsdfds",Template_designError.value)
            }else{
                Template_designError.value = null
        }
        } 
    },
    { deep: true }
);


const loadMenue = (e) =>{
    store.loadMenuList(e.target.value)
    menu.value.Account_name =e.target.options[e.target.options.selectedIndex].text;
}

const loadTemplate = (e) =>{
    menu.value.Template_type_name = e.target.options[e.target.options.selectedIndex].text;
}

const onSubmit = () => {
   validate.value.$touch();
         if(!validate.value.$invalid){
    store.insertTemplate(menu.value)
    .then(response => {
        console.log("In router",response.status)
        if(response.status == 200){
            store.allTemplateList = [];
            router.push({ path: '/template' })
        }
    })
}
}

onMounted(() => {
    store.loadPageNameList()
    if(route.params.id){
        menu.value = JSON.parse(localStorage.getItem('editTemplate'))
        console.log(menu.value)
        // menu.value.Page_name = 
        // store.loadMenuList(menu.value.Account_id)
        quill.value.setContents( menu.value.Template_design )
    }
})

</script>
