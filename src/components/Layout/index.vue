<!--
 * @Description: ------------ fileDescription -----------
 * @Author: snows_l snows_l@163.com
 * @Date: 2024-08-05 16:01:58
 * @LastEditors: snows_l snows_l@163.com
 * @LastEditTime: 2024-08-15 16:04:37
 * @FilePath: /blog/src/components/Layout/index.vue
-->
<template>
  <div class="layout-warp" :style="{ backgroundImage: `url(${state.bgImg})` }">
    <!-- 移动端 菜单 -->
    <div class="mobile-menu-warp" :class="{ mMenuShow: state.mMenuShow }">
      <div class="mobile-menu">
        <div class="avatar-warp">
          <img class="avatar pointer" @click="handleTo('avatar')" :src="state.avatar" alt="" srcset="" />
        </div>
        <div class="serch-input-warp pointer" @click="handleSearch">
          <i class="iconfont icon-sousuo1"></i>
        </div>
        <Menu :menuList="state.menuList" :isMobile="true" @menu-change="state.mMenuShow = false" />
      </div>
    </div>

    <!-- layout-warp -->
    <div class="layout-content-warp" :class="{ mainRight: state.mMenuShow }" ref="layoutRef">
      <!-- mobile header -->
      <header class="mobile-header-warp header-warp" :class="{ rightHeader: state.mMenuShow, flutter: state.isFlutter }" v-if="isMobi">
        <div class="icon-warp">
          <i class="iconfont" :class="state.mMenuShow ? 'icon-cc-close-crude' : 'icon-caidan'" @click="handleMMenuShow"></i>
          <i class="iconfont icon-sousuo1" style="margin-left: 10px" @click="handleSearch"></i>
        </div>
        <div class="app-title">
          <span class="title-text" @click="handleTo('/')">snows_l</span>
          <span class="title-sub-text" style="margin: 0 10px 0 5px">の</span>
          <span class="title-sub-text">BLOG</span>
        </div>
      </header>

      <!-- 悬浮菜单 -->
      <header v-else class="header-warp" :class="state.isFlutter ? 'flutter' : ''">
        <div class="app-title">
          <span class="title-text" @click="handleTo('/')">snows_l</span>
          <span class="title-sub-text" style="margin: 0 10px 0 5px">の</span>
          <span class="title-sub-text">BLOG</span>
        </div>
        <div class="right-nav-info">
          <div class="menu-warp" :class="{ menuShow: state.isMenuShow }">
            <Menu :menuList="state.menuList" />
          </div>
          <div class="pointer secrh-warp">
            <i class="iconfont icon-sousuo1" @click="handleSearch"></i>
            <!-- <img style="width: 40px; height: 40px; border-radius: 50%" src="@/assets/images/common/default_avatar.png" alt="" /> -->
          </div>
        </div>
      </header>

      <!-- main -->
      <main @click="handleClickMain" id="main">
        <router-view></router-view>
      </main>
    </div>

    <!-- 置顶 / 音乐 / 设置 -->
    <div class="top-set">
      <div class="top pointer" :class="{ topShow: state.scrollTop > 200 }" @click="handleTop">
        <i class="iconfont icon-yooxi"></i>
      </div>
      <div class="set pointer" style="display: flex; align-items: center; justify-content: center" @click="handleShowMusicPlayer">
        <img v-if="state.isMusicPlaying" width="25px" height="25px" style="border-radius: 50%" src="@/assets/images/common/playing.gif" alt="" />
        <i v-else class="icon iconfont icon-a-yinlebofangliebiaoyinle"></i>
      </div>
      <div class="set pointer" @click="handleSetShow">
        <i class="icon iconfont icon-shezhi"></i>
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
        <div class="bg-img-item set-item pointer" @click="handleToggleBgImg(0)">
          <img width="30px" height="30px" src="@/assets/images/icon/icon-huahua.png" fit="fill" />
        </div>
        <div class="bg-img-item set-item pointer" @click="handleToggleBgImg(1)">
          <img width="30px" height="30px" src="@/assets/images/icon/icon-diandian.png" fit="fill" />
        </div>
        <div class="bg-img-item set-item pointer" @click="handleToggleBgImg(2)">
          <img width="30px" height="30px" src="@/assets/images/icon/icon-taoxin.png" fit="fill" />
        </div>
        <div class="bg-img-item set-item pointer" @click="handleToggleBgImg(3)">
          <img width="30px" height="30px" src="@/assets/images/icon/icon-xigua.png" fit="fill" />
        </div>
      </div>
      <div class="font-warp">
        <div class="font-item set-item pointer a" @click="handleToggleFont">
          <img width="25px" height="25px" src="@/assets/images/icon/icon-font-toggle.png" fit="fill" />
        </div>
        <div class="font-item set-item pointer b">
          <input :value="state.currentPrimaryColor" style="height: 20px; width: 30px" type="color" name="color" id="color" @change="handleToggleColor" />
        </div>
      </div>
    </div>

    <!-- 音乐播放器 -->
    <div class="music-player-warp" :class="{ playerShow: state.isMusicPlayerShow }">
      <MusicPlayer @music-status="handleMusicStatus" :currentMusicId="state.currentMusicId"></MusicPlayer>
    </div>

    <div class="search-home-warp" :class="{ 'is-show-search': state.isShowSearch }" @click="e => handleClickSrearchModal(e)">
      <Search @close="state.isShowSearch = false" :show="state.isShowSearch"></Search>
    </div>
  </div>
  <div class="snow" style="width: 100%; height: 100%; position: fixed; top: 0; left: 0; z-index: 9; pointer-events: none" id="snow"></div>
</template>

<script lang="ts" setup>
import sakura from '@/utils/sakura';
import { Particle, Snow } from 'jparticles'; // 引入粒子效果库 引入雪花效果库
import bg1 from '@/assets/images/bg/bg1.png';
import bg2 from '@/assets/images/bg/bg2.png';
import bg3 from '@/assets/images/bg/bg3.png';
import bg4 from '@/assets/images/bg/bg4.png';
import $bus from '@/bus/index';
import MusicPlayer from '@/components/musicPlayer/index.vue';
import Search from '@/components/Search/index.vue';
import { routes } from '@/router';
import { getQQAvatar } from '@/utils/common';
import { setFontFamily, setPrimaryColor, setTheme } from '@/utils/theme';
import { onMounted, onUnmounted, reactive, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import Menu from './Menu.vue';

import useResize from '@/hooks/useResize';
const { isMobi } = useResize();

const route = useRoute();
const router = useRouter();
const layoutRef = ref(null);

const state = reactive({
  // isMobile: isMobile(),
  isFlutter: true,
  scrollTop: 0,
  activeMemu: route.path,
  isMenuShow: false,
  mMenuShow: false,
  isSetShow: false,
  currentPrimaryColor: localStorage.getItem('primaryColor') || '#18a058',
  isMusicPlayerShow: false,
  isMusicPlaying: false,
  isShowSearch: false,
  currentMusicId: 0,
  bgImg: bg1,
  fontFamilyIndex: 0,
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
  layoutRef.value.scrollTop = 0;
};

// 切换主题
const handleToggerTheme = (theme: string) => {
  setTheme(theme);
};

// 切换背景
const handleToggleBgImg = (index: number) => {
  switch (index) {
    case 0:
      state.bgImg = bg1;
      break;
    case 1:
      state.bgImg = bg2;
      break;
    case 2:
      state.bgImg = bg3;
      break;

    case 3:
      state.bgImg = bg4;
      break;
    default:
      break;
  }
};

const fontFamilys = ['优设标题黑', '华文行楷', 'apple', 'DSDIGI', 'default'];
// 切换字体
const handleToggleFont = () => {
  if (state.fontFamilyIndex === fontFamilys.length - 1) {
    state.fontFamilyIndex = 0;
  } else {
    state.fontFamilyIndex++;
  }
  setFontFamily(fontFamilys[state.fontFamilyIndex]);
};

// 设置主要颜色
const handleToggleColor = e => {
  setPrimaryColor(e.target.value);
  state.currentPrimaryColor = e.target.value;
  localStorage.setItem('primaryColor', state.currentPrimaryColor);
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

// 显示/隐藏 设置
const handleSetShow = () => {
  state.isSetShow = !state.isSetShow;
  if (state.isMusicPlayerShow) state.isMusicPlayerShow = false;
};

// 显示/隐藏 搜索
const handleSearch = () => {
  state.isShowSearch = !state.isShowSearch;
  if (state.isShowSearch) {
    state.mMenuShow = false;
  }
};

const handleClickSrearchModal = e => {
  state.isShowSearch = false;
};

// 监页面是否滚动
watch(
  () => state.scrollTop,
  () => {
    if (state.isSetShow) state.isSetShow = false;
    if (state.isMusicPlayerShow) state.isMusicPlayerShow = false;
    // handleClickMain();
  }
);

// 监听滚动条
const scorllCallback = () => {
  if (state.mMenuShow) state.mMenuShow = false;
  state.scrollTop = layoutRef.value.scrollTop;
  if (layoutRef.value.scrollTop > 60) {
    state.isFlutter = false;
  } else {
    state.isFlutter = true;
  }
};

// // 监听窗口大小变化
// const resizeCallback = () => {
//   state.isMobile = isMobile();
// };

onMounted(() => {
  layoutRef.value.addEventListener('scroll', scorllCallback);
  setTimeout(() => {
    state.isMenuShow = true;
  }, 200);
  // window.addEventListener('resize', resizeCallback);
  $bus.on('playMusic', ({ id }) => {
    state.currentMusicId = id;
    if (!state.isMusicPlayerShow) {
      state.isMusicPlayerShow = true;
    }
  });

  // 下樱花调用配置
  new Snow('#snow', { num: 3, maxR: 3, minR: 20, maxSpeed: 0.1, minSpeed: 0.3, swing: true, swingProbability: 0.1, spin: true, shape: sakura() });
});

onUnmounted(() => {
  layoutRef.value && layoutRef.value.removeEventListener('scroll', scorllCallback);
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
      padding: 40px;
      width: var(--m-menu-width);
      height: 100%;
      background-color: var(--bg-meun-warp-color);
      transition: left 0.8s ease;
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
      background: var(--bg-warp-color);
      border-bottom: 1px solid var(--theme-light-color-3);
      transition: left 0.8s ease, width 0.8s ease, top 0.8s ease;
      position: fixed;
      left: 0;
      top: 0;
      z-index: 999;
      border-radius: 0px;
      font-weight: 600;
      .title-text {
        font-size: 25px;
        padding: 5px 10px;
        background-color: var(--theme-light-color-9);
        border-radius: 5px;
        color: var(--text-color);
      }
      .app-title {
        cursor: url('@/assets/images/cursor/pointer.png'), auto;
        .title-sub-text {
          color: var(--text-color);
        }
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
          right: -402px;
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
      width: 95%;
      -webkit-transition: all 0.8s ease !important;
      transition: all 0.8s ease !important;
      background: transparent;
      position: fixed;
      left: 2.5%;
      top: 2.5%;
      z-index: 999;
      border-radius: 10px;
      word-break: keep-all;
      border: 1px solid var(--text-color);
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
      padding: 5px 12px;
      background-color: var(--bg-warp-color);
      color: var(--theme-color);
      border-radius: 5px;
      border: 1px solid var(--theme-light-color-3);
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
.n-menu.n-menu--horizontal {
  .n-menu-item-content {
    padding: 0 16px;
  }
}
.n-submenu,
.n-menu-item-content,
.iconfont,
.router-link-active,
a {
  cursor: url('@/assets/images/cursor/pointer.png'), auto !important;
}
.n-menu-item-content__icon {
  margin-right: 4px !important;
}
.n-menu-item-content:hover {
  a,
  .iconfont {
    color: var(--theme-color) !important;
  }
}
</style>
