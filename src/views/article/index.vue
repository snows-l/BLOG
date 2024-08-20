<!--
 * @Description: ------------ fileDescription -----------
 * @Author: snows_l snows_l@163.com
 * @Date: 2024-08-08 11:01:12
 * @LastEditors: snows_l snows_l@163.com
 * @LastEditTime: 2024-08-20 10:00:26
 * @FilePath: /BLOG/src/views/article/index.vue
-->
<template>
  <div class="article-detail-warp">
    <PageTopCover
      :moduleTitle="state.currentModule.moduleTitle"
      :icon="state.currentModule.moduleIcon"
      :coverImg="state.currentModule.muduleCover"
      :isMobile="isMobi"
      :mudulDesc="state.currentModule.moduleDesc"
      :isArticle="false"></PageTopCover>
    <div class="article-content-warp-out" :class="{ 'm-article-content-warp-out': isMobi }">
      <div class="other-content" v-if="!isMobi">
        <div class="article-content-warp" v-if="state.articleList.length > 0">
          <div class="article-item kbn-read pointer" :data-tip="item.title" v-for="(item, index) in state.articleList" :key="index">
            <div class="img-left item-warp" v-if="index % 2 === 0">
              <div class="cover-img-warp">
                <Img class="cover-img" :src="item.cover" :size="isMobi ? '120px' : '160px'" />
              </div>
              <div class="item-content" @click="handleArticle(item)">
                <div class="create-time">
                  <i class="iconfont icon-shijian"></i>
                  <span>发布于：</span>
                  <span>{{ item.createTime }}</span>
                  <div class="type">{{ state.articleTypeList.find(v => v.value == item.type)?.label || '未知类型' }}</div>
                </div>
                <div class="article-title">
                  {{ item.title }}
                </div>
                <div class="auth-info-warp">
                  <div>
                    <img :src="state.avatar" alt="" />
                    <span>snows_l</span>
                  </div>
                  <div>
                    <i class="iconfont icon-yanjing"></i>
                    <span>{{ item.readCount || randomNum(30, 500) }}</span>
                  </div>
                  <div>
                    <i class="iconfont icon-comment"></i>
                    <span>{{ item.commentCount || randomNum(5, 20) }}</span>
                  </div>
                  <div>
                    <i class="iconfont icon-fenxiang1"></i>
                    <span>{{ item.shareCount || randomNum(10, 200) }}</span>
                  </div>
                </div>
                <div class="article-des text">
                  {{ item.subTitle }}
                </div>
              </div>
            </div>
            <div class="img-right item-warp" v-else>
              <div class="item-content" @click="handleArticle(item)">
                <div class="create-time">
                  <i class="iconfont icon-shijian"></i>
                  <span>发布于：</span>
                  <span>{{ item.createTime }}</span>
                  <div class="type">{{ state.articleTypeList.find(v => v.value == item.type)?.label || '未知类型' }}</div>
                </div>
                <div class="article-title">
                  {{ item.title }}
                </div>
                <div class="auth-info-warp">
                  <div>
                    <img :src="state.avatar" alt="" />
                    <span>snows_l</span>
                  </div>
                  <div>
                    <i class="iconfont icon-yanjing"></i>
                    <span>{{ item.readCount || randomNum(30, 500) }}</span>
                  </div>
                  <div>
                    <i class="iconfont icon-comment"></i>
                    <span>{{ item.commentCount || randomNum(5, 20) }}</span>
                  </div>
                  <div>
                    <i class="iconfont icon-fenxiang1"></i>
                    <span>{{ item.shareCount || randomNum(10, 200) }}</span>
                  </div>
                </div>
                <div class="article-des text">
                  {{ item.subTitle }}
                </div>
              </div>
              <div class="cover-img-warp">
                <Img class="cover-img" :src="item.cover" :size="isMobi ? '120px' : '160px'" />
              </div>
            </div>
          </div>
        </div>

        <div class="no-article" v-else>
          <Empty :text="'暂无文章，期待您的分享~'" :loadingText="'文章正在拼命加载中...'" :loading="state.loading" />
        </div>
      </div>
      <div class="other-content m-other-content" v-else>
        <div class="article-content-warp" v-if="state.articleList.length > 0">
          <div class="article-item kbn-read" :data-tip="item.title" v-for="(item, index) in state.articleList" :key="index">
            <div class="img-left item-warp pointer">
              <div class="cover-img-warp">
                <Img class="cover-img" :src="item.cover" :size="isMobi ? '120px' : '160px'" />
              </div>
              <div class="item-content" @click="handleArticle(item)">
                <div class="create-time">
                  <i class="iconfont icon-shijian"></i>
                  <span>发布于：</span>
                  <span>{{ item.createTime }}</span>
                  <div class="type">{{ state.articleTypeList.find(v => v.value == item.type)?.label || '未知类型' }}</div>
                </div>
                <div class="article-title">
                  {{ item.title }}
                </div>
                <div class="auth-info-warp">
                  <div>
                    <img :src="state.avatar" vertical-align="middle" alt="" />
                    <span>snows_l</span>
                  </div>
                  <div>
                    <i class="iconfont icon-yanjing"></i>
                    <span>{{ item.readCount || randomNum(30, 500) }}</span>
                  </div>
                  <div>
                    <i class="iconfont icon-comment"></i>
                    <span>{{ item.commentCount || randomNum(5, 20) }}</span>
                  </div>
                  <div>
                    <i class="iconfont icon-fenxiang1"></i>
                    <span>{{ item.shareCount || randomNum(10, 200) }}</span>
                  </div>
                </div>
                <div class="article-des text">
                  {{ item.subTitle }}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="m-no-article" v-else>
          <Empty :text="'暂无文章，期待您的分享~'" :loadingText="'文章正在拼命加载中...'" :loading="state.loading" />
        </div>
      </div>
      <div class="bottom-loading">
        <img
          v-if="state.loading && state.articleList.length > 0"
          style="width: 40px; height: 40px; margin-bottom: 20px"
          src="@/assets/images/common/loading.svg"
          alt=""
          srcset="" />
        <div v-if="!state.loading && state.isMore" class="btn-more pointer" @click="handleLoadMore">更早的文章</div>
        <div v-if="!state.isMore && state.articleList.length > 0" class="no-more">很高兴你翻到这里，但是真的没有了...</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { getArticleList } from '@/api/article';
import { getDict } from '@/api/common';
import houduanCover from '@/assets/images/bg/cover-houduan.png';
import otherCover from '@/assets/images/bg/cover-other.png';
import qianduanCover from '@/assets/images/bg/cover-qianduan.png';
import { useAppStore } from '@/store/app';
import { getQQAvatar, randomNum } from '@/utils/common';
import moment from 'moment';
import { reactive, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import useResize from '@/hooks/useResize';
const { isMobi } = useResize();

const store = useAppStore();
const router = useRouter();
const route = useRoute();

const typeMap = {
  1: {
    moduleTitle: '前端-文章列表',
    moduleIcon: 'icon-qianduan',
    muduleCover: qianduanCover,
    moduleDesc: ''
  },
  2: {
    moduleTitle: '后端-文章列表',
    moduleIcon: 'icon-node-js',
    muduleCover: houduanCover,
    moduleDesc: ''
  },
  3: {
    moduleTitle: '其他-文章列表',
    moduleIcon: 'icon-jiaocheng-3',
    muduleCover: otherCover,
    moduleDesc: ''
  }
};

const state = reactive({
  avatar: getQQAvatar(),
  loading: false,
  isMore: true,
  type: route.query.type,
  page: {
    page: 1,
    size: 5,
    total: 0
  },
  articleList: [],
  articleTypeList: [],
  currentModule: route.query.type ? typeMap[route.query.type] : typeMap[1]
});

const getArticleListFn = () => {
  state.loading = true;
  getArticleList({ ...state.page, type: route.query.type })
    .then(res => {
      if (res.code === 200) {
        res.data.forEach(item => {
          item.createTime = moment(item.createTime).format('YYYY-MM-DD');
          item.cover = import.meta.env.VITE_CURRENT_ENV == 'dev' ? import.meta.env.VITE_DEV_BASE_SERVER + item.cover : import.meta.env.VITE_PROD_BASE_SERVER + item.cover;
        });
        state.articleList = [...state.articleList, ...res.data];
        state.page.total = res.total;
        if (state.articleList.length >= res.total) {
          state.isMore = false; // 已经没有更多数据了
        }
        state.loading = false;
      }
    })
    .catch(() => {
      state.isMore = false;
    })
    .finally(() => {
      state.loading = false;
    });
};
getArticleListFn();

// 获取文章类型
const getArticleTypeList = () => {
  getDict({ dictType: 'article_type' }).then(res => {
    state.articleTypeList = res.data;
    store.SET_ARTICLE_DICT(res.data);
  });
};

store.articleDict.length > 0 ? (state.articleTypeList = store.articleDict) : getArticleTypeList();

// 点击文章详情
const handleArticle = row => {
  if (isMobi) {
    router.push({
      path: '/article/detail',
      query: {
        id: row.id
      }
    });
  } else {
    window.open(`${window.location.origin}/article/detail?id=${row.id}`, '_blank');
  }
};

// 加在更多
const handleLoadMore = () => {
  state.loading = true;
  state.page.page++;
  getArticleListFn();
};

watch(
  () => route.query.type,
  n => {
    state.type = n;
    state.currentModule = typeMap[n];
    state.page.page = 1;
    state.page.total = 0;
    state.articleList = [];
    state.isMore = true;
    getArticleListFn();
  }
);
</script>

<style lang="scss" scoped>
.article-detail-warp {
  width: 100%;
  height: 100%;
  .article-content-warp-out {
    width: 100%;
    height: 100%;
    background-color: var(--bg-image-warp-color);
    .article-content-warp {
      padding: 5px 0;
      max-width: var(--content-max-width);
      margin: 0 auto;
      .article-item {
        margin: 40px 0;
        border-radius: 15px;
        width: 100%;
        height: 100%;
        overflow: hidden;
        box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
        .item-warp {
          display: flex;
          width: 100%;
        }
        .cover-img-warp {
          width: 450px;
          height: 280px;
          overflow: hidden;
          .cover-img {
            width: 100%;
            height: 100%;
            transition: all 0.8s ease-in-out;
          }
          .cover-img:hover {
            transform: scale(1.1);
          }
        }
        .item-content {
          flex: 1;
          height: 280px;
          padding: 20px;
          background-color: var(--bg-content-color);
          position: relative;
          .create-time {
            display: inline-block;
            height: 20px;
            font-size: 12px;
            padding: 4px 8px;
            background-color: var(--theme-light-color-9);
            border-radius: 5px;
            color: var(--theme-color);
            .iconfont {
              font-size: 12px;
              margin-right: 10px;
            }
            .type {
              border: 1px solid var(--theme-light-color-9);
              border-radius: 5px;
              padding: 2px 4px;
              font-size: 12px;
              position: absolute;
              top: 20px;
              right: 20px;
            }
          }
          .article-title {
            margin-top: 20px;
            height: 60px;
            font-size: 20px;
            line-height: 30px;
            cursor: url('@/assets/images/cursor/text.png'), auto;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            overflow: hidden;
            text-overflow: ellipsis;
            text-align: left;
            color: var(--text-color);
          }
          .article-title:hover {
            color: var(--theme-color);
          }
          .auth-info-warp {
            height: 50px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            div {
              display: flex;
              align-items: center;
              .iconfont {
                margin-right: 10px;
                font-size: 20px;
                color: var(--theme-color);
              }
              .icon-yanjing {
                font-size: 24px;
              }
              span {
                font-size: 12px;
                color: var(--text-color);
              }
            }
            img {
              width: 30px;
              height: 30px;
              border-radius: 50%;
              margin-right: 10px;
            }
          }
          .article-des {
            height: 86px;
            line-height: 21px;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 4;
            overflow: hidden;
            text-overflow: ellipsis;
            color: var(--text-color-2);
          }
        }
      }
    }
    .no-article {
      margin: 0 auto;
      max-width: var(--content-max-width);
    }
  }
  .m-article-content-warp-out {
    .other-content {
      max-width: 96%;
      margin: 0 auto;
      .item-warp {
        display: flex;
        flex-direction: column;
        height: auto !important;
        .cover-img-warp {
          width: 100% !important;
          height: 180px !important;
        }

        .item-content {
          height: 180px;
          .article-title {
            margin-top: 10px !important;
            height: 40px !important;
            line-height: 20px !important;
            font-size: 16px !important;
          }
        }
        .auth-info-warp {
          height: 30px !important;
          img {
            width: 20px !important;
            height: 20px !important;
          }
        }
        .article-des {
          height: 30px !important;
          line-height: 15px !important;
          font-size: 12px !important;
          -webkit-line-clamp: 2 !important;
        }
      }
    }
  }
  .bottom-loading {
    display: flex;
    align-items: center;
    justify-content: center;
    .btn-more {
      margin-bottom: 20px;
      padding: 10px 20px;
      border-radius: 20px;
      background-color: var(--theme-light-color-9);
      color: var(--theme-color);
    }
    .no-more {
      color: var(--theme-light-color-3);
      margin-bottom: 20px;
    }
  }

  .no-article {
    height: calc(100vh - 400px);
  }
  .m-no-article {
    height: calc(100vh - 300px);
  }
}
</style>
<style lang="scss">
.dark {
  .article-item:hover {
    box-shadow: 2px 2px 10px 2px var(--theme-light-color-2) !important;
  }
}
</style>
