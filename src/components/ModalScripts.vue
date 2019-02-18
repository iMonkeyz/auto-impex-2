<template>
    <div id="modalScripts" class="modal fade">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                    <h4 class="modal-title">自动生成代码</h4>
                </div>
                <div class="modal-body">
                    <textarea class="form-control" rows="30" spellcheck="false" :value="formattedScripts"></textarea>
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
    name: "ModalScripts",
    props: {
        scripts: {
            type: Array, required: true
        }
    },
    data() {
        return {
            
        }
    },
    computed: {
        formattedScripts() {
            return this.scripts.map(script => {
                return script.join("\n") + "\n";
            }).join("\n");
        }
    }
}
</script>

<style scoped>
.modal-dialog.modal-lg {
    width: 95%;
}
</style>
