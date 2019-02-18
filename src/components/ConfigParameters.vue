<template>
    <div class="panel panel-primary" id="Section_ConfigParameters">
              <div class="panel-heading">
                    <div class="menu-icon text-center pull-right" @click="addConfig">
                        <span class="glyphicon glyphicon-plus"></span>
                    </div>
                    <div class="menu-icon text-center pull-right" @click="previewScript">
                        <span class="glyphicon glyphicon-tag"></span>
                    </div>
                    <h3 class="panel-title">Config Parameter [{{ configs.length }}]</h3>
              </div>
              <div class="panel-body">
                    <ul v-if="configs.length > 0" class="list-group">
                        <li class="list-group-item list-group-item-success text-center">
                            <div class="row">
                                <div class="col-sm-3"><span class="h4">Group</span></div>
                                <div class="col-sm-3"><span class="h4">Key</span></div>
                                <div class="col-sm-3"><span class="h4">Value</span></div>
                                <div class="col-sm-2"><span class="h4">Type</span></div>
                                <div class="col-sm-1"></div>
                            </div>
                        </li>
                        <li class="list-group-item" v-for="(cfg, cfgIndex) in configs" :key="cfgIndex">
                            <div class="row">
                                <div class="col-sm-3">
                                    <input type="text" class="form-control input-sm" placeholder="ConfigParameter 所属分组" v-model.trim="cfg.group">
                                </div>
                                <div class="col-sm-3">
                                    <input type="text" class="form-control input-sm" placeholder="ConfigParameter 键" v-model.trim="cfg.key">
                                </div>
                                <div class="col-sm-3">
                                    <textarea class="form-control input-sm" rows="1" spellcheck="false" placeholder="ConfigParameter 值" v-model.trim="cfg.value"></textarea>
                                </div>
                                <div class="col-sm-3">
                                    <div class="pull-right btn-group btn-group-xs btn-remove-confirm">
                                        <button type="button" class="btn btn-danger dropdown-toggle" data-toggle="dropdown">
                                            <span class="glyphicon glyphicon-trash"></span>&nbsp;
                                            <span class="caret"></span>
                                        </button>
                                        <ul class="dropdown-menu">
                                            <li><a href="javascript:void(0);" @click="removeConfig(cfgIndex)">确认删除该Config Parameter</a></li>
                                        </ul>
                                    </div>
                                    <div class="input-group input-group-sm">
                                        <div class="input-group-btn">
                                            <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown">
                                                <span class="caret"></span>
                                            </button>
                                            <ul class="dropdown-menu">
                                                <li v-for="(vt, vtIndex) in valueTypes" :key="vtIndex">
                                                    <a href="javascript:void(0);" @click="selectValueType(cfgIndex, vtIndex)">{{ vt.key + ' | ' + vt.value }}</a>
                                                </li>
                                            </ul>
                                        </div>
                                        <input type="text" class="form-control" placeholder="Config Parameter 值类型" v-model.trim="cfg.type">
                                    </div>
                                </div>
                            </div>
                        </li>
                    </ul>

                    <div  v-else class="panel panel-default panel-configs">
                        <div class="panel-body">
                            <p class="h4">No Config Parameters.</p>
                        </div>
                    </div>

                    <!-- script fragment -->
                    <ModalScriptFragment :scriptFragment="scripts" ref="ModalScriptFragment"/>
              </div>
        </div>
</template>

<script>
import ModalScriptFragment from '@/components/ModalScriptFragment'

export default {
    name: "ConfigParameters",
    components: {
        ModalScriptFragment
    },
    data() {
        return {
            valueTypes: [],
            configs: [],
            scripts: ""
        }
    },
    created() {
        this.valueTypes.push({key: "字符型", value: "java.lang.String"});
        this.valueTypes.push({key: "布尔型", value: "java.lang.Boolean"});
        this.valueTypes.push({key: "整数型", value: "java.lang.Integer"});
        this.valueTypes.push({key: "小数型", value: "java.lang.Double"});
    },
    methods: {
        addConfig() {
            this.configs.push({
                group: "", key: "", value: "", type: ""
            });
        },
        removeConfig(index) {
            this.configs = this.configs.filter((cfg, i) => {
                return i !== index;
            });
        },
        selectValueType(cfgIndex, vtIndex) {
            this.configs[cfgIndex].type = this.valueTypes[vtIndex].value;
        },
        autoScript() {
            let scripts = [];
            //INSERT_UPDATE ConfigParameter;group[unique=true];key[unique=true];value;type[default=java.lang.Boolean];
            //;FRONTEND;EnableCheckoutFlow2;false;java.lang.Boolean
            if ( this.configs.length > 0 ) {
                scripts.push(`# create config parameters`);
                scripts.push(`INSERT_UPDATE ConfigParameter;group[unique=true];key[unique=true];value;type`);
                this.configs.map(cfg => {
                    scripts.push(`;${cfg.group};${cfg.key};${cfg.value};${cfg.type}`);
                });
            }
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
.list-group, .panel-configs {
    margin: 0;
}
.list-group-item {
    padding: 5px 15px;
}
.btn-remove-confirm {
    margin-left: 30px;
    position: relative;
    top: 2px;
}
</style>
