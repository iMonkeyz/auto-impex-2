<template>
    <div class="panel panel-primary" id="Section_PRD">
        <div class="panel-heading">
            <h3 class="panel-title">Public Resources Definition</h3>
        </div>
        <div class="panel-body">
            
            <!-- Nav tabs -->
            <ul class="nav nav-tabs">
                <li class="active">
                    <a href="#mode_scripts" data-toggle="tab">Scripts Mode</a>
                </li>
                <li>
                    <a href="#mode_properties" data-toggle="tab">Properties Mode</a>
                </li>
            </ul>
            
            <!-- Tab panes -->
            <div class="tab-content">
                <div class="tab-pane active" id="mode_scripts">
                    <ul class="list-group">
                        <li v-for="fmtSpt in formattedScripts" :key="fmtSpt" class="list-group-item">
                            {{ fmtSpt }}
                        </li>
                    </ul>
                </div>
                <div class="tab-pane" id="mode_properties">
                    <ul class="list-group">
                        <li class="list-group-item list-group-item-warning">
                            <div class="row">
                                <div class="col-sm-2"><span class="h4">Key</span></div>
                                <div class="col-sm-6"><span class="h4">Value</span></div>
                                <div class="col-sm-3">
                                    <span class="h4">Comments</span>
                                </div>
                                <div class="col-sm-1"></div>
                            </div>
                        </li>
                        <li class="list-group-item" v-for="def in defs" :key="def.key">
                            <div class="row">
                                <div class="col-sm-2">{{ def.key }}</div>
                                <div class="col-sm-6"><input class="form-control input-sm" v-model="def.value"/></div>
                                <div class="col-sm-3">{{ def.comments }}</div>
                                <div class="col-sm-1 text-right">
                                    <div class="btn-group btn-group-xs">
                                        <button class="btn btn-success" @click="updatePRD(def)">
                                            <span class="glyphicon glyphicon-floppy-disk"></span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li class="list-group-item" v-for="catalog in catalogs" :key="catalog.key">
                            <div class="row">
                                <div class="col-sm-2">{{ catalog.key }}</div>
                                <div class="col-sm-6"><input class="form-control input-sm" v-model="catalog.value"/></div>
                                <div class="col-sm-3">{{ catalog.comments }}</div>
                                <div class="col-sm-1 text-right">
                                    <div class="btn-group btn-group-xs">
                                        <button class="btn btn-success" @click="updatePRD(catalog)">
                                            <span class="glyphicon glyphicon-floppy-disk"></span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </li>
                    </ul>
                    <ul class="list-group">
                        <li v-show="resources.length > 0" class="list-group-item list-group-item-warning text-center">Resources</li>
                        <li class="list-group-item" v-for="resource in resources" :key="resource.key">
                            <div class="row">
                                <div class="col-sm-2">{{ resource.key }}</div>
                                <div class="col-sm-6">
                                    <textarea type="text" rows="1" class="form-control input-sm" v-model="resource.value"></textarea>
                                </div>
                                <div class="col-sm-3">{{ resource.comments }}</div>
                                <div class="col-sm-1 text-right">
                                    <div class="btn-group btn-group-xs">
                                        <button class="btn btn-success" @click="updatePRD(resource)">
                                            <span class="glyphicon glyphicon-floppy-disk"></span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </li>
                    </ul>
                    <ul class="list-group">
                        <li v-show="translators.length > 0" class="list-group-item list-group-item-warning text-center">Translators</li>
                        <li class="list-group-item" v-for="translator in translators" :key="translator.key">
                            <div class="row">
                                <div class="col-sm-2">{{ translator.key }}</div>
                                <div class="col-sm-6">
                                    <textarea type="text" rows="1" class="form-control input-sm" v-model="translator.value"></textarea>
                                </div>
                                <div class="col-sm-3">{{ translator.comments }}</div>
                                <div class="col-sm-1 text-right">
                                    <div class="btn-group btn-group-xs">
                                        <button class="btn btn-success" @click="updatePRD(translator)">
                                            <span class="glyphicon glyphicon-floppy-disk"></span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </li>
                    </ul>
                    <ul class="list-group">
                        <li v-show="customs.length > 0" class="list-group-item list-group-item-warning text-center">Customize Definitions</li>
                        <li class="list-group-item" v-for="custom in customs" :key="custom.key">
                            <div class="row">
                                <div class="col-sm-2">{{ custom.key }}</div>
                                <div class="col-sm-6">
                                    <textarea type="text" rows="1" class="form-control input-sm" v-model="custom.value"></textarea>
                                </div>
                                <div class="col-sm-3">
                                    <textarea type="text" rows="1" class="form-control input-sm" v-model="custom.comments"></textarea>
                                </div>
                                <div class="col-sm-1 text-right">
                                    <div class="btn-group btn-group-xs">
                                        <button class="btn btn-success" @click="updatePRD(custom)">
                                            <span class="glyphicon glyphicon-floppy-disk"></span>
                                        </button>
                                        <button class="btn btn-danger" @click="deletePRD(custom)">
                                            <span class="glyphicon glyphicon-remove"></span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li v-show="customs.length > 0" class="list-group-item">
                            <div class="row">
                                <div class="col-sm-2" :class="{ 'has-error': !validatePRDKey }">
                                    <input type="text" class="form-control input-sm" placeholder="请以$开头" v-model.trim="newPRD.key">
                                </div>
                                <div class="col-sm-6">
                                    <textarea type="text" rows="1" class="form-control input-sm" placeholder="输入值" v-model.trim="newPRD.value"></textarea>
                                </div>
                                <div class="col-sm-3">
                                    <textarea type="text" rows="1" class="form-control input-sm" placeholder="备注" v-model.trim="newPRD.comments"></textarea>
                                </div>
                                <div class="col-sm-1 text-right">
                                    <div class="btn-group btn-group-xs">
                                        <button class="btn btn-success" :class="{ disabled: !isAllowAdd }" @click="insertPRD">
                                            <span class="glyphicon glyphicon-floppy-disk"></span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            
        </div>
    </div>
</template>

<script>
export default {
    name: "PublicResourcesDefinition",
    data() {
        return {
            existingKey: [],
            defs: [],
            catalogs: [],
            resources: [],
            translators: [],
            customs: [],
            newPRD: {
                key: "",
                value: "",
                comments: ""
            }
        }
    },
    created() {
        this.$axios.get("/xpatch/impex/api/prd").then(response => {
            if ( response.data.status === "success" ) {
                response.data.data.map(prd => {
                    if ( prd.type === "defs" ) {
                        this.defs.push(prd);
                    } else if ( prd.type === "catalogs" ) {
                        this.catalogs.push(prd);
                    } else if ( prd.type === "resources" ) {
                        this.resources.push(prd);
                    } else if ( prd.type === "translators" ) {
                        this.translators.push(prd);
                    } else {
                        this.customs.push(prd);
                    }
                    this.existingKey.push(prd.key);
                });
            }
        }).catch(error => {

        }).finally(_ => {
            this.updateGlobalPRD();
        });
    },
    computed: {
        formattedScripts() {
            let scripts = ["### Public Resources Definition Created By Auto ImpEx 2.0 ###"];
            scripts = scripts.concat(this.formattedDefs);
            scripts = scripts.concat(this.formattedCatalogs);
            scripts = scripts.concat(this.formattedResources);
            scripts = scripts.concat(this.formattedTranslators);
            scripts = scripts.concat(this.formattedCustoms);
            return scripts;
        },
        formattedDefs() {
            return this.defs.map(def => {
                return `${def.key}=${def.value}`;
            });
        },
        formattedCatalogs() {
            let scripts1 = this.catalogs.map(cata => {
                return `${cata.key}=${cata.value}`;
            });
            let scripts2 = this.catalogs.map(cata => {
                if ( cata.key === "$contentCatalog" ) {
                    return `$contentCV=catalogVersion(catalog(id[default=$contentCatalog]),version[default=$versionName])`;
                }
                if ( cata.key === "$productCatalog" ) {
                    return `$productCV=catalogVersion(catalog(id[default=$productCatalog]),version[default=$versionName])`;
                }
            });
            return scripts1.concat(scripts2);
        },
        formattedResources() {
            return this.resources.map(res => {
                return `${res.key}=${res.value}`;
            });
        },
        formattedTranslators() {
            return this.translators.map(trans => {
                return `${trans.key}=${trans.value}`;
            });
        },
        formattedCustoms() {
            return this.customs.filter(custom => custom.key.startsWith("$")).map(custom => {
                return `${custom.key}=${custom.value}`;
            });
        },
        validatePRDKey() {
            let isFresh = this.existingKey.find(key => key === this.newPRD.key) === undefined;
            return this.newPRD.key.startsWith("$") && this.newPRD.key.length > 1 && isFresh;
        },
        isAllowAdd() {
            return this.validatePRDKey && this.newPRD.key !== "" && this.newPRD.value !== "";
        }
    },
    methods: {
        autoScript() {
            return new Array(this.formattedScripts);
        },
        updatePRD(prd) {
            this.$axios.put("/xpatch/impex/api/prd", {
                type: prd.type, key: prd.key, value: prd.value, comments: prd.comments
            }).then(response => {

            }).catch(error => {

            }).finally(_ => {
                this.updateGlobalPRD();
            });
        },
        insertPRD() {
            this.$axios.post("/xpatch/impex/api/prd", {
                key: this.newPRD.key, value: this.newPRD.value, comments: this.newPRD.comments
            }).then(response => {
                if ( response.data.status === "success" ) {
                    this.customs.push(JSON.parse(JSON.stringify(this.newPRD)));
                    this.resetNewPRD();
                }
            }).catch(error => {

            }).finally(_ => {
                this.updateGlobalPRD();
            }).finally(_ => {
                this.updateGlobalPRD();
            });
        },
        deletePRD(prd) {
            if ( !confirm("删除确认?") ) {
                return;
            }
            this.$axios.delete("/xpatch/impex/api/prd", {
                params: {
                    key: prd.key
                }
            }).then(response => {
                if ( response.data.status === "success" ) {
                    this.customs = this.customs.filter(custom => custom.key !== prd.key);
                }
            }).catch(error => {

            }).finally(_ => {
                this.updateGlobalPRD();
            });
        },
        resetNewPRD() {
            this.newPRD.key = "";
            this.newPRD.value = "";
            this.newPRD.comments = "";
        },
        updateGlobalPRD() {
            this.$prd.setDefs(this.defs);
            this.$prd.setResources(this.resources);
            this.$prd.setTranslators(this.translators);
            this.$prd.setCustoms(this.customs);
        }
    }
}
</script>

<style scoped>
.list-group {
    margin: 10px 0;
}
#mode_scripts .list-group-item {
    padding: 2px 15px;
}
#mode_properties .list-group-item {
    padding: 4px 15px;
}
</style>