<template>
    <div class="row">
        <div class="col-md-6">
            <p class="input-group input-group-sm" :class="isValidId ? 'has-success' : 'has-error'">
                <span class="input-group-addon">Template ID</span>
                <input type="text" placeholder="模板唯一标识ID" class="form-control" v-model.trim="template.id" @keyup="checkId">
                <span class="input-group-addon">
                    {{ idStatus }}
                </span>
            </p>
        </div>
        <div class="col-md-6">
            <p class="input-group input-group-sm">
                <span class="input-group-addon">Template Name</span>
                <input type="text" placeholder="模板名称/描述" class="form-control" v-model.trim="template.name">
            </p>
        </div>
        <div class="col-md-6">
            <p class="input-group input-group-sm">
                <span class="input-group-addon">Frontend Template Name</span>
                <input type="text" placeholder="模板对应的前端JSP文件" class="form-control" v-model.trim="template.jsp">
            </p>
        </div>
        <div class="col-md-6">
            <p class="input-group input-group-sm">
                <span class="input-group-addon">Restricted Page Type</span>
                <input type="text" placeholder="模板类型" class="form-control" v-model.trim="template.pageType">
            </p>
        </div>
        <div class="col-md-12">
            <div class="input-group input-group-sm">
                <span class="input-group-addon">VelocityTemplate Path</span>
                <DisplayPRDResources :defaultResourceKey="defaultResourceKey" @select-resource-path="selectResourcePath"/>
                <input type="text" placeholder="模板对应的VM文件" class="form-control" v-model.trim="template.vm">
                <input type="file" accept="image/*" class="hidden" ref="vmFileInput" @change="selectedVM">
                <span class="input-group-btn">
                    <button type="button" class="btn btn-default" @click="browseVM()">
                        <span class="glyphicon glyphicon-folder-open"></span>
                    </button>
                </span>
            </div>
        </div>
        <div class="col-md-12"><p></p></div>
        <div class="col-md-12 text-right">
            <div class="btn-group btn-group-xs btn-remove-confirm">
                <button type="button" class="btn btn-danger dropdown-toggle" data-toggle="dropdown">
                    <span class="glyphicon glyphicon-trash"></span>&nbsp;
                    <span class="caret"></span>
                </button>
                <ul class="dropdown-menu">
                    <li><a href="javascript:void(0);" @click="removeTemplate(index)">确认删除该Template</a></li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import DisplayPRDResources from '@/components/DisplayPRDResources';

export default {
    name: "CmsTemplate",
    components: {
        DisplayPRDResources
    },
    props: {
        template: {
            type: Object, required: true
        },
        index: {
            type: Number,
            required: true
        }
    },
    data() {
        return {
            defaultResourceKey: "$jarResourceCms",
            selectedResource: {},
            isValidId: false
        }
    },
    computed: {
        idStatus() {
            return this.template.id === "" ? "无效" : this.isValidId ? "可用" : "冲突";
        },
        autoVmFullPath() {
            return this.selectedResource.value + this.template.vm;
        }
    },
    watch: {
        "template.id": {
            handler() {
                if ( this.template.id === "" ) {
                    this.isValidId = false;
                }
            }
        }
    },
    methods: {
        checkId() {
            if ( this.template.id !== "" ) {
                this.$axios.get("/xpatch/impex/api/cms-template", {
                    params: {
                        id: this.template.id
                    }
                }).then(response => {
                    if ( response.data.status === "success" ) {
                        this.isValidId = !response.data.data;
                    }
                }).catch(error => {
                    console.error("Errors while checking Media Ref. Code", error);
                });
            }
        },
        selectResourcePath(selectedResource) {
            console.log("选择资源更新", selectedResource);
            this.selectedResource = selectedResource;
        },
        browseVM() {
            this.$refs.vmFileInput.click();
        },
        selectedVM() {
            let file = this.$refs.vmFileInput.files[0];
            if ( file !== undefined ) {
                this.template.vm = file.name;
            }
        },
        removeTemplate(index) {
            this.$emit("remove-template", index);
        },
        autoScript() {
            //;;IwaCheckoutResultPageTemplate;Iwa Checkout Payment Result Page Template;checkout/checkoutResultPage;ContentPage;$jarResourceCms/structure-view/v2_responsive/structure_iwaCheckoutResultPageTemplate.vm
            return `;;${this.template.id};${this.template.name};${this.template.jsp};${this.template.pageType};${this.autoVmFullPath}`;
        }
    }
}
</script>

<style scoped>

</style>
