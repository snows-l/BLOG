<!--
 * @Description: ------------ fileDescription -----------
 * @Author: snows_l snows_l@163.com
 * @Date: 2024-08-09 15:52:19
 * @LastEditors: snows_l snows_l@163.com
 * @LastEditTime: 2024-08-09 21:38:04
 * @FilePath: /BLOG/src/components/musicPlayer/index.vue
-->
<template>
  <div class="music-warp">
    <audio ref="audioRef" style="display: none" :src="state.currentMusic.src"></audio>
    <div class="cover-warp">
      <img class="cover-img" :class="{ 'rotate-play': state.isPlaying }" :src="state.currentMusic.img || defaultCover" alt="" />
    </div>
    <div class="contral-nme-warp">
      <div class="music-name">{{ state.currentMusic.title }} {{ state.currentMusic.artist ? '— ' + state.currentMusic.artist : '' }}</div>
      <div class="contral-warp">
        <i @click="handleControl('prev')" class="iconfont icon-shangyigeshangyiqu"></i>
        <i @click="handleControl('pause')" v-if="state.isPlaying" class="iconfont icon-zanting"></i>
        <i @click="handleControl('play')" v-else class="iconfont icon-bofang"></i>
        <i @click="handleControl('next')" class="iconfont icon-xiayigexiayiqu"></i>
      </div>
      <div class="custom-progress">
        <input type="range" name="progress" id="progress" max="100" min="0" v-model="state.progress" @change="handleProgressChange" />
        <span style="font-size: 12px; transform: scaleY(50%); font-family: DSDIGI">
          {{ Math.floor(state.currentTime / 60).toFixed(0).length == 1 ? '0' : '' }}{{ Math.floor(state.currentTime / 60) }}:
          {{ Math.floor(state.currentTime % 60).toFixed(0).length == 1 ? '0' : '' }}{{ Math.floor(state.currentTime % 60) }} /
          {{ state.duration ? (Math.floor(state.duration / 60).toFixed(0).length == 1 ? '0' : '') : '0' }}{{ state.duration ? Math.floor(state.duration / 60) : 0 }}:
          {{ state.duration ? (Math.floor(state.duration % 60).toFixed(0).length == 1 ? '0' : '') : '0' }}{{ state.duration ? Math.floor(state.duration % 60) : 0 }}
        </span>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { getMusicList } from '@/api/music';
import defaultCover from '@/assets/images/common/default_cover.png';
import useResize from '@/hooks/useResize.js';
import { onBeforeUnmount, onMounted, reactive, ref } from 'vue';

const audioRef = ref(null);
const { isMobile } = useResize();

const musicList = ref([]);
const state = reactive({
  isMobile: isMobile,
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
      if (item.cover) cover = import.meta.env.MODE == 'development' ? import.meta.env.VITE_DEV_BASE_SERVER + item.cover : import.meta.env.VITE_PROD_BASE_SERVER + item.cover;
      return {
        id: item.id,
        title: item.title,
        artist: item.artist,
        type: item.type,
        img: cover,
        src: import.meta.env.MODE == 'development' ? import.meta.env.VITE_DEV_BASE_SERVER + item.src : import.meta.env.VITE_PROD_BASE_SERVER + item.src
      };
    });
    state.currentMusic = musicList.value.length > 0 && musicList.value[state.currentIndex];
  });
};
getMusicListFn();

// 控制播放/暂停
const controlMusic = type => {
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
const handleControl = type => {
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
const errorCallback = err => {
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
// const handleProgressChange = e => {
//   audioRef.value.currentTime = (e.target.value / 100) * state.duration;
// };

onMounted(() => {
  audioRef.value.addEventListener('ended', endedCallback);
  audioRef.value.addEventListener('timeupdate', timeupdateCallback);
  audioRef.value.addEventListener('volumechange', volumechangeCallback);
  audioRef.value.addEventListener('error', errorCallback);
  audioRef.value.addEventListener('canplay', canplayCallback);
  audioRef.value.addEventListener('playing', playingCallback);
  audioRef.value.addEventListener('pause', pauseCallback);

  // $bud.on('refreshMusicList', () => {
  //   getMusicListFn();
  // });
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
</script>

<style lang="scss" scoped>
.music-warp {
  background-color: var(--bg-warp-light-color);
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  padding: 20px;
  .cover-warp {
    img {
      width: 80px;
      height: 80px;
      border-radius: 50%;
    }
  }
  .contral-nme-warp {
    width: calc(100% - 60px);
    margin-left: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    .music-name {
      font-size: 12px;
      color: var(--text-color);
      margin-bottom: 5px;
      text-align: left;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
    }
    .contral-warp {
      height: 40px;
      color: var(--text-color);
      display: flex;
      align-items: center;
      border-radius: 5px;
      .iconfont {
        font-size: 24px;
        margin: 0 10px;
      }
    }
    .custom-progress {
      margin-top: 20px;
      display: flex;
      align-items: center;
      input[type='range'] {
        -webkit-appearance: none;
        appearance: none;
        margin: 0;
        outline: 0;
        background-color: transparent;
        border-radius: 3px;
        margin-right: 20px;
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
</style>
