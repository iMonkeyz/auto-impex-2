<template>
    <div class="panel panel-primary" id="Section_CmsTemplates">
        <div class="panel-heading">
            <div class="menu-icon text-center pull-right" :class="{ hidden: !isAllowAdd }" @click="addTempldate">
                <span class="glyphicon glyphicon-plus"></span>
            </div>
            <div class="menu-icon text-center pull-right" @click="previewScript">
                <span class="glyphicon glyphicon-tag"></span>
            </div>
            <h3 class="panel-title"><span class="glyphicon glyphicon-bookmark"></span> CMS Page Template</h3>
        </div>
        <div class="panel-body" v-for="(template, index) in templates" :key="index">
            <CmsTemplate :template="template" :index="index" ref="CmsTemplate" @remove-template="removeTemplate"/>
        </div>

        <!-- script fragment -->
        <ModalScriptFragment :scriptFragment="scripts" ref="ModalScriptFragment"/>
    </div>
</template>

<script>
import CmsTemplate from '@/components/cms/CmsTemplate'
import ModalScriptFragment from '@/components/ModalScriptFragment'

export default {
    name: "CmsTemplates",
    components: {
        CmsTemplate, ModalScriptFragment
    },
    data() {
        return {
            templates: [],
            scripts: ""
        }
    },
    computed: {
        isAllowAdd() {
            return this.templates.length == 0;
        }
    },
    methods: {
        addTempldate() {
            this.templates.push({
                type: "PageTemplate",
                id: "",
                name: "",
                jsp: "",
                pageType: "",
                vm: "",
                active: true
            });
        },
        removeTemplate(index) {
            this.templates.pop();
        },
        autoScript() {
            let scripts = [];
            if ( this.templates.length > 0 ) {
                scripts.push("# creat page template");
                scripts.push(`INSERT_UPDATE PageTemplate;$contentCV[unique=true];uid[unique=true];name;frontendTemplateName;restrictedPageTypes(code);velocityTemplate[translator=$fileTranslator];active[default=true]`);
                this.$refs["CmsTemplate"].map(template => {
                    scripts.push( template.autoScript() );
                });
            }
            console.log("templdates script", scripts);
            return new Array(scripts);
        },
        previewScript() {
            this.scripts = this.autoScript()[0].join("\n");
            $(this.$refs.ModalScriptFragment.$el).modal("show");
        }
    }
}
</script>

<style scoped>

</style>