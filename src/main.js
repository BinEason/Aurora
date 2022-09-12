import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import store from './store'
import router from './router/index'
import request from './utils/request'
import storage from './utils/storage'
import * as ElIconModules from '@element-plus/icons-vue'


const app = createApp(App)
app.directive('has', {
  beforeMount: function (el, binding) {
    // console.log(el, binding);
    let actionList = JSON.parse(localStorage.getItem('cgb')).actionList
    let value = binding.value
    let hasPermission = actionList.includes(value)
    if (!hasPermission) {
      el.style = 'display:none'
      setTimeout(() => {
        el.parentNode.removeChild(el)

      }, 0)
    }
  }
})
for (let iconName in ElIconModules) {
  app.component(iconName, ElIconModules[iconName])
}
app.config.globalProperties.$request = request
app.config.globalProperties.$storage = storage

app.use(ElementPlus).use(store).use(router).mount('#app')
