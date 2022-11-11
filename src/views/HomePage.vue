<template>  
  <div class="d-flex flex-column flex-root">
    <div class="page d-flex flex-row flex-column-fluid">
      <div class="wrapper d-flex flex-column flex-row-fluid" id="kt_wrapper">
        <TheHeader />
          <div class="bg-lg" id="kt_toolbar">
            <div id="kt_toolbar_container" class="container-xxl py-5">
              <div class="row gy-0 gx-10">
                <SideBar />
                <router-view />
              </div>
            </div>
          </div>
        <TheFooter />
      </div>
    </div>
  </div>
</template>

<script setup>
import TheHeader from '../components/layouts/TheHeader.vue'
import SideBar from '../components/layouts/SideBar.vue'
import TheFooter from '../components/layouts/TheFooter.vue' 
</script>

<style>
.cursor-pointer{
  cursor: pointer;
}
.cursor-none{
  pointer-events: none;
}
.activeTab{
    background-color: #432da630 !important;
}
</style>