<!--
 * @Description: ------------ fileDescription -----------
 * @Author: snows_l snows_l@163.com
 * @Date: 2024-09-13 21:01:36
 * @LastEditors: snows_l snows_l@163.com
 * @LastEditTime: 2024-09-30 10:34:25
 * @FilePath: /blog/src/views/preview/index.vue
-->
<template>
  <div class="iframe" :class="{ 'is-mobi': isMobi }" v-loading="state.loading">
    <div class="operation">
      <div class="operation-left">
        <img class="back pointer kbn-custom" data-tip="点击 返回" @click="handleBack" style="width: 30px; height: 30px" src="@/assets/images/icon/icon-back.svg" />
      </div>
      <div class="operation-right">
        <img
          class="down-icon pointer kbn-custom"
          :class="{ disabled: state.loading }"
          data-tip="点击 下载源代码"
          @click="downloadCode"
          style="width: 26px; height: 26px"
          src="@/assets/images/icon/icon-down.svg" />
      </div>
    </div>
    <iframe ref="iframeRef" :src="state.url" width="100%" height="100%" frameborder="0"></iframe>
  </div>
</template>

<script lang="ts" setup>
import { previewArticleCodeToHtml } from '@/api/article';
import { downloadFileOfPreviewUrl } from '@/utils/common';
import useResize from '@/hooks/useResize';
import { ElMessage } from 'element-plus';
import { onMounted, onUpdated, reactive, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
const { isMobi } = useResize();

const route = useRoute();
const router = useRouter();
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

// 下载源代码
const downloadCode = () => {
  let url = 'http://124.223.41.220:3333/html/preview.html';
  downloadFileOfPreviewUrl(url, 'preview.html');
};

// 返回
const handleBack = () => {
  router.back();
};

onMounted(async () => {
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
  position: relative;
  overflow: hidden;
  .operation {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 60px;
    padding: 10px 10px;
    display: flex;
    justify-content: space-between;
    .operation-right {
      .pointer {
        margin: 0 8px;
      }
    }
  }

  .disabled {
    opacity: 0.5;
    cursor: not-allowed;
    pointer-events: none;
  }
}
.is-mobi {
  .down-icon {
    right: 20px;
  }
}
</style>
