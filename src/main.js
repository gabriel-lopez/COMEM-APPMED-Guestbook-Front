import '@fortawesome/fontawesome-free/css/all.css'

import '@babel/polyfill'
import './plugins/vuetify'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios  from  'axios'

Vue.config.productionTip = false
Vue.prototype.$http = axios

const accessToken = localStorage.getItem('access_token')

if (accessToken) {
    Vue.prototype.$http.defaults.headers.common['Authorization'] = 'Bearer ' + accessToken
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')