<template>
    <div class="input-group-btn">
        <button type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" class="btn btn-default dropdown-toggle">
            <span class="caret"></span> 
            {{ displayResourcePath }}
        </button>
        <ul class="dropdown-menu">
            <li v-for="(item, index) in prdResources" :key="item.key">
                <a href="javascript:void(0);" 
                    @click="selectResourcePath(index)">{{ item.key }}</a>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name: "DisplayPRDResources",
    props: {
        defaultResourceKey: {
            type: String, required: true
        }
    },
    data() {
        return {
            selectedResource: {},
            prdResources: [],
        }
    },
    created() {
        this.prdResources = this.$prd.resources;
        
        //set default
        this.selectDefaultResource();
        
        //interval check prd resources
        let len = this.prdResources.length;
        let that = this;
        setInterval(_ => {
            if ( that.$prd.resources.length !== len ) {
                console.log("update prd resources");
                that.prdResources = that.$prd.resources;
                len = that.prdResources.length;
                that.selectDefaultResource();
            }
        }, 1000);
    },
    computed: {
        displayResourcePath() {
            if ( this.selectedResource === undefined ) {
                return "请选择模板资源所在位置";
            }
            if ( this.selectedResource.value.indexOf("&") > -1 ) {
                return `[${this.selectedResource.key}] ...${this.selectedResource.value.split("&")[1]}`
            }
            return `[${this.selectedResource.key}] ${this.selectedResource.value}`;
        }
    },
    methods: {
        selectDefaultResource() {
            this.selectedResource = this.prdResources.find(prdResource => {
                return prdResource.key === this.defaultResourceKey;
            });
            this.notifyReferer();
        },
        selectResourcePath(index) {
            this.selectedResource = this.prdResources[index];
            this.notifyReferer();
        },
        notifyReferer() {
            this.$emit("select-resource-path", this.selectedResource);
        }
    }
}
</script>