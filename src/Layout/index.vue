<!--
 * @Description: ------------ fileDescription -----------
 * @Author: snows_l snows_l@163.com
 * @Date: 2024-08-05 16:01:58
 * @LastEditors: snows_l snows_l@163.com
 * @LastEditTime: 2024-09-21 19:36:16
 * @FilePath: /BLOG/src/Layout/index.vue
-->
<template>
  <div class="layout-warp" :style="{ backgroundImage: `url(${bgImg})` }">
    <!-- 移动端 进度条 -->
    <div class="m-progress-warp" v-show="isMobi">
      <div class="progress" :style="{ width: `${currentScorllProgress}%` }"></div>
    </div>
    <!-- pc 进度条 -->
    <div class="progress-warp" ref="progressRef" style="height: calc(100vh - 145px)" v-show="!isMobi && route.path != '/start'">
      <div class="progress" :style="{ height: `calc(${currentScorllProgress}%)` }"></div>
      <!--  -->
      <img
        ref="progressImgRef"
        :style="{ opacity: currentScorllProgress != 0 ? 1 : 0 }"
        class="progress-icon pointer"
        @click="handleTop"
        src="@/assets/images/icon/progress.svg"
        alt="" />
    </div>
    <!-- 移动端 菜单 -->
    <div class="mobile-menu-warp" :class="{ mMenuShow: state.mMenuShow }">
      <div class="mobile-menu">
        <div class="scorll-warp">
          <div class="avatar-warp">
            <img class="avatar pointer" @click="handleTo('avatar')" :src="state.avatar" alt="" srcset="" />
          </div>
          <div class="serch-input-warp pointer" @click="handleSearch(false)">
            <i class="iconfont icon-sousuo1"></i>
          </div>
          <Menu :menuList="state.menuList" :isMobile="true" @menu-change="state.mMenuShow = false" />
        </div>
      </div>
    </div>

    <!-- layout-warp -->
    <div class="layout-content-warp" id="layout" :class="{ mainRight: state.mMenuShow }" ref="layoutRef">
      <!-- mobile header -->
      <header class="mobile-header-warp header-warp" :class="{ rightHeader: state.mMenuShow, flutter: state.isFlutter }" v-if="isMobi" v-show="route.path != '/start'">
        <div class="icon-warp">
          <img style="width: 30px; height: 30px" v-if="state.mMenuShow" :src="getImgIcon('icon-close.svg')" @click="handleMMenuShow" />
          <img style="width: 30px; height: 30px" v-else :src="getImgIcon('icon-menu.svg')" @click="handleMMenuShow" />
        </div>
        <div class="app-title">
          <span class="title-text" @click="handleTo('/')">snows_l</span>
          <span class="title-sub-text" style="margin: 0 10px 0 5px">の</span>
          <span class="title-sub-text">BLOG</span>
        </div>
      </header>

      <!-- pc header -->
      <header v-else class="header-warp" :class="state.isFlutter ? 'flutter' : ''" v-show="route.path != '/start'">
        <div class="app-title">
          <span class="title-text" @click="handleTo('/')">snows_l</span>
          <span class="title-sub-text" style="margin: 0 10px 0 5px">の</span>
          <span class="title-sub-text" @click="handleToggleLive2d">BLOG</span>
        </div>
        <div class="right-nav-info">
          <div class="menu-warp" :class="{ menuShow: state.isMenuShow }">
            <Menu class="menu" :menuList="state.menuList" />
          </div>
          <div class="pointer secrh-warp">
            <i class="iconfont icon-sousuo1" @click="handleSearch(false)"></i>
          </div>
        </div>
      </header>

      <!-- main -->
      <main @click="handleClickMain" id="main">
        <router-view></router-view>
        <Footer></Footer>
      </main>
    </div>

    <!-- 置顶 / 音乐 / 设置 -->
    <div class="top-set">
      <div
        v-show="route.path != '/start' && isMobi"
        class="top pointer kbn-custom"
        data-tip="置顶"
        style="padding: 5px 0"
        :class="{ topShow: state.scrollTop > 200 }"
        @click="handleTop">
        <i class="iconfont icon-yooxi"></i>
      </div>
      <div v-show="route.path != '/start'" class="set pointer kbn-custom" data-tip="搜索" @click="handleSearch(false)" v-if="isMobi">
        <img width="25px" height="25px" :src="getImgIcon('icon-search.svg')" />
      </div>
      <div class="set pointer kbn-custom" data-tip=" 音乐播放器 " style="display: flex; align-items: center; justify-content: center" @click="handleShowMusicPlayer">
        <img v-if="state.isMusicPlaying" width="25px" height="25px" style="border-radius: 50%" src="@/assets/images/common/playing.gif" alt="" />
        <img v-else width="25px" height="25px" :src="getImgIcon('icon-music.svg')" />
      </div>
      <div v-show="route.path != '/start'" class="set pointer kbn-custom" data-tip="设置" @click="handleSetShow">
        <img width="25px" height="25px" :src="getImgIcon('icon-set.svg')" />
      </div>
    </div>

    <!-- 设置 弹窗 -->
    <div class="set-warp" :class="{ setShow: state.isSetShow }">
      <div class="theme-warp">
        <div class="theme-item set-item pointer" @click="handleToggerTheme('light')">
          <img width="30px" height="30px" src="@/assets/images/icon/light.png" fit="fill" />
        </div>
        <div class="theme-item set-item pointer" @click="handleToggerTheme('dark')">
          <img width="30px" height="30px" src="@/assets/images/icon/night.png" fit="fill" />
        </div>
      </div>
      <div class="bg-img-warp">
        <div class="bg-img-item set-item pointer" @click="handleToggleCursor">
          <img width="30px" height="30px" src="@/assets/images/icon/icon-cursor.svg" fit="fill" />
        </div>
        <div class="bg-img-item set-item pointer" @click="handleToggleBgEffect">
          <img width="30px" height="30px" src="@/assets/images/icon/icon-bgeffect.svg" fit="fill" />
        </div>
        <div class="cursor-effect set-item pointer" @click="handleToggleBgImg">
          <img width="80px" height="30px" src="@/assets/images/icon/icon-diandian.png" fit="fill" />
        </div>
      </div>
      <div class="font-warp">
        <div class="font-item set-item pointer a" @click="handleToggleFont">
          <img width="25px" height="25px" src="@/assets/images/icon/icon-fontToggle.svg" fit="fill" />
        </div>
        <div class="font-item set-item pointer b">
          <input :value="currentPrimaryColor" style="height: 20px; width: 30px" type="color" name="color" id="color" @change="handleToggleColor" />
        </div>
      </div>
    </div>

    <!-- 音乐播放器 -->
    <div class="music-player-warp" :class="{ playerShow: state.isMusicPlayerShow }">
      <MusicPlayer @music-status="handleMusicStatus" :currentMusicId="state.currentMusicId" @clickList="handleSearch(true)"></MusicPlayer>
    </div>

    <!-- 搜索弹窗 -->
    <div class="search-home-warp" :class="{ 'is-show-search': state.isShowSearch }" @click="e => handleClickSrearchModal(e)">
      <Search @close="state.isShowSearch = false" :show="state.isShowSearch"></Search>
    </div>
  </div>

  <!-- 飘 🌸蒙版 -->
  <div class="snow" v-show="state.isShowSnow" style="width: 100vw; height: 100vh; position: fixed; top: 0; left: 0; z-index: 9; pointer-events: none" id="snow"></div>
</template>

<script lang="ts" setup>
import { addBlogVisit } from '@/api/common';
import sakura from '@/assets/images/icon/sakura';
import $bus from '@/bus/index';
import Footer from '@/components/Footer/index.vue';
import MusicPlayer from '@/components/musicPlayer/index.vue';
import Search from '@/components/Search/index.vue';
import useResize from '@/hooks/useResize';
import { routes } from '@/router';
import { getImgIcon, getQQAvatar } from '@/utils/common';
import { ElMessage, ElNotification } from 'element-plus';
import { Snow } from 'jparticles'; // 引入粒子效果库 引入雪花效果库
import { nextTick, onMounted, onUnmounted, reactive, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import Menu from './Menu.vue';

const { isMobi } = useResize();
const route = useRoute();
const router = useRouter();
const layoutRef = ref(null);
const progressImgRef = ref(null);
const progressRef = ref(null);

const currentScorllProgress = ref(0);

const state = reactive({
  isFlutter: true,
  scrollTop: 0,
  activeMemu: route.path,
  isMenuShow: false,
  mMenuShow: false,
  isSetShow: false,
  isShowSnow: true,
  isMusicPlayerShow: false,
  isMusicPlaying: false,
  isShowSearch: false,
  currentMusicId: 0,
  avatar: getQQAvatar(),
  menuList: routes.filter(item => !item.isHidden).map(item => (item.children ? { ...item, children: item.children.filter(child => !child.isHidden) } : item))
});

let avatarWidth = ref('60px');

const handleTo = (path: string) => {
  if (path == 'avatar') {
    router.push('/');
    state.mMenuShow = false;
  } else {
    router.push(path);
  }
};

// 点击主体内容
const handleClickMain = () => {
  if (state.mMenuShow) state.mMenuShow = false;
  // if (state.isSetShow) state.isSetShow = false;
};

// 移动端 菜单显示切换
const handleMMenuShow = (falg: boolean) => {
  state.mMenuShow = !state.mMenuShow;
};

// 置顶
const handleTop = () => {
  (layoutRef.value as any).scrollTop = 0;
};

// 显示/隐藏 音乐播放器
const handleShowMusicPlayer = () => {
  state.isMusicPlayerShow = !state.isMusicPlayerShow;
  if (state.isSetShow) state.isSetShow = false;
};

// 音乐播放状态更新
const handleMusicStatus = (n: boolean) => {
  state.isMusicPlaying = n;
};

const handleToggleLive2d = () => {
  // const live2d = window.pio_reference;
  // console.log('-------- live2d --------', live2d);
  // if (live2d) {
  //   // live2d.modules.destroy();
  //   live2d.init();
  //   // localStorage.getItem('posterGirl') == 0 ? live2d.init() : live2d.initHidden();
  //   // localStorage.setItem('posterGirl', localStorage.getItem('posterGirl') == 0 ? 1 : 0);
  // }
};

// 显示/隐藏 设置
const handleSetShow = () => {
  state.isSetShow = !state.isSetShow;
  if (state.isMusicPlayerShow) state.isMusicPlayerShow = false;
};

// 显示/隐藏 搜索
const handleSearch = (isClose: boolean) => {
  if (isClose) {
    state.isShowSearch = false;
  } else {
    state.isShowSearch = !state.isShowSearch;
  }
  if (state.isShowSearch) {
    state.mMenuShow = false;
  }
};

const handleClickSrearchModal = () => {
  state.isShowSearch = false;
};

import { useLayout } from './useLayout';
const { handleToggleBgEffect, handleToggleBgImg, bgImg, handleToggleFont, handleToggleColor, currentPrimaryColor, handleToggerTheme, handleToggleCursor } = useLayout(handleSearch);

// 统计访问量，统一ip只会新增一次访问量
addBlogVisit().then((res: any) => {
  if (res.code == 200) {
    if (route.path == '/' || route.path == '') {
      if (!isMobi.value) {
        ElNotification({
          title: '',
          message: '欢迎来自「 ' + res.data.city + ' 」的朋友！',
          offset: 80
        });
      } else {
        ElMessage({
          message: '欢迎来自「 ' + res.data.city + ' 」的朋友！ ',
          offset: 31,
          center: true,
          plain: true,
          icon: 'null',
          customClass: 'welcome-toast'
        });
      }
    }
  }
});

// 监页面是否滚动
watch(
  () => state.scrollTop,
  () => {
    if (state.isSetShow) state.isSetShow = false;
    if (state.isMusicPlayerShow) state.isMusicPlayerShow = false;
  }
);

// 监听滚动条
const scorllCallback = () => {
  currentScorllProgress.value = ((layoutRef.value as any).scrollTop / ((layoutRef.value as any).scrollHeight - (layoutRef.value as any).clientHeight)) * 100 || 0;
  state.scrollTop = (layoutRef.value as any).scrollTop;
  if (state.mMenuShow) state.mMenuShow = false;
  if ((layoutRef.value as any).scrollTop > 60) {
    state.isFlutter = false;
  } else {
    state.isFlutter = true;
  }
};

// 拖动自定义滚动条
const handleProgressDrag = () => {
  return false;
  // const progress = progressRef.value as any;
  // const progressIcon = progressImgRef.value as any;
  // const h = progress.clientHeight; // 滚动条的高度
  // progressIcon.onmousedown = function (e: any) {
  //   document.onmousemove = (moveE: any) => {
  //     console.log('-------- mousemove --------');
  //     let moveLen = (moveE.clientY / h) * 100;
  //     if (moveE.clientY >= h) {
  //       return;
  //     }
  //     currentScorllProgress.value = moveLen;
  //     (layoutRef.value as any).scrollTop = (moveE.clientY * ((layoutRef.value as any).scrollHeight - (layoutRef.value as any).clientHeight)) / h;
  //   };
  //   document.onmouseup = function (evt) {
  //     console.log('-------- mouseup --------');
  //     evt.stopPropagation();
  //     document.onmousemove = null;
  //     document.onmouseup = null;
  //     progressIcon.releaseCapture && progressIcon.releaseCapture();
  //   };
  //   progressIcon.setCapture && progressIcon.setCapture();
  // };
};

// 要展示樱花背景的路由
let isShowSnowRoute = ['', '/', '', '/play/mp3', '/play/mp4', '/msg-board', '/about/zone', '/about/friends', '/about/me'];
let isUnShowSnowRoute = ['/play/mp4/playing', '/article/share', '/article/detail', '/preview'];
watch(
  () => route.path,
  n => {
    isUnShowSnowRoute.includes(n) ? (state.isShowSnow = false) : (state.isShowSnow = true);
  },
  { immediate: true }
);

onMounted(() => {
  (layoutRef.value as any).addEventListener('scroll', scorllCallback);
  setTimeout(() => {
    state.isMenuShow = true;
  }, 200);
  // 监听播放音乐 更新当前播放音乐id
  $bus.on('playMusic', ({ id }) => {
    state.currentMusicId = id;
    if (!state.isMusicPlayerShow) {
      state.isMusicPlayerShow = true;
    }
  });
  nextTick(() => {
    handleProgressDrag();
  });
  new Snow('#snow', { num: isMobi ? 1 : 2, maxR: 3, minR: 12, maxSpeed: 0.4, minSpeed: 0.1, swing: true, swingProbability: 0.1, spin: true, shape: sakura() });
});

onUnmounted(() => {
  (layoutRef.value as any) && (layoutRef.value as any).removeEventListener('scroll', scorllCallback);
});
</script>

<style lang="scss" scoped>
// Y轴旋转动画
@keyframes quan {
  0% {
    transform: rotateY(0deg);
  }
  50% {
    transform: rotateY(180deg);
  }
  100% {
    transform: rotateY(360deg);
  }
}
.layout-warp {
  height: 100vh;
  overflow: hidden;
  position: relative;
  .m-progress-warp {
    position: fixed;
    top: 0px;
    left: 0;
    width: 100%;
    height: 2px;
    z-index: 9999;
    .progress {
      background: linear-gradient(-90deg, #f03e07, #c15594, #23a6d5, #23d5ab);
      background-size: 100%;
      height: 100%;
    }
  }
  .progress-warp {
    position: fixed;
    top: 0px;
    right: 29px;
    width: 1px;
    height: 100vh;
    z-index: 998;
    .progress {
      width: 100%;
      background: linear-gradient(-45deg, #ee7752, #ce3e75, #23a6d5, #23d5ab);
      background-size: 400% 400%;
      animation: animation 10s ease infinite;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
    .progress-icon {
      margin-left: -14px;
      margin-top: -5px;
      width: 30px;
      height: 30px;
      transition: opacity 1s ease;
    }
  }
  @keyframes animation {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }

  .mobile-menu-warp {
    width: var(--m-menu-width);
    height: 100vh;
    background-color: var(--bg-modal-color);
    position: absolute;
    top: 0;
    left: calc(0px - var(--m-menu-width));
    z-index: 9999;
    transition: left 0.8s ease;
    .mobile-menu {
      padding: 20px;
      width: var(--m-menu-width);
      height: 100%;
      background-color: var(--bg-meun-warp-color);
      transition: left 0.8s ease;
      .scorll-warp {
        height: 100%;
        overflow-y: auto;
        padding: 20px;
        .avatar-warp {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-bottom: 25px;
          img {
            width: 100px;
            height: 100px;
            border-radius: 50%;
            border: 2px solid #ccc;
            transition: all 1.2s ease;
            &:hover {
              transform: rotate(360deg);
              border-color: var(--theme-color);
            }
          }
        }
        .top-close {
          position: absolute;
          top: 10px;
          left: calc(var(--m-menu-width) + 10px);
          background-color: var(--bg-content-color);
          padding: 10px;
          border-radius: 10px;
          .iconfont {
            font-size: 14px;
            color: var(--text-color);
            &:hover {
              color: var(--theme-color);
            }
          }
        }
        .serch-input-warp {
          height: 25px;
          border-radius: 5px;
          border: 1px solid var(--text-color);
          margin-bottom: 20px;
          position: relative;
          .iconfont {
            font-size: 20px;
            position: absolute;
            top: 2px;
            right: 10px;
            color: var(--text-color);
          }
          &:hover {
            border-color: var(--theme-light-color-3);
            .iconfont {
              color: var(--theme-light-color-3);
            }
          }
        }
      }
    }
    .music-play-warp {
      position: absolute;
      top: 20px;
      left: 0;
      width: 100%;
      height: 60px;
    }
  }
  .mMenuShow {
    left: 0 !important;
  }
  .layout-content-warp {
    position: relative;
    width: 100%;
    height: 100vh;
    overflow-y: auto;
    overflow-x: hidden;
    left: 0;
    transition: left 0.8s ease;
    scroll-behavior: smooth; // 平滑滚动
    .header-warp {
      width: 100%;
      height: 60px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 20px;
      background: var(--bg-warp-light-color-2);
      border-bottom: 1px solid var(--theme-light-color-5);
      transition: all 0.8s ease;
      position: fixed;
      left: 0;
      top: 0;
      z-index: 999;
      border-radius: 0px;
      font-weight: 600;
      // background-image: radial-gradient(transparent 1px, #ffffff8c 1px);
      // background-size: 6px 6px;
      // backdrop-filter: saturate(50%) blur(2px);
      .title-text {
        font-size: 25px;
        padding: 5px 10px;
        background-color: var(--theme-light-color-9);
        border-radius: 5px;
        color: var(--theme-color);
      }
      .app-title {
        cursor: url('@/assets/images/cursor/pointer.png'), auto;
        .title-sub-text {
          color: var(--text-color);
        }
        &:hover {
          .title-text {
            color: #fff;
            background-color: var(--theme-light-color);
          }
          .title-sub-text {
            color: var(--theme-color);
          }
        }
      }

      .right-nav-info {
        height: 100%;
        display: flex;
        align-items: center;
        position: relative;

        .menu-warp {
          height: 100%;
          position: absolute;
          right: -616px;
          transition: right 1s ease;
        }
        .menuShow {
          right: v-bind(avatarWidth);
        }
        .secrh-warp {
          display: flex;
          justify-content: center;
          align-items: center;
          width: v-bind(avatarWidth);
          .iconfont {
            font-size: 24px;
            color: var(--text-color);
          }
          &:hover {
            .iconfont {
              color: var(--theme-light-color-3);
            }
          }
        }
        .avatar-warp {
          width: v-bind(avatarWidth);
          img {
            margin-left: 20px;
            width: 40px;
            height: 40px;
            border-radius: 50%;
          }
        }
      }
    }

    .flutter {
      width: calc(100% - 36px);
      transition: all 0.8s ease !important;
      background-color: var(--bg-menu-flutter-color);
      background-image: none;
      position: fixed;
      left: 18px;
      top: 20px;
      z-index: 999;
      border-radius: 10px;
      word-break: keep-all;
      border: 1px solid var(--text-color-2);
      -webkit-transition: all 0.8s ease !important;
      &:hover {
        background: var(--bg-warp-color);
        border: 1px solid var(--theme-light-color);
      }
    }

    .rightHeader {
      left: var(--m-menu-width);
    }
    .rightHeader.flutter {
      left: calc(var(--m-menu-width) + 2.5%);
    }

    .mobile-header-warp {
      padding-left: 14px;
      .iconfont {
        font-size: 25px;
        color: var(--text-color);
        &:hover {
          color: var(--theme-color);
        }
      }
    }
  }
  .mainRight {
    left: var(--m-menu-width);
  }
  .top-set {
    position: fixed;
    right: 10px;
    bottom: 20px;
    z-index: 99999;
    width: 40px;
    .top,
    .set {
      // padding: 5px 12px;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: var(--bg-warp-color);
      color: var(--theme-color);
      border-radius: 5px;
      border: 1px solid var(--theme-light-color-9);
      box-shadow: 0 1px 20px 10px rgba(255, 255, 255, 0.394);
    }
    .top {
      opacity: 0;
      transition: opacity 0.8s ease;
    }
    .topShow {
      opacity: 1;
    }
    .set {
      height: 40px;
      padding: 12px;
      margin-top: 10px;
      .icon {
        color: var(--theme-color);
        &:hover {
          // animation: quan 3s infinite linear;
          transform: rotateY(30deg);
        }
      }
    }
  }

  .set-warp {
    position: fixed;
    right: 60px;
    bottom: -140px;
    height: 120px;
    max-width: 380px;
    min-width: 200px;
    background-color: transparent;
    z-index: 99999;
    border-radius: 10px;
    display: flex;
    transition: bottom 0.8s ease;
    .theme-warp {
      width: 120px;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 10px;
      border-radius: 10px;
      background-color: var(--bg-warp-light-color);
      .theme-item {
        width: 50px;
        height: 100%;
        line-height: 100px;
        text-align: center;
        margin: 0 5px;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
    .set-item {
      border-radius: 10px;
      color: var(--text-color);
      box-shadow: 0 1px 20px 10px rgba(255, 255, 255, 0.394);
      background-color: var(--bg-content-color);
      border: 1px solid var(--theme-light-color-3);
      color: var(--text-color);
      overflow: hidden;
      display: flex;
      justify-content: center;
      align-items: center;
      img {
        border-radius: 10px;
      }
    }
    .bg-img-warp {
      margin-left: 10px;
      width: 120px;
      display: flex;
      flex-wrap: wrap;
      padding: 10px;
      border-radius: 10px;
      background-color: var(--bg-warp-light-color);
      .bg-img-item {
        width: 40px;
        height: 40px;
        text-align: center;
        line-height: 40px;
        margin: 5px;
      }
      .cursor-effect {
        width: 90px;
        margin-left: 5px;
      }
    }
    .font-warp {
      margin-left: 10px;
      width: 60px;
      display: flex;
      flex-direction: column;
      padding: 10px;
      border-radius: 10px;
      background-color: var(--bg-warp-light-color);
      .font-item {
        width: 40px;
        height: 40px;
        line-height: 40px;
        margin: 5px 0;
        text-align: center;
      }
    }
  }

  .music-player-warp {
    position: fixed;
    right: 60px;
    bottom: -120px;
    height: 100px;
    width: 320px;
    background-color: transparent;
    z-index: 99999;
    border-radius: 10px;
    display: flex;
    transition: bottom 0.8s ease;
  }
  .search-home-warp {
    position: fixed;
    width: 100vw;
    height: 100vh;
    top: -150vh;
    left: 0;
    z-index: 999;
    // background-color: var(--bg-modal-warp-color);
    background-color: transparent;
    transition: top 1s ease;
  }
  .is-show-search {
    top: 0 !important;
  }
  .playerShow {
    bottom: 15px;
  }
  .setShow {
    bottom: 20px;
  }
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>

<style lang="scss">
.dark {
  .header-warp {
    background-image: none !important;
  }
}
.welcome-toast {
  font-size: 12px;
  text-wrap: nowrap;
}
</style>
