<!--
 * @Description: ------------ fileDescription -----------
 * @Author: snows_l snows_l@163.com
 * @Date: 2024-08-13 13:13:23
 * @LastEditors: snows_l snows_l@163.com
 * @LastEditTime: 2024-09-01 11:31:32
 * @FilePath: /BLOG/src/components/common/CommentInput/index.vue
 * @Copyright © 2020-2024 snows_l. All rights reserved.
 *
 *
 *  value: '',
    qq: '',
    nickName: '',
    avatarUrl: '',
    email: '',
    websiteUrl: '',
    isPrivacy: false,
    isEmailFeekback: false
  *

-->
<template>
  <div class="comment-warp" :class="{ 'm-comment-warp': isMobi, 'is-submit': isSubmit }">
    <div class="top-tip"></div>
    <div class="input-out-warp">
      <div class="input-warp" :class="{ 'no-input-warp': !localValue.value }">
        <textarea type="textarea" :class="{ 'have-text': localValue.value }" class="input-text" :rows="10" placeholder="" v-model="localValue.value" />
        <label class="input-label">你是我一生只会遇见一次的惊喜 ...</label>
      </div>
    </div>
    <div class="info-warp">
      <div class="input qq-warp" :class="{ 'no-qq': !localValue.qq }">
        <input type="text" v-model="localValue.qq" placeholder="QQ" @blur="handleGetInfoByQQ" />
        <label class="input-label">QQ 仅仅用于获取头像及昵称，请放心 「食」 用^ _ ^</label>
        <img class="avatar" :src="localValue.avatar || defaultAvatar" />
      </div>
      <div class="input qq-warp" :class="{ 'no-nick': !localValue.nickName }">
        <input type="text" v-model="localValue.nickName" placeholder="昵称( * )" />
        <label class="input-label">昵称 (输入QQ后自动获取)</label>
      </div>
      <div class="input email-warp">
        <input type="text" v-model="localValue.email" placeholder="邮箱 ( * )" />
        <label class="input-label">你将收到回复通知 (自动获取)</label>
      </div>
      <div class="input url-warp">
        <input type="text" v-model="localValue.websiteUrl" placeholder="网站" />
        <label class="input-label">禁止小广告 😀</label>
      </div>
    </div>
    <div class="check-warp">
      <div class="check-item">
        <input type="radio" id="isPrivacy" :value="localValue.isPrivacy" @change="e => update(e, 'isPrivacy')" />
        <label for="isPrivacy">私密评论</label>
      </div>
      <div class="check-item">
        <input type="radio" id="isEmailFeekback" :value="localValue.isEmailFeekback" @change="e => update(e, 'isEmailFeekback')" />
        <label for="isEmailFeekback">邮件通知</label>
      </div>
    </div>

    <div class="btn-warp">
      <div class="btn" @click="handleSubmit">BiuBiuBiu~</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import defaultAvatar from '@/assets/images/common/default_avatar.png';
import useResize from '@/hooks/useResize';
import { ElMessage } from 'element-plus';
import { computed, ref } from 'vue';
const { isMobi } = useResize();

const emits = defineEmits(['submit', 'update:modelValue']);

const props = defineProps({
  modelValue: {
    type: Object,
    default: () => ({
      isPrivacy: false,
      isEmailFeekback: false
    })
  }
});

let isSubmit = ref(false);

const localValue = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emits('update:modelValue', value);
  }
});

//  更新 私密评论 和 邮件通知
const update = (e, type) => {
  let n = { ...props.modelValue, [type]: e.target.checked };
  emits('update:modelValue', n);
};

// 根据qq获取用户信息 并更新 昵称 头像 邮箱
const handleGetInfoByQQ = () => {
  if (!props.modelValue.qq) return;
  let url = 'https://www.moeshou.com/wp-json/sakura/v1/qqinfo/json?qq=' + props.modelValue.qq + '&_wpnonce=7ccc55456e';
  fetch(url).then(res => {
    const n = { ...props.modelValue, avatarUrl: res.data.avatar, nickName: res.data.name, email: props.modelValue.qq + '@qq.com' };
    emits('update:modelValue', n);
  });
};

//  提交
const handleSubmit = () => {
  if (!props.modelValue.value || !props.modelValue.qq || !props.modelValue.nickName) {
    isSubmit.value = true;
    ElMessage.error('评论内容、QQ、昵称 不能为空');
  } else {
    emits('submit', props.modelValue);
    isSubmit.value = false;
  }
};
</script>

<style lang="scss" scoped>
.comment-warp {
  width: 100%;
  padding: 20px;
  border: 1px solid var(--border-color);
  border-radius: 15px;
  background-color: var(--bg-warp-light-color-2);
  .input-out-warp {
    border-radius: 10px;
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
      border-radius: 10px;
      &:focus-within {
        border-color: var(--theme-color);
      }
      .input-text {
        width: calc(100% - 0px) !important;
        min-height: 60px;
        font-size: 14px;
        border: none;
        background-color: transparent;
        outline: none;
        color: var(--text-color);
        &:focus {
          border-color: var(--theme-color);
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
      width: 360px;
      padding: 5px 10px;
      background-color: var(--bg-content-color);
      position: relative;
      border: 1px solid var(--text-color);
      border-radius: 10px;
      margin-bottom: 40px;
      &:focus-within {
        border-color: var(--theme-color);
      }
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
        font-size: 12px;
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
    margin-top: -40px;
    display: flex;
    .check-item {
      width: 200px;
      input {
        color: var(--theme-color);
      }
      input:active {
        color: var(--theme-color);
      }
      label {
        color: var(--text-color);
        margin-left: 15px;
      }
    }
  }
  .btn-warp {
    margin-top: 60px;
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
  // width: 96%;

  .info-warp {
    .input {
      width: 100%;
      margin-bottom: 40px;
      &:last-child {
        margin-bottom: 10px;
      }
    }
  }
  .check-warp {
    margin: 10px 0;
  }
}
.is-submit {
  .no-input-warp,
  .no-qq,
  .no-nick,
  .no-email {
    border: 1px solid red !important;
  }
}
</style>
