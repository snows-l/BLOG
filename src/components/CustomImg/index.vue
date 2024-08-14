<!--
 * @Description: ------------ fileDescription -----------
 * @Author: snows_l snows_l@163.com
 * @Date: 2024-08-14 12:23:38
 * @LastEditors: snows_l snows_l@163.com
 * @LastEditTime: 2024-08-14 21:28:27
 * @FilePath: /BLOG/src/components/CustomImg/index.vue
-->
<template>
  <el-image class="pointer el-img-warp" preview-teleported :src="src" :fit="fit" :previewSrcList="[src]" :lazy="true">
    <template #placeholder>
      <div class="img-loading-warp img-warp" style="width: 100%; height: 100%; background-color: #ffffff">
        <img :style="{ width: size, height: size }" class="img-loading" src="@/assets/images/common/loading.jpg" alt="loading" />
        <span v-if="isText" class="img-loading-text text">{{ loadingText }}</span>
      </div>
    </template>

    <template #error>
      <div class="img-error-warp img-warp">
        <img :style="{ width: size, height: size }" class="img-error" src="@/assets/images/common/error.png" alt="error" />
        <span v-if="isText" class="img-error-text text">😭 加载失败了</span>
      </div>
    </template>
  </el-image>
</template>

<script lang="ts" setup>
import { ElImage } from 'element-plus';
const props = defineProps({
  src: {
    type: String,
    required: true,
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
  size: {
    type: String,
    default: '60px'
  },
  isText: {
    type: Boolean,
    default: true
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
    margin-top: 4px;
    font-size: 10px;
    color: #999;
  }
}
</style>
