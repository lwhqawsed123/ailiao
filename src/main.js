import Vue from 'vue'

import Cookies from 'js-cookie'

import 'normalize.css/normalize.css' // a modern alternative to CSS resets

import Element from 'element-ui'
import './assets/styles/element-variables.scss'

import '@/assets/styles/index.scss' // global css
// lwh 2020-07-20 注释了分页的默认样式
// .pagination-container 类名下所有样式被注释
import '@/assets/styles/ruoyi.scss' // ruoyi css
// lwh 2020-07-20 注释了分页的默认样式
// .pagination-container 类名下所有样式被注释
// .el-pagination 类名下所有样式被注释
import App from './App'
import store from './store'
import router from './router'
import permission from './directive/permission'
import 'element-ui/lib/theme-chalk/display.css';  // element-ui 响应式布局css

import './assets/icons' // icon
import './assets/iconfont/iconfont.css'
import './permission' // permission control
import { getDicts } from "@/api/system/dict/data";
import { getConfigKey } from "@/api/system/config";
import { parseTime, resetForm, addDateRange, selectDictLabel, download, handleTree } from "@/utils/ruoyi";
import { getDateNow,prevDate,myFilter} from "@/utils/common";
import Pagination from "@/components/Pagination";
import myPagination from "@/views/common_components/pagination"; // 自定义分页组件
import { downloadBlob } from "@/utils/downloadBlob";  // 导出文件流

// 引入导出excel文件
import Blob from './Excel/Blob'
import Export2Excel from './Excel/Export2Excel.js'


/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online! ! !
 */

// 测试数据,打包前需要注释掉
import axios from 'axios'
// import "@/utils/mock.js"
Vue.prototype.$axios = axios


// 全局方法挂载
Vue.prototype.getDicts = getDicts
Vue.prototype.getConfigKey = getConfigKey
Vue.prototype.parseTime = parseTime
Vue.prototype.resetForm = resetForm
Vue.prototype.addDateRange = addDateRange
Vue.prototype.selectDictLabel = selectDictLabel
Vue.prototype.download = download
Vue.prototype.handleTree = handleTree
Vue.prototype.downloadBlob = downloadBlob
Vue.prototype.getDateNow = getDateNow // 获取当天开始时间/结束时间
Vue.prototype.prevDate = prevDate     // 获取前一天/后一天
Vue.prototype.myFilter = myFilter     // 自定义筛选filter

Vue.prototype.msgSuccess = function (msg) {
  this.$message({ showClose: true, message: msg, type: "success" });
}

Vue.prototype.msgError = function (msg) {
  this.$message({ showClose: true, message: msg, type: "error" });
}

Vue.prototype.msgInfo = function (msg) {
  this.$message.info(msg);
}

// 全局组件挂载
Vue.component('Pagination', Pagination)
import dateTimePicker from "@/views/common_components/dateTimePicker";
import groupSelect from "@/views/common_components/groupSelect";
import detail from "@/views/common_components/detail/detail.vue";
import myTable from "@/views/common_components/myTable";
Vue.component('dateTimePicker', dateTimePicker) // 自定义 日期插件
Vue.component('groupSelect', groupSelect) // 自定义 公会下拉框
Vue.component('el-detail', detail)  // 自定义用户详情弹框
Vue.component('my-pagination', myPagination)  // 自定义分页组件
Vue.component('my-table', myTable)  // 自定义表格,带表头表尾分页

Vue.use(permission)


Vue.use(Element, {
  size: Cookies.get('size') || 'medium' // set element-ui default size
})

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
