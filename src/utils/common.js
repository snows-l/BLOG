/*
 * @Description: ------------ fileDescription -----------
 * @Author: snows_l snows_l@163.com
 * @Date: 2024-08-07 22:07:34
 * @LastEditors: snows_l snows_l@163.com
 * @LastEditTime: 2024-08-07 22:50:09
 * @FilePath: /BLOG/src/utils/common.js
 */
export const getTheme = () => {
  return Array.from(document.documentElement.classList).includes('dark') ? 'dark' : 'light';
};

// 重新定义 localStorage 的 setItem 方法，派发自定义事件
export const dispatchEventStroage = () => {
  const signSetItem = localStorage.setItem;
  localStorage.setItem = function (key, val) {
    // 声明事件
    let setEvent = new Event('setItemEvent');
    setEvent.key = key;
    setEvent.newValue = val;
    // 派发事件
    window.dispatchEvent(setEvent);
    signSetItem.apply(this, arguments);
  };
};
