<!--
 * @Description: ------------ fileDescription -----------
 * @Author: snows_l snows_l@163.com
 * @Date: 2024-08-12 16:58:22
 * @LastEditors: snows_l snows_l@163.com
 * @LastEditTime: 2024-08-14 13:58:09
 * @FilePath: /blog/src/components/Search/index.vue
-->
<template>
  <div class="search-warp" :class="{ 'm-search-warp': isMobi }" @click="handleClickMadel">
    <div class="search-content-warp" :class="{ 'm-search-content-warp': isMobi }">
      <div class="input-warp">
        <div class="left-info"></div>
        <input
          class="input"
          :value="state.keyword"
          type="text"
          placeholder="搜索"
          @keydown="e => handleKeyDown(e)"
          @input="e => (state.keyword = e.target.value)"
          @blur="e => handleSearch(e)" />
        <div class="other-warp pointer">
          <i class="iconfont icon-sousuo1"></i>
        </div>
      </div>
      <div class="serch-content">
        <div class="serch-content-t">
          <div class="have-content-warp" v-if="state.musicList.length > 0 || state.articleList.length > 0">
            <div class="content-warp">
              <div class="music-warp">
                <div class="music-title">音乐：{{ state.musicList.length }} 条</div>
                <div class="music-list" v-if="state.musicList.length > 0">
                  <div @click="handlePlay(item)" class="music-item pointer kbn-music" :data-tip="item.title" v-for="(item, index) in state.musicList" :key="index">
                    <div class="music-item-warp">
                      <div class="cover-warp" @click="e => e.stopPropagation()">
                        <Img :src="item.img" alt="" />
                      </div>
                      <div class="music-info">
                        <div class="info-item text music-title">{{ item.title }}</div>
                        <div class="info-item text music-artist">歌手：{{ item.artist }}</div>
                        <div class="info-item text music-type">类型：{{ state.playList.find(row => row.value == item.type)?.label }}</div>
                      </div>
                    </div>
                    <div class="is-playing-current">
                      <span class="current-music" v-show="state.currentMusicId == item.id">☑️</span>
                      <img v-show="state.isPlaying && state.currentMusicId == item.id" src="@/assets/images/common/playing.gif" alt="" />
                    </div>
                  </div>
                </div>
                <div class="m-no-music" v-else>
                  <Empty :text="'暂无音乐，期待您的分享~'" :loadingText="'音乐正在拼命加载中...'" :loading="state.loading" />
                </div>
              </div>
              <div class="article-warp">
                <div class="music-title">文章：{{ state.articleList.length }} 条</div>
                <div class="article-content-warp" v-if="state.articleList.length > 0">
                  <div class="article-item kbn-read pointer" :data-tip="item.title" v-for="(item, index) in state.articleList" :key="index" @click="handleArticle(item)">
                    <div class="img-left item-warp">
                      <!-- <div class="cover-img-warp">
                        <Img class="cover-img" :src="item.cover" />
                      </div> -->
                      <div class="item-content">
                        <div class="create-time">
                          <span>
                            <i class="iconfont icon-shijian" style="margin-right: 10px; font-size: 20px"></i>
                            <span>发布于：</span>
                            <span>{{ item.createTime }}</span>
                          </span>
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
                  <Empty :text="'暂无文章，等待博主的分享~'" :loadingText="'文章正在拼命加载中...'" :loading="state.loading" />
                </div>
                <div class="article-list"></div>
              </div>
            </div>
          </div>
          <div class="empry-warp" v-else>
            <Empty :text="'没有找到相关内容~请重新搜索！'" :loadingText="'搜索内容加载中...'" :loading="state.loading" />
          </div>
        </div>
      </div>
    </div>
    <div class="xiaoren pointer" @click="handleClose"></div>
  </div>
</template>

<script lang="ts" setup>
import { getArticleList } from '@/api/article';
import { getDict, getMusicList } from '@/api/music';
import $bus from '@/bus/index';
import { getQQAvatar, randomNum } from '@/utils/common';
import moment from 'moment';
import { onMounted, onUnmounted, reactive, watch } from 'vue';
import { useRouter } from 'vue-router';
import useResize from '@/hooks/useResize';
const { isMobi } = useResize();

const router = useRouter();

const props = defineProps({
  show: {
    type: Boolean
  }
});
const emits = defineEmits(['close']);

const state = reactive({
  musicList: [],
  articleList: [],
  playList: [],
  articleTypeList: [],
  keyword: '',
  avatar: getQQAvatar(),
  loading: false,
  currentMusicId: 0,
  isPlaying: localStorage.getItem('isPlaying') == 'true' ? true : false
});

const page = {
  page: 1,
  size: 100
};

const handleKeyDown = (e: any) => {
  if (e.keyCode === 13) {
    handleSearch();
  }
};

// 搜索
const handleSearch = () => {
  if (state.keyword.trim() === '') return false;
  state.loading = true;
  Promise.all([getMusicList({ title: state.keyword, ...page }), getArticleList({ title: state.keyword, ...page })])
    .then(res => {
      state.musicList = res[0].data.map(item => {
        return {
          ...item,
          img: import.meta.env.VITE_CURRENT_ENV == 'dev' ? import.meta.env.VITE_DEV_BASE_SERVER + item.cover : import.meta.env.VITE_PROD_BASE_SERVER + item.cover
        };
      });
      state.articleList = res[1].data.map(item => {
        return {
          ...item,
          cover: import.meta.env.VITE_CURRENT_ENV == 'dev' ? import.meta.env.VITE_DEV_BASE_SERVER + item.cover : import.meta.env.VITE_PROD_BASE_SERVER + item.cover,
          subTitle: item.subTitle.replace(/&#39;/g, "'"),
          createTime: moment(item.createTime).format('YYYY-MM-DD')
        };
      });
      state.loading = false;
    })
    .catch(() => {
      state.loading = false;
    })
    .finally(() => {
      state.loading = false;
    });
};

// 关闭搜索
const handleClose = () => {
  emits('close');
};

// 获取音乐类型
getDict({ dictType: 'music_type' }).then(res => {
  state.playList = res.data;
});

// 获取文章类型
getDict({ dictType: 'article_type' }).then(res => {
  state.articleTypeList = res.data;
});

// 播放音乐
const handlePlay = (item: any) => {
  state.currentMusicId = item.id;
  $bus.emit('playMusic', { id: item.id });
};

// 点击空白处关闭搜索 阻止modal事件冒泡
const handleClickMadel = (e: any) => {
  e.stopPropagation();
  e.preventDefault();
};

// 点击文章详情
const handleArticle = (row: any) => {
  router.push({
    path: '/article/detail',
    query: {
      id: row.id
    }
  });
  emits('close');
};

watch(
  () => props.show,
  n => {
    if (n) {
      state.loading = false;
      state.isPlaying = localStorage.getItem('isPlaying') == 'true' ? true : false;
      if (!isMobi.value) {
        setTimeout(() => {
          document.querySelector('.search-warp input')?.focus();
        }, 100);
      }
    }
  }
);

onMounted(() => {
  // 监听 播放器 播放状态变化
  $bus.on('musicPlayerStatusChange', (n: boolean) => {
    state.isPlaying = n;
  });
  // 监听 播放器 当前音乐变化
  $bus.on('musicPlayerCurrentMusicChange', (id: number) => {
    state.currentMusicId = id;
  });
});

onUnmounted(() => {
  $bus.off('musicPlayerStatusChange');
  $bus.off('musicPlayerCurrentMusicChange');
});
</script>

<style lang="scss" scoped>
.search-warp {
  width: 100vw;
  height: 100vh;
  position: relative;
  background-image: url('@/assets/images/common/bg1.png');
  padding: 30px 20px;
  .search-content-warp {
    height: 100%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    max-width: var(--content-max-width);
    padding: 50px 20px 30px 20px;
    .input-warp {
      height: 50px;
      border-radius: 15px;
      border: 1px solid var(--text-color-2);
      overflow: hidden;
      width: 100%;
      background-color: var(--bg-content-color);
      display: flex;
      .input {
        height: 100%;
        width: calc(100% - 80px);
        outline: none;
        border: none;
        font-size: 16px;
        background-color: transparent;
        color: var(--text-color);
      }
      .other-warp {
        width: 60px;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: transparent;
        i {
          font-size: 24px;
          color: var(--text-color-2);
        }
      }
      .left-info {
        width: 20px;
        height: 100%;
        background-color: transparent;
      }
    }

    .serch-content {
      margin-top: 20px;
      width: 100%;
      height: calc(100% - 80px);
      border-radius: 15px;
      background: var(--bg-warp-light-color);
      overflow: hidden;
      padding: 20px;
      .serch-content-t {
        overflow-y: auto;
        width: 100%;
        height: 100%;
        .empry-warp {
          width: 100%;
          height: 100%;
        }
        .have-content-warp {
          .music-title {
            height: 30px;
            line-height: 30px;
            font-size: 18px;
            color: var(--text-color);
          }
          .music-warp {
            margin-bottom: 20px;
            .music-list {
              display: flex;
              flex-wrap: wrap;
              justify-content: space-between;
              padding: 5px 0;
              .music-item {
                width: 400px;
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 10px 20px;
                box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
                margin: 10px 0;
                border-radius: 15px;
                background-color: var(--bg-content-color);
                .music-item-warp {
                  display: flex;
                  align-items: center;
                }
                .is-playing-current {
                  top: 0;
                  right: 20px;

                  display: flex;
                  align-items: center;
                  .current-music {
                    font-size: 18px;
                    margin: 0 10px;
                  }
                  img {
                    width: 30px;
                    height: 30px;
                    border-radius: 50%;
                  }
                }
                .cover-warp {
                  width: 74px;
                  height: 74px;
                  padding: 3px;
                  img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                  }
                }
                .music-info {
                  margin-left: 20px;
                  color: var(--text-color);
                  .music-artist,
                  .music-type {
                    font-size: 12px;
                  }
                  .music-title {
                    margin-bottom: 15px;
                  }
                }
              }
            }
            .m-no-music {
              height: 160px;
            }
          }
          .article-warp {
            .article-content-warp {
              padding: 5px 0;
              max-width: var(--content-max-width);
              margin: 0 auto;
              .article-item {
                margin: 20px 0;
                border-radius: 15px;
                width: 100%;
                height: 100%;
                overflow: hidden;
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
                  height: 100%;
                  padding: 20px;
                  background-color: var(--bg-content-color);
                  .create-time {
                    height: 24px;
                    padding: 2px 8px;
                    background-color: var(--theme-light-color-9);
                    border-radius: 5px;
                    color: var(--theme-color);
                    width: 210px;
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
            .m-no-article {
              height: 160px;
            }

            .item-warp {
              display: flex;
              flex-direction: column;
              height: auto !important;
              .cover-img-warp {
                width: 100% !important;
                height: 180px !important;
              }

              .item-content {
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
      }
    }
  }
  .m-search-content-warp {
    // max-width: 96%;
  }
  .xiaoren {
    min-width: 284px;
    min-height: 388px;
    position: absolute;
    bottom: 10px;
    right: 0;
    background-image: url('@/assets/images/common/iloli.gif');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
  }
}

.m-search-warp {
  .xiaoren {
    min-width: 91px;
    min-height: 120px;
    width: 71px !important;
    height: 97px !important;
  }
}

.serch-content-t::-webkit-scrollbar {
  width: 0px;
}
.serch-content-t::-webkit-scrollbar-track {
  background-color: darkgrey;
}
.serch-content-t::-webkit-scrollbar-thumb {
  box-shadow: inset 0 0 0px rgba(0, 0, 0, 0.3);
}
</style>
