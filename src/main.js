import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import store from './store'
import router from './router/index'
import request from './utils/request'
import storage from './utils/storage'
import * as ElIconModules from '@element-plus/icons-vue'

const app =createApp(App)
for(let iconName in ElIconModules){
    app.component(iconName,ElIconModules[iconName])
  }
app.config.globalProperties.$request = request
app.config.globalProperties.$storage = storage
app.use(ElementPlus).use(store).use(router).mount('#app')
