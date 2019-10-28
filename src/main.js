import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import PouchDB from 'pouchdb'

Vue.config.productionTip = false
Vue.use(BootstrapVue)

Vue.prototype.$pouchdb = new PouchDB('epsi')
Vue.prototype.$pouchdb.sync('http://127.0.0.1:5984/epsi')

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
