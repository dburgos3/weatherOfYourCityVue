import Vue from 'vue'
import App from './App.vue'
import store from './store'
import vuetify from './plugins/vuetify'
// import vueCountryRegionSelect from 'vue-country-region-select'

Vue.config.productionTip = false
// Vue.use(vueCountryRegionSelect)

new Vue({
  store,
  vuetify,
  // vueCountryRegionSelect,
  render: h => h(App)
}).$mount('#app')
