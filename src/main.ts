import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
library.add(fas, far)
import './scss/index.scss'
import './scss/short.scss'

createApp(App).use(store).use(router).component("font-awesome-icon", FontAwesomeIcon).mount('#app')
