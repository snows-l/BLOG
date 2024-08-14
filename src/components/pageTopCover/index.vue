<!--
 * @Description: ------------ fileDescription -----------
 * @Author: snows_l snows_l@163.com
 * @Date: 2024-08-09 16:19:38
 * @LastEditors: snows_l snows_l@163.com
 * @LastEditTime: 2024-08-14 14:06:46
 * @FilePath: /blog/src/components/pageTopCover/index.vue
-->
<template>
  <div
    class="page-top-cover-warp"
    :class="{ 'm-page-top-cover-warp': isMobile }"
    style="background-size: cover; background-position: center; background-repeat: no-repeat"
    :style="{ backgroundImage: `url(${coverImg})` }">
    <div class="content-warp" :class="{ 'default-bg-color': !bgColor }">
      <div class="mudule" :class="{ 'module-bg-color': moduleBgColor }">
        <i class="iconfont" :class="icon"></i>
        <span class="text">{{ moduleTitle }}</span>
      </div>
      <div class="title-warp" v-if="mudulDesc">{{ mudulDesc }}</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { getQQAvatar, randomNum } from '@/utils/common';
const props = defineProps({
  coverImg: {
    type: String,
    requird: true,
    default: ''
  },
  moduleTitle: {
    type: String,
    default: ''
  },
  mudulDesc: {
    type: String,
    default: ''
  },
  icon: {
    type: String,
    default: ''
  },
  isMobile: {
    type: Boolean,
    default: false
  },
  articleInfo: {
    type: Object,
    default: {}
  },
  bgColor: {
    type: String || Boolean,
    default: false
  },
  moduleBgColor: {
    type: String || Boolean,
    default: false
  }
});

let avatar = getQQAvatar();
</script>

<style lang="scss" scoped>
.page-top-cover-warp {
  width: 100%;
  height: 400px;
  position: relative;
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: var(--bg-warp-light-color-2);
  }
  .content-warp {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: 200px;
    height: 180px;
    max-width: var(--content-max-width);
    width: 100%;
    padding: 20px;
    border-radius: 20px;
    background-color: v-bind(bgColor);
    display: flex;
    flex-direction: column;
    justify-content: center;
    .mudule {
      height: 36px;
      display: flex;
      justify-content: center;
      .iconfont {
        margin-right: 20px;
        color: var(--text-color);
        font-size: 24px;
      }
      .text {
        color: var(--text-color);
        font-size: 24px;
      }
    }
    .module-bg-color {
      background-color: v-bind(moduleBgColor);
    }
    .title-warp {
      margin-top: 10px;
      height: 50px;
      line-height: 25px;
      font-size: 18px;
      color: var(--text-color);
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
      text-overflow: ellipsis;
      text-align: left;
    }
  }
  .default-bg-color {
    // background-color: var(--bg-cover-color);
  }
}
.m-page-top-cover-warp {
  height: 300px !important;
  .content-warp {
    top: 100px !important;
    max-width: 96% !important;
  }
}
</style>
