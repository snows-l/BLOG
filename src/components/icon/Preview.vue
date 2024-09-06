<!--
 * @Description: ------------ fileDescription -----------
 * @Author: snows_l snows_l@163.com
 * @Date: 2024-09-05 22:07:52
 * @LastEditors: snows_l snows_l@163.com
 * @LastEditTime: 2024-09-06 12:31:36
 * @FilePath: /blog/src/components/icon/Preview.vue
-->
<template>
  <svg t="1725597084991" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4310" :width="size" :height="size">
    <path
      d="M832 64a128 128 0 0 1 128 128v640a128 128 0 0 1-128 128H192a128 128 0 0 1-128-128V192a128 128 0 0 1 128-128h640zM512 320C329.216 320 192 448.448 192 511.808 192 575.168 328.896 704 512 704c188.096 0 320-130.944 320-192.192C832 448.128 701.504 319.616 512 320z m0.384 34.688c84.928 0 154.24 70.4 154.24 157.12s-68.928 157.184-154.24 157.184c-85.376 0-154.368-70.4-154.368-157.184 0-86.72 68.992-157.12 154.368-157.12zM512 416a96 96 0 1 0 0.064 191.936A96 96 0 0 0 512 416z"
      fill="#08B68B"
      p-id="4311"></path>
  </svg>
</template>

<script lang="ts" setup>
const props = defineProps({
  size: {
    type: Number,
    default: 16
  }
});
</script>
