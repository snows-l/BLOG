<!--
 * @Description: ------------ fileDescription -----------
 * @Author: snows_l snows_l@163.com
 * @Date: 2024-08-19 13:40:25
 * @LastEditors: snows_l snows_l@163.com
 * @LastEditTime: 2024-09-06 12:49:10
 * @FilePath: /blog/src/components/common/ToolTip.vue
-->

<!--
  * @Description: 鼠标悬停显示提示信息
  *props:
  * content: 提示信息
  * placement: 位置
  * offset: 偏移量
  * transition: 过渡效果
-->
<template>
  <el-tooltip :effect="state.theme" :content="content" :placement="placement" :offset="offset" :transition="transition">
    <slot></slot>
  </el-tooltip>
</template>

<script lang="ts" setup>
import { getTheme } from '@/utils/theme';
import { ElTooltip } from 'element-plus';
import { reactive } from 'vue';

const props = defineProps({
  appendTo: {
    type: String,
    default: '' // CSSSelector / HTMLElement
  },
  content: {
    type: String,
    default: ''
  },
  placement: {
    type: String,
    default: 'top'
  },
  offset: {
    type: Number,
    default: 0
  },
  transition: {
    type: String,
    default: 'el-fade-in-linear'
  }
});

const state = reactive({
  theme: getTheme()
});
</script>

<style lang="scss" scoped></style>
