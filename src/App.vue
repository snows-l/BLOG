<!--
 * @Description: ------------ fileDescription -----------
 * @Author: snows_l snows_l@163.com
 * @Date: 2024-08-05 12:46:00
 * @LastEditors: snows_l snows_l@163.com
 * @LastEditTime: 2024-09-10 17:40:10
 * @FilePath: /blog/src/App.vue
-->

<template>
  <div class="app-warp">
    <RouterView />
    <!-- 置顶 / 音乐 / 设置 -->
    <div class="top-set">
      <!-- <div class="top pointer" style="padding: 5px 0" :class="{ topShow: state.scrollTop > 200 }" @click="handleTop">
        <i class="iconfont icon-yooxi"></i>
      </div>
      <div class="set pointer" @click="handleSearch(false)" v-if="isMobi">
        <img width="25px" height="25px" :src="getImgIcon('icon-search.svg')" />
      </div> -->
      <div class="set pointer" style="display: flex; align-items: center; justify-content: center" @click="handleShowMusicPlayer">
        <img v-if="state.isMusicPlaying" width="25px" height="25px" style="border-radius: 50%" src="@/assets/images/common/playing.gif" alt="" />
        <img v-else width="25px" height="25px" :src="getImgIcon('icon-music.svg')" />
      </div>
      <!-- <div class="set pointer" @click="handleSetShow">
        <img width="25px" height="25px" :src="getImgIcon('icon-set.svg')" />
      </div> -->
    </div>
  </div>
</template>

<script setup lang="ts">
import { setDocmentTitle, getImgIcon } from '@/utils/common';
import { setPrimaryColor } from '@/utils/theme';
import { watch, onMounted, reactive } from 'vue';
import { RouterView, useRoute } from 'vue-router';
import { routes } from './router/index';

const route = useRoute();
let routesList = [];
routes.forEach(item => {
  if (item.children) {
    item.children.forEach(child => {
      routesList.push(child);
    });
  } else {
    routesList.push(item);
  }
});

const state = reactive({
  isShowSearch: false
});

if (localStorage.getItem('primaryColor')) {
  setPrimaryColor(localStorage.getItem('primaryColor'));
}

const handleSearch = isClose => {
  if (isClose) {
    state.isShowSearch = false;
  } else {
    state.isShowSearch = !state.isShowSearch;
  }
  if (state.isShowSearch) {
    state.mMenuShow = false;
  }
};

// 显示/隐藏 设置
const handleSetShow = () => {
  state.isSetShow = !state.isSetShow;
  if (state.isMusicPlayerShow) state.isMusicPlayerShow = false;
};

watch(
  () => route.path,
  n => {
    let title = '';
    for (let i = 0; i < routesList.length; i++) {
      if (routesList[i].path === n) {
        title = routesList[i].meta.title;
        break;
      }
    }
    if (title === '') title = '首页';
    setDocmentTitle('☂ ' + title + ' | ' + import.meta.env.VITE_API_TITLE);
  }
);

onMounted(() => {
  // 移除首屏加载动画
  if (document.getElementById('Loading')) document.getElementById('Loading').remove();
});
</script>

<style lang="scss" scoped>
.app-warp {
  width: 100%;
  position: relative;
  height: 100%;
  overflow: hidden;
  .top-set {
    position: fixed;
    right: 10px;
    bottom: 70px;
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
}
</style>
