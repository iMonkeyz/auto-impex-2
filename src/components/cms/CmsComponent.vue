<template>
    <div class="CMS-COMPONENT">
        <div class="panel panel-warning">
            <div class="panel-heading">
                <div class="menu-icon text-center pull-right" title="生成ImpEx脚本片段" @click="previewScript">
                    <span class="glyphicon glyphicon-tag"></span>
                </div>
                <div class="panel-title">{{ component.type }}: <b>{{ autoID }}</b></div>
            </div>
            <div class="panel-body">
                <div class="row">
                    <div class="col-md-6 col-sm-12">
                        <p class="input-group input-group-sm" :class="isValidId ? 'has-success' : 'has-error'">
                            <span class="input-group-addon">ID</span>
                            <input type="text" class="form-control" placeholder="组件唯一ID" v-model.trim="component.id" @keyup="checkId"/>
                            <span class="input-group-addon attr-tips">{{ idStatus }}</span>
                        </p>
                    </div>
                    <div class="col-md-6 col-sm-12">
                        <p class="input-group input-group-sm" :class="isValidId ? 'has-success' : 'has-error'">
                            <span class="input-group-addon">自动生成ID</span>
                            <input type="text" class="form-control" placeholder="(自动生成)" readonly :value="autoID"/>
                            <span class="input-group-addon attr-tips">{{ idStatus }}</span>
                        </p>
                    </div>
                    <div class="col-md-6 col-sm-12">
                        <p class="input-group input-group-sm">
                            <span class="input-group-addon">Name</span>
                            <input type="text" class="form-control" placeholder="组件名称/描述 - 填写时覆盖自动生成值 →" v-model.trim="component.name"/>
                        </p>
                    </div>
                    <div class="col-md-6 col-sm-12">
                        <p class="input-group input-group-sm">
                            <span class="input-group-addon">自动生成Name</span>
                            <input type="text" class="form-control" placeholder="(自动生成)" readonly :value="autoName"/>
                        </p>
                    </div>
                    
                    <div class="col-md-12">
                        <p v-for="(attr, index) in component.attrs" :key="index">
                            <cms-component-attr :attr="attr"/>
                        </p>
                    </div>

                    <div class="col-md-12 text-right">
                        <div class="btn-group btn-group-xs btn-remove-confirm">
                            <button type="button" class="btn btn-danger dropdown-toggle" data-toggle="dropdown">
                                <span class="glyphicon glyphicon-trash"></span>&nbsp;
                                <span class="caret"></span>
                            </button>
                            <ul class="dropdown-menu">
                                <li><a href="javascript:void(0);" @click="removeComponent(index)">确认删除该组件</a></li>
                            </ul>
                        </div>
                    </div>
                </div>

                <!-- script fragment -->
                <ModalScriptFragment :scriptFragment="scripts" ref="ModalScriptFragment"/>
            </div>
        </div>
    </div>
</template>

<script>
import CmsComponentAttr from '@/components/cms/CmsComponentAttr'
import ModalScriptFragment from '@/components/ModalScriptFragment'

export default {
    name: "CmsComponent",
    components: {
        CmsComponentAttr, ModalScriptFragment
    },
    props: {
        page: {
            type: Object,
            required: true
        },
        component: {
            type: Object,
            required: true
        },
        index: {
            type: Number,
            required: true
        }
    },
    data() {
        return {
            isValidId: false,
            scripts: ""
        }
    },
    computed: {
        autoName() {
            let auto = `${this.component.id} ${this.component.alias} Component`;
            if ( this.page.alias !== "" ) {
                auto = `${this.page.alias} Page ${auto}`;
            }
            return this.component.name === undefined || this.component.name === "" ? auto : this.component.name;
        },
        autoID() {
            let id = `${this.component.alias}_${this.component.id || ""}`;
            return this.page.alias === "" ? id : `${this.page.alias}_${id}`;
        },
        idStatus() {
            return this.component.id === "" || this.component.id === undefined ? "无效" : this.isValidId ? "可用" : "冲突";
        },
        componentName() {
            return this.component.name == "" ? this.autoName : this.component.name;
        }
    },
    watch: {
        "component.id": {
            handler() {
                if ( this.component.id === "" ) {
                    this.isValidId = false;
                }
            }
        }
    },
    methods: {
        checkId() {
            if ( this.component.id !== "" ) {
                this.$axios.get("/xpatch/impex/api/cms-component", {
                    params: {
                        id: this.autoID
                    }
                }).then(response => {
                    if ( response.data.status === "success" ) {
                        this.isValidId = !response.data.data;
                    }
                }).catch(error => {
                    console.error("Errors while checking Component id", error);
                });
            }
        },
        removeComponent(index) {
            this.$emit("remove-component", index);
        },
        autoScript() {
            let fields = [];
            fields.push(this.autoID);
            fields.push(this.autoName);
            this.component.attrs.map(attr => {
                fields.push(attr.value);
            });
            return {
                "type": this.component.type, id: this.autoID, script: `;;${fields.join(";")}`
            }
        },
        previewScript() {
            let scriptObj = this.autoScript();
            let scripts = [];
            scripts.push(this.$Types.Headers[scriptObj.type].script);
            scripts.push(scriptObj.script);
            this.scripts = scripts.join("\n");
            $(this.$refs.ModalScriptFragment.$el).modal("show");
        }
    }
}
</script>

<style scoped>
.CMS-COMPONENT {
    position: relative;
}
.CMS-COMPONENT .input-group-addon:not(.attr-tips) {
    min-width: 130px;
}
    
</style>

