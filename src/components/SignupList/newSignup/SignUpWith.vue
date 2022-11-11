<template>
      <div class="col-md-12 pb-5">
            <h2 class="fw-bolder d-flex align-items-center text-dark">
                Account Type
            </h2>
            <div class="d-flex">
                <label  v-for="(account, index) in Accounts" :key="index" class="d-flex cursor-pointer me-5">
                    <span class="checkboxx form-check form-check-custom form-check-solid">
                        <input @click="loadList(index)" v-model="Account_type" class="form-check-input" type="radio" name="account_plan"
                            :value="index" :checked="index==0?true:false" />
                    </span>
                    <span class="type_title d-flex align-items-center me-2">
                        <span class="d-flex flex-column">
                            <span class="fw-bolder text-gray-800 text-hover-primary ms-2 mb-0 fs-5">{{ account }}
                            </span>
                        </span>
                    </span>
                </label>
            </div>
        </div>
</template>
<script setup>
import {ref,defineEmits, onMounted} from 'vue'
const emit = defineEmits(['Account_info'])

const Account_type = ref(0)
const Account_type_name = ref('Organization')

let Accounts = ["Organization", "Supplier", "Freelancer", "AuditFirm", "Regulator",];

const loadList = (id) => {
     Account_type.value = id
     Account_type_name.value = Accounts[id]
     emit('Account_info',{id:Account_type.value ,name:Account_type_name.value})
}

onMounted(()=>{
      emit('Account_info',{id:Account_type.value ,name:Account_type_name.value})
})
</script>