/*
 * @Description: ------------ fileDescription -----------
 * @Author: snows_l snows_l@163.com
 * @Date: 2024-08-08 09:34:27
 * @LastEditors: snows_l snows_l@163.com
 * @LastEditTime: 2024-08-09 12:42:15
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
    localStorage.setItem('isDark', true);
  } else {
    document.documentElement.classList.remove('dark');
    localStorage.setItem('isDark', false);
  }
};

// 处理主题样式
export function handleThemeStyle(theme) {
  document.documentElement.style.setProperty('--theme-color', theme);
  for (let i = 1; i <= 9; i++) {
    document.documentElement.style.setProperty(`--theme-light-color-${i}`, `${getLightColor(theme, i / 10)}`);
  }
  for (let i = 1; i <= 9; i++) {
    document.documentElement.style.setProperty(`--el-color-primary-dark-${i}`, `${getDarkColor(theme, i / 10)}`);
  }
}

// 处理字体
export function setFontFamily(font) {
  document.documentElement.style.setProperty('--font-family', font);
}

// hex颜色转rgb颜色
export function hexToRgb(str) {
  str = str.replace('#', '');
  let hexs = str.match(/../g);
  for (let i = 0; i < 3; i++) {
    hexs[i] = parseInt(hexs[i], 16);
  }
  return hexs;
}

// rgb颜色转Hex颜色
export function rgbToHex(r, g, b) {
  let hexs = [r.toString(16), g.toString(16), b.toString(16)];
  for (let i = 0; i < 3; i++) {
    if (hexs[i].length == 1) {
      hexs[i] = `0${hexs[i]}`;
    }
  }
  return `#${hexs.join('')}`;
}

// 变浅颜色值
export function getLightColor(color, level) {
  let rgb = hexToRgb(color);
  for (let i = 0; i < 3; i++) {
    rgb[i] = Math.floor((255 - rgb[i]) * level + rgb[i]);
  }
  return rgbToHex(rgb[0], rgb[1], rgb[2]);
}

// 变深颜色值
export function getDarkColor(color, level) {
  let rgb = hexToRgb(color);
  for (let i = 0; i < 3; i++) {
    rgb[i] = Math.floor(rgb[i] * (1 - level));
  }
  return rgbToHex(rgb[0], rgb[1], rgb[2]);
}

// 产生混合背景色
export function getBgColor(color, level) {
  let rgb = hexToRgb(color);
  for (let i = 0; i < 3; i++) {
    rgb[i] = Math.floor((rgb[i] + level) % 255);
  }
  return rgbToHex(rgb[0], rgb[1], rgb[2]);
}

// 产生随机背景色
export function getRandomColor() {
  let r = Math.floor(Math.random() * 256);
  let g = Math.floor(Math.random() * 256);
  let b = Math.floor(Math.random() * 256);
  return rgbToHex(r, g, b);
}

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
