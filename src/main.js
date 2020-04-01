import Vue from 'vue'
import App from './App.vue'
import MuseUI from 'muse-ui'
import 'muse-ui/dist/muse-ui.css'
import ivSlider from 'iv-slider'
Vue.use(MuseUI)
Vue.use(ivSlider)
Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
