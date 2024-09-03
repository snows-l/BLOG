/*
 * @Description: ------------ fileDescription -----------
 * @Author: snows_l snows_l@163.com
 * @Date: 2024-08-05 12:46:00
 * @LastEditors: snows_l snows_l@163.com
 * @LastEditTime: 2024-09-02 21:23:52
 * @FilePath: /BLOG/src/main.ts
 */
import '@/assets/font/iconfont/iconfont.css';
import CommentInput from '@/components/common/CommentInput/index.vue'; // 评论 输入 组件
import CommentView from '@/components/common/CommentView/index.vue'; // 评论 展示 组件
import CustomImg from '@/components/common/CustomImg/index.vue'; // 图片组件
import PageTopCover from '@/components/common/pageTopCover/index.vue'; // 顶部覆盖层组件
import ToolTip from '@/components/common/ToolTip/index.vue'; // 提示组件
import store from '@/store/index';
import moment from 'moment';
import { createApp } from 'vue';
import { CountTo } from 'vue3-count-to'; // 滚动数字插件
import './assets/style/main.css';
import Empty from './components/common/Empty/index.vue'; // 暂无数据组件
import { dispatchEventStroage } from './utils/common';
import { autoToggleTheme } from './utils/theme';
moment.suppressDeprecationWarnings = true;

import App from './App.vue';
import router from './router';

const app = createApp(App);

app.component('Empty', Empty);
app.component('PageTopCover', PageTopCover);
app.component('CommentInput', CommentInput);
app.component('CommentView', CommentView);
app.component('Img', CustomImg);
app.component('ToolTip', ToolTip);
app.use(dispatchEventStroage);
app.component('CountTo', CountTo);
app.use(store);
app.use(router);

app.mount('#app');

// 打印一些信息
// console.log('-------- navigator --------', navigator);
// console.log('-------- 当前设备 品牌 --------', navigator.vendor);
// console.log('-------- 当前设备 型号 --------', navigator.product);
// console.log('-------- 当前设备 系统 --------', navigator.platform);
// console.log('-------- 当前设备 网络类型 --------', navigator.connection.effectiveType);
// console.log('-------- 当前电脑 CPU 核心数 --------', navigator.hardwareConcurrency);
// console.log('-------- 当前设备 语言 --------', navigator.language);
// console.log('-------- 当前设备 浏览器版本 --------', navigator.appVersion);
// console.log('-------- 当前设备 浏览器名称 --------', navigator.appName);
// console.log('-------- 当前 用户代理 --------', navigator.userAgent);
// console.log('-------- 当前 屏幕分辨率 --------', screen.width + 'x' + screen.height);

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

// android点击手机物理返回键退出app bug解决
document.addEventListener('plusready', function () {
  plus.key.addEventListener(
    'backbutton',
    function () {
      window.history.go(-1);
    },
    false
  );
});
