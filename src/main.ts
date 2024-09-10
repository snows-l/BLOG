/*
 * @Description: ------------ app entry -----------
 * @Author: snows_l snows_l@163.com
 * @Date: 2024-08-05 12:46:00
 * @LastEditors: snows_l snows_l@163.com
 * @LastEditTime: 2024-09-10 11:03:36
 * @FilePath: /blog/src/main.ts
 */
import '@/assets/font/iconfont/iconfont.css';
import store from '@/store/index';
import moment from 'moment';
import { createApp } from 'vue';
import { CountTo } from 'vue3-count-to'; // 滚动数字插件
import Vue3FlipClock from 'vue3-flip-clock';
import 'vue3-flip-clock/dist/style.css';
import App from './App.vue';
import './assets/style/main.css';
import init from './init';
import router from './router';
import { dispatchEventStroage } from './utils/common';
import { globalComponent, globalIcon } from './utils/regGlobalComponent';
moment.suppressDeprecationWarnings = true;

const app = createApp(App);

app.component('CountTo', CountTo);
app.use(Vue3FlipClock);
app.use(globalIcon); // 全局注册 components/icon目录下的 图标组件
app.use(globalComponent); // 全局注册 components/common目录下的 公共组件
app.use(dispatchEventStroage);
app.use(store);
app.use(router);

app.mount('#app');

init();
