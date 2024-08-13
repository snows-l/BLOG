<!--
 * @Description: ------------ fileDescription -----------
 * @Author: snows_l snows_l@163.com
 * @Date: 2024-08-13 13:13:23
 * @LastEditors: snows_l snows_l@163.com
 * @LastEditTime: 2024-08-13 14:56:16
 * @FilePath: /blog/src/components/Comment/index.vue
-->
<template>
  <div class="comment-warp" :class="{ 'm-comment-warp': isMobi }">
    <div class="top-tip"></div>
    <div class="input-out-warp">
      <div class="input-warp">
        <textarea type="textarea" :class="{ 'have-text': state.form.comment }" class="input-text" :rows="5" placeholder="" v-model="state.form.comment" />
        <label class="input-label">你是我一生只会遇见一次的惊喜 ...</label>
      </div>
    </div>
    <div class="info-warp">
      <div class="input qq-warp">
        <input type="text" v-model="state.form.qq" placeholder="昵称或QQ号 (昵称 )" @blur="handleQQinfn" />
        <label class="input-label">QQ 紧用于获取头像及昵称</label>
        <img class="avatar" :src="state.form.avatar || defaultAvatar" />
      </div>
      <div class="input email-warp">
        <input type="text" v-model="state.form.email" placeholder="邮箱 (必须* )" />
        <label class="input-label">你将收到回复通知</label>
      </div>
      <div class="input url-warp">
        <input type="text" v-model="state.form.url" placeholder="网站" />
        <label class="input-label">禁止小广告😀</label>
      </div>
    </div>
    <div class="check-warp">
      <div class="check-item">
        <input type="radio" v-model="state.form.privacy" />
        <label>私密评论</label>
      </div>
      <div class="check-item">
        <input type="radio" v-model="state.form.back" />
        <label>邮件通知</label>
      </div>
    </div>

    <div class="btn-warp">
      <div class="btn">BiuBiuBiu~</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import defaultAvatar from '@/assets/images/common/default_avatar.png';
import axios from 'axios';
import { ref, reactive, watch, onMounted, computed } from 'vue';

const props = defineProps({
  isMobi: {
    type: Boolean,
    default: false
  }
});

const state = reactive({
  form: {
    comment: '',
    qq: '',
    qqback: '',
    avatar: '',
    email: '',
    url: '',
    privacy: false,
    back: false
  }
});

const handleQQinfn = () => {
  let url = 'https://www.moeshou.com/wp-json/sakura/v1/qqinfo/json?qq=' + state.form.qq + '&_wpnonce=7ccc55456e';
  axios.get(url).then(res => {
    state.form.avatar = res.data.avatar;
    state.form.qqback = state.form.qq;
    state.form.qq = res.data.name;
    state.form.email = state.form.qqback + '@qq.com';
  });
};
</script>

<style lang="scss" scoped>
.comment-warp {
  width: 100%;
  padding: 20px;
  border: 1px solid var(--text-color);
  border-radius: 15px;
  background-color: var(--bg-warp-light-color-2);
  .input-out-warp {
    background-color: var(--bg-content-color);
    .input-warp {
      position: relative;
      padding: 10px 20px;
      border: 1px solid var(--text-color);
      background-image: url('@/assets/images/common/comment-bg.png');
      background-size: contain;
      background-repeat: no-repeat;
      background-position: right;
      resize: vertical;
      border-radius: 5px;
      .input-text {
        width: calc(100% - 0px) !important;
        min-height: 60px;
        font-size: 14px;
        border: none;
        background-color: transparent;
        outline: none;
        &:focus {
          border-color: var(--primary-color);
          + .input-label {
            top: -6px;
            font-size: 12px;
            line-height: 14px;
            background-color: #999;
            border-radius: 2px;
          }
        }
      }
      .have-text {
        + .input-label {
          top: -6px !important;
          font-size: 12px !important;
          line-height: 14px !important;
          background-color: #999 !important;
          border-radius: 2px !important;
        }
      }

      .input-label {
        position: absolute;
        left: 16px;
        top: 14px;
        padding: 0 6px;
        transform-origin: 0 0;
        pointer-events: none;
        transition: all 0.25s;
        color: var(--text-color);
      }
    }
  }
  .info-warp {
    margin-top: 30px;
    padding: 20px 0;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    .input {
      width: 240px;
      padding: 5px 10px;
      background-color: var(--bg-content-color);
      position: relative;
      border: 1px solid var(--text-color);
      border-radius: 10px;

      input {
        border: 0;
        outline: none;
        width: 100%;
        height: 30px;
        border-radius: 10px;
        background-color: transparent;
        color: var(--text-color);
      }
      label {
        position: absolute;
        height: 18px;
        top: -20px;
        left: 5px;
        margin: 0 auto;
        font-size: 14px;
        font-weight: 400;
        color: var(--theme-light-color-5);
      }
    }
    .qq-warp {
      position: relative;
    }
    .avatar {
      position: absolute;
      top: 5px;
      right: 10px;
      width: 30px;
      height: 30px;
      border-radius: 50%;
    }
  }
  .check-warp {
    margin: 20px 0;
    display: flex;
    justify-content: space-around;
    .check-item {
      width: 200px;
      input {
      }
      label {
        color: var(--text-color);
        margin-left: 15px;
      }
    }
  }
  .btn-warp {
    margin-top: 40px;
    width: 96%;
    display: flex;
    justify-content: center;
    .btn {
      border: 1px solid var(--text-color);
      border-radius: 15px;
      min-width: 300px;
      line-height: 30px;
      text-align: center;
      height: 40px;
      padding: 5px 20px;
      border-radius: 10px;
      background-color: var(--bg-content-color);
      color: var(--text-color);
    }
  }
}
.m-comment-warp {
  width: 96%;

  .info-warp {
    .input {
      width: 100%;
      margin-bottom: 40px;
      &:last-child {
        margin-bottom: 10px;
      }
    }
  }
}
</style>
