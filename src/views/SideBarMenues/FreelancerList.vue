<template>
<div class="col-xl-9 pd-30 bg-w">
    <AdminListing pageTitle="Freelancer" />
</div>
</template>

<script setup>
import { useAdminListingStore } from '@/store/adminListing.store'
import AdminListing from '@/components/AllAdmin/AllAdminListing.vue';
import { onMounted, ref } from '@vue/runtime-core';
const store = useAdminListingStore()
let data = ref({
    Search: null,
    PageNo: 1,
    RowNo: 10,
    Account_status: null,
    Account_type: 2
})
onMounted(() => store.loadAdminListing(data.value) )
</script>

<style>

</style>