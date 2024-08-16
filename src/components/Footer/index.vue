<!--
 * @Description: ------------ fileDescription -----------
 * @Author: snows_l snows_l@163.com
 * @Date: 2024-08-16 16:36:50
 * @LastEditors: snows_l snows_l@163.com
 * @LastEditTime: 2024-08-16 17:44:08
 * @FilePath: /blog/src/components/Footer/index.vue
-->
<template>
  <div class="footer-container-warp">
    <div class="content-warp" :class="{ 'm-content-warp': isMobi }">
      <div class="saying-warp pointer kbn-custom" :data-tip="'点击即可刷新😊'" @click="handleRefreshSaying">「 {{ state.saying }} 」</div>
      <div class="auth">Copyright © 2024 - {{ new Date().getFullYear() }} By snows_l</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import axios from 'axios';
import useResize from '@/hooks/useResize';
const { isMobi } = useResize();
import { ref, reactive, watch, onMounted, computed } from 'vue';
const state = reactive({
  saying: '渔得鱼心满意足，樵得樵眼笑眉舒！'
});

// 获取名言名句
const getSaying = () => {
  axios.get('https://api.xygeng.cn/one', {}).then(response => {
    let res = response.data;
    if (res.code == 200) {
      state.saying = res.data.content;
    }
  });
};
// 刷新名言名句
const handleRefreshSaying = () => {
  getSaying();
};
</script>

<style lang="scss" scoped>
.footer-container-warp {
  width: 100vw;
  padding: 15px;
  box-shadow: 0 1px 20px 10px rgba(255, 255, 255, 0.394);
  background: linear-gradient(-45deg, #ee7752, #ce3e75, #23a6d5, #23d5ab);
  background-size: 400% 400%;
  animation: animation 10s ease infinite;
  .content-warp {
    height: 100%;
    margin: 0 auto;
    width: var(--content-max-width);
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    overflow: hidden;
    div {
      display: flex;
      justify-content: center;
      font-size: 12px;
      color: #fff;
      margin: 5px 0;
    }
    .saying-warp {
      width: 100%;
      border-radius: 5px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
  .m-content-warp {
    width: 96%;
    .saying-warp {
      width: 100%;
      border-radius: 5px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
}

@keyframes animation {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
</style>
