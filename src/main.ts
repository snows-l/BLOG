/*
 * @Description: ------------ fileDescription -----------
 * @Author: snows_l snows_l@163.com
 * @Date: 2024-08-05 12:46:00
 * @LastEditors: snows_l snows_l@163.com
 * @LastEditTime: 2024-08-15 20:13:25
 * @FilePath: /BLOG/src/main.ts
 */
import '@/assets/font/iconfont/iconfont.css';
import Comment from '@/components/Comment/index.vue'; // 评论组件
import CustomImg from '@/components/CustomImg/index.vue'; // 图片组件
import PageTopCover from '@/components/pageTopCover/index.vue'; // 顶部覆盖层组件
import store from '@/store/index';
import { createApp } from 'vue';
import './assets/style/main.css';
import Empty from './components/Empty/index.vue'; // 暂无数据组件
import { dispatchEventStroage } from './utils/common';
import { autoToggleTheme } from './utils/theme';

import App from './App.vue';
import router from './router';

const app = createApp(App);

app.component('Empty', Empty);
app.component('PageTopCover', PageTopCover);
app.component('Comment', Comment);
app.component('Img', CustomImg);
app.use(dispatchEventStroage);
app.use(store);
app.use(router);

app.mount('#app');

// 根据时间 自动切换主题
autoToggleTheme();
// 重置播放状态
localStorage.setItem('isPlaying', 'false');
// 监听是否离开网页
window.addEventListener('visibilitychange', () => {
  if (!document.hidden) {
    document.title = "☂ 被你发现了！｜ snows_l's BLOG";
  } else {
    document.title = "☂ 瓜皮人呢！还不回来？｜ snows_l's BLOG";
  }
});
