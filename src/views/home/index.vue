<!--
 * @Description: ------------ fileDescription -----------
 * @Author: snows_l snows_l@163.com
 * @Date: 2024-08-05 12:46:00
 * @LastEditors: snows_l snows_l@163.com
 * @LastEditTime: 2024-09-01 00:04:59
 * @FilePath: /BLOG/src/views/home/index.vue
-->
<template>
  <div class="home-warp">
    <div class="first-screen">
      <div class="content-warp" :class="{ showContent: state.isShowContent }">
        <img class="avatar" :src="state.avatar" alt="" />
        <div class="saying">
          <div class="saying-text">
            <i class="saying-icon iconfont icon-quotes-left"></i>
            <span class="saying-words">{{ state.saying }}</span>
            <span class="saying-write">|</span>
            <i class="saying-icon iconfont icon-xia"></i>
          </div>
          <h5 class="text" style="margin-top: 15px">Hello~ I'm snows_l</h5>
        </div>
        <div class="author-info">
          <div class="info-item tool-btn" @click="handleToggleMove('pre')">
            <img class="btn" src="@/assets/images/icon/pre.png" alt="" srcset="" />
          </div>
          <div class="info-out-warp-scroll">
            <div class="info-item-out-warp" :class="{ 'is-tool-next': state.isToolNext }">
              <div class="info-item-warp" v-for="(infoitemList, index) in infoList" :key="index">
                <div v-for="(item, index) in infoitemList" :key="index" class="info-item" :class="item.class" :data-tip="item.kbnTip" @click="handleInfo(item)">
                  <template v-for="img in item.imgs">
                    <img class="img" :class="img.class" :src="img.img" alt="" srcset="" />
                  </template>
                </div>
              </div>
            </div>
          </div>
          <div class="info-item tool-btn" @click="handleToggleMove('next')">
            <img class="btn" src="@/assets/images/icon/next.png" alt="" srcset="" />
          </div>
        </div>
      </div>
      <div class="bottom-down" @click="handleMoveToNext">
        <svg t="1682342753354" class="homepage-downicon" viewBox="0 0 1843 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="21355" width="80px" height="80px">
          <path
            d="M1221.06136021 284.43250057a100.69380037 100.69380037 0 0 1 130.90169466 153.0543795l-352.4275638 302.08090944a100.69380037 100.69380037 0 0 1-130.90169467 0L516.20574044 437.48688007A100.69380037 100.69380037 0 0 1 647.10792676 284.43250057L934.08439763 530.52766665l286.97696258-246.09516608z"
            fill="rgba(255,255,255,0.8)"
            p-id="21356"></path>
        </svg>
      </div>
      <div v-if="!state.isDark" class="bottom-bg"></div>
      <div v-if="!state.isDark" class="bottom-bg1 bottom-bg"></div>
    </div>
    <div class="other-content-warp">
      <div class="other-content" v-if="!isMobi">
        <div class="other-content-item">
          <div class="article-title-warp">
            <img class="article-icon" src="@/assets/images/common/article.png" alt="" />
            <h2 class="content-title">ARTICLE</h2>
          </div>
          <div class="article-warp" v-if="state.articleList && state.articleList.length > 0">
            <div class="article-item pointer kbn-read" @click="handleArticle(item)" v-for="(item, index) in state.articleList" :key="index">
              <div class="img-left item-warp" v-if="index % 2 === 0">
                <div class="cover-img-warp">
                  <Img class="cover-img" :size="isMobi ? '120px' : '160px'" :src="item.cover" :fit="isMobi ? 'contain' : ''" :isUnPreview="true" />
                </div>
                <div class="item-content">
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
                      <span>{{ item.readCount || 0 }}</span>
                    </div>
                    <div>
                      <i class="iconfont icon-comment"></i>
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
                      <span>{{ item.readCount || 0 }}</span>
                    </div>
                    <div>
                      <i class="iconfont icon-comment"></i>
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
                  <Img class="cover-img" :size="isMobi ? '120px' : '160px'" :src="item.cover" :isUnPreview="true" />
                </div>
              </div>
            </div>
          </div>

          <div class="no-article" v-else>
            <Empty :text="'暂无文章，期待您的分享~'" :loadingText="'文章正在拼命加载中...'" :loading="state.loading" />
          </div>
        </div>
      </div>
      <div class="other-content m-other-content" v-else>
        <div class="other-content-item">
          <div class="article-title-warp">
            <img class="article-icon" src="@/assets/images/common/article.png" alt="" />
            <h2 class="content-title">Article</h2>
            <div class="article-warp" v-if="state.articleList && state.articleList.length > 0">
              <div class="article-item pointer kbn-read" @click="handleArticle(item)" :data-tip="item.title" v-for="(item, index) in state.articleList" :key="index">
                <div class="img-left item-warp">
                  <div class="cover-img-warp">
                    <Img class="cover-img" :size="isMobi ? '120px' : '160px'" :src="item.cover" :isUnPreview="true" />
                  </div>
                  <div class="item-content">
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
                        <span>{{ item.readCount || 0 }}</span>
                      </div>
                      <div>
                        <i class="iconfont icon-comment"></i>
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
              <Empty :text="'暂无文章，等待作者更新~'" :loadingText="'文章正在拼命加载中...'" :loading="state.loading" />
            </div>
          </div>
        </div>
      </div>
      <div class="bottom-loading">
        <img
          v-if="state.loading && state.articleList.length != 0"
          style="width: 40px; height: 40px; margin-bottom: 20px"
          src="@/assets/images/common/loading.svg"
          alt=""
          srcset="" />
        <div v-if="!state.loading && state.isMore && state.articleList.length != 0" class="btn-more pointer" @click="handleLoadMore">更早的文章</div>
        <div v-if="!state.isMore && !state.loading && state.articleList.length != 0" class="no-more">很高兴你翻到这里，但是真的没有了...</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getArticleList } from '@/api/article';
import { getDict } from '@/api/common';
import useResize from '@/hooks/useResize';
import { useAppStore } from '@/store/app';
import { getBackstageurl, getQQAvatar } from '@/utils/common';
import { getTheme } from '@/utils/theme';
import moment from 'moment';
import { onMounted, onUnmounted, reactive } from 'vue';
import { useRouter } from 'vue-router';

const { isMobi } = useResize();
const router = useRouter();
const store = useAppStore();

const saying = '我见众生皆草木，唯你是青山。';
const state = reactive({
  saying: '',
  isShowContent: false,
  avatar: getQQAvatar(),
  loading: false,
  isMore: true,
  isDark: false,
  isToolNext: false,
  articleList: [],
  articleTypeList: [],
  page: {
    page: 1,
    size: 5,
    total: 0
  }
});

import iconBackstage from '@/assets/images/icon/backstage.png';
import iconEmail from '@/assets/images/icon/mail.png';
import iconQQ from '@/assets/images/icon/qq.png';
import iconQrcode from '@/assets/images/icon/wechat-qrcode.png';
import iconWeixin from '@/assets/images/icon/weixin.png';

const infoList = [
  [
    {
      class: 'kbn-qq',
      imgs: [{ img: iconQQ }],
      kbnTip: 'QQ: 37523953',
      link: false,
      fnQuery: 'qq'
    },
    {
      class: 'weixin-content kbn-weixin',
      imgs: [
        { class: 'weixin-icon', img: iconWeixin },
        { class: 'weinxin-qrcode', img: iconQrcode }
      ],
      kbnTip: 'WeChat: snows__l',
      link: false,
      fnQuery: 'weixin'
    },
    {
      class: 'kbn-email',
      imgs: [{ img: iconEmail }],
      kbnTip: 'Email: snows_l@163.com',
      link: true,
      fnQuery: 'email'
    }
  ],
  [
    {
      class: 'kbn-link',
      imgs: [{ img: iconBackstage }],
      kbnTip: '后台管理平台',
      link: getBackstageurl()
    }
  ]
];

// 获取文章列表
const getArticleListFn = () => {
  state.loading = true;
  getArticleList(state.page)
    .then(res => {
      if (res.code === 200) {
        res.data.forEach(item => {
          item.createTime = moment(item.createTime).format('YYYY-MM-DD');
          item.cover = import.meta.env.VITE_CURRENT_ENV == 'dev' ? import.meta.env.VITE_DEV_BASE_SERVER + item.cover : import.meta.env.VITE_PROD_BASE_SERVER + item.cover;
          item.subTitle = item.subTitle.replace(/&#39;/g, "'");
        });
        state.articleList = [...state.articleList, ...res.data];
        state.page.total = res.total;
        if (state.articleList.length >= res.total) {
          state.isMore = false; // 已经没有更多数据了
        }
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

// 打字效果输出saying
let intervalTimer: number | null = null;
const inputSaying = () => {
  let index = 0;
  intervalTimer = setInterval(() => {
    if (index === saying.length) {
      clearInterval(intervalTimer);
      return;
    }
    state.saying += saying[index];
    index++;
  }, 120);
};

// 加在更多
const handleLoadMore = () => {
  state.loading = true;
  state.page.page++;
  getArticleListFn();
};

// 切换tool
const handleToggleMove = (type: string) => {
  if (type === 'next') {
    state.isToolNext = true;
  } else {
    state.isToolNext = false;
  }
};

// infoMap
const infoMap = {
  qq: 'mqqwpa://im/proxy?src_type=web&qq_number=37523953',
  email: 'mailto:snows_l@163.com'
};
// 跳转到QQ
const toQQ = () => {
  let system = {};
  const p = navigator.platform;
  system.win = p.indexOf('Win') == 0;
  system.mac = p.indexOf('Mac') == 0;
  system.x11 = p == 'X11' || p.indexOf('Linux') == 0;
  if (system.win || system.mac || system.xll) {
    //如果是电脑跳转到
    window.open('http://wpa.qq.com/msgrd?v=3&uin=37523953&site=qq&menu=yes');
  } else {
    //如果是手机,跳转到
    window.open('mqqwpa://im/chat?chat_type=wpa&uin=37523953&version=1&src_type=web');
  }
};
// 点击名言下的tool
const handleInfo = (item: { class: string; imgs: any[]; kbnTip: string; title: string; link: boolean; fnQuery: string }) => {
  if (item.link) {
    window.open(item.link, '_blank');
  } else {
    if (item.fnQuery === 'qq') {
      toQQ();
    } else {
      infoMap[item.fnQuery] && window.open(infoMap[item.fnQuery]);
    }
  }
};

// 获取文章类型
const getArticleTypeList = () => {
  getDict({ dictType: 'article_type' }).then(res => {
    state.articleTypeList = res.data;
    store.SET_ARTICLE_DICT(res.data);
  });
};
// perf 先看ster有没有， 没有在请求
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

// 下一页
const handleMoveToNext = () => {
  if (document.getElementById('layout')) {
    document.getElementById('layout').scrollTop = document.getElementById('layout')?.clientHeight - 60;
  }
};

// 监听localStorage变化 的回调
const localStorageChangeCallback = (e: StorageEvent) => {
  // 监听需要的键名
  if (e.key === 'isDark') {
    state.isDark = e.newValue as any;
  }
};

let timer: null | number = null;
let timer2: null | number = null;
onMounted(() => {
  timer = setTimeout(() => {
    state.isShowContent = true;
  }, 400);
  timer2 = setTimeout(() => {
    inputSaying();
  }, 800);
  //监听localStorage变化
  window.addEventListener('setItemEvent', localStorageChangeCallback);
  state.isDark = getTheme() === 'dark';
});

// 卸载 优化
onUnmounted(() => {
  if (timer) {
    clearTimeout(timer);
    timer = null;
  }
  if (timer2) {
    clearTimeout(timer2);
    timer2 = null;
  }
  if (intervalTimer) {
    clearInterval(intervalTimer);
    intervalTimer = null;
  }
  window.removeEventListener('setItemEvent', localStorageChangeCallback);
});
</script>

<style lang="scss" scoped>
.home-warp {
  .first-screen {
    width: 100%;
    height: 100vh;
    position: relative;
    background-color: var(--bg-image-warp-color);
    .content-warp {
      width: 100%;
      position: absolute;
      top: 20%;
      left: 50%;
      transform: translate(-50%, -50%);
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      opacity: 0;
      transition: top 0.8s ease-in, opacity 0.8s ease-in;
      .avatar {
        width: 120px;
        height: 120px;
        border-radius: 50%;
        border: 2px solid #fff;
        transition: all 1.2s ease-in-out;
      }
      .avatar:hover {
        border-color: var(--theme-color);
        transform: rotate(360deg);
      }
      .saying {
        width: 60%;
        max-width: 750px;
        min-width: 350px;
        padding: 20px 0;
        margin-top: 30px;
        border-radius: 10px;
        background-color: var(--bg-content-color);
        color: var(--text-color);
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        .saying-icon {
          margin: 0 10px;
          font-size: 18px;
          font-weight: 600;
        }
        .saying-write {
          margin: 0 3px;
          font-weight: 600;
          animation: blink 1s infinite;
        }
        .saying-words {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          cursor: url('@/assets/images/cursor/text.png'), auto;
        }
      }
      .author-info {
        display: flex;
        margin-top: 30px;
        align-items: center;
        justify-content: center;
        height: 80px;
        .info-out-warp-scroll {
          width: 230px;
          overflow: hidden;
          display: flex;
          justify-content: center;
          align-items: center;
          position: relative;
          height: 100%;
          .info-item-out-warp {
            display: flex;
            justify-content: center;
            align-items: center;
            position: absolute;
            top: 0;
            left: 0;
            height: 100%;
            transition: left 0.8s ease-in-out;
            .info-item-warp {
              width: 230px;
              display: flex;
              justify-content: center;
              align-items: center;
              height: 100%;
            }
          }
          .is-tool-next {
            left: -230px;
          }
        }
        .info-item {
          margin: 0 10px;
          cursor: url('@/assets/images/cursor/pointer.png'), auto;
          padding: 8px;
          border-radius: 15px;
          background-color: var(--bg-warp-color);
          display: flex;
          justify-content: center;
          align-items: center;
          width: 50px;
          height: 50px;
        }
        .tool-btn {
          background-color: transparent;
        }
        .btn,
        img {
          width: 30px;
          height: 30px;
        }
        .weixin-content {
          width: 50px;
          height: 50px;
          transition: width 0.8s ease-in-out, height 0.8s ease-in-out;
          overflow: hidden;
          .weinxin-qrcode {
            display: none;
          }
        }
        .weixin-content:hover {
          width: 80px !important;
          height: 80px;
          .weixin-icon {
            display: none;
          }
          .weinxin-qrcode {
            display: block;
            width: 64px;
            height: 64px;
          }
        }
      }
    }
    .showContent {
      top: 50%;
      opacity: 1;
    }
    .bottom-bg {
      height: 65px;
      position: absolute;
      bottom: 0;
      width: 400%;
      left: -236px;
      z-index: 4;
      transition-duration: 0.4s, 0.4s;
      animation-name: move2;
      animation-duration: 30s;
      animation-fill-mode: backwards;
      animation-timing-function: linear;
      animation-iteration-count: infinite;
      background-image: url('@/assets/images/common/wave1.png');
    }
    .bottom-bg1 {
      height: 80px;
      width: 400%;
      left: 0;
      z-index: 3;
      opacity: 1;
      transition-duration: 0.4s, 0.4s;
      animation-name: move2;
      animation-duration: 20s;
      animation-fill-mode: backwards;
      animation-timing-function: linear;
      animation-iteration-count: infinite;
      animation-fill-mode: backwards;
      animation-timing-function: linear;
      animation-iteration-count: infinite;
      background-image: url('@/assets/images/common/wave2.png');
    }
    .bottom-down {
      position: absolute;
      bottom: 80px;
      left: calc(50% - 40px);
      animation: bottomAnimation 1.6s infinite;
    }
  }
  .other-content-warp {
    margin-top: -0px;
    background-color: var(--bg-warp-color);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .other-content {
      margin-top: 30px;
      max-width: var(--content-max-width);
      width: 100%;
      .other-content-item {
        margin-bottom: 40px;
        .article-title-warp {
          margin-bottom: 30px;
          .article-icon {
            width: 26px;
            height: 26px;
          }
          .content-title {
            margin-top: 10px;
            font-size: 20px;
            font-weight: 600;
            color: var(--text-color);
          }
        }
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
    }

    .m-other-content {
      max-width: 96%;
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

    .bottom-loading {
      .btn-more {
        margin-bottom: 20px;
        padding: 10px 20px;
        border-radius: 20px;
        background-color: var(--theme-light-color-9);
        color: var(--theme-color);
      }
      .no-more {
        margin-bottom: 20px;
        color: var(--theme-light-color-3);
      }
    }
  }
}

// 光标闪烁效果动画
@keyframes blink {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
// 背景动画
@keyframes move2 {
  100% {
    background-position: -100% 0;
  }
}
// 下滑按钮动画
@keyframes bottomAnimation {
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(16px);
  }
  100% {
    transform: translateY(0);
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
