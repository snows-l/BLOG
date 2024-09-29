/*
 * @Description: ------------ fileDescription -----------
 * @Author: snows_l snows_l@163.com
 * @Date: 2024-08-20 22:54:21
 * @LastEditors: snows_l snows_l@163.com
 * @LastEditTime: 2024-09-29 10:27:32
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
import { useAppStore } from '@/store/app';
import { removeEffect } from '@/utils/bgEffect';
import { setFontFamily, setPrimaryColor, setTheme } from '@/utils/theme';
import { Line, Particle, Snow } from 'jparticles'; // 引入粒子效果库 引入雪花效果库
import { reactive, ref, watch } from 'vue';
const { isMobi } = useResize();
import { ElMessage } from 'element-plus';

export const useLayout = handleSearch => {
  const state = reactive({
    bgEffectIndex: 0, // 背景特效索引,
    bgImgIndex: 0,
    fontFamilyIndex: 0,
    bgEffectIndex: 0,
    cursorIndex: 0
  });

  const isFullscreen = ref(false);

  const bgImg = ref('');
  const currentPrimaryColor = ref(localStorage.getItem('primaryColor') || '#25bbe4');

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
  const bgSet = ['', bg1, bg2, bg3, bg4];
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
  const fontFamilys = ['喵喵体', '优设标题黑', '华文行楷', '电影旁白体', '菜单体', '教科书拼音体', '系统默认'];
  const handleToggleFont = () => {
    if (state.fontFamilyIndex === fontFamilys.length - 1) {
      state.fontFamilyIndex = 0;
    } else {
      state.fontFamilyIndex++;
    }
    setFontFamily(fontFamilys[state.fontFamilyIndex]);
    // ElMessage({
    //   type: 'success',
    //   message: fontFamilys[state.fontFamilyIndex],
    //   offset: 31,
    //   center: true,
    //   plain: true,
    //   customClass: 'font-toggle-toast'
    // });
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

  // 全屏/退出全屏 兼容性处理
  const appStore = useAppStore();
  const handleFullScreen = () => {
    if (!document.fullscreenElement) {
      // 进入全屏
      var requestMethod =
        document.documentElement.requestFullScreen || //W3C
        document.documentElement.webkitRequestFullScreen || //Chrome等
        document.documentElement.mozRequestFullScreen || //FireFox
        document.documentElement.msRequestFullscreen; //IE11

      if (requestMethod) {
        requestMethod.call(document.documentElement);
        isFullscreen.value = true;
        appStore.SET_FULL_SCREEN(true);
      } else if (typeof window.ActiveXObject !== 'undefined') {
        var wscript = new ActiveXObject('WScript.Shell');
        if (wscript !== null) {
          wscript.SendKeys('{F11}');
          isFullscreen.value = true;
          appStore.SET_FULL_SCREEN(true);
        }
      }
    } else {
      // 退出全屏
      if (document.exitFullscreen) {
        document.exitFullscreen();
        isFullscreen.value = false;
        appStore.SET_FULL_SCREEN(false);
      }
    }
  };

  watch(
    () => appStore.isFullSreen,
    n => {
      isFullscreen.value = n;
    }
  );

  return {
    handleToggleBgEffect,
    handleToggleBgImg,
    handleToggleCursor,
    bgImg,
    handleToggleFont,
    handleToggleColor,
    currentPrimaryColor,
    handleToggerTheme,
    isFullscreen,
    handleFullScreen
  };
};
