<!--
 * @Description: ------------ fileDescription -----------
 * @Author: snows_l snows_l@163.com
 * @Date: 2024-09-13 21:01:36
 * @LastEditors: snows_l snows_l@163.com
 * @LastEditTime: 2024-09-15 11:02:22
 * @FilePath: /BLOG/src/views/play/video/playing.vue
-->
<template>
  <div class="iframe" :class="{ 'is-mobi': isMobi }" v-loading="state.loading">
    <iframe
      ref="iframeRef"
      :src="state.url"
      width="100%"
      height="100%"
      scrolling="no"
      border="0"
      frameborder="no"
      framespacing="0"
      :allowfullscreen="true"
      sandbox="allow-top-navigation allow-same-origin allow-forms allow-scripts"></iframe>
  </div>
</template>

<script lang="ts" setup>
import useResize from '@/hooks/useResize';
import { onMounted, onUpdated, reactive, ref } from 'vue';
import { useRoute } from 'vue-router';
const { isMobi } = useResize();

const route = useRoute();
const state = reactive({
  url: '',
  loading: false
});

const iframeRef = ref(null);

if (route.query.url) {
  state.url = route.query.url;
  state.loading = true;
}
onMounted(() => {
  const layout = document.querySelector('#layout');
  layout?.scrollTo(0, 0);

  if (iframeRef.value) {
    // IE
    if (iframeRef.value.attachEvent) {
      iframeRef.value.attachEvent('onload', () => {
        // 加载成功
        state.loading = false;
      });
    } else {
      iframeRef.value.onload = () => {
        // 加载成功
        state.loading = false;
      };
    }
  }
});

onUpdated(() => {});
</script>

<style lang="scss" scoped>
.iframe {
  padding: 80px 260px 20px 260px;
  width: 100vw;
  height: 100vh;
  background-color: #000;
  position: relative;
}
.is-mobi {
  padding: 120px 10px 240px 10px;
}
</style>
