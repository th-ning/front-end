require("normalize-css");
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from "axios";

import ElementUI from 'element-ui';                      // 引入element-ui
import 'element-ui/lib/theme-chalk/index.css'; 


Vue.use(ElementUI); 

Vue.prototype.$http = axios.create();
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
