import Vue from 'vue'
import VueResource from 'vue-resource'
import App from './App.vue'

Vue.use(VueResource);
Vue.http.options.root = 'https://vue-resource-db6d6.firebaseio.com/';

new Vue({
  el: '#app',
  render: h => h(App)
})
