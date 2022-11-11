<template>
    <div class="footer py-0 d-flex flex-lg-column" id="kt_footer">
        <div class="container-xxl d-flex flex-column flex-md-row align-items-center justify-content-between">
            <div class="text-dark order-2 order-md-1">
                <p class="text-gray-800 text-muted  text-hover-primary mb-0">2022© {{COMPANY_Name}}</p>
            </div>
            <ul class="menu menu-gray-600 menu-hover-primary fw-bold order-1">
               <li class="menu-item"><a @click="TremCondition(4)" class="cursor-pointer menu-link px-2">About</a></li>
                <li class="menu-item"><a @click="TremCondition(5)" class="cursor-pointer menu-link px-2">Support</a></li>
                 <li class="menu-item"><a @click="TremCondition(3)" class="cursor-pointer menu-link px-2">Contact</a></li>
            </ul>
        </div>
    </div>
</template>

<script setup>
import {useAuthStore} from '@/store/auth.store'
import {computed} from 'vue'
import {useRouter} from 'vue-router'
const store =useAuthStore()
const router = useRouter()
const COMPANY_Name = computed(() => process.env.VUE_APP_COMPANY_Name ); 

const TremCondition=(page_id)=>{
  router.push('/admin_footer')
  store.FatchTerm({page_id:page_id})
}


</script>

<style>

</style>