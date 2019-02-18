<template>
    <div class="input-group input-group-sm">
        <span class="input-group-addon" :class="{ invisible: !visible }">{{ attr.name }}</span>
        
        <input v-if="attr.type === 'TEXT'" type="text" class="form-control" :placeholder="attr.placeholder" v-model.trim="attr.value"/>
        <textarea v-else-if="attr.type === 'TEXTAREA'" class="form-control" :placeholder="attr.placeholder" v-model.trim="attr.value" rows="3"></textarea>
        <select v-else-if="attr.type === 'BOOLEAN'" class="form-control" v-model.trim="attr.value">
            <option value="">请选择 {{ attr.placeholder }}</option>
            <option value="false">False</option>
            <option value="true">True</option>
        </select>
        <input v-else type="text" class="form-control" :placeholder="attr.placeholder" v-model.trim="attr.value" readonly/>

        <span v-if="attr.type === 'MEDIA'" class="input-group-btn">
            <button class="btn btn-default" type="button" @click="eraseMedia()">
                <span class="glyphicon glyphicon-erase"></span>
            </button>
            <button class="btn btn-default" type="button" @click="selectMedia()">
                <span class="glyphicon glyphicon-picture"></span>
            </button>
        </span>
    </div>
</template>

<script>
export default {
    name: "CmsComponentAttr",
    props: {
        attr: {
            type: Object,
            required: true
        }
    },
    data() {
        return {

        }
    },
    computed: {
        visible () {
            return this.attr.lang === undefined || this.attr.lang === "en";
        },
        root() {
            return this.$root.$children[0];
        }
    },
    methods: {
        eraseMedia() {
            this.attr.value = "";
        },
        selectMedia() {
            var that = this;
            this.root.$refs["ModalRefMedias"].openModal(media => {
                that.attr.value = media.code;
            });
        }
    }
}
</script>

<style scoped>
    .CMS-COMPONENT .input-group-addon {
        min-width: 130px;
    }
    .btn {
        width: 55px;
    }
</style>
