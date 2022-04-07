import Vue from 'vue'
import './api/elment'
import App from './App.vue'
import VueRouter  from 'vue-router'
Vue.use(VueRouter)
import router from './router'
import store from './store/index'
import Header from './components/Header/index.vue'


Vue.config.productionTip = false

Vue.component('Header',Header)
new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
