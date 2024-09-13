<!--
 * @Description: ------------ fileDescription -----------
 * @Author: snows_l snows_l@163.com
 * @Date: 2024-09-13 21:01:36
 * @LastEditors: snows_l snows_l@163.com
 * @LastEditTime: 2024-09-13 22:22:36
 * @FilePath: /BLOG/src/views/preview/index.vue
-->
<template>
  <div class="iframe" v-loading="state.loading">
    <iframe ref="iframeRef" :src="state.url" width="100%" height="100%" frameborder="0"></iframe>
  </div>
</template>

<script lang="ts" setup>
import { previewArticleCodeToHtml } from '@/api/article';
import { ElMessage } from 'element-plus';
import { onUpdated, reactive, ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const state = reactive({
  url: '',
  loading: false
});

const iframeRef = ref(null);

if (route.query.id) {
  state.loading = true;
  previewArticleCodeToHtml(route.query.id).then(res => {
    if (res.code == 200) {
      state.url = res.data;
    } else {
      ElMessage({
        type: 'error',
        message: '预览失败，请稍后再试！'
      });
    }
  });
}
onUpdated(() => {
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
</script>

<style lang="scss" scoped>
.iframe {
  width: 100vw;
  height: 100vh;
}
</style>
