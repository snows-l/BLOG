/*
 * @Description: ------------ app 初始化文件 -----------
 * @Author: snows_l snows_l@163.com
 * @Date: 2024-09-06 21:35:24
 * @LastEditors: snows_l snows_l@163.com
 * @LastEditTime: 2024-09-06 21:39:14
 * @FilePath: /BLOG/src/init.ts
 */
import { autoToggleTheme } from './utils/theme';

export default function init() {
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
}
