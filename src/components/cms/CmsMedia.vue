<template>
    <div class="row">
        <div class="col-sm-3 cms-media-preview">
            <img :src="preview" class="img-responsive img-thumbnail center-block" :alt="media.alt">
        </div>
        <div class="col-sm-9">
            <p class="h4 text-center"> {{ autoRefCode }} </p>
            <hr/>
            <form class="form-horizontal">
                <div class="form-group form-group-sm">
                    <div class="col-xs-12">
                        <label for="input" class="col-sm-2 control-label">Ref. Code:</label>
                        <div class="col-sm-6">
                            <p class="row input-group" :class="isValidRefCode ? 'has-success' : 'has-error'">
                                <input type="text" class="form-control" placeholder="Ref. Code" v-model.trim="media.refCode" @keyup="checkRefCode"/>
                                <span class="input-group-addon">
                                    {{ refCodeStatus }}
                                </span>
                            </p>
                        </div>
                        <label for="input" class="col-sm-1 control-label">Mime:</label>
                        <div class="col-sm-3">
                            <p class="row">
                                <input type="text" class="form-control" placeholder="Mime Type" v-model.trim="media.mime"/>
                            </p>
                        </div>
                        <label for="input" class="col-sm-2 control-label">资源文件路径:</label>
                        <div class="col-sm-10">
                            <div class="row">
                                <div class="input-group input-group-sm attr-media-path">
                                    <DisplayPRDResources :defaultResourceKey="defaultResourceKey" @select-resource-path="selectResourcePath"/>
                                    <input type="text" class="form-control" v-model="media.name"/>
                                    <input type="file" class="hidden" accept="image/*" @change="mediaPreview" ref="mediaFileInput"/>
                                    <span class="input-group-btn">
                                        <button class="btn btn-default" type="button" @click="browseMedia">
                                            <span class="glyphicon glyphicon-folder-open"></span>
                                        </button>
                                    </span>
                                </div>
                            </div>
                        </div>
                        <label for="input" class="col-sm-2 control-label">自动文件名:</label>
                        <div class="col-sm-4">
                            <p class="row">
                                <input type="text" class="form-control" placeholder="自动文件名" readonly :value="autoName"/>
                            </p>
                        </div>
                        <label for="input" class="col-sm-2 control-label">自定义文件名:</label>
                        <div class="col-sm-4">
                            <p class="row">
                                <input type="text" class="form-control" placeholder="自定义文件名" v-model.trim="media.rename"/>
                            </p>
                        </div>
                        <label for="input" class="col-sm-2 control-label">AltText:</label>
                        <div class="col-sm-10">
                            <p class="row">
                                <input type="text" class="form-control" placeholder="AltText" v-model.trim="media.altText"/>
                            </p>
                        </div>
                        <div class="col-sm-12 text-right">
                            <div class="row">
                                <div class="btn-group btn-group-xs btn-remove-confirm">
                                    <button type="button" class="btn btn-danger dropdown-toggle" data-toggle="dropdown">
                                        <span class="glyphicon glyphicon-trash"></span>&nbsp;
                                        <span class="caret"></span>
                                    </button>
                                    <ul class="dropdown-menu">
                                        <li><a href="javascript:void(0);" @click="removeMedia(index)">确认删除该Media</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import DisplayPRDResources from '@/components/DisplayPRDResources';

export default {
    name: "CmsMedia",
    components: {
        DisplayPRDResources
    },
    props: {
        media: {
            type: Object, required: true
        },
        index: {
            type: Number, required: true
        }
    },
    data() {
        return {
            isValidRefCode: false,
            defaultResourceKey: "$imageResource",
            selectedResource: {},
            preview: require("@/assets/logo.png")
        }
    },
    computed: {
        refCodeStatus() {
            return this.media.refCode === "" ? "无效" : this.isValidRefCode ? "可用" : "冲突";
        },
        autoRefCode() {
            //Media_自定义名称/用户/类别_序列
            return `${this.media.alias}_${this.media.refCode}`;
        },
        autoName() {
            return this.media.rename !== "" ? this.media.rename : this.media.name;
        },
        autoFullPath() {
            return this.selectedResource.value + this.media.name;
        },
        displayResourcePath() {
            return `[${this.selectedResource.key}] ${this.selectedResource.value}`;
        }
    },
    watch: {
        "media.refCode": {
            handler() {
                if ( this.media.refCode === "" ) {
                    this.isValidRefCode = false;
                } 
                this.media.code = this.autoRefCode;
            }
        }
    },
    methods: {
        checkRefCode() {
            if ( this.media.refCode !== "" ) {
                this.$axios.get("/xpatch/impex/api/media", {
                    params: {
                        code: this.autoRefCode
                    }
                }).then(response => {
                    if ( response.data.status === "success" ) {
                        this.isValidRefCode = !response.data.data;
                    }
                }).catch(error => {
                    console.error("Errors while checking Media Ref. Code", error);
                });
            }
        },
        browseMedia() {
            this.$refs.mediaFileInput.click();
        },
        mediaPreview() {
            let file = this.$refs.mediaFileInput.files[0];
            if ( file !== undefined ) {
                let fr = new FileReader();
                fr.onload = e => {
                    this.preview = e.target.result;
                    this.media.stream = e.target.result;
                }
                fr.readAsDataURL(file);
                this.media.mime = file.type;
                this.media.name = file.name;
            }
        },
        selectResourcePath(selectedResource) {
            this.selectedResource = selectedResource;
        },
        removeMedia(index) {
            this.$emit("remove-media", index);
        },
        autoScript() {
            return `;;${this.autoRefCode};${this.autoName};${this.autoFullPath};${this.media.mime};${this.media.altText}`;
        }
    }
}
</script>

<style scoped>
.cms-media-preview {
    padding: 30px 10px 10px;
}
img {
    margin: 0 auto;
}
.attr-media-path {
    margin-bottom: 10px;
}
</style>
