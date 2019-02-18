<template>
    <div class="modal fade">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                    <h4 class="modal-title">自动生成ImpEx脚本片段</h4>
                </div>
                <div class="modal-body">
                    <textarea class="form-control" rows="20" :value="scriptFragment" readonly></textarea>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "ModalScriptFragment",
    props: {
        scriptFragment: {
            type: String, required: true
        }
    }
}
</script>

<style scoped>
.modal-dialog.modal-lg {
    width: 95%;
}
</style>
