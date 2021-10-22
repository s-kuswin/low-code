/*
 * @Author: your name
 * @Date: 2021-10-21 16:21:19
 * @LastEditTime: 2021-10-22 17:10:26
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \low-code\src\components\parser-button.js
 */
import container from "./container.vue";

// 逻辑层处理
export default {
    name:'Container',
    compoents:{container},
    render(h,section,children) {
        console.log(h,section);
        const _props = {
            
        }
        return (
            <container>{ children }</container>
        )
    }
}