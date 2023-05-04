
/* 
这段代码定义了一个 Vue 插件。Vue 插件是一个对象，其中包含 install 方法，该方法用于在插件安装的时候被调用。在这个插件中，它将全局引入的 Echarts 库定义为一个对象 $echarts，同时定义了一个 vueEcharts 方法，它将 VueEcharts 组件注册为 Vue 全局组件。

import * as $echarts from 'echarts'
这行代码引入了 Echarts 库，并将其命名为 $echarts 对象。

import type { App } from 'vue'
这行代码引入了 vue 库中的 App 类型，用于在注册插件时，传递 Vue 实例。

const vueEcharts = (app: App) => {...}
这行代码定义了一个名为 vueEcharts 的函数，它接受一个 App 类型的参数 app，表示 Vue 实例。

app.component('v-chart', VueEcharts)
这行代码在 vueEcharts 函数中，将 VueEcharts 组件注册为全局组件，名称为 v-chart。

最后，通过 export 关键字，将 $echarts 对象和 vueEcharts 方法导出，以便其他地方可以使用。 */
import * as $echarts from 'echarts'
import type { App } from 'vue'
import VueEcharts from 'vue-echarts'
const vueEcharts = (app: App) => {
    app.component('v-chart', VueEcharts)
}
export {
    $echarts,
    vueEcharts
}