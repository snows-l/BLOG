<!--
 * @Description: ------------ fileDescription -----------
 * @Author: snows_l snows_l@163.com
 * @Date: 2024-08-14 10:00:17
 * @LastEditors: snows_l snows_l@163.com
 * @LastEditTime: 2024-08-14 10:04:36
 * @FilePath: /blog/src/views/play/game/index.vue
-->
<template>
  <div class="contvideo-warpainer-warp">
    <PageTopCover :moduleTitle="'小游戏'" :icon="'icon-yuleAPP'" :coverImg="coverImg" :isMobile="isMobi" :mudulDesc="''" :isArticle="false"></PageTopCover>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, watch, onMounted, computed } from 'vue';
import coverImg from '@/assets/images/common/cover-music.png';
import useResize from '@/hooks/useResize';
const { isMobi } = useResize();
</script>

<style lang="scss" scoped>
.video-warp {
  width: 100%;
  height: 100%;
}
</style>
