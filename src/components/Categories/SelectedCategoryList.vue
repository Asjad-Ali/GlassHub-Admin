<template>
    <div class="col-xl-9 pd-30 bg-w">
        <div class="col-md-6">
            <h1 class="pb-2">Selected Category List</h1>
        </div>
        <div class="tab-content" id="myTabContent">
            <div class="tab-pane fade show active" id="all" role="tabpanel">
                <div class="table-responsive">
                    <table class="table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4">
                        <thead>
                            <tr>
                                <th class="fw-bolder text-gray-800">ID</th>
                                <th class="fw-bolder text-gray-800">Date</th>
                                <th class="fw-bolder text-gray-800">Customer Name</th>
                                <th class="fw-bolder text-gray-800">Type</th>
                                <th class="fw-bolder text-gray-800">Audit For</th>
                                <th class="fw-bolder text-gray-800">Compliance</th>
                                <th class="fw-bolder text-gray-800">Audit As</th>
                                <th class="fw-bolder text-gray-800">RFQ</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="i in 6" :key="i">
                                <td><a>3423</a></td>
                                <td>02/02/2022</td>
                                <td>Design786</td>
                                <td>
                                    Supplier
                                </td>
                                <td>
                                    <span>Registration</span><br>
                                    <span class="text-muted">Round Solutions LLC</span>
                                </td>
                                <td>
                                    <a href="#" target="_blank">View Compliance</a>
                                </td>
                                <td>
                                    <span>Authorized Firm</span>
                                </td>
                                <td>
                                    <span class="btn btn-outline btn-outline-dashed btn-outline-default me-2 mb-2" >RFQ</span>
                                </td>
                              
                            </tr>
                        </tbody>

                    </table>
                </div>
            </div>
        </div>
        
    </div>
</template>

<script>
export default {

}
</script>

<style>

</style>