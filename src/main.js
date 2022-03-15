import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as THREE from 'three'
import instance from '@/axios/http'
// createApp(App).use(store).use(router).mount('#app')
const app = createApp(App)
app.use(store)
app.use(router)
app.use(ElementPlus)
app.use(THREE)
app.config.globalProperties.$axios = instance
app.config.productionTip = false
app.mount('#app')
