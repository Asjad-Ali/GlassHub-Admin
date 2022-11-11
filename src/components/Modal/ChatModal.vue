<template>

      <div class="modal fade show" tabindex="-1" style="display:block;background:rgba(0,0,0,0.5);opacity:1 !important">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <div class="d-flex justify-content-center flex-column me-3">
                        <a href="#" class="fs-4 fw-bolder text-gray-900 text-hover-primary me-1 mb-2 lh-1">Design786</a>
                        <div class="mb-0 lh-1">
                            <span class="badge badge-success badge-circle w-10px h-10px me-1"></span>
                            <span class="fs-7 fw-bold text-muted">Active</span>
                        </div>
                    </div>    
                    <div class="btn btn-icon btn-sm btn-active-light-primary ms-2" @click="CloseModel()">
                        <i class="fa fa-times" aria-hidden="true"></i>
                    </div>
                </div>
                <div class="modal-body p-0">
                    <div class="card" id="kt_chat_messenger">
                        <div class="card-body" id="kt_chat_messenger_body">
                            <div class="scroll-y me-n5 pe-5 max-h-350">
                                <div class="d-flex justify-content-start mb-5">
                                    <div class="d-flex flex-column align-items-start">
                                        <div class="d-flex align-items-center mb-1">
                                            <div class="symbol symbol-35px symbol-circle">
                                                <img alt="Pic" src="../../../public/assets/img/avatars/300-6.jpg">
                                            </div>
                                            <div class="ms-3">
                                                <a href="#" class="fs-5 fw-bolder text-gray-900 text-hover-primary me-1">Design786</a>
                                                <span class="text-muted fs-7 mb-1">2 mins</span>
                                            </div>
                                        </div>
                                        <div class="p-5 rounded bg-light-info text-dark fw-bold mw-lg-400px text-start" >How likely are you to recommend our company to your friends and family ?</div>
                                    </div>
                                </div>
                                <div class="d-flex justify-content-end mb-5">
                                    <div class="d-flex flex-column align-items-end">
                                        <div class="d-flex align-items-center mb-1">
                                            <div class="me-3">
                                                <span class="text-muted fs-7 mb-1">5 mins</span>
                                                <a href="#" class="fs-5 fw-bolder text-gray-900 text-hover-primary ms-1">You</a>
                                            </div>
                                            <div class="symbol symbol-35px symbol-circle">
                                                <img alt="Pic" src="../../../public/assets/img/avatars/300-5.jpg">
                                            </div>
                                        </div>
                                        <div class="p-5 rounded bg-light-primary text-dark fw-bold mw-lg-400px text-end">Hey there, we’re just writing to let you know that you’ve been subscribed to a repository on GitHub.</div>
                                    </div>
                                </div>
                                <div class="d-flex justify-content-start mb-5">
                                    <div class="d-flex flex-column align-items-start">
                                        <div class="d-flex align-items-center mb-1">
                                            <div class="symbol symbol-35px symbol-circle">
                                                <img alt="Pic" src="../../../public/assets/img/avatars/300-6.jpg">
                                            </div>
                                            <div class="ms-3">
                                                <a href="#" class="fs-5 fw-bolder text-gray-900 text-hover-primary me-1">Brian Cox</a>
                                                <span class="text-muted fs-7 mb-1">1 Hour</span>
                                            </div>
                                        </div>
                                        <div class="p-5 rounded bg-light-info text-dark fw-bold mw-lg-400px text-start">Ok, Understood!</div>
                                    </div>
                                </div>
                                <div class="d-flex justify-content-end mb-5">
                                    <div class="d-flex flex-column align-items-end">
                                        <div class="d-flex align-items-center mb-1">
                                            <div class="me-3">
                                                <span class="text-muted fs-7 mb-1">2 Hours</span>
                                                <a href="#" class="fs-5 fw-bolder text-gray-900 text-hover-primary ms-1">You</a>
                                            </div>
                                            <div class="symbol symbol-35px symbol-circle">
                                                <img alt="Pic" src="../../../public/assets/img/avatars/300-5.jpg">
                                            </div>
                                        </div>
                                        <div class="p-5 rounded bg-light-primary text-dark fw-bold mw-lg-400px text-end">You’ll receive notifications for all issues, pull requests!</div>
                                    </div>
                                </div>
                                <div class="d-flex justify-content-start mb-5">
                                    <div class="d-flex flex-column align-items-start">
                                        <div class="d-flex align-items-center mb-1">
                                            <div class="symbol symbol-35px symbol-circle">
                                                <img alt="Pic" src="../../../public/assets/img/avatars/300-6.jpg">
                                            </div>
                                            <div class="ms-3">
                                                <a href="#" class="fs-5 fw-bolder text-gray-900 text-hover-primary me-1">Brian Cox</a>
                                                <span class="text-muted fs-7 mb-1">3 Hours</span>
                                            </div>
                                        </div>

                                        <div class="p-5 rounded bg-light-info text-dark fw-bold mw-lg-400px text-start">Proident excepteur ad velit occaecat qui minim occaecat veniam.</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="modal-footer">
                    <label class="form-label text-left">Type Message</label>
                    <input name="" class="mb-2 form-control form-control-lg form-control-solid">
                    <button type="button" class="btn w-100 btn-primary">Send</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
  import { defineEmits } from 'vue'

const emit = defineEmits(['closeModel'])
const CloseModel = () => {
    emit('closeModel', false)
}
        
  

</script>

<style>

</style>