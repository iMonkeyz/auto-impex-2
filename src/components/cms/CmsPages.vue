<template>
    <div class="panel panel-primary" id="Section_CmsPages">
        <div class="panel-heading panel-menu">
            <div class="menu-icon text-center pull-right" data-toggle="modal" href='#modalCreateCmsPages'>
                <span class="glyphicon glyphicon-plus"></span>
            </div>
            <div class="menu-icon text-center pull-right" @click="previewScript">
                <span class="glyphicon glyphicon-tag"></span>
            </div>
            <h3 class="panel-title"><span class="glyphicon glyphicon-bookmark"></span> CMS Page [{{ this.pages.length }}]</h3>
        </div>
        <div class="panel-body">
            <div v-for="(page, index) in pages" :key="index">
                <CmsPage ref="CmsPage" :page="page" :index="index" @remove-page="removePage"/>
            </div>
        </div>

        <!-- script fragment -->
        <ModalScriptFragment :scriptFragment="scripts" ref="ModalScriptFragment"/>

        <div class="modal fade" id="modalCreateCmsPages">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                        <h4 class="modal-title">请选择 CMS Page 类型</h4>
                    </div>
                    <div class="modal-body">
                      <div class="list-group">
                        <div class="list-group-item">
                          <p class="pull-right">
                            <a class="btn btn-info" href="javascript:void(0);" @click="addPage">创建</a>
                          </p>
                          <h4 class="list-group-item-heading">Content Page</h4>
                          <p class="list-group-item-text">常用内容页面, 包含Label属性</p>
                        </div>
                        <div class="list-group-item">
                          <p class="pull-right">
                            <a class="btn btn-info disabled" href="javascript:void(0);">创建 (未开放)</a>
                          </p>
                          <h4 class="list-group-item-heading">IwaCategoryLandingPage</h4>
                          <p class="list-group-item-text">品牌展示页(PLP)</p>
                        </div>
                        <div class="list-group-item">
                          <p class="pull-right">
                            <a class="btn btn-info disabled" href="javascript:void(0);">创建 (未开放)</a>
                          </p>
                          <h4 class="list-group-item-heading">IwaCampaignPage</h4>
                          <p class="list-group-item-text">产品列表页(PLP)</p>
                        </div>
                      </div>
                    </div>
                    <div class="modal-footer">
                      <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import CmsPage from '@/components/cms/CmsPage'
import ModalScriptFragment from '@/components/ModalScriptFragment'

export default {
    name: "CmsPages",
    components: {
        CmsPage, ModalScriptFragment
    },
    data() {
        return {
            pages: [],
            scripts: ""
        }
    },
    methods: {
        addPage() {
            // this.pages.push({
            //     type: "ContentPage",
            //     nickname: "Page",
            //     id: "CheckoutPaymentFailedPage",
            //     name: "Checkout Payment Failed Page",
            //     template: "IwaCheckoutResultPageTemplate",
            //     label: "/checkout/payment/failed",
            //     alias: "PAYMENT_FAILED",
            //     supportTypes: []
            // });
            this.pages.push({
                type: "ContentPage",
                nickname: "",
                id: "",
                name: "",
                template: "",
                label: "",
                alias: "",
                supportTypes: []
            });
            $("#modalCreateCmsPages").modal("hide");
        },
        removePage(index) {
            this.pages = this.pages.filter((page, i) => {
                return i !== index;
            });
        },
        autoScript() {
            let scripts = [];
            if ( this.pages.length > 0 ) {
                this.$refs["CmsPage"].map(page => {
                    scripts = scripts.concat( page.autoScript() );
                });
            }
            return scripts;
        },
        previewScript() {
            this.scripts = this.autoScript().map(scriptGroup => {
                return scriptGroup.join("\n") + "\n";
            }).join("\n");
            $(this.$refs.ModalScriptFragment.$el).modal("show");
        }
    }

}
</script>