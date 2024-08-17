<!--
 * @Description: ------------ fileDescription -----------
 * @Author: snows_l snows_l@163.com
 * @Date: 2024-08-08 10:56:18
 * @LastEditors: snows_l snows_l@163.com
 * @LastEditTime: 2024-08-17 10:58:40
 * @FilePath: /BLOG/src/views/article/detail.vue
-->
<template>
  <div class="article-detail-warp">
    <PageTopCover
      :moduleTitle="'文章详情'"
      :icon="'icon-jiaocheng-3'"
      :coverImg="articleCover"
      :isMobile="isMobi"
      :mudulDesc="state.arcticleDetail.title"
      :isArticle="false"></PageTopCover>

    <div class="article-content-warp-out" v-if="valueHtml" :class="{ 'm-article-content-warp-out': isMobi }">
      <div class="article-content-warp">
        <div class="article-content">
          <div class="article-cover-warp" :class="{ 'm-article-cover-warp': isMobi }">
            <Img :src="state.arcticleDetail.cover" :size="'240px'" />
          </div>
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
    <div class="no-article" :class="{ 'm-no-article': isMobi }" v-else>
      <Empty :text="'暂无文章内容，请等待作者更新'" :loadingText="'文章内容正在拼命加载中...'" :loading="state.loading" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { addCommentCount, addShareCount, getArticleDetail } from '@/api/article';
import articleCover from '@/assets/images/bg/cover-article.png';
import { randomNum } from '@/utils/common';
import { Editor, Toolbar } from '@wangeditor/editor-for-vue';
import '@wangeditor/editor/dist/css/style.css'; // 引入 css
import { nextTick, onBeforeUnmount, onMounted, reactive, ref, shallowRef, watch } from 'vue';
import { useRoute } from 'vue-router';

import useResize from '@/hooks/useResize';
const { isMobi } = useResize();

const route = useRoute();
let articleId = route.query.id;

// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef();
// 编辑模式
const mode = ref('default'); // simple | default
const valueHtml = ref('');

const state = reactive({
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
// 增加阅读、评论、分享的点击事件处理函数
const handleAdd = (type: string) => {
  if (type === 'comment') {
    addCommentCount(articleId);
  } else if (type === 'share') {
    addShareCount(articleId);
  }
  getArticleDetailFn();
};

// 添加复制按钮的逻辑
const copyCode = () => {
  nextTick(() => {
    const codeBlocks = document.querySelectorAll('#w-e-textarea-1');
    console.log('-------- codeBlocks --------', codeBlocks);
    codeBlocks.forEach(codeBlock => {
      // 创建复制按钮
      const copyButton = document.createElement('button');
      copyButton.innerText = '复制';
      copyButton.classList.add('copy-button');

      // 为复制按钮添加点击事件处理程序
      copyButton.addEventListener('click', () => {
        const codeText = codeBlock.querySelector('span').textContent;
        copy(codeText, '已复制', false);
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
  });
};

// 添加锚点
const addAnchorLinks = () => {
  const headings = document.querySelectorAll('.editor h1, .editor h2, .editor h3');
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
const handleItemClick = (index: number) => {
  activeIndex.value = index;

  // 获取目标目录项的锚点链接 href 属性值
  const targetItem = document.querySelector(`.table-of-contents a[href="#section-${index + 1}"]`) as HTMLElement;

  // 滚动目录以确保当前点击的目录项可见
  if (targetItem) {
    const container = document.querySelector('.table-of-contents') as HTMLElement;
    const containerRect = container.getBoundingClientRect();
    const scrollTop = targetItem.offsetTop - containerRect.height / 2;
    container.scrollTop = scrollTop;
  }
};

// 生成目录
const generateTableOfContents = () => {
  const headings = document.querySelectorAll('.editor h1, .editor h2, .editor h3');
  const toc = [];
  headings.forEach((heading, index) => {
    const id = `section-${index + 1}`;
    const level = heading.tagName === 'H1' ? 1 : heading.tagName === 'H2' ? 2 : 3; // 根据标题等级设置目录项的缩进
    heading.setAttribute('id', id); // 设置标题的id属性
    toc.push({ id: id, text: heading.textContent, level: level, index: index }); // 将标题文本、id和等级添加到目录项中
  });
  return toc;
};

const handleScroll = () => {
  requestAnimationFrame(() => {
    const sections = document.querySelectorAll('.editor h1, .editor h2, .editor h3');
    const scrollY = window.scrollY || window.pageYOffset;
    let currentIndex = 0;
    for (let i = 0; i < sections.length; i++) {
      const sectionTop = (sections[i] as HTMLElement).offsetTop;
      if (scrollY >= sectionTop) {
        currentIndex = i;
      }
    }

    // 检查当前视图中是否有标题元素，如果有，将其索引赋给 currentIndex
    const visibleSections = Array.from(sections).filter(section => {
      const sectionTop = (section as HTMLElement).offsetTop;
      const sectionBottom = sectionTop + (section as HTMLElement).offsetHeight;
      return scrollY >= sectionTop && scrollY <= sectionBottom;
    });
    if (visibleSections.length > 0) {
      currentIndex = Array.from(sections).indexOf(visibleSections[visibleSections.length - 1]);
    }

    activeIndex.value = currentIndex;

    // 滚动目录以确保当前高亮的目录项可见
    const activeItem = document.querySelector('.table-of-contents .active') as HTMLElement;
    if (activeItem) {
      const container = document.querySelector('.table-of-contents');
      const containerRect = container.getBoundingClientRect();
      const activeRect = activeItem.getBoundingClientRect();
      const scrollTop = activeItem.offsetTop - containerRect.height / 2 + activeRect.height / 2;
      container.scrollTop = scrollTop;
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

// 模拟 ajax 异步获取内容
onMounted(() => {
  addAnchorLinks();
  copyCode();
  window.addEventListener('scroll', handleScroll);
});

// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
  const editor = editorRef.value;
  if (editor == null) return;
  editor.destroy();
  window.removeEventListener('scroll', handleScroll);
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
        padding: 20px 16px;
        box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
        border-radius: 15px;
        background-color: var(--bg-content-color);
        color: var(--text-color);
        line-height: 20px !important;
        .article-cover-warp {
          width: 100%;
          height: 350px;
          border-top-left-radius: 15px;
          border-top-right-radius: 15px;
          overflow: hidden;
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
      max-width: 96% !important;
    }
  }

  .no-article {
    max-width: var(--content-max-width);
    margin: 0 auto;
    text-align: center;
    height: calc(100vh - 400px);
  }
  .m-no-article {
    max-width: 96% !important;
    margin: 0 auto !important;
    height: calc(100vh - 300px) !important;
  }
}
</style>
