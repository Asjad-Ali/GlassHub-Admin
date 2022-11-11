<template>

    <div class="d-flex flex-column flex-root h-100">
        <!--begin::Page-->
        <div class="page d-flex flex-row flex-column-fluid h-100">
            <!--begin::Wrapper-->
            <div class="wrapper d-flex flex-column flex-row-fluid h-100" id="kt_wrapper">
                <!--begin::Toolbar-->
                <div class="bg-lg h-100" id="kt_toolbar">
                    <!--begin::Container-->
                    <div id="kt_toolbar_container" class="container-xxl">
                        <!--begin::Row-->
                        <div class="row gy-0 gx-10">
                            <div class="col-xl-12 pd-30 bg-w">

                                <div class="row">
                                    <div class="container">
                                        <!--begin::About card-->
                                        <div class="card">
                                            <div class="col-md-12">
                                                <i @click="router.go(-1)" style="font-size: 20px; color: #5241a1" class="fa fa-arrow-left cursor-pointer px-5 py-4" ></i>
                                            </div>
                                            <!--begin::Body-->
                                            <div class="card-body p-10 p-lg-15">
                                                <PageLoader v-if="auth.loader" />
                                                <div v-else class="mb-14">
                                                    <!--begin::Heading-->
                                                    <div class="mb-15">
                                                        <!--begin::Title-->
                                                        <!--end::Title-->
                                                        <!--begin::Text-->
                                                        <div v-if="trem_condition" class="fs-5 text-gray-600 fw-bold" v-html="trem_condition">
                                                        </div>
                                                        <RecordNotAvailable v-else />                                                        

                                                        <!--end::Text-->
                                                    </div>
                                                    <!--end::Heading-->
                                                    <!--begin::Body-->
                                                    <!--begin::Table-->
                                                    <div class="mb-14">

                                                    </div>
                                                    <!--end::Table-->

                                                    <!--end::Body-->
                                                </div>
                                                <!--end::Content main-->

                                            </div>
                                            <!--end::Body-->
                                        </div>
                                        <!--end::About card-->
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
import {useAuthStore} from '@/store/auth'
import {computed} from 'vue'
import PageLoader from "@/components/Global/PageLoader.vue";
import RecordNotAvailable from '@/src/components/RecordNotAvailable.vue'
import { useRouter } from 'vue-router'
const auth = useAuthStore()
const router = useRouter()
const trem_condition = computed(()=>{
    return auth.term_condition
})

</script>

<style>
</style>