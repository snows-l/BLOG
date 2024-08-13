/*
 * @Description: ------------ fileDescription -----------
 * @Author: snows_l snows_l@163.com
 * @Date: 2024-08-07 22:07:34
 * @LastEditors: snows_l snows_l@163.com
 * @LastEditTime: 2024-08-13 09:58:03
 * @FilePath: /blog/src/utils/common.js
 */

// 重写 localStorage 的 setItem 方法，派发自定义事件 用于监听  localStorage 的变化
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

// 根据QQ号获取QQ头像地址
export const getQQAvatar = (qq = '37523953') => {
  return 'http://q1.qlogo.cn/g?b=qq&nk=' + encodeURIComponent(qq) + '&s=640';
};

// 判断当前 视口 是否小于 w 像素
const { body } = document;
export const isMobile = (w = 860) => {
  const rect = body.getBoundingClientRect();
  return rect.width - 1 <= w;
};

// 设置网页标题
export const setDocmentTitle = title => {
  document.title = title;
};

// 产生0-99999之间的数据数
export const randomNum = (min = 0, max = 1) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
