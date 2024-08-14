<!--
 * @Description: ------------ fileDescription -----------
 * @Author: snows_l snows_l@163.com
 * @Date: 2024-08-14 12:23:38
 * @LastEditors: snows_l snows_l@163.com
 * @LastEditTime: 2024-08-14 13:02:23
 * @FilePath: /blog/src/components/CustomImg/index.vue
-->
<template>
  <el-image class="pointer el-img-warp" preview-teleported :src="src" :fit="fit" :previewSrcList="[src]" :lazy="true">
    <template #placeholder>
      <div class="img-loading img-warp">
        <img class="img-loading" src="@/assets/images/common/loading.svg" alt="loading" />
        <span class="img-loading-text text">{{ loadingText }}</span>
      </div>
    </template>

    <template #error>
      <div class="img-error img-warp">
        <img class="img-error" src="@/assets/images/common/error.png" alt="error" />
        <span class="img-error-text text">😭 加载失败了</span>
      </div>
    </template>
  </el-image>
</template>

<script lang="ts" setup>
import { ElImage } from 'element-plus';
const props = defineProps({
  src: {
    type: String,
    default: ''
  },
  fit: {
    type: String,
    default: 'fill'
  },
  loadingText: {
    type: String,
    default: '加载中...'
  },
  alt: {
    type: String,
    default: ''
  }
});
</script>

<style scoped lang="scss">
.el-img-warp {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.img-warp {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  .text {
    margin-top: 14px;
    color: #999;
  }
}
.img-error {
  max-width: 100px;
  max-height: 100px;
  font-size: 12px;
}
</style>
