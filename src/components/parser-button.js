/*
 * @Author: your name
 * @Date: 2021-10-21 16:21:19
 * @LastEditTime: 2021-10-21 16:41:24
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \low-code\src\components\parser-button.js
 */
import cButton from "./cButton.vue";

// 逻辑层处理
export default {
    name:'CButton',
    compoents:{cButton},
    render(h,section,children) {
        console.log(h,section);
        return (
            <cButton>{ children }</cButton>
        )
    }
}