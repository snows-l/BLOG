<!--
 * @Description: ------------ fileDescription -----------
 * @Author: snows_l snows_l@163.com
 * @Date: 2024-08-08 10:56:18
 * @LastEditors: snows_l snows_l@163.com
 * @LastEditTime: 2024-09-05 19:35:04
 * @FilePath: /BLOG/src/views/article/detail.vue
-->
<template>
  <div class="article-detail-warp" id="layout-content">
    <PageTopCover
      :moduleTitle="'文章详情'"
      :icon="'icon-jiaocheng-3'"
      :coverImg="articleCover"
      :isMobile="isMobi"
      :mudulDesc="state.arcticleDetail.title"
      :isArticle="false"></PageTopCover>

    <div class="article-content-warp-out" v-if="valueHtml" :class="{ 'm-article-content-warp-out': isMobi }">
      <div class="article-content-warp">
        <!-- <div v-if="state.isMobile && tableOfContents.length > 0" class="m-flex-container">
          <div class="table-of-contents-warp">
            <div v-if="tableOfContents.length > 0" class="table-of-contents">
              <div class="toc-title">目录</div>
              <ul list-none p-l-0>
                <li v-for="(item, index) in tableOfContents" :key="item.id" :style="{ paddingLeft: item.level * (state.isMobile ? 25 : 16) + 'px' }" border-rd mb-5px py-3px>
                  <a
                    :class="{ active: activeIndex === index }"
                    @click="
                      e => {
                        e.preventDefault();
                        handleItemClick(item, index);
                      }
                    ">
                    {{ item.text }}
                  </a>
                </li>
              </ul>
            </div>
            <div v-else class="no-toc">
              <Empty :text="'暂无目录内容，请在文章中添加标题'" :loadingText="'目录内容正在生成中...'" :loading="state.loading" />
            </div>
          </div>
        </div> -->
        <div class="article-content">
          <div class="article-cover-warp" :class="{ 'm-article-cover-warp': isMobi }">
            <Img class="cover-img" :src="state.arcticleDetail.cover" />
            <div class="cover-title">COVER</div>
          </div>
          <!-- <Toolbar class="editor-toolbar" style="border: 1px solid #ccc; display: none" :editor="editorRef" :defaultConfig="toolbarConfig" :mode="mode" /> -->
          <Editor id="editor" class="editor-content-warp" v-model="valueHtml" :defaultConfig="editorConfig" :mode="mode" @onCreated="handleCreated" />
          <div class="article-intfo">
            <div class="pointer">
              <i class="iconfont icon-yanjing"></i>
              <span>{{ state.arcticleDetail.readCount || 0 }}</span>
            </div>
            <div class="pointer" @click="handleAdd('comment')">
              <i class="iconfont icon-comment"></i>
              <span>{{ state.arcticleDetail.commentCount || 0 }}</span>
            </div>
            <div class="pointer" @click="handleAdd('share')">
              <i class="iconfont icon-fenxiang1"></i>
              <span>{{ state.arcticleDetail.shareCount || 0 }}</span>
            </div>
            <div class="pointer" v-if="state.arcticleDetail.isPreview === 1" @click="handleView">
              <i class="iconfont icon-yanjing"></i>
              <span class="iconfont" style="font-size: 12px">预览</span>
            </div>
          </div>
          <div v-if="!state.isMobile" class="flex-container">
            <div class="table-of-contents-warp">
              <div v-if="tableOfContents.length > 0" class="table-of-contents">
                <!-- 目录内容 -->
                <ul list-none p-l-0>
                  <li v-for="(item, index) in tableOfContents" :key="item.id" :style="{ paddingLeft: item.level * (state.isMobile ? 25 : 16) + 'px' }">
                    <!-- <a :class="{ active: activeIndex === index }" :href="`#${item.id}`" @click="handleItemClick(index)">{{ item.text }}</a> -->
                    <a
                      :class="{ active: activeIndex === index }"
                      @click="
                        e => {
                          e.preventDefault();
                          handleItemClick(item, index);
                        }
                      ">
                      {{ item.text }}
                    </a>
                  </li>
                </ul>
              </div>
              <div v-else class="no-toc">
                <Empty :text="'暂无目录内容，请在文章中添加标题'" :loadingText="'目录内容正在生成中...'" :loading="state.loading" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <CommentView style="margin-top: 15px" ref="commentViewRef" :articleId="state.arcticleDetail.id" :list="state.commentList" @submit="handleGetCommentFn"></CommentView>
    </div>
    <div class="no-article" :class="{ 'm-no-article': isMobi }" v-else>
      <Empty :text="'暂无文章内容，请等待作者更新'" :loadingText="'文章内容正在拼命加载中...'" :loading="state.loading" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { addShareCount, getArticleDetail, previewArticleCodeToHtml } from '@/api/article';
import { getCommentList2 } from '@/api/comment';
import articleCover from '@/assets/images/bg/cover-article.png';
import { copy, isMobile, tranListToTree } from '@/utils/common';
import { Editor } from '@wangeditor/editor-for-vue';
import '@wangeditor/editor/dist/css/style.css'; // 引入 css
import { ElMessage, ElMessageBox } from 'element-plus';
import { onBeforeUnmount, onMounted, onUpdated, reactive, ref, shallowRef, watch } from 'vue';
import { useRoute } from 'vue-router';

import useResize from '@/hooks/useResize';
const { isMobi } = useResize();

const commentViewRef = ref(null);
const route = useRoute();
let articleId = route.query.id;
const tableOfContents = ref([]);
const updateCount = ref(0);
const tocRihgt = ref('20px');

let scorllContainer: Element | null = null;

// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef();
// 编辑模式
const mode = ref('default'); // simple | default
const valueHtml = ref('');

const state = reactive({
  loading: false,
  arcticleDetail: {},
  isMobile: isMobile(1580),
  commentList: []
});

// 目录等级映射
const levelMap = {
  H1: 1,
  H2: 1.5,
  H3: 2,
  H4: 3,
  H5: 4
};
// 目录等级反向映射
const levelReverseMap = {
  1: 'H1',
  1.5: 'H2',
  2: 'H3',
  3: 'H4',
  4: 'H5'
};

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

// 获取评论列表
const handleGetCommentFn = () => {
  let params = {
    articleId: articleId
  };
  getCommentList2(params).then(res => {
    if (res.code == 200) {
      state.commentList = tranListToTree(res.data, 'id', 'pId', 'children');
    }
  });
};

if (articleId) {
  getArticleDetailFn();
  handleGetCommentFn();
}

const handleAdd = (type: string) => {
  if (type === 'comment') {
    commentViewRef.value.clearTO();
  } else if (type === 'share') {
    addShareCount(articleId).then(res => {
      if (res.code == 200) {
        copy(window.location.href);
        ElMessageBox({
          type: 'success',
          message: '链接已复制，请到微信、QQ、邮箱等平台粘贴分享！',
          center: true,
          showConfirmButton: true,
          confirmButtonText: '确定',
          roundButton: true,
          buttonSize: 'small'
        });
      }
    });
  }
};

// 当前高亮的目录项索引
const activeIndex = ref(0);

// 添加复制按钮的逻辑
const copyCode = () => {
  const codeBlocks = document.querySelectorAll('#editor pre > code');
  codeBlocks.forEach(codeBlock => {
    // 创建复制按钮
    const copyButton = document.createElement('button');
    copyButton.innerText = '复制';
    copyButton.classList.add('copy-button');
    copyButton.classList.add('pointer');

    // 为复制按钮添加点击事件处理程序
    copyButton.addEventListener('click', () => {
      const codeText = codeBlock.querySelector('span').textContent;
      copy(codeText);
      // 修改按钮文本为 "已复制"
      copyButton.innerText = '已复制';
      // 延迟一段时间后恢复按钮文本为 "复制"
      setTimeout(() => {
        copyButton.innerText = '复制';
      }, 3000); // 毫秒为单位，您可以调整时间长度
    });

    // 将复制按钮添加到代码块的父级元素中
    codeBlock.appendChild(copyButton);
  });
};

// 添加锚点
const addAnchorLinks = () => {
  const headings = document.querySelectorAll('#editor h2, #editor h3, #editor h4, #editor h5');
  headings.forEach((heading, index) => {
    const anchorLink = document.createElement('a');
    anchorLink.setAttribute('href', `#section-${index + 1}`);
    // anchorLink.textContent = heading.textContent; // 设置锚点文本为标题文本
    anchorLink.style.pointerEvents = 'none'; // 设置 pointer-events 为 none，使链接不可点击

    // 设置标题的id属性
    heading.setAttribute('id', `section-${index + 1}`);

    // 将锚点链接插入到标题内
    heading.innerHTML = anchorLink.outerHTML + heading.innerHTML;
  });
};

// 更新目录项点击事件处理函数
const handleItemClick = (item, index: number) => {
  const container = document.querySelector('.table-of-contents-warp') as HTMLElement;
  const containerRect = container.getBoundingClientRect();
  activeIndex.value = index;
  const element = document.querySelector(`#section-${index + 1}`);
  const offsetTop = element.offsetTop + 770; // 770 顶部封面 + COVER的高度
  scorllContainer.scrollTop = offsetTop;
};

// 生成目录
const generateTableOfContents = () => {
  updateCount.value++; // 触发更新
  const headings = document.querySelectorAll('#editor h1, #editor h2, #editor h3, #editor h4, #editor h5');
  const toc = [];
  headings.forEach((heading, index) => {
    const id = `section-${index + 1}`;
    const level = levelMap[heading.tagName]; // 根据标题等级设置目录项的缩进
    heading.setAttribute('id', id); // 设置标题的id属性
    toc.push({ id: id, text: heading.textContent, level: level, index: index }); // 将标题文本、id和等级添加到目录项中
  });
  return toc;
};

// 监听滚动事件，更新目录项高亮状态
const handleScroll = () => {
  requestAnimationFrame(() => {
    const sections = document.querySelectorAll('#editor h1, #editor h2, #editor h3, #editor h4, #editor h5');
    const scrollY = scorllContainer.scrollTop || scorllContainer.offsetHeight;
    let currentIndex = 0;
    for (let i = 0; i < sections.length; i++) {
      // 加上浏览器 视口 的高度
      const sectionTop = (sections[i] as HTMLElement).getBoundingClientRect().top - 90;
      if (sectionTop <= 0) {
        currentIndex = i;
      }
    }

    activeIndex.value = currentIndex;

    // 滚动目录以确保当前高亮的目录项可见;
    const activeItem = document.querySelector('.table-of-contents .active') as HTMLElement;
    if (activeItem) {
      const container = document.querySelector('.table-of-contents-warp');
      const containerRect = container.getBoundingClientRect();
      const activeRect = activeItem.getBoundingClientRect();
      const scrollTop = activeItem.offsetTop - containerRect.height / 2 + activeRect.height / 2;
      container.scrollTop = scrollTop;
    }
  });
};

const getTocRight = () => {
  let width = document.body.getBoundingClientRect().width;
  if (width > 1580) {
    tocRihgt.value = `${(width - 920) / 2 + 940}px`;
  }
};

// 点击阅览
const handleView = async () => {
  previewArticleCodeToHtml(articleId).then(res => {
    if (res.code == 200) {
      window.open(res.data, '_blank');
    } else {
      ElMessage({
        type: 'error',
        message: '预览失败，请稍后再试！'
      });
    }
  });
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

const resizeCallback = () => {
  getTocRight();
  state.isMobile = isMobile(1580);
};

// 模拟 ajax 异步获取内容
onMounted(() => {
  getTocRight();
  window.addEventListener('resize', resizeCallback);
  scorllContainer = document.querySelector('#layout') as HTMLElement;
  scorllContainer.addEventListener('scroll', handleScroll);
});

onUpdated(() => {
  if (updateCount.value < 2) {
    tableOfContents.value = generateTableOfContents();
  }
  addAnchorLinks();
  copyCode();
});

// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
  const editor = editorRef.value;
  if (editor == null) return;
  editor.destroy();
  window.removeEventListener('resize', resizeCallback);
  scorllContainer.removeEventListener('scroll', handleScroll);
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
        padding: 20px 0px;
        box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
        border-radius: 15px;
        background-color: var(--bg-content-color);
        color: var(--text-color);
        line-height: 20px !important;
        .article-cover-warp {
          width: 100%;
          height: 240px;
          margin-bottom: 40px;
          // border-top-left-radius: 15px;
          // border-top-right-radius: 15px;
          overflow: hidden;
          .cover-img {
            border-radius: 10px;
            height: calc(100% - 30px);
          }
          .cover-title {
            height: 30px;
            line-height: 30px;
            text-align: center;
          }
        }
        .m-article-cover-warp {
          height: 240px;
        }
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
      max-width: var(--content-max-width-m) !important;
    }
  }

  .no-article {
    max-width: var(--content-max-width);
    margin: 0 auto;
    text-align: center;
    height: calc(100vh - 400px);
  }
  .m-no-article {
    max-width: var(--content-max-width-m) !important;
    margin: 0 auto !important;
    height: calc(100vh - 300px) !important;
  }
}
</style>

<style lang="scss">
.article-content {
  pre {
    position: relative;
    .copy-button {
      position: absolute;
      top: 14px;
      right: 14px;
      border: 1px solid #333;
      padding: 2px 8px;
      color: #333;
      border-radius: 4px;
      opacity: 0;
      &:hover {
        color: var(--theme-color);
        border: 1px solid var(--theme-color);
      }
    }
    code {
      cursor: url('@/assets/images/cursor/text.png'), auto !important; // text cursor to assets/images/cursor/text.png
    }
    &:hover {
      .copy-button {
        opacity: 1;
      }
    }
  }
}
blockquote {
  border-radius: 2px;
}
// 目录样式
.article-content {
  position: relative;
  .flex-container {
    border-radius: 5px;
    height: calc(100% - 535px);
    width: 300px;
    background-color: var(--bg-warp-color);
    padding: 20px 10px;
    position: fixed;
    top: 430px;
    left: v-bind(tocRihgt);
    .table-of-contents-warp {
      height: 100%;
      overflow: auto;
      li {
        margin: 8px 0;
        font-size: 12px;
        a {
          text-decoration: none;
          color: var(--text-color);
          &:hover {
            color: var(--theme-color);
          }
          &.active {
            font-weight: bold;
            color: var(--theme-color);
          }
        }
      }
    }
  }
}

.m-flex-container {
  border-radius: 10px;
  width: 100%;
  background-color: var(--bg-warp-color);
  margin-bottom: 20px;
  padding: 20px 10px;
  overflow: hidden;
  .table-of-contents-warp {
    height: 140px;
    overflow-y: auto;
    .toc-title {
      color: var(--text-color);
    }
    li {
      margin: 8px 0;
      font-size: 12px;
      a {
        text-decoration: none;
        color: var(--text-color);
        &:hover {
          color: var(--theme-color);
        }
        &.active {
          font-weight: bold;
          color: var(--theme-color);
        }
      }
    }
  }
}
</style>
