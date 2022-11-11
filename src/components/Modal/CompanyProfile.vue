<template>
  

 <div class="modal fade" tabindex="-1" id="view_doc_modal">
                            <div class="modal-dialog">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h5 class="modal-title">View Document</h5>

                                        <!--begin::Close-->
                                        <div class="btn btn-icon btn-sm btn-active-light-primary ms-2" data-bs-dismiss="modal" aria-label="Close">
                                            <i class="fa fa-times" aria-hidden="true"></i>
                                        </div>
                                        <!--end::Close-->
                                    </div>

                                    <div class="modal-body">
                                        <embed src="assets/admin/media/quotation_template.pdf" frameborder="0" width="100%" height="500px">
                                    </div>

                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Close</button>
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