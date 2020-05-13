import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import store from './store'
import i18n from './lib/i18n'
import './assets/css/icon.css'
// import './components/common/directives';
// import 'babel-polyfill';
Vue.use(ElementUI)
Vue.config.productionTip = false
import Echarts from 'echarts'
Vue.use(Echarts)
Vue.prototype.echarts = Echarts
new Vue({
  render: h => h(App),
  router,
  store,
  i18n
}).$mount('#app')
