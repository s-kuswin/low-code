/*
 * @Author: kuswin
 * @Date: 2021-10-15 14:50:42
 * @LastEditTime: 2021-10-21 17:08:25
 * @LastEditors: Please set LastEditors
 * @Description: 导出所有的组件
 * @FilePath: \low-code\src\components\index.js
 */
const req = require.context('./', false, /[^.]+\.vue/)
const reqParse = require.context('./', false, /parser-[^.]+\.js/)

console.log(req.keys());

const componentsName = req.keys()
const components = componentsName.reduce((component, module) => {
    const mod = req(module);
    component[mod.default.name] = mod.default;
    return component;
},{});

const parsersName = reqParse.keys();
const parsers = parsersName.reduce((parser,module) => {
    const mod = reqParse(module)

    parser[mod.default.name] = mod.default
    return parser
},{})
console.log(parsers,'parsers');
console.log(components,'components');

export { components, parsers };