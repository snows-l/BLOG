/*
 * @Description: ------------ fileDescription -----------
 * @Author: snows_l snows_l@163.com
 * @Date: 2024-08-07 22:07:34
 * @LastEditors: snows_l snows_l@163.com
 * @LastEditTime: 2024-09-06 12:53:06
 * @FilePath: /blog/src/utils/common.js
 */

import moment from 'moment';

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

// 根据QQ号获取QQ 昵称
export const getQQNickname = (qq = '37523953') => {
  let url = 'https://api.oioweb.cn/api/qq/info';
  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: `qq=${encodeURIComponent(qq)}`
  })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error));
};

// 判断当前 视口 是否小于 w 像素
const { body } = document;
export const isMobile = (w = 920) => {
  const rect = body.getBoundingClientRect();
  return rect.width - 1 <= w;
};

// 设置网页标题
export const setDocmentTitle = title => {
  document.title = title;
};

// 产生min~max之间的随机数
export const randomNum = (min = 1, max = 1) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

// 复制文本到剪贴板
export const copy = text => {
  if (document.execCommand('copy')) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'absolute';
    textArea.style.opacity = '0';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    if (!document.execCommand('copy')) {
      throw new Error('Copy command failed');
    }
    textArea.remove();
  } else {
    navigator.clipboard
      .writeText(text)
      .then(function () {
        console.log('Copied to clipboard successfully');
      })
      .catch(function (err) {
        console.error('Unable to copy text to clipboard', err);
      });
  }
};

// 获取后台管理
export const getBackstageurl = () => {
  return import.meta.env.VITE_BACKSTAGE_URL;
};

// 获取 时间
export const getTime = time => {
  return moment(time).format('MM月DD日 HH:mm');
};

/**
 * @description 构造树型结构数据
 * @param { Array } data 数据源
 * @param { String } id id字段 默认 'id'
 * @param { String } parentId 父节点字段 默认 'parentId'
 * @param { String } children 孩子节点字段 默认 'children'
 */
export function tranListToTree(data, id, parentId, children) {
  let config = {
    id: id || 'id',
    parentId: parentId || 'parentId',
    childrenList: children || 'children'
  };
  var childrenListMap = {};
  var nodeIds = {};
  var tree = [];
  for (let d of data) {
    let parentId = d[config.parentId];
    if (childrenListMap[parentId] == null) {
      childrenListMap[parentId] = [];
    }
    nodeIds[d[config.id]] = d;
    childrenListMap[parentId].push(d);
  }
  for (let d of data) {
    let parentId = d[config.parentId];
    if (nodeIds[parentId] == null) {
      tree.push(d);
    }
  }
  for (let t of tree) {
    adaptToChildrenList(t);
  }
  function adaptToChildrenList(o) {
    if (childrenListMap[o[config.id]] !== null) {
      o[config.childrenList] = childrenListMap[o[config.id]];
    }
    if (o[config.childrenList]) {
      for (let c of o[config.childrenList]) {
        adaptToChildrenList(c);
      }
    }
  }
  function setLevel(t, level) {
    t.__level__ = level;
    if (!t.children || !t.children.length) return;
    t.children.forEach(t => setLevel(t, level + 1));
  }
  tree.forEach(t => setLevel(t, 0));
  return tree;
}

// 获取 图片Icon
export const getImgIcon = name => {
  return new URL(`../assets/images/icon/${name}`, import.meta.url).href;
};
