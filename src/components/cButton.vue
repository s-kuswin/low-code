<!--
 * @Author: your name
 * @Date: 2021-10-14 16:13:48
 * @LastEditTime: 2021-10-26 17:55:03
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \low-code\src\components\cButton.vue
-->
<template>
<el-button>{{ btn }}</el-button>
</template>

<script>
// 默认按钮组件
export default {
  name: 'CButton',
  data() {
      return {
          btn:'按钮'
      }
  },
}
</script>
