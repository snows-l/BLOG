<!--
 * @Description: ------------ fileDescription -----------
 * @Author: snows_l snows_l@163.com
 * @Date: 2024-08-09 16:21:21
 * @LastEditors: snows_l snows_l@163.com
 * @LastEditTime: 2024-08-09 19:51:26
 * @FilePath: /BLOG/src/views/play/music/index.vue
-->
<template>
  <div class="music-warp">
    <PageTopCover :moduleTitle="'音乐'" :icon="'icon-a-Sheetmusic'" :coverImg="coverImg" :isMobile="state.isMobile" :mudulDesc="state.mudulTitle" :isArticle="false"></PageTopCover>
  </div>
</template>

<script lang="ts" setup>
// import { getMusicList } from '@/api/music';
import coverImg from '@/assets/images/common/cover-music.png';
import PageTopCover from '@/components/pageTopCover/index.vue';
import { isMobile } from '@/utils/common';
import { onMounted, onUnmounted, reactive } from 'vue';

const state = reactive({
  isMobile: isMobile(),
  mudulTitle:
    '音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐',
  list: []
});

const getMusicListFn = () => {
  getMusicList({ isPage: false }).then(res => {
    state.list = res.data;
    console.log('-------- res --------', state.list);
  });
};
// getMusicListFn();

// 监听屏幕大小变化
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
