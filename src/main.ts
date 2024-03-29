import 'primevue/resources/themes/aura-light-green/theme.css'
import './assets/base.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(PrimeVue, { unstyled: false})
app.use(router)

app.mount('#app')
