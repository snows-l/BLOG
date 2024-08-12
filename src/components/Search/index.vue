<!--
 * @Description: ------------ fileDescription -----------
 * @Author: snows_l snows_l@163.com
 * @Date: 2024-08-12 16:58:22
 * @LastEditors: snows_l snows_l@163.com
 * @LastEditTime: 2024-08-12 18:17:36
 * @FilePath: /blog/src/components/Search/index.vue
-->
<template>
  <div class="search-warp" @click="handleClickMadel">
    <div class="search-content-warp" :class="{ 'm-search-content-warp': isMobi }">
      <div class="input-warp">
        <div class="left-info"></div>
        <input class="input" type="text" placeholder="搜索" />
        <div class="other-warp pointer">
          <i class="iconfont icon-sousuo1"></i>
        </div>
      </div>
      <div class="serch-content">
        <div class="music-warp"></div>
        <div class="article-warp"></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, watch, onMounted, computed } from 'vue';
import useResize from '../../hooks/useResize';
const { isMobi } = useResize();

const emits = defineEmits(['close']);

const handleClickMadel = e => {
  console.log('------- e -------', e);
  e.stopPropagation();
  e.preventDefault();
  // emits('close');
};
</script>

<style lang="scss" scoped>
.search-warp {
  width: 100vw;
  height: 80vh;
  position: relative;
  background-image: url('@/assets/images/common/bg1.png');
  padding: 30px 20px;
  .search-content-warp {
    height: 100%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    max-width: var(--content-max-width);
    padding: 50px 20px 30px 20px;
    .input-warp {
      height: 50px;
      border-radius: 15px;
      border: 1px solid var(--text-color-2);
      overflow: hidden;
      background-color: var(--bg-warp-color);
      width: 100%;
      display: flex;
      .input {
        height: 100%;
        width: calc(100% - 80px);
        outline: none;
        border: none;
        font-size: 16px;
      }
      .other-warp {
        width: 60px;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        i {
          font-size: 24px;
          color: var(--text-color-2);
        }
      }
      .left-info {
        width: 20px;
        height: 100%;
      }
    }
    .serch-content {
      margin-top: 20px;
      width: 100%;
      height: calc(100% - 80px);
      border-radius: 15px;
      background: var(--bg-warp-color);
    }
  }
  .m-search-content-warp {
    max-width: 96%;
  }
}
</style>
