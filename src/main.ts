/*
 * @Description: ------------ fileDescription -----------
 * @Author: snows_l snows_l@163.com
 * @Date: 2024-08-05 12:46:00
 * @LastEditors: snows_l snows_l@163.com
 * @LastEditTime: 2024-08-07 22:33:07
 * @FilePath: /BLOG/src/main.ts
 */
import '@/assets/font/iconfont/iconfont.css';
import { createPinia } from 'pinia';
import { createApp } from 'vue';
import './assets/style/main.css';

import App from './App.vue';
import router from './router';
import { dispatchEventStroage } from './utils/common';

const app = createApp(App);

app.use(dispatchEventStroage);

app.use(createPinia());
app.use(router);

app.mount('#app');
