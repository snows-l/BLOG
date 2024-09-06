<!--
 * @Description: ------------ fileDescription -----------
 * @Author: snows_l snows_l@163.com
 * @Date: 2024-08-09 16:19:38
 * @LastEditors: snows_l snows_l@163.com
 * @LastEditTime: 2024-09-06 12:48:38
 * @FilePath: /blog/src/components/common/pageTopCover.vue
-->

<!--
  * @Description: 页面top封面组件
  *props:
  * coverImg: 封面图片地址
  * moduleTitle: 模块标题
  * mudulDesc: 模块描述
  * imgIcon: 图标图片地址 优先级 imgIcon > textIcon > icon
  * textIcon: 图标文字
  * icon: 图标类名
  * isMobile: 是否是移动端
  * articleInfo: 文章信息
-->
<template>
  <div class="page-top-cover-warp" :class="{ 'm-page-top-cover-warp': isMobile }" style="background-size: cover; background-position: center; background-repeat: no-repeat">
    <img class="cover-img" :src="coverImg" />
    <div class="content-warp">
      <div class="mudule">
        <img class="icon-img" v-if="imgIcon" :src="getImgIcon(imgIcon)" alt="" />
        <span v-else-if="textIcon" class="iconfont">{{ textIcon }}</span>
        <i v-else class="iconfont" :class="icon"></i>
        <span class="text">{{ moduleTitle }}</span>
      </div>
      <div class="title-warp" v-if="mudulDesc">{{ mudulDesc }}</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { getImgIcon, getQQAvatar } from '@/utils/common';
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
  imgIcon: {
    type: String,
    default: ''
  },
  textIcon: {
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
  .cover-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    top: 0;
    left: 0;
    position: absolute;
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
      align-items: center;
      .iconfont {
        margin-right: 20px;
        // color: var(--text-color);
        color: #fff;
        font-size: 24px;
      }
      .icon-img {
        width: 36px;
        height: 36px;
        margin-right: 20px;
      }
      .text {
        // color: var(--text-color);
        color: #fff;
        font-size: 24px;
      }
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
      text-align: center;
      color: #fff;
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
    max-width: var(--content-max-width-m) !important;
  }
}
</style>
