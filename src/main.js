import Vue from 'vue'
import Vuelidate from 'vuelidate'
import App from './App.vue'
import router from './router'
import store from './store'
import dateFilter from '@/filters/date.filter'
import currencyFilter from "@/filters/currency.filter";
import messagePlugin from '@/utils/message.plugin'
import Loader from "@/components/app/Loader";
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import './registerServiceWorker'
import 'materialize-css/dist/js/materialize.min'

Vue.config.productionTip = false
Vue.use(messagePlugin)
Vue.use(Vuelidate)
Vue.filter('dateFilter', dateFilter)
Vue.filter('currencyFilter', currencyFilter)
Vue.component('Loader', Loader)

// web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAPfVILBedMSj788TiIyDPddVY8cdR1pU4",
  authDomain: "project-manager-2861c.firebaseapp.com",
  databaseURL: "https://project-manager-2861c-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "project-manager-2861c",
  storageBucket: "project-manager-2861c.appspot.com",
  messagingSenderId: "251150624381",
  appId: "1:251150624381:web:0daaef49169378b6ffb314"
}
firebase.initializeApp(firebaseConfig)
let app
firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
            router,
            store,
            render: h => h(App)
          }).$mount('#app')
  }
})


