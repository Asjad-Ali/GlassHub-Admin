import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import Toaster from '@meforma/vue-toaster';
import VueGoogleMaps from '@fawmi/vue-google-maps'
// import { VueReCaptcha} from 'vue-recaptcha-v3'


const app = createApp(App)
app.use(VueGoogleMaps, {
    load: {
        // 'YOUR_API_KEY_COMES_HERE'
        // 'AIzaSyDNS7nXnbp8nqbAzU5h1nuqAK5kaWAsP90'
        key: 'AIzaSyDNS7nXnbp8nqbAzU5h1nuqAK5kaWAsP90',
        libraries: "places"
    },
})
app.use(router)
app.use(createPinia()) // Create the root store
app.use(Toaster,{timeout: 3000})
// app.use(VueReCaptcha, { siteKey: '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI' })
app.mount('#app')

