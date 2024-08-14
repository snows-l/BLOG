<!--
 * @Description: ------------ fileDescription -----------
 * @Author: snows_l snows_l@163.com
 * @Date: 2024-08-14 10:00:17
 * @LastEditors: snows_l snows_l@163.com
 * @LastEditTime: 2024-08-15 01:25:51
 * @FilePath: /BLOG/src/views/play/video/index.vue
-->
<template>
  <div class="contvideo-warpainer-warp">
    <PageTopCover :moduleTitle="'影视'" :icon="'icon-shipin'" :coverImg="coverImg" :isMobile="isMobi" :mudulDesc="''" :isArticle="false"></PageTopCover>
  </div>
</template>

<script lang="ts" setup>
import coverImg from '@/assets/images/bg/cover-game.png';
import useResize from '@/hooks/useResize';
const { isMobi } = useResize();
</script>

<style lang="scss" scoped>
.video-warp {
  width: 100%;
  height: 100%;
}
</style>
