<template>
    <div class="row" id="Section_Medias">
        <div class="col-md-12">
            <div class="panel panel-primary">
                <div class="panel-heading">
                    <div class="menu-icon text-center pull-right" @click="addMedia">
                        <span class="glyphicon glyphicon-plus"></span>
                    </div>
                    <div class="menu-icon text-center pull-right" @click="previewScript">
                        <span class="glyphicon glyphicon-tag"></span>
                    </div>
                    <h3 class="panel-title"><span class="glyphicon glyphicon-bookmark"></span> Media [{{ medias.length }}]</h3>
                </div>
                <div class="panel-body" id="MediaPanel">

                    <div role="tabpanel" v-show="medias.length > 0">

                        <!-- Nav tabs -->
                        <ul class="nav nav-tabs" role="tablist">
                            <li v-for="(media, index) in medias" :key="index" :class="{ active: index === selectedMediaIndex }" @click="updateTabIndex(index)">
                                <a :href="`#M_${media.code}_${index}`" data-toggle="tab">{{ media.alias + '_' + media.refCode }}</a>
                            </li>
                        </ul>
                    
                        <!-- Tab panes -->
                        <div class="tab-content">
                            <div class="tab-pane" 
                                v-for="(media, index) in medias" 
                                :key="index" 
                                :class="{ active: index === selectedMediaIndex }" 
                                :id="`M_${media.code}_${index}`">

                                <CmsMedia :media="media" ref="Media" :index="index" @remove-media="removeMedia"/>
                            
                            </div>
                        </div>
                    </div>
                    <hr v-show="medias.length > 0"/>
                    <div class="panel panel-default panel-ref-codes">
                        <div class="panel-body" v-if="autoRefCodes.length > 0">
                            <p class="h4">Can Ref. Media Codes: </p>
                            <div>
                                {{ autoRefCodes.join(", ") }}
                            </div>
                        </div>
                        <div class="panel-body" v-else>
                            <p class="h4">No Medias.</p>
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
import CmsMedia from '@/components/cms/CmsMedia'
import ModalScriptFragment from '@/components/ModalScriptFragment'

export default {
    name: "CmsMedias",
    components: {
        CmsMedia, ModalScriptFragment
    },
    data() {
        return {
            selectedMediaIndex: 0,
            medias: [],
            scripts: ""
        }
    },
    computed: {
        autoRefCodes() {
            return this.medias.filter(media => media.code !== "" && media.code !== undefined).map(media => {
                return `${media.code}`;
            });
        }
    },
    methods: {
        addMedia() {
            this.medias.push({
                alias: "Media", code: "", mime: "image/jpeg", name: "", rename: "", altText:"", refCode: "", stream: ""
            });
            this.updateTabIndex();
            this.$emit("add-media", this.medias);
        },
        removeMedia(index) {
            this.medias = this.medias.filter((meida, i) => {
                return i !== index;
            });
            this.updateTabIndex(0);
        },
        updateTabIndex(index) {
            this.selectedMediaIndex = index === undefined ? this.medias.length - 1 : index;
        },
        autoScript() {
            let scripts = [];
            if ( this.medias.length > 0 ) {
                scripts.push("# create medias")
                scripts.push(`INSERT_UPDATE Media;$contentCV[unique=true];code[unique=true];realfilename;@media[translator=$mediaTranslator];mime[default=image/jpeg];altText`);
                this.$refs["Media"].map(media => {
                    scripts.push(media.autoScript());
                });
            }
            console.log("Medias script:", scripts);
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
.panel-ref-codes {
    margin: 0;
}
</style>