<!--
 * @Description: ------------ fileDescription -----------
 * @Author: snows_l snows_l@163.com
 * @Date: 2024-07-08 10:56:57
 * @LastEditors: snows_l snows_l@163.com
 * @LastEditTime: 2024-08-11 20:23:58
 * @FilePath: /BLOG/src/components/Empty/index.vue
-->
<template>
  <div class="custom-empty-warp">
    <div class="empty-warp">
      <div class="loading-warp" v-if="loading">
        <img class="loading-img" src="@/assets/images/common/loading.svg" alt="" />
        <span class="empty-text">{{ loadingText }}</span>
      </div>
      <div class="img-warp" v-else>
        <img class="empty-img" src="@/assets/images/common/empty.png" alt="" />
        <span class="empty-text">{{ text }}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup name="Empty">
import { useAttrs, useSlots } from 'vue';

// 插槽
const slots = useSlots();
// 兜底属性 除去 defineProps， defineEmits定义过的所以属性以及事件 事件需要加上on前缀然后小驼峰
const attrs = useAttrs();

const props = defineProps({
  text: {
    type: String,
    default: '暂无数据'
  },
  loading: {
    type: Boolean,
    default: false
  },
  loadingText: {
    type: String,
    default: '加载中...'
  }
});
</script>

<style lang="scss" scoped>
.custom-empty-warp {
  width: 100%;
  height: 100%;
  padding: 20px 0;
  .empty-warp {
    background-color: var(--bg-image-warp-color);
    border-radius: 15px;
    height: 100%;
    width: 100%;
    padding: 40px 0;
    .img-warp,
    .loading-warp {
      height: 100%;
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
    .empty-text {
      margin-top: 20px;
      color: var(--empty-text-color);
    }
  }
}
</style>
