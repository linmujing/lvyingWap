// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import store from './store/index'
import App from './App'
import router from './router'
import Vant from 'vant'
import axios from 'axios'
import Qs from 'qs'


// 视频播放器插件
import VideoPlayer from 'vue-video-player'
Vue.use(VideoPlayer);
import "video.js/dist/video-js.css";
import "vue-video-player/src/custom-theme.css";


// 引入接口配置文件
import * as api from './api/api'
Vue.prototype.$api = api
Vue.prototype.$axios = axios
Vue.prototype.$Qs = Qs


// 引入rem
import './common/js/rem'
//vant样式
import 'vant/lib/vant-css/index.css';

Vue.config.productionTip = false

// 图片懒加载
import { Lazyload } from 'vant';
Vue.use(Lazyload);

Vue.use(Vant)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
