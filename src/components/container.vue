<!--
 * @Descripttion: 
 * @Author: 时融伟
 * @Date: 2021-10-15 14:49:52
-->
<template>
<div class="container">
    <slot></slot>
</div>
</template>

<script>
// 默认输入组件
export default {
  name: 'Container',
  data() {
      return {

      }
  },
}
</script>
<style scoped>
.container {
    background-color: var(--mainBg);
    min-height: 300px;
    width: 100%;
}
</style>