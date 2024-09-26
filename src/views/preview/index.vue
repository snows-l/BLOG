<!--
 * @Description: ------------ fileDescription -----------
 * @Author: snows_l snows_l@163.com
 * @Date: 2024-09-13 21:01:36
 * @LastEditors: snows_l snows_l@163.com
 * @LastEditTime: 2024-09-26 09:40:54
 * @FilePath: /blog/src/views/preview/index.vue
-->
<template>
  <div v-if="state.type === 'preview'" class="iframe" v-loading="state.loading">
    <iframe ref="iframeRef" :src="state.url" width="100%" height="100%" frameborder="0"></iframe>
  </div>
  <div v-if="state.type === 'introduce'" class="introduce-warp" :class="{ 'introduce-warp-mobi': isMobi }">
    <div class="jian-content" v-if="!isMobi">
      <iframe ref="iframeRef" :src="pdfUrl" width="100%" height="100%" frameborder="0"></iframe>
    </div>
    <div class="jian-content" v-loading="state.loading" v-else>
      <div class="opertion">
        <!-- <img class="print pointer" @click="printPdf" style="width: 20px; height: 20px; margin: 0 5px" src="@/assets/images/icon/icon-print.svg" /> -->
        <a class="pdf-download pointer" :href="pdfUrl" target="_blank" rel="noopener noreferrer">
          <img style="width: 20px; height: 20px; margin: 0 5px" src="@/assets/images/icon/icon-down.svg" />
        </a>
      </div>
      <div class="pdf-warp">
        <canvas class="pdf-viewer" v-for="i in pdfParams.pdfPageTotal" :key="i" :id="'pdf-render' + i"></canvas>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { previewArticleCodeToHtml } from '@/api/article';
import useResize from '@/hooks/useResize';
import { ElMessage } from 'element-plus';
import { onMounted, onUpdated, reactive, ref } from 'vue';
import { useRoute } from 'vue-router';
const { isMobi } = useResize();

const route = useRoute();
const state = reactive({
  type: 'preview',
  url: '',
  loading: false
});

const pdfParams = reactive({
  currentPageNumber: 1,
  pdfScale: 1.0,
  pdfPageTotal: 0 // 总页数
});

let pdfDoc = null;
let pdfUrl = import.meta.env.VITE_CURRENT_ENV == 'dev' ? import.meta.env.VITE_DEV_BASE_SERVER : import.meta.env.VITE_PROD_BASE_SERVER + '/common/snows_l-online-introduce.pdf';

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
if (route.query.type && route.query.type === 'introduce') {
  state.type = route.query.type;
}

// 这里必须使用异步去引用pdf文件，直接去import会报错，也不知道为什么
const loadFile = async () => {
  state.loading = true;
  let pdfjs = await import('pdfjs-dist/build/pdf');
  let pdfjsWorker = await import('pdfjs-dist/build/pdf.worker.entry');
  pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker;
  // 此文件位于public/testPdf.pdf
  pdfjs.getDocument(pdfUrl).promise.then(async doc => {
    pdfDoc = doc;
    pdfParams.pdfPageTotal = doc.numPages;
    // // 仅加载第一页  注释  取消页码切换
    // await getPdfPage(pdfParams.currentPageNumber)
    // 加载pdf所有页
    for (let pageNum = 1; pageNum <= doc.numPages; pageNum++) {
      await getPdfPage(pageNum);
      state.loading = false;
    }
  });
};

// 加载pdf的某一页
const getPdfPage = number => {
  return new Promise((resolve, reject) => {
    pdfDoc
      .getPage(number)
      .then(page => {
        const canvas = document.getElementById(`pdf-render${number}`);
        const context = canvas.getContext('2d');
        const scale = 1; // 缩放比例
        const dpr = window.devicePixelRatio || 1;
        const bsr =
          context.webkitBackingStorePixelRatio ||
          context.mozBackingStorePixelRatio ||
          context.msBackingStorePixelRatio ||
          context.oBackingStorePixelRatio ||
          context.backingStorePixelRatio ||
          1;
        const ratio = dpr / bsr;
        const viewport = page.getViewport({ scale: pdfParams.pdfScale }); // 获取窗口大小
        const canvasWidth = Math.floor(viewport.width * ratio);
        const canvasHeight = Math.floor(viewport.height * ratio);
        canvas.width = canvasWidth;
        canvas.height = canvasHeight;
        canvas.style.width = '100%';
        canvas.style.height = '100%';

        let renderContext = {
          canvasContext: context,
          viewport: viewport,
          transform: [ratio, 0, 0, ratio, 0, 0]
        };

        // 进行渲染
        page
          .render(renderContext)
          .promise.then(() => {
            resolve();
          })
          .catch(error => {
            reject(error);
          });
      })
      .catch(error => {
        reject(error);
      });
  });
};

const printPdf = () => {
  fetch(pdfUrl)
    .then(response => response.blob())
    .then(pdfBlob => {
      // 创建一个新的Blob URL
      const blobUrl = URL.createObjectURL(pdfBlob);

      // 打开一个新窗口或者新标签，并将PDF文件加载进去
      // window.open(blobUrl);

      // 或者，如果你想在当前页面显示PDF，可以使用iframe
      // 创建一个iframe元素
      const iframe = document.createElement('iframe');
      iframe.style.display = 'none'; // 确保iframe不可见
      iframe.src = blobUrl;
      document.body.appendChild(iframe);

      // 当iframe加载完成后移除URL引用，释放内存
      iframe.onload = () => {
        URL.revokeObjectURL(blobUrl);
      };
    })
    .catch(error => {
      console.error('Error fetching PDF:', error);
    });
};

onMounted(async () => {
  const layout = document.querySelector('#layout');
  layout?.scrollTo(0, 0);
  if (state.type === 'introduce') {
    await loadFile();
  }
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
.introduce-warp {
  min-width: 100vw;
  min-height: 100vh;
  padding-top: 80px;
  .jian-content {
    height: calc(100vh - 80px);
    max-width: var(--content-max-width);
    padding: 10px 10px;
    margin: 10px auto;
    background-color: var(--bg-warp-color);
    border-radius: var(--border-radius-2);
    position: relative;
  }
}
.introduce-warp-mobi {
  min-width: 100vw;
  min-height: 100vh;
  overflow: scroll;
  .jian-content {
    min-height: calc(100vh - 100px);
    height: auto !important;
    max-width: var(--content-max-width-m);
    padding: 40px 10px 10px 10px;
    .opertion {
      position: absolute;
      top: 10px;
      right: 5px;
      text-decoration: none;
    }
  }
}
</style>
