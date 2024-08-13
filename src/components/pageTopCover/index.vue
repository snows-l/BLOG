<!--
 * @Description: ------------ fileDescription -----------
 * @Author: snows_l snows_l@163.com
 * @Date: 2024-08-09 16:19:38
 * @LastEditors: snows_l snows_l@163.com
 * @LastEditTime: 2024-08-13 10:22:26
 * @FilePath: /blog/src/components/pageTopCover/index.vue
-->
<template>
  <div
    class="page-top-cover-warp"
    :class="{ 'm-page-top-cover-warp': isMobile }"
    style="background-size: cover; background-position: center; background-repeat: no-repeat"
    :style="{ backgroundImage: `url(${coverImg})` }">
    <div class="content-warp" :class="{ 'default-bg-color': !bgColor }">
      <div class="mudule">
        <i class="iconfont" :class="icon"></i>
        <span class="text">{{ moduleTitle }}</span>
      </div>
      <div class="title-warp" v-if="mudulDesc">{{ mudulDesc }}</div>
      <div class="article-info" v-if="isArticle">
        <div>
          <img :src="avatar" alt="" />
          <span>snows_l</span>
        </div>
        <div>
          <i class="iconfont icon-yanjing"></i>
          <span>{{ articleInfo.views || randomNum(99, 99999) }}</span>
        </div>
        <div>
          <i class="iconfont icon-comment"></i>
          <span>{{ articleInfo.views || randomNum(5, 20) }}</span>
        </div>
        <div>
          <i class="iconfont icon-fenxiang1"></i>
          <span>{{ articleInfo.views || randomNum(20, 1000) }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { getQQAvatar } from '@/utils/common';
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
  isArticle: {
    type: Boolean,
    default: true
  },
  articleInfo: {
    type: Object,
    default: {}
  },
  bgColor: {
    type: String || Boolean,
    default: false
  }
});

let avatar = getQQAvatar();

// 产生0-99999之间的数据数
const randomNum = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
</script>

<style lang="scss" scoped>
.page-top-cover-warp {
  width: 100%;
  height: 400px;
  position: relative;
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
        font-size: 36px;
      }
      .text {
        color: var(--text-color);
        font-size: 36px;
      }
    }
    .title-warp {
      margin-top: 10px;
      height: 50px;
      line-height: 25px;
      font-size: 22px;
      color: var(--text-color);
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
      text-overflow: ellipsis;
      text-align: left;
    }
    .article-info {
      margin-top: 0px;
      height: 46px;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      div {
        display: flex;
        align-items: center;
        margin-right: 20px;
        .iconfont {
          margin-right: 10px;
          font-size: 20px;
          color: var(--theme-color);
        }
        .icon-yanjing {
          font-size: 24px;
        }
        span {
          font-size: 12px;
          color: var(--text-color);
        }
      }
      img {
        width: 30px;
        height: 30px;
        border-radius: 50%;
        margin-right: 10px;
      }
    }
  }
  .default-bg-color {
    background-color: var(--bg-cover-color);
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
