/*
 * @Author: kuswin
 * @Date: 2021-10-15 14:50:42
 * @LastEditTime: 2021-10-20 15:18:52
 * @LastEditors: Please set LastEditors
 * @Description: 导出所有的组件
 * @FilePath: \low-code\src\components\index.js
 */
const req = require.context('./', false, /[^.]+\.vue/)

const componentsName = req.keys()
const components = componentsName.reduce((component, module) => {
    const mod = req(module);
    component[mod.default.name] = mod.default;
    return component;
},{});

export { components };