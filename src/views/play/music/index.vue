<!--
 * @Description: ------------ fileDescription -----------
 * @Author: snows_l snows_l@163.com
 * @Date: 2024-08-09 16:21:21
 * @LastEditors: snows_l snows_l@163.com
 * @LastEditTime: 2024-09-30 23:32:56
 * @FilePath: /BLOG/src/views/play/music/index.vue
-->
<template>
  <div class="music-warp">
    <PageTopCover
      :moduleTitle="'音乐'"
      :icon="'icon-a-Sheetmusic'"
      :textIcon="'🎧'"
      :coverImg="coverImg"
      :isMobile="isMobi"
      :mudulDesc="'音乐是一种艺术形式，它是由音符组成的乐曲，旋律、节奏、和音色的组合，是人类创造的声音。'"
      :isArticle="false"></PageTopCover>

    <div class="music-list-content-warp" :class="{ 'm-music-list-content-warp': isMobi }">
      <div class="music-list-content" v-if="state.list.length > 0" :class="{ 'm-music-list-content': isMobi }">
        <div class="music-list">
          <div @click="handlePlay(item)" class="music-item pointer kbn-music" :data-tip="item.title" v-for="(item, index) in state.list" :key="index">
            <div class="music-item-warp">
              <div class="cover-warp" @click="e => e.stopPropagation()">
                <LImg :src="item.img" alt="" />
              </div>
              <div class="music-info">
                <div class="info-item text music-title">{{ item.title }}</div>
                <div class="info-item text music-artist">歌手：{{ item.artist }}</div>
                <div class="info-item text music-type">类型：{{ state.playList.find(row => row.value == item.type)?.label }}</div>
              </div>
            </div>
            <div class="is-playing-current">
              <span class="current-music" v-show="state.currentMusicId == item.id">☑️</span>
              <img v-show="state.isPlaying && state.currentMusicId == item.id" src="@/assets/images/common/playing.gif" />
            </div>
          </div>
        </div>
      </div>
      <div class="no-article" :class="{ 'm-no-article': isMobi }" v-else>
        <Empty :text="'暂无音乐数据，期待您的分享~'" :loadingText="'音乐正在拼命加载中...'" :loading="state.loading" />
      </div>
      <div class="bottom-loading" v-if="!state.loading && state.list.length > 0">
        <div class="no-more">很高兴你翻到这里，但是真的没有了...</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { getDict } from '@/api/common';
import { getMusicList } from '@/api/music';
import coverImg from '@/assets/images/bg/cover-music.avif';
import $bus from '@/bus/index';
import { useAppStore } from '@/store/app';
import { onMounted, onUnmounted, onUpdated, reactive } from 'vue';

import useResize from '@/hooks/useResize';
const { isMobi } = useResize();

import useIntersectionObserver from '@/hooks/useIntersectionObserver';
const { intersectionObserver } = useIntersectionObserver();
const store = useAppStore();

const state = reactive({
  loading: false,
  isPlaying: localStorage.getItem('isPlaying') == 'true' ? true : false,
  currentMusicId: localStorage.getItem('currentMusicId') || 0,
  list: [],
  playList: []
});

const getPlayList = () => {
  getDict({ dictType: 'music_type' }).then(res => {
    state.playList = res.data;
    store.SET_MUSIC_DICT(res.data);
  });
};

// 获取音乐类型和文章类型
store.musicDict.length > 0 ? (state.playList = store.musicDict) : getPlayList();

const getMusicListFn = () => {
  state.loading = true;
  getMusicList({ isUnPage: false })
    .then(res => {
      state.list = res.data.map(item => {
        let cover = '';
        if (item.cover) cover = import.meta.env.VITE_CURRENT_ENV == 'dev' ? import.meta.env.VITE_DEV_BASE_SERVER + item.cover : import.meta.env.VITE_PROD_BASE_SERVER + item.cover;
        return {
          id: item.id,
          title: item.title,
          artist: item.artist,
          type: item.type,
          img: cover,
          src: import.meta.env.VITE_CURRENT_ENV == 'dev' ? import.meta.env.VITE_DEV_BASE_SERVER + item.src : import.meta.env.VITE_PROD_BASE_SERVER + item.src
        };
      });
      store.SET_MUSIC_LIST(state.list);
      if (!state.currentMusicId) state.currentMusicId = state.list[0].id;
      state.loading = false;
    })
    .finally(() => {
      state.loading = false;
    });
};
if (store.musicList.length > 0) {
  state.list = store.musicList;
  if (!state.currentMusicId) state.currentMusicId = state.list[0].id;
} else {
  getMusicListFn();
}

const handlePlay = (item: any) => {
  state.currentMusicId = item.id;
  $bus.emit('playMusic', { id: item.id });
};

onMounted(() => {
  // 监听 播放器 播放状态变化
  $bus.on('musicPlayerStatusChange', (n: boolean) => {
    state.isPlaying = n;
  });
  // 监听 播放器 当前音乐变化
  $bus.on('musicPlayerCurrentMusicChange', (id: number) => {
    state.currentMusicId = id;
  });

  intersectionObserver('.music-item');
});

onUpdated(() => {
  intersectionObserver('.music-item');
});

onUnmounted(() => {
  $bus.off('musicPlayerStatusChange');
  $bus.off('musicPlayerCurrentMusicChange');
});
</script>

<style lang="scss" scoped>
.music-warp {
  width: 100%;
  height: 100%;
  .music-list-content-warp {
    background-color: var(--bg-image-warp-color);
    .music-list-content {
      max-width: var(--content-max-width);
      margin: 0 auto;
      .music-list {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        padding: 20px 0;
        .music-item {
          width: 440px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 10px 20px;
          box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
          margin: 10px 0;
          border-radius: var(--border-radius-2);
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
              font-size: 24px;
              margin: 0 10px;
            }
            img {
              width: 50px;
              height: 50px;
              border-radius: 50%;
            }
          }
          .cover-warp {
            width: 100px;
            height: 100px;
            padding: 10px;
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
              margin-top: 5px;
            }
            .music-title {
              margin-bottom: 15px;
            }
          }
        }
      }
    }
    .no-article {
      max-width: var(--content-max-width);
      margin: 0 auto;
      height: calc(100vh - 400px);
    }
    .m-no-article {
      max-width: var(--content-max-width-m);
      margin: 0 auto;
      height: calc(100vh - 300px) !important;
    }
    .m-music-list-content {
      width: var(--content-max-width-m) !important;
      .music-item {
        width: 100% !important;
      }
    }
  }
  .m-music-list-content-warp {
    min-height: calc(100vh - 300px) !important;
  }
}
.bottom-loading {
  width: 100%;
  display: flex;
  justify-content: center;
  padding-bottom: 20px;
  .no-more {
    color: var(--theme-light-color-3);
  }
}
</style>

<style lang="scss">
.dark {
  .music-item:hover {
    box-shadow: 2px 2px 10px 2px var(--theme-light-color-2) !important;
  }
}
</style>
