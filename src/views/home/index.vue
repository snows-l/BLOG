<!--
 * @Description: ------------ fileDescription -----------
 * @Author: snows_l snows_l@163.com
 * @Date: 2024-08-05 12:46:00
 * @LastEditors: snows_l snows_l@163.com
 * @LastEditTime: 2024-10-05 15:37:35
 * @FilePath: /BLOG/src/views/home/index.vue
-->
<template>
  <div class="home-warp">
    <div class="first-screen" :style="{ backgroundImage: `url(${state.bgImg})` }">
      <img :src="state.bgImgUrl" style="width: 100%; height: 100%; object-fit: cover" />
      <div class="content-warp" :class="{ showContent: state.isShowContent }">
        <img class="avatar" :src="state.avatar" alt="" />
        <div class="saying">
          <div class="saying-text">
            <i class="saying-icon iconfont icon-quotes-left"></i>
            <span class="saying-words text">{{ state.saying }}</span>
            <span class="saying-write">|</span>
            <i class="saying-icon iconfont icon-xia"></i>
          </div>
          <h5 class="text" style="margin-top: 15px">Hello~ I'm snows_l</h5>
        </div>
        <div class="author-info">
          <div class="info-item tool-btn" :class="{ 'm-tool-btn': isMobi }" @click="handleToggleMove('pre')">
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
          <div class="info-item tool-btn" :class="{ 'm-tool-btn': isMobi }" @click="handleToggleMove('next')">
            <img class="btn" src="@/assets/images/icon/next.png" alt="" srcset="" />
          </div>
        </div>
      </div>
      <div class="bottom-down" @click="handleMoveToNext">
        <IconDown></IconDown>
      </div>
      <div class="bottom-bg"></div>
      <div class="bottom-bg1 bottom-bg"></div>
      <div class="bottom-bg1 bottom-bg"></div>
      <div class="transition-warp"></div>
    </div>
    <div class="other-content-warp">
      <div class="flex-warp">
        <div class="content-center">
          <Notice class="other-content" :class="{ 'm-other-content': isMobi }"></Notice>
          <div class="other-content" v-if="!isMobi">
            <div class="other-content-item">
              <div class="article-title-warp">
                <img class="article-icon" src="@/assets/images/common/article.png" alt="" />
                <h2 class="content-title">ARTICLE</h2>
              </div>
              <div class="article-warp" v-if="state.articleList && state.articleList.length > 0">
                <div class="article-item kbn-read" v-for="(item, index) in state.articleList" :key="index">
                  <div class="img-left item-warp" v-if="index % 2 === 0">
                    <div class="cover-img-warp pointer" @click="handleArticle(item)">
                      <LImg class="cover-img" :size="isMobi ? '120px' : '160px'" :src="item.cover" :fit="isMobi ? 'contain' : ''" :isUnPreview="true" />
                    </div>
                    <div class="item-content">
                      <div class="create-time">
                        <div class="time-warp">
                          <IconCalendar class="iconfont"></IconCalendar>
                          <span>发布于：</span>
                          <span class="time">{{ item.createTime }}</span>
                        </div>
                      </div>
                      <div class="article-title pointer" @click="handleArticle(item)">
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
                          <IconLike :size="18" class="iconfont" />
                          <span>{{ item.shareCount || 0 }}</span>
                        </div>
                        <div>
                          <IconComment :size="19" class="iconfont"></IconComment>
                          <span>{{ item.commentCount || 0 }}</span>
                        </div>
                        <div class="pointer" data-tip="点击 可直接阅览" v-if="item.isPreview === 1" @click="handleView(item)">
                          <IconPreview class="iconfont" :size="18"></IconPreview>
                          <span class="" style="font-size: 12px">预览</span>
                        </div>
                      </div>
                      <div class="article-des text">
                        {{ item.subTitle }}
                      </div>
                      <div class="label-warp">
                        <div class="type">
                          <IconType class="iconfont"></IconType>
                          {{ state.articleTypeList.find(v => v.value == item.type)?.label || '未知类型' }}
                        </div>
                        <div class="label-item" v-for="(label, index) in item.labels" :key="index">
                          <IconLabel class="iconfont"></IconLabel>
                          <span class="label">{{ label }}</span>
                        </div>
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
                      </div>
                      <div class="article-title pointer" @click="handleArticle(item)">
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
                          <IconLike :size="18" class="iconfont" />
                          <span>{{ item.shareCount || 0 }}</span>
                        </div>
                        <div>
                          <IconComment :size="19" class="iconfont"></IconComment>
                          <span>{{ item.commentCount || 0 }}</span>
                        </div>
                        <div class="pointer" data-tip="点击 可直接阅览" v-if="item.isPreview === 1" @click="handleView(item)">
                          <IconPreview class="iconfont" :size="18"></IconPreview>
                          <span class="" style="font-size: 12px">预览</span>
                        </div>
                      </div>
                      <div class="article-des text">
                        {{ item.subTitle }}
                      </div>
                      <div class="label-warp">
                        <div class="type">
                          <IconType class="iconfont"></IconType>
                          {{ state.articleTypeList.find(v => v.value == item.type)?.label || '未知类型' }}
                        </div>
                        <div class="label-item" v-for="(label, index) in item.labels" :key="index">
                          <IconLabel class="iconfont"></IconLabel>
                          <span class="label">{{ label }}</span>
                        </div>
                      </div>
                    </div>
                    <div class="cover-img-warp pointer" @click="handleArticle(item)">
                      <LImg class="cover-img" :size="isMobi ? '120px' : '160px'" :src="item.cover" :isUnPreview="true" />
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
                <h2 class="content-title">ARTICLE</h2>
                <div class="article-warp" v-if="state.articleList && state.articleList.length > 0">
                  <div class="article-item kbn-read" :data-tip="item.title" v-for="(item, index) in state.articleList" :key="index">
                    <div class="img-left item-warp">
                      <div class="cover-img-warp pointer" @click="handleArticle(item)">
                        <LImg class="cover-img" :size="isMobi ? '120px' : '160px'" :src="item.cover" :isUnPreview="true" />
                      </div>
                      <div class="item-content">
                        <div class="create-time">
                          <div class="time-warp">
                            <IconCalendar class="iconfont"></IconCalendar>
                            <span>发布于：</span>
                            <span class="time">{{ item.createTime }}</span>
                          </div>
                        </div>
                        <div class="article-title pointer" @click="handleArticle(item)">
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
                            <IconLike :size="18" class="iconfont" />
                            <span>{{ item.shareCount || 0 }}</span>
                          </div>
                          <div>
                            <IconComment :size="18" class="iconfont"></IconComment>
                            <span>{{ item.commentCount || 0 }}</span>
                          </div>
                          <div class="pointer" data-tip="点击 可直接阅览" v-if="item.isPreview === 1" @click="handleView(item)">
                            <IconPreview class="iconfont" :size="18"></IconPreview>
                            <span class="" style="font-size: 12px">预览</span>
                          </div>
                        </div>
                        <div class="article-des text">
                          {{ item.subTitle }}
                        </div>
                        <div class="label-warp">
                          <div class="type">
                            <IconType class="iconfont"></IconType>
                            {{ state.articleTypeList.find(v => v.value == item.type)?.label || '未知类型' }}
                          </div>
                          <div class="label-item" v-for="(label, index) in item.labels" :key="index">
                            <IconLabel class="iconfont"></IconLabel>
                            <span class="label">{{ label }}</span>
                          </div>
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
        <div class="slider-warp">
          <div class="position-warp">
            <div class="auth-bg">
              <div class="auth-warp slider-item-warp">
                <img class="avatar" :src="state.avatar" alt="" />
                <div class="mingyan">snows_l</div>
                <div class="mingyan">渔得鱼心满意足，樵得樵眼笑眉舒！</div>
                <div class="article-total">
                  <div class="article-total-item">
                    <div class="label">📚 文章总数</div>
                    <div class="num">{{ state.page.total }}</div>
                  </div>
                  <div class="article-total-item">
                    <div class="label">📒 分类</div>
                    <div class="num">{{ state.articleTypeList.length || 0 }}</div>
                  </div>
                  <div class="article-total-item">
                    <div class="label">🔖 标签</div>
                    <div class="num">{{ state.lebels || 0 }}</div>
                  </div>
                </div>
              </div>
            </div>
            <div class="visit-info slider-item-warp">
              <div class="slider-title">
                访问信息
                <div class="mac-style"></div>
              </div>
              <div class="visit-content-warp">
                <div class="visit-item">
                  <div class="visit-label">时间：</div>
                  <div class="visit-value">{{ state.visit.week }}</div>
                </div>
                <div class="visit-item">
                  <div class="visit-label">IP：</div>
                  <div class="visit-value">{{ state.visit.ip }}</div>
                </div>
                <div class="visit-item">
                  <div class="visit-label">城市：</div>
                  <div class="visit-value">{{ state.visit.location }}</div>
                </div>
                <div class="visit-item">
                  <div class="visit-label">浏览器：</div>
                  <div class="visit-value">{{ state.visit.browser }}</div>
                </div>
                <div class="visit-item">
                  <div class="visit-label">平台：</div>
                  <div class="visit-value">{{ state.visit.system }}</div>
                </div>
                <div class="visit-item">
                  <div class="visit-label">气温：</div>
                  <div class="visit-value">{{ state.visit.low }} ~ {{ state.visit.high }}</div>
                </div>
                <div class="visit-item">
                  <div class="visit-label">天气：</div>
                  <div class="visit-value">{{ state.visit.tq }}</div>
                </div>
                <div class="visit-item">
                  <div class="visit-label">风力：</div>
                  <div class="visit-value">{{ state.visit.fl }} {{ state.visit.fengxiang }}</div>
                </div>
                <div class="visit-tip">{{ state.visit.tip }}</div>
              </div>
            </div>
            <div class="tiangou-log-warp slider-item-warp">
              <div class="slider-title">
                (❁´◡`❁)舔狗日记
                <div class="mac-style"></div>
              </div>
              <div class="content-warp">
                <div class="content">{{ state.dog }}</div>
              </div>
              <div class="buttom-btn pointer kbn-custom" data-tip="换一个 舔(❁´◡`❁)" @click="getDog()">换一个</div>
            </div>
            <div class="hot-article slider-item-warp">
              <div class="slider-title">
                热门文章
                <div class="mac-style"></div>
              </div>
              <div class="hot-article-item-warp">
                <div class="hot-article-item" @click="handleArticle(item)" v-for="(item, index) in state.hotArticleList" :key="index">
                  <LImg class="cover-img" :src="item.cover" alt="" />
                  <div class="info">
                    <div class="article-title">{{ item.title }}</div>
                    <div class="h">
                      <IconHot class="iconfont"></IconHot>
                      {{ item.readCount || 0 }} - {{ item.createTime }}
                    </div>
                  </div>
                  <div class="top" :class="'top-' + (index + 1)">{{ index + 1 }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getArticleList, getTopArticle } from '@/api/article';
import { getDict } from '@/api/common';
import Notice from '@/components/Notice/index.vue';
import useIntersectionObserver from '@/hooks/useIntersectionObserver';
import useResize from '@/hooks/useResize';
import { useAppStore } from '@/store/app';
import { changeBgImg, getQQAvatar } from '@/utils/common';
import { getTheme } from '@/utils/theme';
import axios from 'axios';
import moment from 'moment';
import { onMounted, onUnmounted, onUpdated, reactive } from 'vue';
import { useRouter } from 'vue-router';
const { intersectionObserver } = useIntersectionObserver();

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
  lebels: 0,
  bgImg: '',
  bgImgUrl: changeBgImg(),
  visit: {
    time: '',
    week: '',
    ip: '',
    location: '',
    browser: '',
    system: '',
    low: '',
    high: '',
    tq: '',
    fl: '',
    fengxiang: '',
    tip: ''
  },
  hotArticleList: [],
  dog: '你跟他已经醒了吧?我今天捡垃圾挣了一百多明天给你打过去你快点休息吧我明天叫你起床给你点外卖买烟给你点你最喜欢的奶茶晚上我会继续去摆地摊的你不用担心我烦你床只有那么大睡不下三个你要好好照顾好自己不要让他抢你被子我永远爱你',
  page: {
    page: 1,
    size: 10,
    total: 0
  }
});

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
  ]
];

axios.get('https://api.vvhan.com/api/visitor.info').then(res => {
  state.visit = res.data;
});

const getDog = () => {
  axios.get('https://v2.api-m.com/api/dog').then(res => {
    state.dog = res.data.data;
  });
};
getDog();

getTopArticle().then(res => {
  if (res.code === 200) {
    state.hotArticleList = res.data;
    state.hotArticleList.forEach(item => {
      item.cover = import.meta.env.VITE_CURRENT_ENV == 'dev' ? import.meta.env.VITE_DEV_BASE_SERVER + item.cover : import.meta.env.VITE_PROD_BASE_SERVER + item.cover;
      item.createTime = item.createTime && moment(item.createTime).format('YYYY-MM-DD');
    });
  }
});

// 获取文章列表
const getArticleListFn = () => {
  state.loading = true;
  getArticleList(state.page)
    .then(res => {
      if (res.code === 200) {
        res.data.forEach(item => {
          item.createTime = moment(item.createTime).format('YYYY-MM-DD HH:mm:ss');
          item.cover = import.meta.env.VITE_CURRENT_ENV == 'dev' ? import.meta.env.VITE_DEV_BASE_SERVER + item.cover : import.meta.env.VITE_PROD_BASE_SERVER + item.cover;
          item.subTitle = item.subTitle.replace(/&#39;/g, "'");
          item.labels = item.labels && item.labels.split(',');
        });
        state.articleList = [...state.articleList, ...res.data];
        state.page.total = res.total;
        if (res.data.length === 0 || state.articleList.length >= res.total) {
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
  handleToggleHomeBg();
};

// 切换首页背景
const handleToggleHomeBg = () => {
  state.bgImgUrl = changeBgImg();
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
    if (res.code === 200) {
      state.articleTypeList = res.data;
      store.SET_ARTICLE_DICT(res.data);
    }
  });
  getDict({ dictType: 'blog_label' }).then(res => {
    if (res.code === 200) {
      state.lebels = res.data.length;
    }
  });
};
// perf 先看store有没有， 没有在请求
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

// 点击阅览
const handleView = row => {
  router.push({
    path: '/preview',
    query: {
      id: row.id
    }
  });
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

onUpdated(() => {
  intersectionObserver('.article-item');
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
      top: 25%;
      left: 50%;
      transform: translate(-50%, 0);
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
        border-radius: var(--border-radius-2);
        background-color: var(--bg-content-color);
        color: var(--text-color);
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        .saying-icon {
          margin: 0 10px;
          font-size: 16px;
          font-weight: 600;
        }
        .saying-write {
          font-size: 16px;
          margin: 0 3px;
          font-weight: 600;
          animation: blink 1s infinite;
        }
        .saying-words {
          font-size: 16px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
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
          border-radius: var(--border-radius-2);
          background-color: var(--bg-warp-color);
          display: flex;
          justify-content: center;
          align-items: center;
          width: 50px;
          height: 50px;
        }
        .tool-btn {
          margin: 0 5px;
        }
        .m-tool-btn {
          background-color: transparent;
          width: 30px !important;
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
      top: 25%;
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
      animation-duration: 20s;
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
      animation-duration: 40s;
      animation-fill-mode: backwards;
      animation-timing-function: linear;
      animation-iteration-count: infinite;
      animation-fill-mode: backwards;
      animation-timing-function: linear;
      animation-iteration-count: infinite;
      background-image: url('@/assets/images/common/wave2.png');
    }
    .transition-warp {
      position: absolute;
      bottom: -80px;
      height: 80px;
      width: 100%;
      left: 0;
      z-index: 3;
      opacity: 1;
      background: linear-gradient(to bottom, rgba(255, 255, 255, 0.6) 60%, rgba(255, 255, 255, 0.1));
      pointer-events: none;
    }
    .bottom-down {
      position: absolute;
      bottom: 80px;
      left: calc(50% - 40px);
      animation: bottomAnimation 1.6s infinite;
    }
  }
  .other-content-warp {
    padding-top: 40px;
    background-color: var(--under-background);
    .flex-warp {
      width: 1240px;
      margin: 0 auto;
      display: flex;
      .content-center {
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }
      .slider-warp {
        margin-top: 75px;
        min-width: 300px;
        margin-left: 20px;
        .position-warp {
          position: sticky;
          top: 70px;
          padding-bottom: 20px;
          .slider-item-warp {
            width: 100%;
            box-shadow: var(--box-shadow);
            border-radius: var(--border-radius-1);
            position: relative;
            .slider-title {
              padding-left: 14px;
              height: 44px;
              font-size: 16px;
              line-height: 44px;
              border-bottom: 1px solid #ccc;
              color: #222;
            }
            .mac-style {
              content: ' ';
              position: absolute;
              -webkit-border-radius: 50%;
              border-radius: 50%;
              background: #fc625d !important;
              width: 11px;
              height: 11px;
              -webkit-box-shadow: 20px 0 #fdbc40, 40px 0 #35cd4b;
              box-shadow: 20px 0 #fdbc40, 40px 0 #35cd4b;
              float: right;
              right: 55px;
              top: 17px;
            }
          }
          .auth-bg {
            background-image: url('@/assets/images/bg/aside_author_image.jpg');
            background-size: 100% 30%;
            background-repeat: no-repeat;
            border-radius: var(--border-radius-1);
          }
          .auth-warp {
            padding: 30px 20px;
            display: flex;
            flex-direction: column;
            align-items: center;
            background-image: linear-gradient(#ffffff00, #ebfcfd 40%, #caeafa 100%);
            .avatar {
              width: 100px;
              height: 100px;
              border-radius: 50%;
              border: rgba(144, 147, 153, 0.23) 3px solid;
            }
            .mingyan {
              margin-top: 10px;
              line-height: 30px;
              color: #333;
            }
            .article-total {
              margin-top: 30px;
              display: flex;
              justify-content: space-around;
              .article-total-item {
                margin: 0 10px;
                display: flex;
                flex-direction: column;
                align-items: center;
                .label {
                  font-size: 16px;
                  margin-bottom: 10px;
                  color: #111;
                }
                .num {
                  font-size: 20px;
                  color: var(--theme-color);
                }
              }
            }
          }
          .visit-info {
            margin-top: 20px;
            display: flex;
            flex-direction: column;
            background-image: linear-gradient(#ffffff00, #caf3f4 50%, #b4f6e2 100%);
            .visit-content-warp {
              padding: 20px 20px;
              .visit-item {
                color: #222;
                display: flex;
                justify-content: flex-start;
                margin: 10px 0;
                .visit-label {
                  width: 80px;
                }
              }
              .visit-tip {
                margin-top: 20px;
                color: #222;
              }
            }
          }
          .hot-article {
            margin-top: 20px;
            background-color: #fff;
            .hot-article-item-warp {
              padding: 10px;
              .hot-article-item {
                position: relative;
                width: 100%;
                margin: 10px 0;
                border-radius: var(--border-radius-1);
                overflow: hidden;
                transition: opacity 0.8s ease-in-out;
                background-color: var(--bg-content-color);
                .cover-img {
                  width: 100%;
                  height: 120px;
                  border-radius: var(--border-radius-1);
                }
                .info {
                  width: 100%;
                  height: 100%;
                  padding: 5px 10px;
                  color: var(--text-color);
                  .article-title {
                    // 两行显示省略号
                    display: -webkit-box;
                    -webkit-box-orient: vertical;
                    -webkit-line-clamp: 1;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: normal;
                    text-shadow: var(--text-shadow);
                    font-size: 16px;
                    margin-bottom: 10px;
                  }
                }
                .top {
                  // 右旋转45度
                  transform: rotate(45deg);
                  -webkit-transform: rotate(45deg);
                  position: absolute;
                  top: 10px;
                  right: -20px;
                  width: 80px;
                  height: 20px;
                  color: #fff;
                  text-align: center;
                  line-height: 20px;
                }
                .top-1 {
                  background-color: #ff183b;
                }
                .top-2 {
                  background-color: #ff5c38;
                }
                .top-3 {
                  background-color: rgb(242, 193, 16);
                }
              }
            }
          }
          .tiangou-log-warp {
            margin-top: 20px;
            background-color: #fff;
            .content-warp {
              padding: 20px;
              .content {
                color: #222;
                line-height: 32px;
                border: 1px solid #d3d5db;
                padding: 15px;
                background: #f2f6fc;
                border-bottom-left-radius: 15px 225px;
                border-bottom-right-radius: 20px 205px;
                border-top-left-radius: 28px 125px;
                border-top-right-radius: 100px 30px;
              }
            }
            .buttom-btn {
              padding-bottom: 20px;
              text-align: center;
              color: #222;
            }
          }
        }
      }
    }

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
            text-shadow: var(--text-shadow);
          }
        }
        .article-item {
          margin: 24px 0;
          border-radius: var(--border-radius-2);
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
            padding: 33px 30px;
            background-color: var(--bg-content-color);
            position: relative;
            .create-time {
              display: inline-block;
              align-items: center;
              height: 24px;
              font-size: 12px;
              padding: 2px 0px;
              // background-color: var(--theme-light-color-9);
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
              // .type {
              //   height: 22px;
              //   border-radius: 5px;
              //   padding: 2px 4px;
              //   font-size: 12px;
              //   position: absolute;
              //   top: 48px;
              //   right: 30px;
              // }
            }
            .article-title {
              margin-top: 10px;
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
                  font-size: 18px;
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
          .label-warp {
            display: flex;
            align-items: center;
            justify-content: flex-start;
            margin-top: 10px;
            .type {
              text-wrap: nowrap;
              font-size: 12px;
              color: var(--text-color);
              background-color: var(--theme-light-color-9);
              border-radius: 5px;
              padding: 2px 6px;
              margin-right: 15px;
            }
            .label-item {
              margin-right: 10px;
              font-size: 12px;
              color: var(--theme-color);
              background-color: #dfdddd;
              border-radius: 5px;
              padding: 2px 6px;
              .label {
                margin-left: 5px;
              }
            }
          }
        }
      }
    }

    .m-other-content {
      max-width: var(--content-max-width-m);
      .item-warp {
        display: flex;
        flex-direction: column;
        height: auto !important;
        .cover-img-warp {
          width: 100% !important;
          height: 180px !important;
        }

        .item-content {
          height: 180px !important;
          padding: 20px 20px !important;
          .article-title {
            margin-top: 5px !important;
            height: 30px !important;
            line-height: 30px !important;
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
        border-radius: var(--border-radius-3);
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
