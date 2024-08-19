/*
 * @Description: ------------ fileDescription -----------
 * @Author: snows_l snows_l@163.com
 * @Date: 2024-08-19 17:23:36
 * @LastEditors: snows_l snows_l@163.com
 * @LastEditTime: 2024-08-19 17:54:46
 * @FilePath: /BLOG/src/utils/snow.js
 */
import sakura from '@/assets/images/icon/sakura';
import { Snow } from 'jparticles'; // 引入粒子效果库 引入雪花效果库
export const removeSnow = () => {
  const snow = document.querySelector('#snow');
  if (snow?.firstChild) {
    while (snow.firstChild) {
      snow.removeChild(snow.firstChild);
    }
  }
};

export const addSnow = isMobi => {
  new Snow('#snow', { num: isMobi ? 1 : 4, maxR: 3, minR: 16, maxSpeed: 0.4, minSpeed: 0.1, swing: true, swingProbability: 0.1, spin: true, shape: sakura() });
};
