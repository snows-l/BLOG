<!--
 * @Description: ------------ fileDescription -----------
 * @Author: snows_l snows_l@163.com
 * @Date: 2024-08-31 12:42:12
 * @LastEditors: snows_l snows_l@163.com
 * @LastEditTime: 2024-09-04 14:13:17
 * @FilePath: /blog/src/components/common/CommentView/index.vue
-->
<template>
  <div class="comment-view-container" :class="{ 'm-comment-view-container': isMobi }">
    <div class="max-width-center">
      <div class="comment-view-content" v-if="list && list.length > 0">
        <div class="comment-item" v-for="item in list" :key="item.id">
          <div class="info-warp pointer" @click="handleComent(item.id, item)">
            <div class="avatar-warp">
              <img :src="getQQAvatar(item.qq)" />
            </div>
            <div class="info">
              <div class="nick-name">
                <div class="bozhu" v-if="item.qq === '37523953'">博主</div>
                <span style="margin: 0 4px">{{ item.nickName }}</span>
                <div
                  class="bozhu level"
                  :style="{ color: item.qq === '37523953' ? '#ff6600' : '#d3a833', border: item.qq === '37523953' ? '1px solid #ff6600' : '1px solid #d3a833' }"
                  style="margin-left: 5px; margin-right: 5px">
                  Lv{{ item.qq == '37523953' ? '10' : '2' }}
                </div>
              </div>
              <div class="time-add">
                <span>{{ getTime(item.time) }}</span>
                <span style="margin-left: 10px">归属地：{{ item.city }}</span>
              </div>
            </div>
          </div>
          <div class="content pointer" @click="handleComent(item.id, item)">
            {{ item.comment }}
          </div>
          <div class="sub-comment" v-if="item.children && item.children.length > 0">
            <div class="sub-padding">
              <div class="sub-comment-item pointer" @click="handleComent(item.id, subItem)" v-for="subItem in item.children" :key="subItem.id">
                <div class="title">
                  <span>{{ subItem.nickName }}</span>
                  <span style="margin: 0 6px; color: var(--theme-light-color-4)">回复</span>
                  <span>{{ subItem.toNickName }}：</span>
                </div>
                <div class="sub-content">{{ subItem.comment }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-else class="no-comment">
        <Empty :text="'暂无评论数据，期待您的评论~'" :loadingText="'评论正在拼命加载中...'"></Empty>
      </div>
      <div class="input-warp">
        <div class="input-title" v-if="articleId != state.form.pId && state.form.pId">回复：{{ state.form.toNickName }}</div>
        <CommentInput v-model="state.comment" @submit="handleComment"></CommentInput>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { addComment } from '@/api/comment';
import useResize from '@/hooks/useResize';
import { getQQAvatar, getTime } from '@/utils/common';
import { reactive } from 'vue';
const { isMobi } = useResize();

const props = defineProps({
  articleId: {
    type: Number,
    default: 0
  },
  list: {
    type: Array,
    default: () => []
  }
});

const emits = defineEmits(['submit']);

const state = reactive({
  list: [],
  comment: {
    value: '',
    qq: '',
    nickName: '',
    avatarUrl: '',
    email: '',
    websiteUrl: '',
    isPrivacy: false,
    isEmailFeekback: true
  },
  form: {
    articleId: props.articleId,
    pId: 0,
    toQQ: '',
    toNickName: '',
    toEmail: '',
    toisEmailFeekback: false
  }
});

const handleComent = (pid, row) => {
  state.form.pId = pid;
  state.form.toQQ = row.qq;
  state.form.toNickName = row.nickName;
  state.form.toEmail = row.email;
  state.form.toisEmailFeekback = row.isEmailFeekback;
};

// 处理评论
const handleComment = () => {
  let params = {
    ...state.comment,
    comment: state.comment.value,
    ...state.form,
    type: 1
  };
  addComment(params).then(res => {
    if (res.code === 200) {
      state.form.pId = 0;
      state.form.toQQ = '';
      state.form.toNickName = '';
      state.form.toEmail = '';
      state.form.toisEmailFeekback = false;

      state.comment.value = '';
      state.comment.qq = '';
      state.comment.nickName = '';
      state.comment.avatarUrl = '';
      state.comment.email = '';
      state.comment.websiteUrl = '';
      state.comment.isPrivacy = false;
      state.comment.isEmailFeekback = false;
      emits('submit');
    }
  });
};
const clearTO = () => {
  state.form.pId = 0;
  state.form.toQQ = '';
  state.form.toNickName = '';
};

defineExpose({
  clearTO
});
</script>

<style lang="scss" scoped>
.comment-view-container {
  margin-top: 20px;
  width: 100%;
  .max-width-center {
    padding: 15px;
    background-color: var(--bg-warp-color);
    border-radius: 15px;
    height: 100%;
    max-width: var(--content-max-width);
    margin: 0 auto;
    .comment-view-content {
      background-color: var(--bg-content-color);
      border: 1px solid var(--border-color);
      border-radius: 15px;
      overflow: hidden;
      .comment-item {
        background-color: var(--bg-warp-light-color-2);
        padding: 15px;
        padding-bottom: 30px;
        border-bottom: 1px solid var(--border-color);
        &:last-child {
          margin-bottom: 0;
          border-bottom-left-radius: 15px;
          border-bottom-right-radius: 15px;
        }
        &:first-child {
          border-top-left-radius: 15px;
          border-top-right-radius: 15px;
        }
        .info-warp {
          display: flex;
          padding: 10px;
          align-items: space-around;
          .avatar-warp {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            overflow: hidden;
            img {
              width: 100%;
              height: 100%;
            }
          }
          .info {
            margin-left: 15px;
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            font-size: 12px;
            .nick-name {
              display: flex;
              align-items: center;
              margin-bottom: 4px;
              .bozhu {
                padding: 2px 5px;
                font-size: 12px;
                border: 1px solid var(--theme-light-color-5);
                color: var(--theme-color);
                margin-right: 5px;
                border-radius: 5px;
              }
              .level {
                border: 1px solid #ddd;
                color: var(--text-color);
                font-family: 优设标题黑 !important;
              }
            }
          }
        }
        .content {
          padding-left: 60px;
          line-height: 20px;
          font-size: 14px;
        }
        .sub-comment {
          margin-top: 10px;
          padding-left: 60px;
          .sub-padding {
            background-color: var(--bg-content-color-2);
            border-radius: 5px;
            padding: 10px 20px;
            .sub-comment-item {
              margin: 5px 0;
              .title {
                font-size: 12px;
                line-height: 20px;
              }
              .sub-content {
                line-height: 20px;
                font-size: 14px;
              }
            }
          }
        }
      }
    }
    .input-warp {
      margin-top: 20px;
      .input-title {
        font-size: 14px;
        line-height: 40px;
      }
    }
  }
}
.m-comment-view-container {
  width: 96%;
  margin: 0 auto;
}
</style>
