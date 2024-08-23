<!--
 * @Description: ------------ fileDescription -----------
 * @Author: snows_l snows_l@163.com
 * @Date: 2024-08-23 20:12:38
 * @LastEditors: snows_l snows_l@163.com
 * @LastEditTime: 2024-08-23 21:59:27
 * @FilePath: /BLOG/src/views/article/preview.vue
-->
<template>
  <div class="perview-warp">
    <PageTopCover :moduleTitle="'预览'" :icon="'icon-jiaocheng-3'" :coverImg="coverImg" :isMobile="isMobi" :mudulDesc="''" :isArticle="false"></PageTopCover>
    <div class="preview-container-warp" :class="{ 'm-preview-container-warp': isMobi }">
      <div class="max-width-warp" v-if="state.previewContent">
        <div id="perview" class="perview-content" :loading="state.loading"></div>
      </div>
      <div class="max-width-warp" v-else>
        <Empty :text="'暂无获取代码内容'" :loadingText="'数据正在生成中...'" :loading="state.loading" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { getArticleDetail } from '@/api/article';
import coverImg from '@/assets/images/bg/cover-about.png';
import useResize from '@/hooks/useResize';
import { importHtmls } from '@/utils/htmlPreview';
import { reactive } from 'vue';
const { isMobi } = useResize();

import { useRoute } from 'vue-router';
const route = useRoute();
let articleId = route.query.id;

const state = reactive({
  loading: false,
  previewContent: ''
});

// 获取文章详情
const getArticleDetailFn = () => {
  state.loading = true;
  getArticleDetail(articleId)
    .then(res => {
      let reg = /<!DOCTYPE html>.*<\/html>/s;
      let str = res.data.content;
      str = str.replace(/&#39;/g, "'");
      str = decodeURIComponent(str);
      str = str.replace(/&gt;/g, '>');
      str = str.replace(/&lt;/g, '<');
      str = str.replace(/&#39;/g, "'");
      const strr = str.match(reg);
      state.previewContent = strr ? strr[0] : '';
      initPreview();

      state.loading = false;
    })
    .finally(() => {
      state.loading = false;
    });
};

const initPreview = async () => {
  console.log('-------- state.previewContent --------', state.previewContent);
  let { template, getExternalScripts, execScripts } = await importHtmls(state.previewContent);
  const perview = document.getElementById('perview');
  perview?.appendChild(template);
  execScripts();
};

if (articleId) {
  getArticleDetailFn();
}
</script>

<style lang="scss" scoped>
.perview-warp {
  width: 100%;
  height: 100%;
  .preview-container-warp {
    width: 100%;
    min-height: 800px;
    background-color: var(--bg-image-warp-color);
    padding: 20px 0;
    .max-width-warp {
      height: 100%;
      min-height: 800px;
      max-width: var(--content-max-width);
      margin: 0 auto;
      position: relative;
      .perview-content {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 100%;
        height: 100%;
      }
    }
  }
  .m-preview-container-warp {
    min-height: 350px !important;
    .max-width-warp {
      width: 96% !important;
      min-height: 350px !important;
      .max-width-warp {
        min-height: 350px !important;
        .perview-content {
          height: 100% !important;
          min-height: 350px !important;
        }
      }
    }
  }
}
</style>
