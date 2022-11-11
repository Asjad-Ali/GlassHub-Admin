<template>
  <div class="d-flex flex-column flex-root">
    <div class="page d-flex flex-row flex-column-fluid">
      <div class="wrapper d-flex flex-column flex-row-fluid" id="kt_wrapper">
        <TheHeader />
          <div class="bg-lg py-5 py-lg-5" id="kt_toolbar">
            <div id="kt_toolbar_container" class="container-xxl py-5">
              <div class="row gy-0 gx-10">
                <MyProfile />
              </div>
            </div>
          </div>
        <TheFooter />
      </div>
    </div>
  </div>
</template>

<script setup>
import TheHeader from '../../components/layouts/TheHeader.vue'
import TheFooter from '../../components/layouts/TheFooter.vue'
import MyProfile from '../../components/MyProfile.vue' 
</script>

<style>

</style>