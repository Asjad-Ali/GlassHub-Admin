<template>
    <div id="Admin_header" class="header" data-kt-sticky="true" data-kt-sticky-name="header" data-kt-sticky-offset="{default: '200px', lg: '300px'}">            
        <div class="container-xxl d-flex flex-grow-1 flex-stack">
            <div class="d-flex align-items-center me-5">
                <router-link to="/" >
                    <img alt="Logo" :src="COMPANY_LOGO" class="h-40px h-lg-40px" />
                </router-link>
            </div>
            <div class="d-flex align-items-center flex-shrink-0 position-relative ">
                <div id="kt_header_search" class="d-flex align-items-center w-lg-250px" data-kt-search-keypress="true" data-kt-search-min-length="2" data-kt-search-enter="enter" data-kt-search-layout="menu" data-kt-search-responsive="lg" data-kt-menu-trigger="auto" data-kt-menu-permanent="true" data-kt-menu-placement="bottom-end">
                    <div data-kt-search-element="toggle" class="d-flex d-lg-none align-items-center">
                        <div class="btn btn-icon btn-color-gray-700 btn-active-color-primary btn-outline btn-outline-secondary btn-active-bg-light w-30px h-30px w-lg-40px h-lg-40px">
                            <!--begin::Svg Icon | path: icons/duotune/general/gen021.svg-->
                            <span class="svg-icon svg-icon-1 svg-icon-white">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                    <rect opacity="0.5" x="17.0365" y="15.1223" width="8.15546" height="2" rx="1" transform="rotate(45 17.0365 15.1223)" fill="black" />
                                    <path d="M11 19C6.55556 19 3 15.4444 3 11C3 6.55556 6.55556 3 11 3C15.4444 3 19 6.55556 19 11C19 15.4444 15.4444 19 11 19ZM11 5C7.53333 5 5 7.53333 5 11C5 14.4667 7.53333 17 11 17C14.4667 17 17 14.4667 17 11C17 7.53333 14.4667 5 11 5Z" fill="black" />
                                </svg>
                            </span>
                            <!--end::Svg Icon-->
                        </div>
                    </div>
                    <!--end::Tablet and mobile search toggle-->
                    <!--begin::Form(use d-none d-lg-block classes for responsive search)-->
                    <form data-kt-search-element="form" class="d-none d-lg-block w-100 position-relative mb-2 mb-lg-0" autocomplete="off">
                        <!--begin::Hidden input(Added to disable form autocomplete)-->
                        <input type="hidden" />
                        <!--end::Hidden input-->
                        <!--begin::Icon-->
                        <!--begin::Svg Icon | path: icons/duotune/general/gen004.svg-->
                        <span class="svg-icon svg-icon-2 svg-icon-gray-700 position-absolute top-50 translate-middle-y ms-4">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path d="M21.7 18.9L18.6 15.8C17.9 16.9 16.9 17.9 15.8 18.6L18.9 21.7C19.3 22.1 19.9 22.1 20.3 21.7L21.7 20.3C22.1 19.9 22.1 19.3 21.7 18.9Z" fill="black" />
                                <path opacity="0.3" d="M11 20C6 20 2 16 2 11C2 6 6 2 11 2C16 2 20 6 20 11C20 16 16 20 11 20ZM11 4C7.1 4 4 7.1 4 11C4 14.9 7.1 18 11 18C14.9 18 18 14.9 18 11C18 7.1 14.9 4 11 4ZM8 11C8 9.3 9.3 8 11 8C11.6 8 12 7.6 12 7C12 6.4 11.6 6 11 6C8.2 6 6 8.2 6 11C6 11.6 6.4 12 7 12C7.6 12 8 11.6 8 11Z" fill="black" />
                            </svg>
                        </span>
                        <input type="text" class="form-control bg-transparent ps-13 fs-7 h-40px" name="search" value="" placeholder="Quick Search" data-kt-search-element="input" />
                        <!--end::Input-->
                        <!--begin::Spinner-->
                        <span class="position-absolute top-50 end-0 translate-middle-y lh-0 d-none me-5" data-kt-search-element="spinner">
                            <span class="spinner-border h-15px w-15px align-middle text-gray-400"></span>
                        </span>
                        <span class="btn btn-flush btn-active-color-primary position-absolute top-50 end-0 translate-middle-y lh-0 d-none me-4" data-kt-search-element="clear">
                            <!--begin::Svg Icon | path: icons/duotune/arrows/arr061.svg-->
                            <span class="svg-icon svg-icon-2 svg-icon-lg-1 me-0">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                    <rect opacity="0.5" x="6" y="17.3137" width="16" height="2" rx="1" transform="rotate(-45 6 17.3137)" fill="black" />
                                    <rect x="7.41422" y="6" width="16" height="2" rx="1" transform="rotate(45 7.41422 6)" fill="black" />
                                </svg>
                            </span>
                            <!--end::Svg Icon-->
                        </span>
                        <!--end::Reset-->
                    </form>
                    <!--end::Form-->
                    <!--begin::Menu-->
                    <div data-kt-search-element="content" class="menu menu-sub menu-sub-dropdown w-300px w-md-350px py-7 px-7 overflow-hidden">
                        <!--begin::Wrapper-->
                        <div data-kt-search-element="wrapper">
                            <!--end::Empty-->
                        </div>
                        <!--end::Wrapper-->
                    </div>
                    <!--end::Menu-->
                </div>
                <div @click="showheaderManu('notificationSection')" class="d-flex align-items-center ms-3 ms-lg-2">
                    <!--begin::Menu- wrapper-->
                    <div class="btn btn-icon btn-active-light btn-active-color-primary btn-outline btn-outline-secondary w-30px h-30px w-lg-40px h-lg-40px position-relative menu-dropdown" data-kt-menu-trigger="click" data-kt-menu-attach="parent" data-kt-menu-placement="bottom-end">
                        <!--begin::Svg Icon | path: icons/duotune/abstract/abs038.svg-->
                        <span class="svg-icon svg-icon-1">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path opacity="0.3" d="M12 22C13.6569 22 15 20.6569 15 19C15 17.3431 13.6569 16 12 16C10.3431 16 9 17.3431 9 19C9 20.6569 10.3431 22 12 22Z" fill="black"></path>
                                <path d="M19 15V18C19 18.6 18.6 19 18 19H6C5.4 19 5 18.6 5 18V15C6.1 15 7 14.1 7 13V10C7 7.6 8.7 5.6 11 5.1V3C11 2.4 11.4 2 12 2C12.6 2 13 2.4 13 3V5.1C15.3 5.6 17 7.6 17 10V13C17 14.1 17.9 15 19 15ZM11 10C11 9.4 11.4 9 12 9C12.6 9 13 8.6 13 8C13 7.4 12.6 7 12 7C10.3 7 9 8.3 9 10C9 10.6 9.4 11 10 11C10.6 11 11 10.6 11 10Z" fill="black"></path>
                            </svg>
                        </span>
                        <!--end::Svg Icon-->
                    </div>
                    <!--begin::Menu-->
                    <div id="notificationSection" class="menu menu-sub menu-sub-dropdown menu-column w-350px w-lg-375px" data-kt-menu="true" style="z-index: 105; position: fixed; inset: 0px 0px auto auto; margin: 0px; transform: translate(-210px, 93px);" data-popper-placement="bottom-end">
                        <div class="container topnotificationbar">
                            <div class="row heading">
                                <div class="col-md-12">
                                    <span class="notification_title fs-4 fw-bolder text-gray-900 text-hover-primary me-1 mb-2 lh-1">Notifications</span>
                                </div>
                            </div>
                        </div>
                        <ul class="head_notification_alerts_list">
                            <li>
                                <a hre="#" class="active cursor-pointer">
                                    <div class="d-flex align-items-center">
                                        <!--begin::Text-->
                                        <div class="symbol symbol-50px me-5">
                                            <img src="assets/img/organizations/media/logo-01.jpg" class="" alt="">
                                        </div>
                                        <div class="flex-grow-1">
                                            <p class="mb-5"><b>Brad Simmons's</b> has marked your project completed.</p>
                                            <span class="text-muted d-block fw-bold"><b>20 min ago</b></span>
                                        </div>
                                        <div class="flex-grow-1 text-right">

                                        </div>
                                        <!--end::Text-->
                                    </div>
                                </a>
                            </li>
                            <li>
                                <a hre="#" class="cursor-pointer">
                                    <div class="d-flex align-items-center">
                                        <!--begin::Text-->
                                        <div class="symbol symbol-50px me-5">
                                            <img src="assets/img/organizations/media/logo-01.jpg" class="" alt="">
                                        </div>
                                        <div class="flex-grow-1">
                                            <p class="mb-5"><b>Brad Simmons's</b> has marked your project completed.</p>
                                            <span class="text-muted d-block fw-bold"><b>20 min ago</b></span>
                                        </div>
                                        <div class="flex-grow-1 text-right">

                                        </div>
                                        <!--end::Text-->
                                    </div>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div @click="showheaderManu('helpSection')" class="d-flex align-items-center ms-3 ms-lg-2">
                    <!--begin::Menu- wrapper-->
                    <div class="btn btn-icon btn-active-light btn-active-color-primary btn-outline btn-outline-secondary w-30px h-30px w-lg-40px h-lg-40px position-relative menu-dropdown" data-kt-menu-trigger="click" data-kt-menu-attach="parent" data-kt-menu-placement="bottom-end">
                        <!--begin::Svg Icon | path: icons/duotune/abstract/abs038.svg-->
                        <span class="fa fa-question-circle" style="font-size: 24px">
                                    <!--<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path opacity="0.3" d="M12 22C13.6569 22 15 20.6569 15 19C15 17.3431 13.6569 16 12 16C10.3431 16 9 17.3431 9 19C9 20.6569 10.3431 22 12 22Z" fill="black"></path>
                        <path d="M19 15V18C19 18.6 18.6 19 18 19H6C5.4 19 5 18.6 5 18V15C6.1 15 7 14.1 7 13V10C7 7.6 8.7 5.6 11 5.1V3C11 2.4 11.4 2 12 2C12.6 2 13 2.4 13 3V5.1C15.3 5.6 17 7.6 17 10V13C17 14.1 17.9 15 19 15ZM11 10C11 9.4 11.4 9 12 9C12.6 9 13 8.6 13 8C13 7.4 12.6 7 12 7C10.3 7 9 8.3 9 10C9 10.6 9.4 11 10 11C10.6 11 11 10.6 11 10Z" fill="black"></path>
                    </svg>-->
                        </span>
                    </div>
                    <div id="helpSection" class="menu menu-sub menu-sub-dropdown menu-column w-350px w-lg-375px" data-kt-menu="true" style="z-index: 105; position: fixed; inset: 0px 0px auto auto; margin: 0px; transform: translate(-210px, 93px);" data-popper-placement="bottom-end">
                        <div class="container topnotificationbar">
                            <div class="row heading">
                                <div class="col-md-12">
                                    <span class="notification_title fs-4 fw-bolder text-gray-900 text-hover-primary me-1 mb-2 lh-1">Do you need some help?</span>
                                </div>
                            </div>
                        </div>
                        <ul class="head_notification_alerts_list">
                            <li>
                                <a hre="#" class="active cursor-pointer">
                                    <div class="flex-lg-row-fluid ms-lg-5 ms-xl-5">
                                        <div class="card" id="kt_chat_messenger">
                                            <div class="card-footer pt-4" id="kt_chat_messenger_footer">
                                                <!--begin::Input-->
                                                <textarea class="form-control form-control-flush mb-3" rows="1" data-kt-element="input" placeholder="Type a message"></textarea>
                                                <div class="text-right">
                                                    <!--begin::Send-->
                                                    <button class="btn btn-primary" type="button" data-kt-element="send">Send</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="d-flex align-items-center ms-3 ms-lg-4" id="kt_header_user_menu_toggle">
                    <div @click="showheaderManu('headermanu')"  class="btn btn-icon btn-color-gray-700 btn-active-color-primary btn-outline btn-outline-secondary w-30px h-30px w-lg-40px h-lg-40px" data-kt-menu-trigger="click" data-kt-menu-attach="parent" data-kt-menu-placement="bottom-end">
                        <!--begin::Svg Icon | path: icons/duotune/communication/com013.svg-->
                        <span class="svg-icon svg-icon-1">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path d="M6.28548 15.0861C7.34369 13.1814 9.35142 12 11.5304 12H12.4696C14.6486 12 16.6563 13.1814 17.7145 15.0861L19.3493 18.0287C20.0899 19.3618 19.1259 21 17.601 21H6.39903C4.87406 21 3.91012 19.3618 4.65071 18.0287L6.28548 15.0861Z" fill="black" />
                                <rect opacity="0.3" x="8" y="3" width="8" height="8" rx="4" fill="black" />
                            </svg>
                        </span>
                    </div>
                    <div id="headermanu" class="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-800 menu-state-bg menu-state-primary fw-bold py-4 fs-6 w-275px" data-kt-menu="true">
                        <!--begin::Menu item-->
                        <div class="menu-item px-3">
                            <div class="menu-content d-flex align-items-center px-3">
                                <!--begin::Avatar-->
                                <div class="symbol symbol-100px me-5">
                                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none">
                                    <path d="M6.28548 15.0861C7.34369 13.1814 9.35142 12 11.5304 12H12.4696C14.6486 12 16.6563 13.1814 17.7145 15.0861L19.3493 18.0287C20.0899 19.3618 19.1259 21 17.601 21H6.39903C4.87406 21 3.91012 19.3618 4.65071 18.0287L6.28548 15.0861Z" fill="black" />
                                    <rect opacity="0.3" x="8" y="3" width="8" height="8" rx="4" fill="black" />
                                </svg>                                
                            </div>
                                <!--end::Avatar-->
                                <!--begin::Username-->
                                <div class="d-flex flex-column">
                                    <div class="fw-bolder d-flex align-items-center fs-5"> {{ user.User.User_fullname }} </div>
                                    <div class="d-flex align-items-center"> {{ user.User.User_email }} </div>
                                    <!--													<a href="#" class="fw-bold text-muted text-hover-primary fs-7">max@kt.com</a>-->
                                </div>
                                <!--end::Username-->
                            </div>
                        </div>
                        <div class="separator my-2"></div>
                        <div class="menu-item px-5">
                            <router-link to="/my-profile" class="menu-link px-5">My Profile</router-link>
                        </div>
                        <div class="separator my-2"></div>
                        <div class="menu-item px-5">
                            <a @click="logout" class="menu-link px-5">Sign Out</a>
                        </div>
                        <!--end::Menu item-->
                    </div>
                </div>
                <div class="d-lg-none btn btn-icon btn-active-color-primary btn-outline btn-outline-secondary w-30px h-30px w-lg-40px h-lg-40px ms-3" id="kt_header_menu_toggle">
                    <!--begin::Svg Icon | path: icons/duotune/abstract/abs015.svg-->
                    <span class="svg-icon svg-icon-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M21 7H3C2.4 7 2 6.6 2 6V4C2 3.4 2.4 3 3 3H21C21.6 3 22 3.4 22 4V6C22 6.6 21.6 7 21 7Z" fill="black" />
                            <path opacity="0.3" d="M21 14H3C2.4 14 2 13.6 2 13V11C2 10.4 2.4 10 3 10H21C21.6 10 22 10.4 22 11V13C22 13.6 21.6 14 21 14ZM22 20V18C22 17.4 21.6 17 21 17H3C2.4 17 2 17.4 2 18V20C2 20.6 2.4 21 3 21H21C21.6 21 22 20.6 22 20Z" fill="black" />
                        </svg>
                    </span>
                    <!--end::Svg Icon-->
                </div>
                <!--end::Heaeder menu toggle-->
                <div class="lang"><span  @click="changeLangunge()" :class="lang == 'en'?'activeL':''">EN</span>  <span :class="lang != 'en'?'activeL':''" @click="clearLangunge()">{{Nlang.toUpperCase()}}</span></div>
            </div>
            <!--end::Topbar-->
        </div>
    </div>

</template>

<script setup>

import { computed, onMounted,ref } from "vue";
import { useRouter } from "vue-router";


const COMPANY_LOGO = computed(() => process.env.VUE_APP_COMPANY_LOGO ); 
console.log("Company Logo",COMPANY_LOGO.value)

const router = useRouter()
const user = JSON.parse(localStorage.getItem('user'))
const lang = ref('')
const Nlang = ref(navigator.language.substring(0,2))
const logout = () => {
    router.push("/login")
    localStorage.clear();
}





document.onclick = function(){
    let submenuele = document.getElementById('headermanu')
    submenuele.classList.remove('showheadermanu')

    let helpsection = document.getElementById('helpSection')
    helpsection.classList.remove('showheadermanu')

    let notification = document.getElementById('notificationSection')
    notification.classList.remove('showheadermanu')

}

const showheaderManu =(e)=>{
setTimeout(()=>{
let ele = document.getElementById(e)
ele.classList.add('showheadermanu')
},) 
}

const changeLangunge =()=>{
  localStorage.setItem('lang','en')
  location.reload();
  // setCookie('googtrans', `/en/en`,1);
}

const  clearLangunge=()=>{
  // setCookie('googtrans', `/en/ur`,1);
  localStorage.removeItem('lang')
  location.reload()
}

function setCookie(cname, cvalue, exdays) {
          const d = new Date();
          d.setTime(d.getTime() + (exdays*24*60*60*1000));
          let expires = "expires="+ d.toUTCString();
          document.cookie = 'googtrans' +'=; Path=/;  Domain=' + '.glasshub.ai' +  '; Expires=Thu, 01 Jan 1970 00:00:01 GMT; SameSite=None; Secure' 
          document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/"; 
        }

     function googleTranslateElementInit(lang) {
            setCookie('googtrans', `/en/${lang}`,1);
          
            // var language = window.navigator.userLanguage || window.navigator.language;
            // window.location.replace(`/#googtrans(${lang})`);
        }

onMounted(()=>{
    if(!localStorage.getItem('lang') || navigator.language.substring(0,2) == 'en')
          {
            lang.value = navigator.language.substring(0,2)
            googleTranslateElementInit(lang.value)
          }else{
            lang.value  = localStorage.getItem('lang')  
            googleTranslateElementInit(lang.value) 
          }
})
</script>

<style scoped>
    .lang{
    width: 60px;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
}
.lang>span{
    cursor: pointer;
    font-weight: bold;
  }
  .lang .activeL{
    color: #5241a1;
  
}
.showheadermanu{
  display: block;
  position: absolute;
  top:50px;
  right: 5px;
}
</style>