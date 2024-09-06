/*
 * @Description: ------------ app entry -----------
 * @Author: snows_l snows_l@163.com
 * @Date: 2024-08-05 12:46:00
 * @LastEditors: snows_l snows_l@163.com
 * @LastEditTime: 2024-09-06 21:43:18
 * @FilePath: /BLOG/src/main.ts
 */
import '@/assets/font/iconfont/iconfont.css';
import store from '@/store/index';
import moment from 'moment';
import { createApp } from 'vue';
import { CountTo } from 'vue3-count-to'; // 滚动数字插件
import App from './App.vue';
import './assets/style/main.css';
import init from './init';
import router from './router';
import { dispatchEventStroage } from './utils/common';
import { globalComponent, globalIcon } from './utils/regGlobalComponent';
moment.suppressDeprecationWarnings = true;

const app = createApp(App);

app.component('CountTo', CountTo);
app.use(globalIcon); // 全局注册 components/icon目录下的 图标组件
app.use(globalComponent); // 全局注册 components/common目录下的 公共组件
app.use(dispatchEventStroage);
app.use(store);
app.use(router);

app.mount('#app');

init();
