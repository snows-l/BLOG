<!--
 * @Description: ------------ fileDescription -----------
 * @Author: snows_l snows_l@163.com
 * @Date: 2024-08-05 16:01:58
 * @LastEditors: snows_l snows_l@163.com
 * @LastEditTime: 2024-08-08 21:31:02
 * @FilePath: /BLOG/src/components/Layout/index.vue
-->
<template>
  <div class="layout-warp">
    <div class="mobile-menu-warp" :class="{ mMenuShow: state.mMenuShow }">
      <div class="mobile-menu">
        <!-- <div class="top-close">
          <i class="iconfont icon-cc-close-crude" @click="handleMMenuShow(false)"></i>
        </div> -->
        <div class="avatar-warp">
          <img class="avatar pointer" @click="handleTo('avatar')" :src="state.avatar" alt="" srcset="" />
        </div>
        <Menu :menuList="state.menuList" :isMobile="true" @menu-change="state.mMenuShow = false" />
      </div>
    </div>
    <div class="layout-content-warp" :class="{ mainRight: state.mMenuShow }" ref="layoutRef">
      <!-- mobile header -->
      <header class="mobile-header-warp header-warp" :class="{ rightHeader: state.mMenuShow, flutter: state.isFlutter }" v-if="state.isMobile">
        <i class="iconfont" :class="state.mMenuShow ? 'icon-cc-close-crude' : 'icon-caidan'" @click="handleMMenuShow"></i>
        <div class="app-title">
          <span class="title-text" @click="handleTo('/')">snows_l</span>
          <span class="title-sub-text" style="margin: 0 10px 0 5px">の</span>
          <span class="title-sub-text">BLOG</span>
        </div>
      </header>
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
          <div class="avatar-warp">
            <img style="width: 40px; height: 40px; border-radius: 50%" src="@/assets/images/common/default_avatar.png" alt="" />
          </div>
        </div>
      </header>
      <main @click="handleClickMain">
        <router-view></router-view>
      </main>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { routes } from '@/router';
import { getQQAvatar, isMobile } from '@/utils/common';
import { onMounted, onUnmounted, reactive, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import Menu from './Menu.vue';

const route = useRoute();
const router = useRouter();
const layoutRef = ref(null);

const state = reactive({
  isMobile: isMobile(),
  isFlutter: true,
  activeMemu: route.path,
  isMenuShow: false,
  mMenuShow: false,
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

const handleClickMain = () => {
  if (state.mMenuShow) state.mMenuShow = false;
};

// 监听滚动条
const scorllCallback = () => {
  if (state.mMenuShow) state.mMenuShow = false;
  if (layoutRef.value.scrollTop > 60) {
    state.isFlutter = false;
  } else {
    state.isFlutter = true;
  }
};

const handleMMenuShow = (falg: boolean) => {
  state.mMenuShow = !state.mMenuShow;
};

onMounted(() => {
  layoutRef.value.addEventListener('scroll', scorllCallback);
  setTimeout(() => {
    state.isMenuShow = true;
  }, 200);
});

onUnmounted(() => {
  layoutRef.value && layoutRef.value.removeEventListener('scroll', scorllCallback);
});
</script>

<style lang="scss" scoped>
.layout-warp {
  height: 100vh;
  overflow: hidden;
  background-image: url('@/assets/images/common/bg-img.png');
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
      background-color: var(--bg-content-color);
      transition: left 0.8s ease;
      .avatar-warp {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-bottom: 40px;
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
        background-color: var(--bg-content-color);
        border-radius: 5px;
        color: var(--text-color);
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
          right: -402px;
          transition: right 1s ease;
        }
        .menuShow {
          right: v-bind(avatarWidth);
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
