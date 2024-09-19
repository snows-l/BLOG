<!--
 * @Description: ------------ fileDescription -----------
 * @Author: snows_l snows_l@163.com
 * @Date: 2024-09-19 15:01:50
 * @LastEditors: snows_l snows_l@163.com
 * @LastEditTime: 2024-09-19 15:23:08
 * @FilePath: /blog/src/components/Notice/index.vue
-->
<template>
  <div class="notice-container-warp">
    <h2 class="title">NOTICE</h2>
    <div class="notice-content-padding">
      <div class="notice-content">
        <div class="scrolling-text">
          小伙伴们大家好，我是snows_l，欢迎访问我的博客，可以互换友联，或者收藏博客。感兴趣的小伙伴可以
          <span class="pointer" @click="handleTo('/about/me')">获取联系方式私聊我</span>
          或者
          <span class="pointer" @click="handleTo('/msg-board')">留言</span>
          获取源代码（前端Vue3.0，后端Node.js，数据库MySQL）。
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, watch, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const handleTo = (path: string) => {
  router.push(path);
};
</script>

<style lang="scss" scoped>
.notice-container-warp {
  width: 100%;
  height: 100%;
  margin-bottom: 20px;
  .title {
    margin-bottom: 20px;
  }
  .notice-content-padding {
    border-radius: 10px;
    padding: 20px;
    background-color: var(--bg-content-color);
    box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
    .notice-content {
      overflow: hidden;
      padding: 20px;
      .scrolling-text {
        font-size: 16px;
        white-space: nowrap;
        color: var(--text-color);
        animation: scrollText 20s linear infinite;
        span {
          color: var(--theme-light-color-4);
          &:hover {
            color: var(--theme-color);
          }
        }
      }
    }
  }
}
@keyframes scrollText {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-100%);
  }
}
@keyframes swing {
  0% {
    transform: rotate(18deg);
  }
  100% {
    transform: rotate(-18deg);
  }
}
@keyframes changeColor {
  0% {
    filter: hue-rotate(180deg);
  }

  100% {
    filter: hue-rotate(360deg);
  }
}
</style>
