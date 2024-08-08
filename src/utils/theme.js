/*
 * @Description: ------------ fileDescription -----------
 * @Author: snows_l snows_l@163.com
 * @Date: 2024-08-08 09:34:27
 * @LastEditors: snows_l snows_l@163.com
 * @LastEditTime: 2024-08-08 09:34:42
 * @FilePath: /blog/src/utils/theme.js
 */

// 获取当前主题
export const getTheme = () => {
  return Array.from(document.documentElement.classList).includes('dark') ? 'dark' : 'light';
};

// 设置主题
export const setTheme = theme => {
  if (theme === 'dark') {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
};

// 根据时间设置主题
export const autoToggleTheme = () => {
  const now = new Date();
  const hour = now.getHours();
  if (hour >= 6 && hour < 18) {
    setTheme('light');
  } else {
    setTheme('dark');
  }
};
