<template>
    <div class="fixed-nav-bar-and-modal-script">
        <nav class="navbar navbar-default navbar-fixed-top">
            <div class="pull-right btn-auto-script">
                <button type="button" class="btn btn-primary" 
                    data-toggle="modal" data-backdrop="static" data-target='#modalScripts' @click="autoScript"
                    ><span class="glyphicon glyphicon-send"></span> 生成代码</button>
            </div>
            
            <a class="navbar-brand">Auto ImpEx 2.0</a>
            <ul class="nav navbar-nav">
                <li>
                    <a href="#Section_PRD">Public Resources Definition</a>
                </li>
                <li>
                    <a href="#Section_ConfigParameters">Config Parameters</a>
                </li>
                <li>
                    <a href="#Section_Medias">Medias</a>
                </li>
                <li>
                    <a href="#Section_CmsTemplates">CMS Templates</a>
                </li>
                <li>
                    <a href="#Section_CmsPages">CMS Pages</a>
                </li>
            </ul>
        </nav>

        <!-- modals -->
        <ModalScripts :scripts="scripts"></ModalScripts>

    </div>
</template>

<script>
import ModalScripts from '@/components/ModalScripts'

export default {
    name: "FixedNavBar",
    components: {
        ModalScripts
    },
    data() {
        return {
            scripts: []
        }
    },
    computed: {
        root() {
            return this.$root.$children[0];
        }
    },
    methods: {
        autoScript() {
            let scripts = [];
            scripts = scripts.concat( this.root.$refs["PRD"].autoScript() );
            scripts = scripts.concat( this.root.$refs["ConfigParameters"].autoScript() );
            scripts = scripts.concat( this.root.$refs["Medias"].autoScript() );
            scripts = scripts.concat( this.root.$refs["CmsTemplates"].autoScript() );
            scripts = scripts.concat( this.root.$refs["CmsPages"].autoScript() );
            console.log(scripts);
            this.scripts = scripts;
        }
    }
}
</script>

<style scoped>
    .btn-auto-script {
        position: relative;
        top: 8px;
        right: 10px;
    }
</style>