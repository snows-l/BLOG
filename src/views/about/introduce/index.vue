<!--
 * @Description: ------------ fileDescription -----------
 * @Author: snows_l snows_l@163.com
 * @Date: 2024-08-15 12:22:30
 * @LastEditors: snows_l snows_l@163.com
 * @LastEditTime: 2024-09-29 21:59:16
 * @FilePath: /BLOG/src/views/about/introduce/index.vue
-->
<template>
  <div class="introduce-container-warp">
    <PageTopCover :moduleTitle="'我的简历'" :textIcon="'📄'" :coverImg="coverImg" :isMobile="isMobi" :mudulDesc="''" :isArticle="false"></PageTopCover>
    <div class="introduce-container" :class="{ 'm-introduce-container': isMobi }">
      <div class="center-max-width-warp">
        <div class="shengming-warp">
          <div class="item-1 text text-shadow">欢迎👏来到我的博客，这里是我的简历！</div>
        </div>
        <div class="introduce-warp" :class="{ 'introduce-warp-mobi': isMobi }">
          <div class="jian-content" v-loading="pdfParams.loading">
            <div class="opertion">
              <img v-if="!isMobi" class="print pointer" @click="printPdf" style="width: 20px; height: 20px; margin: 0 5px" src="@/assets/images/icon/icon-print.svg" />
              <a class="pdf-download pointer" :href="pdfUrl" target="_blank" rel="noopener noreferrer">
                <img style="width: 20px; height: 20px; margin: 0 5px" src="@/assets/images/icon/icon-down.svg" />
              </a>
            </div>
            <div class="pdf-warp">
              <canvas class="pdf-viewer" v-for="i in pdfParams.pdfPageTotal" :key="i" :id="'pdf-render' + i"></canvas>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import coverImg from '@/assets/images/bg/cover-jianli.png';
import useResize from '@/hooks/useResize';
import { onMounted, onUpdated, reactive, ref } from 'vue';
const { isMobi } = useResize();

let pdfDoc = null;
let pdfUrl = import.meta.env.VITE_CURRENT_ENV == 'dev' ? import.meta.env.VITE_DEV_BASE_SERVER : import.meta.env.VITE_PROD_BASE_SERVER + '/common/snows_l-online-introduce.pdf';

const iframeRef = ref(null);

const pdfParams = reactive({
  currentPageNumber: 1,
  pdfScale: 1.0,
  pdfPageTotal: 0,
  loading: false // 总页数
});

// 这里必须使用异步去引用pdf文件，直接去import会报错，也不知道为什么
const loadFile = async () => {
  pdfParams.loading = true;
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
      pdfParams.loading = false;
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

// 打印pdf
const printPdf = () => {
  fetch(pdfUrl)
    .then(response => response.blob())
    .then(pdfBlob => {
      // 创建一个新的Blob URL
      const blobUrl = URL.createObjectURL(pdfBlob);
      const iframe = document.createElement('iframe');
      iframe.style.display = 'none'; // 确保iframe不可见
      iframe.setAttribute('id', 'printPDF');
      iframe.setAttribute('name', 'printPDF'); // 不可少
      iframe.style.frameborder = 'no';
      iframe.style.pageBreakBefore = 'always'; // 打印保留分页
      iframe.src = blobUrl;
      document.body.appendChild(iframe);

      // 当iframe加载完成后移除URL引用，释放内存
      iframe.onload = () => {
        document.getElementById('printPDF').contentWindow.print();
        URL.revokeObjectURL(blobUrl);
      };
    })
    .catch(error => {
      console.error('Error fetching PDF:', error);
    });
};

onMounted(async () => {
  await loadFile();
});

onUpdated(() => {
  if (iframeRef.value) {
    // IE
    if (iframeRef.value.attachEvent) {
      iframeRef.value.attachEvent('onload', () => {
        // 加载成功
        pdfParams.loading = false;
      });
    } else {
      iframeRef.value.onload = () => {
        // 加载成功
        pdfParams.loading = false;
      };
    }
  }
});
</script>

<style lang="scss" scoped>
.introduce-container-warp {
  width: 100%;
  height: 100%;
  .introduce-container {
    width: 100%;
    height: 100%;
    background-color: var(--bg-image-warp-color);
    padding: 20px 0;
    .center-max-width-warp {
      height: 100%;
      max-width: var(--content-max-width);
      margin: 0 auto;
      .shengming-warp {
        font-size: 16px;
        margin: 10px 0;
        div {
          color: var(--text-color);
          line-height: 40px;
          text-align: center;
        }
      }
      .introduce-warp {
        min-height: calc(100vh - 500px);
        .jian-content {
          min-height: calc(100vh - 500px);
          max-width: var(--content-max-width);
          margin: 10px auto;
          background-color: var(--bg-warp-color);
          border-radius: var(--border-radius-2);
          position: relative;
          padding: 40px 10px 10px 10px;
          .opertion {
            position: absolute;
            top: 10px;
            right: 5px;
            text-decoration: none;
          }
        }
      }
      .introduce-warp-mobi {
        min-width: 100vw;
        min-height: calc(100vh - 500px);
        overflow: scroll;
        .jian-content {
          min-height: calc(100vh - 500px);
          max-width: var(--content-max-width-m-more);
          padding: 40px 10px 10px 10px;
        }
      }
    }
  }
}
</style>
