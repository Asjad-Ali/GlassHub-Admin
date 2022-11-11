<template>
    <div class="col-xl-3 aside-profile-details">
    <div class="card">
        <!--begin::Body-->
        <div class="company-details">
            <div class="hide-1200 menu-lg-rounded menu-state-bg menu-title-gray-700 menu-state-icon-primary menu-state-bullet-primary menu-arrow-gray-400 fw-bold my-5 my-lg-0 align-items-stretch flex-grow-1">
            <div @click="goToRoute('/')"  class="menu-item" :class="{'activeTab':  currentPath == '/' }">
                <a class="menu-link py-3"> Dashboard </a>
            </div>
            <div v-for="(menu) in SideBarMenuList" :key="menu" @click="goToRoute(menu.path)"  class="menu-item" :class="{'activeTab':  currentPath.includes(menu.path) }">
                <a class="menu-link py-3"> {{ menu.name }}</a>
            </div>
            <!--<span type="button" class="menu-link py-3 settingmenuadminlast"
                data-kt-menu-trigger="click"
                data-kt-menu-placement="bottom-start">
                Settings
            </span>-->

            <div class="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg-light-primary fw-bold fs-7 w-200px py-4"
                data-kt-menu="true">
                <!--<div class="menu-item px-3">
                    <a href="user_documents.html" class="menu-link px-3">
                        Additional Required documents
                    </a>
                </div>-->

                <!--<div class="menu-item px-3">
                    <a href="Verificationdocuments.html" class="menu-link px-3">
                        Verification documents
                    </a>
                </div>-->
            </div>
        </div>
        </div>
        </div>
    </div>
</template>

<script setup>
import { useRoute, useRouter } from "vue-router";

const { reactive }=require("@vue/reactivity");
const { computed }=require("@vue/runtime-core");

const route = useRoute()
const router = useRouter()

const currentPath = computed( () => route.path )


const SideBarMenuList = reactive([
    {name: 'Signups', path: '/signups'},
    {name: 'Categories', path: '/categories'},
    {name: 'Admins Users', path: '/admin-user'},
    {name: 'Registrations', path: '/registrations'},
    {name: 'Compliance', path: '/compliance'},
    {name: 'Audit Request', path: '/audit-Request'},
    {name: 'Projects', path: '/projects'},
    {name: 'Organizations', path: '/organizations'},
    {name: 'Suppliers', path: '/suppliers'},
    {name: 'Freelancer', path: '/freelancer'},
    {name: 'Audit Firms', path: '/audit-firms'},
    {name: 'Regulators', path: '/regulators'},
    {name: 'Content Page', path: '/content-page'},
    {name: 'Evaluate Suppliers', path: '/evaluate-supplier'},
    {name: 'Star Rating', path: '/star-rating'},
    {name: 'Disputes', path: '/disputes'},
    {name: 'Help Text', path: '/help-text'},
    {name: 'Template', path: '/template'},
    {name: 'Payment Methods', path: '/payment-methods'}
])

const goToRoute = (path) => {
    router.push({path: path})
}
</script>