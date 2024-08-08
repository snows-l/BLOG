/*
 * @Description: ------------ fileDescription -----------
 * @Author: snows_l snows_l@163.com
 * @Date: 2024-08-05 12:46:00
 * @LastEditors: snows_l snows_l@163.com
 * @LastEditTime: 2024-08-08 09:36:34
 * @FilePath: /blog/src/main.ts
 */
import '@/assets/font/iconfont/iconfont.css';
import './assets/style/main.css';
import { createPinia } from 'pinia';
import { createApp } from 'vue';
import { autoToggleTheme } from './utils/theme';
import { dispatchEventStroage } from './utils/common';

import App from './App.vue';
import router from './router';

const app = createApp(App);

app.use(dispatchEventStroage);
app.use(createPinia());
app.use(router);

app.mount('#app');

// 根据时间 自动切换主题
autoToggleTheme();
