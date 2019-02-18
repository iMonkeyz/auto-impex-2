<template>
  <div id="app">
    <FixedNavBar></FixedNavBar>

    <main class="container">

      <!-- public resources definition -->
      <PublicResourcesDefinition ref="PRD"/>

      <!-- configs -->
      <ConfigParameters ref="ConfigParameters"/>

      <!-- medias -->
      <CmsMedias ref="Medias" @add-media="addMedia"/>

      <!-- templates -->
      <CmsTemplates ref="CmsTemplates"/>

      <!-- pages -->
      <CmsPages ref="CmsPages" @add-page="addPage"/>

      <div class="row">
        <div class="col-md-12"></div>
      </div>

      <ModalRefMedias ref="ModalRefMedias" :medias="medias"/>

    </main>
    <Footer/>

    <!-- <router-view/> -->
  </div>
</template>

<script>
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import CmsPage from "@/components/cms/CmsPage"
import CmsMedias from "@/components/cms/CmsMedias"
import PublicResourcesDefinition from "@/components/PublicResourcesDefinition"
import FixedNavBar from "@/components/FixedNavBar"
import ModalRefMedias from '@/components/ModalRefMedias'
import CmsPages from "@/components/cms/CmsPages"
import CmsTemplates from "@/components/cms/CmsTemplates"
import ConfigParameters from "@/components/ConfigParameters"

export default {
  name: "App",
  components: {
    Header,
    Footer,
    CmsPage,
    CmsMedias,
    PublicResourcesDefinition,
    FixedNavBar,
    ModalRefMedias, 
    CmsPages,
    CmsTemplates,
    ConfigParameters
  },
  data() {
    return {
      medias: [],
      pages: []
    };
  },
  created() {
    console.log("jquery: ", $.fn.jquery);
    console.log(this.$Types);
  },
  methods: {
    addMedia(medias) {
      this.medias = medias;
      console.log("父组件接收addMedia参数", medias);
    },
    addPage(pages) {
      this.pages = pages;
      console.log("父组件接收addPage参数", pages)
    }
  }
};
</script>

<style>
body {
  font-family: consolas;
}
.btn:focus,
.btn:active:focus,
.btn.active:focus,
.btn.focus,
.btn:active.focus,
.btn.active.focus {
  outline: none;
  box-shadow: none;
}
main {
  width: 90% !important;
  margin-top: 70px;
  margin-bottom: 70px;
}
/* each block meun buttons */
.menu-icon {
    width: 24px;
    height: 24px;
    position: relative;
    top: -5px;
}
.menu-icon .glyphicon {
    padding: 5px;
}
.menu-icon:active .glyphicon {
    border: 1px solid white;
    border-radius: 2px;
}
.btn-remove-confirm .dropdown-menu {
    min-width: auto;
}
</style>
