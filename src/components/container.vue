<!--
 * @Descripttion: 
 * @Author: 时融伟
 * @Date: 2021-10-15 14:49:52
-->
<template>
<div class="container" @dragover.prevent @drop.stop="handleDrop">
    <slot></slot>
</div>
</template>

<script>
// 默认输入组件
export default {
  name: 'Container',
  props:{
      jsonSchema:{
          type:Object,
          default:function() {
              return {}
          }
      }
  },
  data() {
      return {

      }
  },
  methods:{
    //   组件被放入组件container回调
      handleDrop(e) {
          console.log(e);
          this.$emit('drop', e, this)
      }
  }
}
</script>
<style scoped>
.container {
    background-color: var(--mainBg);
    min-height: 300px;
    border: 1px solid greenyellow;
    width: 100%;
}
</style>