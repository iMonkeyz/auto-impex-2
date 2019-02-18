<template>
  <div class="modal fade" id="modal_hybris_medias">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
          <h4 class="modal-title">选择图片</h4>
        </div>
        <div class="modal-body">
          <div class="panel-group" id="accordion" role="tablist" aria-multiselectable="true">
            <div class="panel panel-default">
              <div class="panel-heading" role="tab" id="headingOne">
                <h3 class="panel-title" data-toggle="collapse" data-parent="#accordion" href="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                  在页面定义的Medias中选取</h3>
              </div>
              <div id="collapseOne" class="panel-collapse collapse in" role="tabpanel" aria-labelledby="headingOne">
                <div class="panel-body">
                  <div class="row can-ref-medias">
                    <div class="col-xs-4" v-for="(media, index) in canRefMedias" :key="index">
                      <a href="javascript:void(0);" class="thumbnail" @dblclick="selectMedias(index)">
                        <img :src="media.stream" :alt="media.altText">
                      </a>
                      <div class="text-center media-ref-code">{{ media.code }}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="panel panel-default">
              <div class="panel-heading" role="tab" id="headingTwo">
                <h3 class="panel-title" data-toggle="collapse" data-parent="#accordion" href="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                  在Hybris数据库中选取</h3>
              </div>
              <div id="collapseTwo" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingTwo">
                <div class="panel-body" >
                  <div class="input-group">
                    <span class="input-group-addon">请输入图片Code</span>
                    <input
                      type="text"
                      class="form-control"
                      placeholder="输入Media Code"
                      v-model="fuzzyCode"
                      @keydown="autoSubmit($event)"
                    >
                    <span class="input-group-btn">
                      <button class="btn btn-success" type="submit" @click="searchHybrisMedias">
                        <span class="glyphicon glyphicon-search"></span> 查找
                      </button>
                    </span>
                  </div>
                  <ul class="list-group hybris-medias-results">
                    <li
                      class="list-group-item"
                      v-for="(media, index) in hybrisMedias"
                      :key="index"
                      @dblclick="selectHybrisMedia(index)"
                      >
                      <div class="media-left">
                        <img
                          class="media-object img-thumbnail"
                          :src="mediaServer + media.url"
                        >
                      </div>
                      <div class="media-body">
                        <span class="pull-right label" :class="media.catalogVersion === 'Staged' ? 'label-default': 'label-success'">
                          {{ media.catalogVersion }}
                        </span>
                        <h4 class="media-heading">{{ media.code }}</h4>
                        <p>{{ media.altText }}</p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    name: "ModalRefMedias",
    props: {
      medias: {
        type: Array, required: true
      }
    },
    data() {
      return {
        mediaServer: "",
        fuzzyCode: "",
        hybrisMedias: [],
        selectedMedia: {}
      }
    },
    created() {
      if ( process.env.MEDIA_SERVER !== undefined ) {
        this.mediaServer = process.env.MEDIA_SERVER;
      }
    },
    computed: {
      canRefMedias() {
        return this.medias.filter(media => {
          return media.code !== "" && media.stream !== "";
        });
      }
    },
    methods: {
      openModal(callback) {
        this.callback = callback;
        $("#modal_hybris_medias").modal("show");
      },
      closeModal(){
        $("#modal_hybris_medias").modal("hide");
      },
      autoSubmit(event) {
        if (event.keyCode === 13) {
          this.searchHybrisMedias();
        }
      },
      searchHybrisMedias() {
        this.$axios.get("/xpatch/impex/api/medias", {
          params: {
            fuzzyCode: this.fuzzyCode,
            count: 5
          }
        }).then(response => {
          if ( response.data.status === "success" ) {
            this.hybrisMedias = response.data.data;
          }
        }).catch(error => {
          console.log("请求数据错误", error);
        });
      },
      selectMedias(index) {
        this.selectedMedia = this.medias[index];
        this.invokeCallBack();
      },
      selectHybrisMedia(index) {
        this.selectedMedia = this.hybrisMedias[index];
        this.invokeCallBack();
      },
      invokeCallBack() {
        this.callback.call(this, this.selectedMedia);
        this.closeModal();
      }
    }
}
</script>

<style scoped>
.media-ref-code {
  position: relative;
  top: -15px;
}
.can-ref-medias img {
  width: 240px; height: 160px;
}
.hybris-medias-results .img-thumbnail {
  width: 64px; height: 64px;
}
.hybris-medias-results .list-group-item {
  padding: 8px 10px;
}
</style>
