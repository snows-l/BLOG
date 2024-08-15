<!--
 * @Description: ------------ fileDescription -----------
 * @Author: snows_l snows_l@163.com
 * @Date: 2024-08-15 12:22:30
 * @LastEditors: snows_l snows_l@163.com
 * @LastEditTime: 2024-08-15 12:25:50
 * @FilePath: /blog/src/views/about/friends.vue
-->
<template>
  <div class="friends-container-warp">
    <PageTopCover :moduleTitle="'友联'" :icon="'icon-guanyu'" :coverImg="coverImg" :isMobile="isMobi" :mudulDesc="''" :isArticle="false"></PageTopCover>
  </div>
</template>

<script lang="ts" setup>
import coverImg from '@/assets/images/bg/cover-friends.png';
import useResize from '@/hooks/useResize';
const { isMobi } = useResize();
</script>

<style lang="scss" scoped>
.video-warp {
  width: 100%;
  height: 100%;
}
</style>
