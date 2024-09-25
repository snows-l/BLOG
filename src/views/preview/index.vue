<!--
 * @Description: ------------ fileDescription -----------
 * @Author: snows_l snows_l@163.com
 * @Date: 2024-09-13 21:01:36
 * @LastEditors: snows_l snows_l@163.com
 * @LastEditTime: 2024-09-25 14:55:02
 * @FilePath: /blog/src/views/preview/index.vue
-->
<template>
  <div v-if="state.type === 'preview'" class="iframe" v-loading="state.loading">
    <iframe ref="iframeRef" :src="state.url" width="100%" height="100%" frameborder="0"></iframe>
  </div>
  <div v-if="state.type === 'jianli'" class="jianli-warp" :class="{ 'jianli-warp-mobi': isMobi }">
    <div class="jian-content">
      <iframe ref="iframeRef" src="http://124.223.41.220:3333/common/jl_15240861635.pdf" width="100%" height="100%" frameborder="0"></iframe>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { previewArticleCodeToHtml } from '@/api/article';
import { ElMessage } from 'element-plus';
import { onMounted, onUpdated, reactive, ref } from 'vue';
import { useRoute } from 'vue-router';
import useResize from '@/hooks/useResize';
const { isMobi } = useResize();

const route = useRoute();
const state = reactive({
  type: 'preview',
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
if (route.query.type && route.query.type === 'jianli') {
  state.type = 'jianli';
}
onMounted(() => {
  const layout = document.querySelector('#layout');
  layout?.scrollTo(0, 0);
});
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
.jianli-warp {
  width: 100vw;
  height: 100vh;
  padding-top: 80px;
  .jian-content {
    height: calc(100vh - 100px);
    max-width: var(--content-max-width);
    padding: 20px 5px;
    margin: 10px auto;
    background-color: var(--bg-warp-color);
    border-radius: 10px;
  }
}
.jianli-warp-mobi {
  .jian-content {
    max-width: var(--content-max-width-m);
  }
}
</style>
