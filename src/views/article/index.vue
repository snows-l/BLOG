<!--
 * @Description: ------------ fileDescription -----------
 * @Author: snows_l snows_l@163.com
 * @Date: 2024-08-08 11:01:12
 * @LastEditors: snows_l snows_l@163.com
 * @LastEditTime: 2024-09-05 23:02:08
 * @FilePath: /BLOG/src/views/article/index.vue
-->
<template>
  <div class="article-detail-warp">
    <PageTopCover
      :moduleTitle="state.currentModule.moduleTitle"
      :icon="state.currentModule.moduleIcon"
      :textIcon="state.currentModule.moduleTextIcon"
      :imgIcon="state.currentModule.moduleImgIcon"
      :coverImg="state.currentModule.muduleCover"
      :isMobile="isMobi"
      :mudulDesc="state.currentModule.moduleDesc"
      :isArticle="false"></PageTopCover>
    <div class="article-content-warp-out" :class="{ 'm-article-content-warp-out': isMobi }">
      <div class="other-content" v-if="!isMobi">
        <div class="article-content-warp" v-if="state.articleList.length > 0">
          <div class="article-item kbn-read pointer" @click="handleArticle(item)" :data-tip="item.title" v-for="(item, index) in state.articleList" :key="index">
            <div class="img-left item-warp" v-if="index % 2 === 0">
              <div class="cover-img-warp">
                <LImg class="cover-img" :src="item.cover" :size="isMobi ? '120px' : '160px'" :isUnPreview="true" />
              </div>
              <div class="item-content">
                <div class="create-time">
                  <div class="time-warp">
                    <IconCalendar class="iconfont"></IconCalendar>
                    <span>发布于：</span>
                    <span class="time">{{ item.createTime }}</span>
                  </div>
                  <div class="type">
                    <IconLabel class="iconfont"></IconLabel>
                    {{ state.articleTypeList.find(v => v.value == item.type)?.label || '未知类型' }}
                  </div>
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
                    <IconHot class="iconfont"></IconHot>
                    <span>{{ item.readCount || 0 }}</span>
                  </div>
                  <div>
                    <IconComment :size="18" class="iconfont"></IconComment>
                    <span>{{ item.commentCount || 0 }}</span>
                  </div>
                  <div>
                    <i class="iconfont icon-fenxiang1"></i>
                    <span>{{ item.shareCount || 0 }}</span>
                  </div>
                </div>
                <div class="article-des text">
                  {{ item.subTitle }}
                </div>
              </div>
            </div>
            <div class="img-right item-warp" v-else>
              <div class="item-content">
                <div class="create-time">
                  <div class="time-warp">
                    <IconCalendar class="iconfont"></IconCalendar>
                    <span>发布于：</span>
                    <span class="time">{{ item.createTime }}</span>
                  </div>
                  <div class="type">
                    <IconLabel class="iconfont"></IconLabel>
                    {{ state.articleTypeList.find(v => v.value == item.type)?.label || '未知类型' }}
                  </div>
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
                    <IconHot class="iconfont"></IconHot>
                    <span>{{ item.readCount || 0 }}</span>
                  </div>
                  <div>
                    <IconComment :size="18" class="iconfont"></IconComment>
                    <span>{{ item.commentCount || 0 }}</span>
                  </div>
                  <div>
                    <i class="iconfont icon-fenxiang1"></i>
                    <span>{{ item.shareCount || 0 }}</span>
                  </div>
                </div>
                <div class="article-des text">
                  {{ item.subTitle }}
                </div>
              </div>
              <div class="cover-img-warp">
                <LImg class="cover-img" :src="item.cover" :size="isMobi ? '120px' : '160px'" :isUnPreview="true" />
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
          <div class="article-item kbn-read" @click="handleArticle(item)" :data-tip="item.title" v-for="(item, index) in state.articleList" :key="index">
            <div class="img-left item-warp pointer">
              <div class="cover-img-warp">
                <LImg class="cover-img" :src="item.cover" :size="isMobi ? '120px' : '160px'" :isUnPreview="true" />
              </div>
              <div class="item-content">
                <div class="create-time">
                  <div class="time-warp">
                    <IconCalendar class="iconfont"></IconCalendar>
                    <span>发布于：</span>
                    <span class="time">{{ item.createTime }}</span>
                  </div>
                  <div class="type">
                    <IconLabel class="iconfont"></IconLabel>
                    {{ state.articleTypeList.find(v => v.value == item.type)?.label || '未知类型' }}
                  </div>
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
                    <IconHot class="iconfont"></IconHot>
                    <span>{{ item.readCount || 0 }}</span>
                  </div>
                  <div>
                    <IconComment :size="18" class="iconfont"></IconComment>
                    <span>{{ item.commentCount || 0 }}</span>
                  </div>
                  <div>
                    <i class="iconfont icon-fenxiang1"></i>
                    <span>{{ item.shareCount || 0 }}</span>
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
import { getQQAvatar } from '@/utils/common';
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
    moduleTextIcon: '🎨',
    muduleCover: qianduanCover,
    moduleDesc: ''
  },
  2: {
    moduleTitle: '后端-文章列表',
    moduleImgIcon: 'Nodejs.png',
    muduleCover: houduanCover,
    moduleDesc: ''
  },
  3: {
    moduleTitle: '其他-文章列表',
    moduleTextIcon: '📚',
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
  if (isMobi.value) {
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
        margin: 24px 0;
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
          padding: 48px 30px;
          background-color: var(--bg-content-color);
          position: relative;
          .create-time {
            display: inline-block;
            align-items: center;
            height: 24px;
            font-size: 12px;
            padding: 2px 8px;
            background-color: var(--theme-light-color-9);
            border-radius: 5px;
            color: var(--theme-color);
            .time-warp {
              height: 100%;
              display: flex;
              align-items: center;
              .iconfont {
                font-size: 12px;
                margin-right: 10px;
              }
            }
            .type {
              height: 22px;
              // background-color: var(--theme-light-color-9);
              // border: 1px solid var(--theme-light-color-9);
              border-radius: 5px;
              padding: 2px 4px;
              font-size: 12px;
              position: absolute;
              top: 48px;
              right: 30px;
            }
          }
          .article-title {
            margin-top: 20px;
            height: 30px;
            font-size: 20px;
            line-height: 30px;
            cursor: url('@/assets/images/cursor/text.png'), auto;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 1;
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
            height: 64px;
            line-height: 21px;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 3;
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
      max-width: var(--content-max-width-m);
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
          padding: 10px 20px !important;
          .article-title {
            margin-top: 10px !important;
            height: 30px !important;
            line-height: 30px !important;
            font-size: 16px !important;
          }
          .type {
            top: 10px !important;
            right: 20px !important;
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
