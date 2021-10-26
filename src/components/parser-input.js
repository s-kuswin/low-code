/*
 * @Author: your name
 * @Date: 2021-10-21 16:21:19
 * @LastEditTime: 2021-10-26 17:40:43
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \low-code\src\components\parser-button.js
 */
import cInput from "./cInput.vue";

export default {
    name:'CInput',
    compoents:{cInput},
    render(h,section,children) {
        console.log(h,section,children);
        const _propsOn = {

        }
        return (
            <cInput
            { ..._propsOn }
            ></cInput>
        )
    }
}