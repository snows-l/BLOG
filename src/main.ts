/*
 * @Description: ------------ fileDescription -----------
 * @Author: snows_l snows_l@163.com
 * @Date: 2024-08-05 12:46:00
 * @LastEditors: snows_l snows_l@163.com
 * @LastEditTime: 2024-08-09 22:46:07
 * @FilePath: /BLOG/src/main.ts
 */
import '@/assets/font/iconfont/iconfont.css';
import { createPinia } from 'pinia';
import { createApp } from 'vue';
import './assets/style/main.css';
import Empty from './components/Empty/index.vue'; // 暂无数据组件
import { dispatchEventStroage } from './utils/common';
import { autoToggleTheme } from './utils/theme';

import App from './App.vue';
import router from './router';

const app = createApp(App);

app.component('Empty', Empty);
app.use(dispatchEventStroage);
app.use(createPinia());
app.use(router);

app.mount('#app');

// 根据时间 自动切换主题
autoToggleTheme();

// 监听是否离开网页
window.addEventListener('visibilitychange', () => {
  if (!document.hidden) {
    document.title = " ☂ 被你发现了！｜ snows_l's BLOG";
    // $message('欢迎您回来！');
  } else {
    document.title = " ☂ 瓜皮人呢？你还没回来！｜ snows_l's BLOG";
  }
});
