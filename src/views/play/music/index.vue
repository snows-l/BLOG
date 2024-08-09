<!--
 * @Description: ------------ fileDescription -----------
 * @Author: snows_l snows_l@163.com
 * @Date: 2024-08-09 16:21:21
 * @LastEditors: snows_l snows_l@163.com
 * @LastEditTime: 2024-08-09 17:30:57
 * @FilePath: /blog/src/views/play/music/index.vue
-->
<template>
  <div class="music-warp">
    <PageTopCover :moduleTitle="'音乐'" :icon="'icon-a-Sheetmusic'" :coverImg="coverImg" :isMobile="state.isMobile" :mudulDesc="state.mudulTitle" :isArticle="false"></PageTopCover>
  </div>
</template>

<script lang="ts" setup>
import { isMobile } from '@/utils/common';
import PageTopCover from '@/components/pageTopCover/index.vue';
import coverImg from '@/assets/images/common/cover-music.png';
import { ref, reactive, watch, onMounted, onUnmounted, computed } from 'vue';

const state = reactive({
  isMobile: isMobile(),
  mudulTitle:
    '音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐'
});

const resizeCallback = () => {
  state.isMobile = isMobile();
};

onMounted(() => {
  window.addEventListener('resize', resizeCallback);
});

onUnmounted(() => {
  window.removeEventListener('resize', resizeCallback);
});
</script>

<style lang="scss" scoped>
.music-warp {
  width: 100%;
  height: 100%;
}
</style>
