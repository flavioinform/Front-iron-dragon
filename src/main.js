import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'


// Google Maps
import VueGoogleMaps from '@fawmi/vue-google-maps'

// Crear app
const app = createApp(App)

// Usar librerías
app.use(store)
app.use(router)
app.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyAe_Vl64knHux6QqV4W5cD7GHkMh64bHIY', // 👈 tu clave
    libraries: 'places',
  },
})

// Montar
app.mount('#app')
