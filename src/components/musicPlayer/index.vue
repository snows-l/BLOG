<!--
 * @Description: ------------ fileDescription -----------
 * @Author: snows_l snows_l@163.com
 * @Date: 2024-08-09 15:52:19
 * @LastEditors: snows_l snows_l@163.com
 * @LastEditTime: 2024-08-12 17:16:16
 * @FilePath: /blog/src/components/musicPlayer/index.vue
-->
<template>
  <div class="music-warp">
    <audio ref="audioRef" style="display: none" :src="state.currentMusic.src"></audio>
    <div class="cover-warp">
      <div class="cover-img-warp">
        <img class="cover-img" :class="{ 'rotate-play': state.isPlaying }" :src="state.currentMusic.img || defaultCover" alt="" />
      </div>
      <div class="paly-pause">
        <i @click="handleControl('pause')" v-if="state.isPlaying" class="pointer iconfont icon-zanting"></i>
        <i @click="handleControl('play')" v-else class="pointer iconfont icon-bofang"></i>
      </div>
    </div>
    <div class="contral-music-warp">
      <div class="contral-music-content" v-if="musicList.length > 0">
        <div class="music-name">{{ state.currentMusic.title }}{{ state.currentMusic.artist ? '—' + state.currentMusic.artist : '' }}</div>
        <div class="contral-warp">
          <i @click="handleControl('prev')" class="pointer iconfont icon-shangyigeshangyiqu"></i>
          <i @click="handleControl('pause')" v-if="state.isPlaying" class="pointer iconfont icon-zanting"></i>
          <i @click="handleControl('play')" v-else class="pointer iconfont icon-bofang"></i>
          <i @click="handleControl('next')" class="pointer iconfont icon-xiayigexiayiqu"></i>
          <i @click="handleTo('/play/mp3')" class="pointer iconfont icon-a-yinlebofangliebiaoyinle"></i>
        </div>
        <div class="custom-progress">
          <span class="yin">
            <input v-if="true" type="range" name="progress" id="progress" max="100" min="0" v-model="state.progress" @change="handleProgressChange" />
          </span>
          <span class="time" style="font-size: 12px">
            {{ Math.floor(state.currentTime / 60).toFixed(0).length == 1 ? '0' : '' }}{{ Math.floor(state.currentTime / 60) }}:{{
              Math.floor(state.currentTime % 60).toFixed(0).length == 1 ? '0' : ''
            }}{{ Math.floor(state.currentTime % 60) }}/{{ state.duration ? (Math.floor(state.duration / 60).toFixed(0).length == 1 ? '0' : '') : '0'
            }}{{ state.duration ? Math.floor(state.duration / 60) : 0 }}:{{ state.duration ? (Math.floor(state.duration % 60).toFixed(0).length == 1 ? '0' : '') : '0'
            }}{{ state.duration ? Math.floor(state.duration % 60) : 0 }}
          </span>
        </div>
      </div>
      <div class="empty-warp" v-else>
        <img class="empty-img" src="@/assets/images/common/empty.png" alt="" />
        <span>暂无歌曲</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { getMusicList } from '@/api/music';
import defaultCover from '@/assets/images/common/default_cover.png';
import $bus from '@/bus';
import router from '@/router';
import { onBeforeUnmount, onMounted, reactive, ref, watch } from 'vue';

const emits = defineEmits(['music-status']);

const props = defineProps({
  currentMusicId: {
    type: Number,
    default: 0
  }
});

const audioRef = ref();
const musicList = ref([]);

const state = reactive({
  currentIndex: 0,
  currentMusic: {
    title: '',
    artist: '',
    img: '',
    src: '',
    type: '',
    id: ''
  },
  isFirst: false,
  isPlaying: false,
  isMute: false,
  volume: 1,
  duration: 0,
  currentTime: 0,
  progress: 0,
  isLoading: true,
  playList: []
});

const getMusicListFn = () => {
  getMusicList({ isUnPage: false }).then(res => {
    musicList.value = res.data.map(item => {
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
    state.currentMusic = musicList.value.length > 0 && musicList.value[state.currentIndex];
  });
};
getMusicListFn();

// 跳转到指定页面
const handleTo = (path: string) => {
  router.push(path);
};

// 控制静音/取消静音
const controlVolume = (type: string) => {
  if (type === 'mute') {
    (audioRef.value as HTMLAudioElement).volume = 0;
  } else if (type === 'unMute') {
    audioRef.value.volume = 1;
  }
};

// 控制播放/暂停
const controlMusic = (type: string) => {
  if (type === 'pause') {
    audioRef.value.pause();
  } else if (type === 'play') {
    audioRef.value.pause();
    setTimeout(() => {
      state.isFirst = true;
      audioRef.value.play();
    }, 0);
  }
};

// 点击控制
const handleControl = (type: string) => {
  if (type == 'pause' || type == 'play') {
    controlMusic(type);
  } else if (type == 'unMute' || type == 'mute') {
    controlVolume(type);
  } else if (type == 'prev') {
    state.isFirst = true;
    state.isPlaying = false;
    state.isLoading = true;
    if (state.currentIndex == 0) {
      state.currentIndex = musicList.value.length - 1;
    } else {
      state.currentIndex--;
    }
    state.currentMusic = musicList.value[state.currentIndex];
  } else if (type == 'next') {
    state.isFirst = true;
    state.isPlaying = false;
    state.isLoading = true;
    if (state.currentIndex == musicList.value.length - 1) {
      state.currentIndex = 0;
    } else {
      state.currentIndex++;
    }
    state.currentMusic = musicList.value[state.currentIndex];
  }
};

// 当前歌曲播放结束回调
const endedCallback = () => {
  handleControl('next');
};

// 当前歌曲播放进度回调
const timeupdateCallback = () => {
  state.currentTime = audioRef.value.currentTime;
  state.duration = audioRef.value.duration;
  state.progress = parseInt((state.currentTime / state.duration) * 100) || 0;
};

// 当前歌曲音量变化回调
const volumechangeCallback = () => {
  if (audioRef.value.volume == 0) {
    state.isMute = true;
  } else {
    state.isMute = false;
  }
};

// 当前歌曲播放出错回调
const errorCallback = (err: any) => {
  console.log('music player errorCallback', err);
};

// 当前歌曲可以播放回调
const canplayCallback = () => {
  state.isLoading = false;
  if (state.isFirst) controlMusic('play');
};

// 当前歌曲开始播放回调
const playingCallback = () => {
  state.isPlaying = true;
  state.isLoading = false;
};

// 当前歌曲暂停播放回调
const pauseCallback = () => {
  state.isPlaying = false;
};

// 拖动进度条变化回调
const handleProgressChange = (e: any) => {
  audioRef.value.currentTime = (e.target.value / 100) * state.duration;
};

onMounted(() => {
  audioRef.value.addEventListener('ended', endedCallback);
  audioRef.value.addEventListener('timeupdate', timeupdateCallback);
  audioRef.value.addEventListener('volumechange', volumechangeCallback);
  audioRef.value.addEventListener('error', errorCallback);
  audioRef.value.addEventListener('canplay', canplayCallback);
  audioRef.value.addEventListener('playing', playingCallback);
  audioRef.value.addEventListener('pause', pauseCallback);
});

onBeforeUnmount(() => {
  audioRef.value.removeEventListener('ended', endedCallback);
  audioRef.value.removeEventListener('timeupdate', timeupdateCallback);
  audioRef.value.removeEventListener('volumechange', volumechangeCallback);
  audioRef.value.removeEventListener('error', errorCallback);
  audioRef.value.removeEventListener('canplay', canplayCallback);
  audioRef.value.removeEventListener('playing', playingCallback);
  audioRef.value.removeEventListener('pause', pauseCallback);
});

watch(
  () => props.currentMusicId,
  id => {
    if (id) {
      const index = musicList.value.findIndex(item => item.id == id);
      if (index !== -1) {
        state.currentIndex = index;
        state.currentMusic = musicList.value[index];
        state.isPlaying = false;
        state.isLoading = true;
        state.isFirst = true;
        controlMusic('play');
      }
    }
  }
);

watch(
  () => state.isPlaying,
  n => {
    emits('music-status', n);
    $bus.emit('musicPlayerStatusChange', n);
    localStorage.setItem('isPlaying', n + '');
  }
);

watch(
  () => state.currentMusic,
  () => {
    $bus.emit('musicPlayerCurrentMusicChange', state.currentMusic.id);
    localStorage.setItem('currentMusicId', state.currentMusic.id);
  },
  { deep: true }
);
</script>

<style lang="scss" scoped>
.music-warp {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  overflow: hidden;
  .cover-warp {
    height: 100px;
    width: 80px;
    background-color: var(--bg-warp-light-color);
    padding: 10px 6px;
    border-radius: 15px;
    position: relative;
    overflow: hidden;
    .cover-img-warp {
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: var(--bg-content-color);
      border-radius: 15px;
      padding: 5px;
      .cover-img {
        border: 1px solid var(--text-color);
        width: 57px;
        height: 57px;
        border-radius: 50%;
      }
    }
    .paly-pause {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      right: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: transparent;
      .iconfont {
        font-size: 30px;
        color: #eeeeee;
      }
    }
    .rotate-play {
      animation: spin 5s linear infinite;
    }
  }
  .contral-music-warp {
    background-color: var(--bg-warp-light-color);
    padding: 10px;
    border-radius: 15px;
    margin-left: 10px;
    width: 220px;
    height: 100px;
    .contral-music-content {
      width: 200px;
      padding: 0 10px;
      height: 80px;
      border-radius: 15px;
      display: flex;
      flex-direction: column;
      align-items: center;
      background-color: var(--bg-content-color);
      .music-name {
        height: 30px;
        font-size: 14px;
        line-height: 30px;
        color: var(--text-color);
        text-align: left;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
      }
      .contral-warp {
        height: 20px;
        color: var(--text-color);
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 5px;
        .iconfont {
          font-size: 18px;
          margin: 0 10px;
        }
      }
      .custom-progress {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 20px;
        .time {
          color: var(--text-color);
        }
        .yin {
          display: flex;
          align-items: center;
          .iconfont {
            color: var(--text-color);
          }
        }
        input[type='range'] {
          -webkit-appearance: none;
          appearance: none;
          margin: 0;
          outline: 0;
          background-color: transparent;
          border-radius: 3px;
          width: 50px;
          margin: 0 10px;
        }
        /* 定义range控件轨道的样式 */
        [type='range']::-webkit-slider-runnable-track {
          height: 6px;
          background-color: #f5f5f57a;
        }

        /* 定义range控件容器的样式 已激活 */
        [type='range' i]::-webkit-slider-container {
          height: 6px;
          background-color: var(--text-color);
          border-radius: 3px;
          overflow: hidden;
        }

        /* 定义range控件拇指的样式 当前值 */
        [type='range']::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 3px;
          height: 6px;
          border-radius: 50%;
          background-color: var(--theme-color);
          /* 使用border-image属性给拇指添加渐变边框 */
          border-image: linear-gradient(#f44336, #f44336) 0 fill / 8 20 8 0 / 0px 0px 0 2000px;
        }
      }
    }
  }
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.empty-warp {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: var(--text-color);
  font-size: 12px;
  img {
    width: 50px;
    height: 50px;
    margin-bottom: 10px;
  }
}
</style>
