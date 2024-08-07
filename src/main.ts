/*
 * @Description: ------------ fileDescription -----------
 * @Author: snows_l snows_l@163.com
 * @Date: 2024-08-05 12:46:00
 * @LastEditors: snows_l snows_l@163.com
 * @LastEditTime: 2024-08-06 10:41:07
 * @FilePath: /blog/src/main.ts
 */
import '@/assets/font/iconfont/iconfont.css';
import { createPinia } from 'pinia';
import { createApp } from 'vue';
import './assets/style/main.css';

import App from './App.vue';
import router from './router';

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.mount('#app');
