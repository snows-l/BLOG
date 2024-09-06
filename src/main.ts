/*
 * @Description: ------------ fileDescription -----------
 * @Author: snows_l snows_l@163.com
 * @Date: 2024-08-05 12:46:00
 * @LastEditors: snows_l snows_l@163.com
 * @LastEditTime: 2024-09-06 18:04:12
 * @FilePath: /blog/src/main.ts
 */
import '@/assets/font/iconfont/iconfont.css';
// 全局组件
import Empty from './components/common/Empty.vue'; // 暂无数据组件
import CommentInput from '@/components/common/CommentInput.vue'; // 评论 输入 组件
import CommentView from '@/components/common/CommentView.vue'; // 评论 展示 组件
import Img from '@/components/common/Img.vue'; // 图片组件
import PageTopCover from '@/components/common/PageTopCover.vue'; // 顶部覆盖层组件
import ToolTip from '@/components/common/ToolTip.vue'; // 提示组件

// 全局图标
import IconCalendar from '@/components/icon/Calendar.vue'; // 日历 图标 组件
import IconComment from '@/components/icon/Comment.vue'; // 评论 图标 组件
import IconHot from '@/components/icon/Hot.vue'; // 热门 图标 组件
import IconLabel from '@/components/icon/Label.vue'; // 标签 图标 组件
import IconDown from '@/components/icon/Down.vue'; // 下拉 图标 组件
import IconShare from '@/components/icon/Share.vue'; // 分享 图标 组件
import IconPreview from '@/components/icon/Preview.vue'; // 预览 图标 组件
import IconHour24 from '@/components/icon/Hour24.vue'; // 24小时 图标 组件

import store from '@/store/index';
import moment from 'moment';
import { createApp } from 'vue';
import { CountTo } from 'vue3-count-to'; // 滚动数字插件
import './assets/style/main.css';

import { dispatchEventStroage } from './utils/common';
import { autoToggleTheme } from './utils/theme';
// import { globalIcon, globalComponent } from './utils/regGlobalComponent';
moment.suppressDeprecationWarnings = true;

import App from './App.vue';
import router from './router';
const app = createApp(App);

// const requireComponent = import.meta.glob('./components/icon/*.vue');
// for (const path in requireComponent) {
//   requireComponent[path]().then(module => {
//     // 获取组件配置
//     const component = module.default;
//     // 使用组件的文件名（去掉路径和扩展名）作为组件名
//     const componentName =
//       'Icon' +
//       path
//         .split('/')
//         .pop()
//         .replace(/\.\w+$/, '');
//     // 注册为全局组件
//     app.component(componentName, component);
//   });
// }

app.component('Empty', Empty);
app.component('PageTopCover', PageTopCover);
app.component('CommentInput', CommentInput);
app.component('CommentView', CommentView);
app.component('Img', Img);
app.component('ToolTip', ToolTip);
app.component('CountTo', CountTo);
app.component('IconComment', IconComment);
app.component('IconLabel', IconLabel);
app.component('IconCalendar', IconCalendar);
app.component('IconHot', IconHot);
app.component('IconDown', IconDown);
app.component('IconShare', IconShare);
app.component('IconPreview', IconPreview);
app.component('IconHour24', IconHour24);

// app.use(globalIcon);
// app.use(globalComponent);
app.use(dispatchEventStroage);
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
