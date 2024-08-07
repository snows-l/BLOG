<!--
 * @Description: ------------ fileDescription -----------
 * @Author: snows_l snows_l@163.com
 * @Date: 2024-08-05 16:01:58
 * @LastEditors: snows_l snows_l@163.com
 * @LastEditTime: 2024-08-07 15:49:16
 * @FilePath: /blog/src/components/Layout/index.vue
-->
<template>
  <div class="layout-warp">
    <div class="layout-content-warp" ref="layoutRef">
      <header class="header-warp" :class="state.isFlutter ? 'flutter' : ''">
        <div class="app-title">
          <span class="title-text" @click="handleTo('/')">snows_l</span>
          <span class="title-sub-text" style="margin: 0 10px 0 5px">の</span>
          <span class="title-sub-text">BLOG</span>
        </div>
        <div class="right-nav-info">
          <div class="menu-warp" :class="{ menuShow: state.isMenuShow }">
            <n-menu v-model:value="state.activeMemu" mode="horizontal" :options="menuOptions" responsive accordion />
          </div>
          <div class="avatar-warp">
            <img style="width: 40px; height: 40px; border-radius: 50%" src="@/assets/images/common/default_avatar.png" alt="" />
          </div>
        </div>
      </header>
      <main>
        <router-view></router-view>
      </main>
    </div>
  </div>
</template>

<script lang="ts" setup>
// import '/live2d/TweenLite.js';
// import '/live2d/live2dcubismcore.min.js';
// import '/live2d/pixi.min.js';
// import '/live2d/cubism4.min.js';
// import '/live2d/pio.css';
// import '/live2d/pio.js';
// import '/live2d/pio_sdk4.js';
// import '/live2d/load.js';

import { routes } from '@/router';
import type { MenuOption } from 'naive-ui';
import { NMenu } from 'naive-ui';
import { computed, h, onMounted, onUnmounted, reactive, ref } from 'vue';
import { RouterLink, useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const layoutRef = ref(null);

const state = reactive({
  isFlutter: true,
  activeMemu: route.path,
  isMenuShow: false
});

let avatarWidth = ref('60px');
let menuWarpWidth = ref('352px');
let rightAvatarWidth = computed(() => {
  return -(Number(avatarWidth.value.replace('px', '')) + Number(menuWarpWidth.value.replace('px', ''))) + 'px';
});

const menuOptions: MenuOption[] = routes.map(item => {
  return {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            name: item.name,
            param: {
              lang: 'zh-CN'
            }
          }
        },
        { default: () => item.meta.title }
      ),
    key: item.name,
    icon: () => h('i', { class: `iconfont ${item.meta.icon}` }),
    children: item.children
      ? item.children.map(child => {
          return {
            label: () =>
              h(
                RouterLink,
                {
                  to: {
                    name: child.name,
                    param: {
                      lang: 'zh-CN'
                    }
                  }
                },
                { default: () => child.meta.title }
              ),
            key: child.name,
            icon: () => h('i', { class: `iconfont ${child.meta.icon}` })
          };
        })
      : []
  };
});

const handleTo = (path: string) => {
  router.push(path);
};

// 监听滚动条
const scorllCallback = () => {
  if (layoutRef.value.scrollTop > 60) {
    state.isFlutter = false;
  } else {
    state.isFlutter = true;
  }
};
onMounted(() => {
  layoutRef.value.addEventListener('scroll', scorllCallback);
  state.isMenuShow = true;
});

onUnmounted(() => {
  layoutRef.value.removeEventListener('scroll', scorllCallback);
});
</script>

<style lang="scss" scoped>
.layout-warp {
  --right-avatar-width: 60;
  --menu-warp-width: 352;
  height: 100vh;
  overflow: hidden;
  background-image: url('@/assets/images/common/bg-img.png');
  position: relative;
  .layout-content-warp {
    position: relative;
    width: 100%;
    height: 100vh;
    overflow-y: auto;
    overflow-x: hidden;

    .header-warp {
      width: 100%;
      height: 60px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 20px;
      background: var(--bg-warp-color);
      border-bottom: 1px solid var(--theme-light-color-3);
      transition: all 0.8s ease;
      position: fixed;
      left: 0;
      top: 0;
      z-index: 999;
      border-radius: 0px;
      font-weight: 600;
      .title-text {
        font-size: 25px;
        padding: 5px 10px;
        background-color: rgba(255, 255, 255, 0.5);
        border-radius: 5px;
        color: #505050;
      }
    }
    .flutter:hover {
      background: var(--bg-warp-color);
      border: 1px solid var(--theme-light-color);
    }
    .app-title {
      cursor: url('@/assets/images/cursor/pointer.png'), auto;
    }
    .app-title:hover {
      .title-text {
        color: #fff;
        background-color: var(--theme-light-color);
      }
    }
    .flutter {
      width: 95%;
      -webkit-transition: all 1s ease !important;
      transition: all 1s ease !important;
      background: transparent;
      position: fixed;
      left: 2.5%;
      top: 2.5%;
      z-index: 999;
      border-radius: 10px;
      word-break: keep-all;
      border: 1px solid #fff;
    }
    .right-nav-info {
      display: flex;
      align-items: center;
      position: relative;

      .menu-warp {
        position: absolute;
        // right: v-bind(rightAvatarWidth);
        right: -412px;
        transition: right 1s ease-in;
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
