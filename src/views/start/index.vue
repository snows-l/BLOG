<!--
 * @Description: ------------ fileDescription -----------
 * @Author: snows_l snows_l@163.com
 * @Date: 2024-03-24 17:51:09
 * @LastEditors: snows_l snows_l@163.com
 * @LastEditTime: 2024-09-27 11:29:33
 * @FilePath: /blog/src/views/start/index.vue
-->
<template>
  <div class="start-content-container">
    <img :src="state.bgImgUrl" style="width: 100%; height: 100%; object-fit: cover" />
    <div class="container-warp">
      <div class="header"></div>
      <div class="main">
        <div class="content-container-center">
          <div class="scale-warp" :style="{ transform: `scale(${state.clockSize})` }">
            <div class="time-select">
              <div class="clock-warp pointer kbn-custom" data-tip="点我 切换全屏！" data @click="handleFullScreen">
                <Vue3FlipClock></Vue3FlipClock>
              </div>
              <div class="date" style="margin-top: 40px; font-size: 24px">
                <span>{{ state.currentDate }}</span>
                <span style="margin: 0 10px">{{ weekConfig[state.week] }}</span>
                <span @click="handleToggleBg" class="pointer kbn-custom" data-tip="点我 切换背景哟（略略略）！">{{ state.lunar }}</span>
              </div>
            </div>

            <div class="to-warp" v-if="!state.isScreenFull" style="width: 100%; display: flex; justify-content: center; margin-top: 40px; align-items: center">
              <text class="to pointer kbn-link" data-tip="首页" @click="handleBlog" style="margin-right: 40px" :style="{ fontSize: isMobi ? '36px' : '24px' }">🏡</text>
              <img
                class="to pointer kbn-link"
                data-tip="后台管理"
                @click="handleToBack"
                :style="{ width: isMobi ? '32px' : '24px', height: isMobi ? '32px' : '24px' }"
                style="margin-top: 4px"
                src="@/assets/images/icon/backstage.png" />
            </div>
          </div>
        </div>
      </div>
      <div class="footer">
        <span class="sub-title pointer kbn-custom" data-tip="点我 刷新名言名句！" @click="handleRefreshSaying">「 {{ state.saying }} 」</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import useResize from '@/hooks/useResize';
import { getBackstageurl, getLunar, randomNum } from '@/utils/common';
import axios from 'axios';
import moment from 'moment';
import { reactive } from 'vue';
import { useRouter } from 'vue-router';

const { isMobi } = useResize();
const router = useRouter();

const weekConfig = {
  1: '星期一',
  2: '星期二',
  3: '星期三',
  4: '星期四',
  5: '星期五',
  6: '星期六',
  7: '星期天'
};

let state = reactive({
  timer: 0,
  currentTime: moment().format('HH:mm:ss'),
  currentDate: moment().format('MM月DD日'),
  week: moment().day(),
  lunar: getLunar(moment().format('YYYY-MM-DD')),
  isScreenFull: false,
  clockSize: isMobi.value ? 0.5 : 0.8,
  saying: '渔得鱼心满意足，樵得樵眼笑眉舒！',
  bgImgUrl: import.meta.env.VITE_CURRENT_ENV == 'dev' ? import.meta.env.VITE_DEV_BASE_SERVER : import.meta.env.VITE_PROD_BASE_SERVER + '/assets/bg/5.avif'
});

// 获取名言名句
const getSaying = () => {
  axios.get('https://api.xygeng.cn/one', {}).then(response => {
    let res = response.data;
    if (res.code == 200) {
      if (isMobi.value) {
        state.saying = res.data.content.length > 20 ? res.data.content.slice(0, 20) + '...' : res.data.content;
      } else {
        state.saying = res.data.content.length > 40 ? res.data.content.slice(0, 40) + '...' : res.data.content;
      }
    }
  });
};
// 刷新名言名句
getSaying();
const handleRefreshSaying = () => {
  getSaying();
};

// 切换背景
const handleToggleBg = () => {
  state.bgImgUrl =
    import.meta.env.VITE_CURRENT_ENV == 'dev' ? import.meta.env.VITE_DEV_BASE_SERVER : import.meta.env.VITE_PROD_BASE_SERVER + '/assets/bg/' + randomNum(1, 15) + '.avif';
};

// 跳转到博客
const handleBlog = () => {
  router.push('/');
};

// 跳转到后台管理
const handleToBack = () => {
  window.open(getBackstageurl() + '/index', '_blank');
};

// 全屏/退出全屏 兼容性处理
const handleFullScreen = () => {
  if (!document.fullscreenElement) {
    // 进入全屏
    var requestMethod =
      document.documentElement.requestFullScreen || //W3C
      document.documentElement.webkitRequestFullScreen || //Chrome等
      document.documentElement.mozRequestFullScreen || //FireFox
      document.documentElement.msRequestFullscreen; //IE11

    if (requestMethod) {
      requestMethod.call(document.documentElement);
      state.clockSize = isMobi.value ? 0.7 : 2;
      state.isScreenFull = true;
    } else if (typeof window.ActiveXObject !== 'undefined') {
      var wscript = new ActiveXObject('WScript.Shell');
      if (wscript !== null) {
        wscript.SendKeys('{F11}');
      }
    }
  } else {
    // 退出全屏
    if (document.exitFullscreen) {
      document.exitFullscreen();
      state.clockSize = isMobi.value ? 0.5 : 1;
      state.isScreenFull = false;
    }
  }
};
</script>

<style lang="scss" scoped>
.start-content-container {
  width: 100vw;
  height: 100vh;
  position: relative;
  overflow: hidden;
  background-size: cover;
  .container-warp {
    height: 100%;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    .main {
      width: 100%;
      flex: 1;
      display: flex;
      position: relative;
      .content-container-center {
        position: absolute;
        top: 46%;
        left: 50%;
        transform: translate(-50%, -100%);
      }
      .time-select {
        display: flex;
        flex-direction: column;
        align-items: center;
        color: #fff;
        .clock-warp {
          cursor: pointer;
        }
        .time {
          font-family: DSDIGI;
          font-size: 60px;
          font-weight: 900;
        }
        .date {
          margin-top: 10px;
          font-size: 16px;
          font-weight: 500;
          font-family: DSDIGI;
          text-shadow: 1px 1px 1px #000;
        }
      }
      .to-warp {
        margin-top: 30px;
        display: flex;
        align-items: center;
        .to:hover {
          color: var(--theme-color);
        }
      }
      .select-warp {
        width: 100%;
        display: flex;
        justify-content: center;
        margin-top: 30px;
        padding: 0 20px;
        .el-input {
          max-width: 350px;
        }
      }
    }
    .footer {
      height: 40px;
      display: flex;
      justify-content: center;
      align-items: center;
      .sub-title {
        padding: 3px 5px;
        font-size: 12px;
        background-color: var(--bg-content-color);
        color: var(--text-color);
        text-align: center;
        border-radius: 4px;
      }
    }
  }
}
.pc,
.mobile {
  margin-left: 20px;
  border-left: 1px solid #ccc;
  padding-left: 10px;
  cursor: pointer;
}
.mobile {
  margin-left: 10px;
}

.qr {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>

<style lang="scss">
.select-warp {
  .el-input-group__prepend {
    width: 60px;
    position: relative;
    padding: 0 30px !important;
    .select-type-warp {
      position: absolute;
      left: 5px;
    }
  }
}
</style>
