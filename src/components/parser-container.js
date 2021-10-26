/*
 * @Author: your name
 * @Date: 2021-10-21 16:21:19
 * @LastEditTime: 2021-10-26 17:17:50
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
        // 传
        const _props = {
            props:{
                jsonSchema: section
            }
        }

        // 接受下部往上传的
        const _propsOn = {
            on:{
                dragover: this.handleDragOver,
                drop: this.handleDrop
            },
            nativeOn:{

            }
        }
        return (
            <container
                { ..._props }
                { ..._propsOn }
            >{ children }</container>
        )
    }
}