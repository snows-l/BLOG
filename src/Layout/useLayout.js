/*
 * @Description: ------------ fileDescription -----------
 * @Author: snows_l snows_l@163.com
 * @Date: 2024-08-20 22:54:21
 * @LastEditors: snows_l snows_l@163.com
 * @LastEditTime: 2024-09-14 17:47:05
 * @FilePath: /blog/src/Layout/useLayout.js
 */
import bg1 from '@/assets/images/bg/bg1.avif';
import bg2 from '@/assets/images/bg/bg2.png';
import bg3 from '@/assets/images/bg/bg3.png';
import bg4 from '@/assets/images/bg/bg4.png';
import RmbImg from '@/assets/images/icon/rmb';
import sakura from '@/assets/images/icon/sakura';
import snowImg from '@/assets/images/icon/snow';
import useResize from '@/hooks/useResize';
import { removeEffect } from '@/utils/bgEffect';
import { setFontFamily, setPrimaryColor, setTheme } from '@/utils/theme';
import { Line, Particle, Snow } from 'jparticles'; // 引入粒子效果库 引入雪花效果库
import { reactive, ref } from 'vue';
const { isMobi } = useResize();

export const useLayout = handleSearch => {
  const state = reactive({
    bgEffectIndex: 0, // 背景特效索引,
    bgImgIndex: 0,
    fontFamilyIndex: 0,
    bgEffectIndex: 0,
    cursorIndex: 0
  });

  const bgImg = ref(bg1);
  const currentPrimaryColor = ref(localStorage.getItem('primaryColor') || '#18a058');

  // 切换背景特效
  const effects = [
    { class: Snow, playload: { num: isMobi ? 1 : 2, maxR: 3, minR: 13, maxSpeed: 0.4, minSpeed: 0.1, swing: true, swingProbability: 0.1, spin: true, shape: sakura() } },
    { class: null, playload: {} },
    { class: Snow, playload: { num: isMobi ? 1 : 2, maxR: 3, minR: 12, maxSpeed: 0.4, minSpeed: 0.1, swing: false, swingProbability: 0, spin: false, shape: RmbImg() } },
    { class: Snow, playload: { num: isMobi ? 1 : 2, maxR: 3, minR: 12, maxSpeed: 0.3, minSpeed: 0.1, swing: true, swingProbability: 0.1, spin: true, shape: snowImg() } },
    { class: Particle, playload: { proximity: 90, range: 100 } },
    { class: Line, playload: { reservedLines: 12, maxDegree: 70, minDegree: 70 } }
  ];
  const handleToggleBgEffect = () => {
    if (state.bgEffectIndex == effects.length - 1) {
      state.bgEffectIndex = 0;
    } else {
      state.bgEffectIndex++;
    }
    removeEffect();
    if (effects[state.bgEffectIndex].class) {
      new effects[state.bgEffectIndex].class('#snow', effects[state.bgEffectIndex].playload);
    }
  };

  // 切换光标样式
  const cursorSet = [
    {
      class: window.cursoreffects.bubbleCursor,
      playload: {}
    },
    {
      class: null,
      playload: {}
    },
    {
      class: window.cursoreffects.clockCursor,
      playload: {}
    },
    {
      class: window.cursoreffects.textFlag,
      playload: { text: 'snows_l', color: '#ff0000' }
    },
    {
      class: window.cursoreffects.springyEmojiCursor,
      playload: { emoji: '🤷‍♂️' }
    },
    {
      class: window.cursoreffects.emojiCursor,
      playload: { emoji: ['🔥', '🐬', '🦆'] }
    },
    {
      class: window.cursoreffects.rainbowCursor,
      playload: { length: 3, color: ['#ff0000', '#00ff00', '#0000ff'] }
    }
  ];
  const handleToggleCursor = () => {
    if (state.cursorIndex == cursorSet.length - 1) {
      state.cursorIndex = 0;
    } else {
      state.cursorIndex++;
    }
    if (window.custorEffect) {
      window.custorEffect.destroy();
    }
    if (cursorSet[state.cursorIndex].class) {
      window.custorEffect = new cursorSet[state.cursorIndex].class(cursorSet[state.cursorIndex].playload);
    }
  };

  // 切换背景
  const bgSet = [bg1, bg2, bg3, bg4];
  const handleToggleBgImg = () => {
    if (state.bgImgIndex == bgSet.length - 1) {
      state.bgImgIndex = 0;
    } else {
      state.bgImgIndex++;
    }
    bgImg.value = bgSet[state.bgImgIndex];
    handleSearch(true);
  };

  // 切换字体
  const fontFamilys = ['default', '优设标题黑', '华文行楷', 'apple', 'DSDIGI', 'default'];
  const handleToggleFont = () => {
    if (state.fontFamilyIndex === fontFamilys.length - 1) {
      state.fontFamilyIndex = 0;
    } else {
      state.fontFamilyIndex++;
    }
    setFontFamily(fontFamilys[state.fontFamilyIndex]);
    handleSearch(true);
  };

  // 设置主要颜色
  const handleToggleColor = e => {
    setPrimaryColor(e.target.value);
    currentPrimaryColor.value = e.target.value;
    localStorage.setItem('primaryColor', currentPrimaryColor.value);
    handleSearch(true);
  };

  // 切换主题
  const handleToggerTheme = theme => {
    setTheme(theme);
    handleSearch(true);
  };

  return {
    handleToggleBgEffect,
    handleToggleBgImg,
    handleToggleCursor,
    bgImg,
    handleToggleFont,
    handleToggleColor,
    currentPrimaryColor,
    handleToggerTheme
  };
};
