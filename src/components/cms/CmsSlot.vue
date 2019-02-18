<template>
    <div class="CMS-Slot-Position" :id="'SLOT_' + position.id">
        <div class="panel panel-success">
            <div class="panel-heading panel-menu">
                
                <div class="btn-group btn-group-xs pull-right">
                    <button type="button" class="btn btn-success dropdown-toggle" data-toggle="dropdown">
                        <span class="glyphicon glyphicon-plus"></span>
                        创建组件 <span class="caret"></span>
                    </button>
                    <ul class="dropdown-menu">
                        <li v-for="(supportType, index) in page.supportTypes" :key="index">
                            <a href="javascript:void(0);" @click="addComponent(supportType)">{{ supportType }}</a>
                        </li>
                    </ul>
                </div>
                <div class="btn-group btn-group-xs pull-right btn-remove-confirm">
                    <button type="button" class="btn btn-danger dropdown-toggle" data-toggle="dropdown">
                        <span class="glyphicon glyphicon-trash"></span>&nbsp;
                        <span class="caret"></span>
                    </button>
                    <ul class="dropdown-menu">
                        <li><a href="javascript:void(0);" @click="removeBlock">确认删除该Slot</a></li>
                    </ul>
                </div>
                <div class="panel-title"><b>{{ position.id }}</b></div>
                <small>Slot / Position</small>
            </div>
            <div class="panel-body">
                <div class="position-components-restriction">
                    <div class="panel panel-default">
                        <div class="panel-heading">
                            <div v-show="isAllowPreviewScript" class="menu-icon text-center pull-right" title="生成ImpEx脚本片段" @click="previewScript">
                                <span class="glyphicon glyphicon-tag"></span>
                            </div>
                            <h3 class="panel-title">Content Slot Name Restriction:</h3>
                        </div>
                        <div class="panel-body">
                        {{ autoCmsSlotComponentType }}
                        </div>

                        <!-- script fragment -->
                        <ModalScriptFragment :scriptFragment="scripts" ref="ModalScriptFragment"/>
                    </div>
                </div>
                <hr/>
                <div class="CMS-COMPONENTS">
                    <div role="tabpanel">
                        <!-- Nav tabs -->    
                        <ul class="nav nav-tabs">
                            <li v-for="(component, index) in position.components" 
                                :key="index" :class="{ 'active': index == selectedComponentIndex }"
                                @click="updateTabIndex(index)"
                                >
                                <a :href="'#' + (component.id || '未命名') + index" data-toggle="tab">{{ component.id || '未命名' }}</a>
                            </li>
                        </ul>
                        
                        <!-- Tab panes -->
                        <div class="tab-content">
                            <div class="tab-pane" 
                                v-for="(component, index) in position.components" 
                                :key="index" 
                                :class="{ 'active':index == selectedComponentIndex }" 
                                :id="(component.id || '未命名') + index"
                                >
                                <CmsComponent :page="page" 
                                    :component="component" 
                                    :index="index" 
                                    ref="components"
                                    @remove-component="removeComponent"
                                    ></CmsComponent>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import CmsComponent from '@/components/cms/CmsComponent'
import ModalScriptFragment from '@/components/ModalScriptFragment'

export default {
    name: "CmsSlot",
    components: {
        CmsComponent, ModalScriptFragment
    },
    props: {
        page: {
            type: Object,
            required: true
        },
        position: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            selectedComponentIndex: 0,
            scripts: ""
        }
    },
    computed: {
        autoCmsSlotId() {
            return `${this.page.alias}_Slot_${this.position.id}`;
        },
        autoCmsSlotForPageId() {
            return this.autoCmsSlotId.replace("_Slot_", "_PageSlot_");
        },
        autoCmsSlotComponentType() {
            let compTypes = this.position.components.map(component => {
                return component.type;
            });
            return Array.from(new Set(compTypes)).join(", ");
        },
        isAllowPreviewScript() {
            return this.autoCmsSlotComponentType.length > 0;
        }
    },
    methods: {
        addComponent(componentType) {
            this.position.components.push(this.$Types.Components[componentType]());
            this.updateTabIndex();
        },
        removeComponent(index) {
            this.position.components = this.position.components.filter((component, i) => {
                return i !== index;
            });
            this.updateTabIndex(0);
        },
        updateTabIndex(index) {
            this.selectedComponentIndex = index === undefined ? this.position.components.length - 1 : index;
        },
        removeBlock() {
            this.$emit("remove-block", this.position.id);
        },
        autoScript() {
            let scripts = [];
            if ( this.$refs["components"] !== undefined && this.$refs["components"].length > 0 ) {
                let componentIds = [];
                scripts = this.$refs.components.map(component => {
                    let componentScript = component.autoScript();
                    componentIds.push(componentScript.id);
                    return componentScript;
                });
                //script: content slot
                scripts.push({
                    type: "ContentSlot", 
                    id: this.autoCmsSlotId, 
                    script: `;;${this.autoCmsSlotId};${this.autoCmsSlotId};true;${componentIds.join(",")}`
                });
                
                //script: content slot name
                scripts.push({
                    type: "ContentSlotName",
                    id: this.position.id,
                    script: `;${this.position.id};${this.page.template};${this.autoCmsSlotComponentType}`
                });
            }
            return scripts;
        },
        previewScript() {
            let scriptObj = this.autoScript().find(scriptObj => {
                return scriptObj.type === "ContentSlotName";
            });
            let type = this.$Types.Headers["ContentSlotName"];
            this.scripts = new Array(type.comments, type.script, scriptObj.script).join("\n");
            $(this.$refs.ModalScriptFragment.$el).modal("show");
        }
    }
}
</script>

<style>
.panel-menu .btn-group {
    margin: 0 5px;
}
</style>
