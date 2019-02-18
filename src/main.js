// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'jquery/dist/jquery.min.js'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import CmsData from '@/assets/js/cms-data.js'
import axios from "axios";
import prd from '@/assets/js/prd.js'

Vue.config.productionTip = false

/* eslint-disable no-new */
Vue.prototype.$Types = CmsData.Types;
Vue.prototype.$axios = axios;
Vue.prototype.$prd = prd;

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
