<!--
 * @Description: ------------ fileDescription -----------
 * @Author: snows_l snows_l@163.com
 * @Date: 2024-08-08 10:56:18
 * @LastEditors: snows_l snows_l@163.com
 * @LastEditTime: 2024-08-12 22:48:10
 * @FilePath: /BLOG/src/views/article/detail.vue
-->
<template>
  <div class="article-detail-warp">
    <PageTopCover
      :moduleTitle="'文章详情'"
      :icon="'icon-jiaocheng-3'"
      :coverImg="state.arcticleDetail.cover"
      :isMobile="state.isMobile"
      :mudulDesc="state.arcticleDetail.title"
      :isArticle="false"></PageTopCover>

    <div class="article-content-warp-out" v-if="valueHtml" :class="{ 'm-article-content-warp-out': state.isMobile }">
      <div class="article-content-warp">
        <div class="article-content">
          <Toolbar class="editor-toolbar" style="border: 1px solid #ccc; display: none" :editor="editorRef" :defaultConfig="toolbarConfig" :mode="mode" />
          <Editor class="editor-content-warp" v-model="valueHtml" :defaultConfig="editorConfig" :mode="mode" @onCreated="handleCreated" />
          <div class="article-intfo">
            <div>
              <i class="iconfont icon-yanjing"></i>
              <span>{{ state.arcticleDetail.readCount || randomNum(30, 500) }}</span>
            </div>
            <div>
              <i class="iconfont icon-comment" @click="handleAdd('comment')"></i>
              <span>{{ state.arcticleDetail.commentCount || randomNum(5, 20) }}</span>
            </div>
            <div>
              <i class="iconfont icon-fenxiang1" @click="handleAdd('share')"></i>
              <span>{{ state.arcticleDetail.shareCount || randomNum(10, 200) }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="no-article" :class="{ 'm-no-article': state.isMobile }" v-else>
      <Empty :text="'暂无文章内容，请等待作者更新'" :loadingText="'文章内容正在拼命加载中...'" :loading="state.loading" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { addCommentCount, addShareCount, getArticleDetail } from '@/api/article';
import PageTopCover from '@/components/pageTopCover/index.vue';
import { isMobile, randomNum } from '@/utils/common';
import { Editor, Toolbar } from '@wangeditor/editor-for-vue';
import '@wangeditor/editor/dist/css/style.css'; // 引入 css
import { onBeforeUnmount, onMounted, reactive, ref, shallowRef, watch } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
let articleId = route.query.id;

// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef();
// 编辑模式
const mode = ref('default'); // simple | default
const valueHtml = ref('');

const state = reactive({
  isMobile: isMobile(),
  loading: false,
  arcticleDetail: {}
});

const toolbarConfig = {};
const editorConfig = {
  placeholder: '内容加载中...',
  readOnly: true,
  MENU_CONF: {}
};

// 获取文章详情
const getArticleDetailFn = () => {
  state.loading = true;
  getArticleDetail(articleId)
    .then(res => {
      res.data.subTitle = res.data.subTitle.replace(/&#39;/g, "'");
      res.data.content = res.data.content.replace(/&#39;/g, "'");
      res.data.content = decodeURIComponent(res.data.content);
      state.arcticleDetail = res.data;
      valueHtml.value = state.arcticleDetail.content;

      state.arcticleDetail.cover =
        import.meta.env.VITE_CURRENT_ENV == 'dev'
          ? import.meta.env.VITE_DEV_BASE_SERVER + state.arcticleDetail.cover
          : import.meta.env.VITE_PROD_BASE_SERVER + state.arcticleDetail.cover;

      state.loading = false;
    })
    .finally(() => {
      state.loading = false;
    });
};

if (articleId) {
  getArticleDetailFn();
}

const handleAdd = (type: string) => {
  if (type === 'comment') {
    addCommentCount(articleId);
  } else if (type === 'share') {
    addShareCount(articleId);
  }
  getArticleDetailFn();
};

// 监听路由变化，重新获取文章详情
watch(
  () => route.query.id,
  id => {
    if (id) {
      articleId = id;
      getArticleDetailFn();
    }
  }
);

// 编辑器创建完成
const handleCreated = editor => {
  editorRef.value = editor; // 记录 editor 实例，重要！
};

// 模拟 ajax 异步获取内容
onMounted(() => {});

// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
  const editor = editorRef.value;
  if (editor == null) return;
  editor.destroy();
});
</script>

<style lang="scss" scoped>
.article-detail-warp {
  width: 100%;
  height: 100%;
  .article-content-warp-out {
    background-color: var(--bg-image-warp-color);
    padding: 30px 0;
    .article-content-warp {
      max-width: var(--content-max-width);
      margin: 0 auto;
      .article-content {
        padding: 30px 16px;
        box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
        border-radius: 15px;
        background-color: var(--bg-content-color);
        color: var(--text-color);
        line-height: 20px !important;
      }
      .article-intfo {
        margin-top: 20px;
        display: flex;
        justify-content: space-around;
        align-items: center;
        div {
          display: flex;
          justify-content: space-around;
          align-items: center;
          .iconfont {
            font-size: 20px;
            margin-right: 10px;
          }
          span {
            font-size: 16px;
            color: var(--text-color);
          }
        }
      }
    }
  }
  .m-article-content-warp-out {
    .article-content-warp {
      max-width: 96% !important;
    }
  }

  .no-article {
    height: calc(100vh - 400px);
  }
  .m-no-article {
    max-width: 96% !important;
    margin: 0 auto !important;
    height: calc(100vh - 300px) !important;
  }
}
</style>
