<template>
    <div class="panel panel-primary">
        <div class="panel-heading">
            <div class="panel-title"><b>{{ autoPageId || '未命名' }}</b> [{{ slots.length }}]</div>
        </div>
        <div class="panel-body block-page">
            <div class="row text-right">
                <div class="col-md-6">
                    <p class="input-group input-group-sm">
                        <span class="input-group-addon">Page Name</span>
                        <input type="text" class="form-control" placeholder="页面名称/描述" v-model="page.name">
                    </p>
                </div>
                <div class="col-md-6">
                    <p class="input-group input-group-sm">
                        <span class="input-group-addon">Page ID (Auto)</span>
                        <input type="text" class="form-control" placeholder="ID" v-model="autoPageId" readonly>
                    </p>
                </div>
                <div class="col-md-6">
                    <p class="input-group input-group-sm">
                        <span class="input-group-addon">Page Template</span>
                        <input type="text" class="form-control" placeholder="页面使用的模板ID" v-model="page.template">
                    </p>
                </div>
                <div class="col-md-6">
                    <p class="input-group input-group-sm">
                        <span class="input-group-addon">Page Label</span>
                        <input type="text" class="form-control" placeholder="页面的Label URL" v-model="page.label">
                    </p>
                </div>
                <div class="col-md-6">
                    <p class="input-group input-group-sm">
                        <span class="input-group-addon">Page Alias</span>
                        <input type="text" class="form-control" placeholder="页面缩写别名" v-model="page.alias">
                        <span class="input-group-addon alias-tips text-success">*全局引用</span>
                    </p>
                </div>
                <div class="col-md-6">
                    <p class="input-group input-group-sm">
                        <input type="text" class="form-control" placeholder="页面包含的 Slot / Position 名称" v-model.trim="slotId">
                        <span class="input-group-btn">
                            <button class="btn btn-success" @click="addSlot" :disabled="!isAllowToAdd" :class="{ disabled : !isAllowToAdd }">
                                <span class="glyphicon glyphicon-plus-sign"></span>
                                新增Slot / Position
                            </button>
                        </span>
                    </p>
                </div>
            </div>
            <hr/>
            <div class="row CMS-SLOTS-POSITIONS">
                <div class="col-md-12">
                    <CmsSlot v-for="(position, index) in slots" 
                        :key="index"
                        :page="page"
                        :position="position"
                        ref="positions"
                        @remove-block="removeSlot"
                        ></CmsSlot>
                </div>
            </div>
        </div>
    </div> 
</template>

<script>
import CmsSlot from '@/components/cms/CmsSlot'

export default {
    name: "CmsPage",
    components: {
        CmsSlot
    },
    props: {
        page: {
            type: Object, required: true
        }
    },
    data() {
        return {
            slots: [],
            slotId: "",
            scripts: []
        }
    },
    created() {
        this.page.supportTypes = this.$Types.ComponentTypes;
        console.log("当前支持创建的组件", this.page.supportTypes);
    },
    computed: {
        autoPageId() {
            return this.page.name.replace(/\s*/gmi, "");
        },
        isAllowToAdd() {
            return this.slotId != "" && this.slots.find(slot => {
                return slot.id == this.slotId;
            }) == undefined;
        }
    },
    methods: {
        addSlot() {
            if ( this.slotId != "" ) {
                this.slots.push({
                    id: this.slotId,
                    components: []
                });
                this.slotId = "";
            }
        },
        removeSlot(slotId) {
            this.slots = this.slots.filter(x => {
                return x.id != slotId;
            });
            console.log(this.slots);
        },
        autoPageScript() {
            //;;CheckoutPaymentFailedPage;Checkout Payment Failed Page;IwaCheckoutResultPageTemplate;/checkout/payment/failed
            let scripts = [];
            scripts.push(this.$Types.PageTypes[this.page.type].comments);
            scripts.push(this.$Types.PageTypes[this.page.type].script);
            scripts.push(`;;${this.autoPageId};${this.page.name};${this.page.template};${this.page.label};;;`);
            return scripts;
        },
        autoSlotForPageScript() {
            let scripts = [];
            scripts.push(this.$Types.Headers["ContentSlotForPage"].comments);
            scripts.push(this.$Types.Headers["ContentSlotForPage"].script);
            if ( this.slots.length > 0 ) {
                this.$refs["positions"].map(position => {
                    scripts.push(`;;${position.autoCmsSlotForPageId};${position.position.id};${this.autoPageId};${position.autoCmsSlotId}`);
                });
            }
            return scripts;
        },
        autoScript() {
            let finalScripts = [];
            finalScripts.push(new Array(`### ${this.page.alias} Page -- START`));
            finalScripts.push(this.autoPageScript());
            //page content scripts
            let TYPES = this.$Types;
            if ( this.slots.length > 0 ) {
                
                let scriptObjs = [];
                this.$refs["positions"].map(position => {
                    console.log(position.autoCmsSlotId);
                    scriptObjs = scriptObjs.concat( position.autoScript() );
                });
                
                
                for ( let componentType in TYPES.Headers ) {
                    //console.log("componentType:", componentType);
                    let scriptContent = [];
                    scriptObjs.filter(scriptObj => {
                        return scriptObj.type == componentType;
                    }).map(scriptObj => {
                        scriptContent.push(scriptObj.script);
                    });
                    if ( scriptContent.length > 0 ) {
                        let scriptHeader = [];
                        if ( TYPES.Headers[componentType].comments !== undefined ) {
                            scriptHeader.push(TYPES.Headers[componentType].comments)
                        }
                        scriptHeader.push(TYPES.Headers[componentType].script)
                        finalScripts.push(scriptHeader.concat(scriptContent));
                    }
                }

                // //fill slots into page
                finalScripts.push(this.autoSlotForPageScript());
            }
            finalScripts.push(new Array(`### ${this.page.alias} Page -- END`));
            console.log(finalScripts);
            return finalScripts;
        }
    }
}
</script>

<style scoped>
.block-page .input-group-addon:not(.alias-tips) {
    min-width: 120px;
    text-align: right;
}
.alias-tips {
    color: #5cb85c;
}
</style>
