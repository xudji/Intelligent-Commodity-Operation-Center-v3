import { createApp } from 'vue'
import pinia from './stores'
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import 'element-plus/dist/index.css'
import App from './App.vue'
import router from './router'
import './styles/index.scss'
import ElSvg from './components/SvgIcon/ElSvg'
import './permission'
// 开启mock服务
import './mockServer'
import { vueEcharts } from '@/plugins/index'
const app = createApp(App)


ElSvg(app)
app.use(pinia)
  .use(router)
  .use(vueEcharts)
  .use(ElementPlus, {
    locale: zhCn,
  })
  .mount('#app')
