<!--
 * @Author: your name
 * @Date: 2021-10-20 15:49:44
 * @LastEditTime: 2021-10-21 17:07:41
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \low-code\src\components\renderEngine.vue
-->
<script>
import { components, parsers } from '../components'
    export default {
        name:'renderEngine',
        props:{
            jsonSchema: {
                type:Object,
                default:() => {
                    return {}
                }
            }
        },
        data() {
            return {
                page: undefined
            }
        },
        created() {
           this.init()
        },
        methods: {
            init() {
                this.page = this.jsonSchema.page || {}
            },
            renderRoot(h) {
                let _page  = this.page
                //TODO:后期丰富全局配置逻辑入口
                return(
                    <div class="root">
                        { this.renderComponents(h,_page)}
                    </div>
                )
            },

            // 渲染组件
            renderComponents(h,section) {
                // 是否有子节点
                // 组件通用逻辑再此添加
                let _children = null
                if(section.children) {
                    // 层级渲染
                    _children = this.renderChildren(h,section.children)
                }
                return this.startRender(h,section,_children)
            },
            // 遍历包涵兄弟&子节点
            renderChildren(h,section) {
                let _nodeArray = section.children || [].concat(section)
                // 后期可以在此扩展兄弟节点间通信
                return _nodeArray.map((n,i) => this.renderComponents(h,n,i))
            },
            // 开始渲染
            startRender(h, section, _children) {
                const _type = section.type;
                const renderMod = parsers[_type];
                // 直接渲染
                if(renderMod) {
                    return renderMod.render.call(this,h,section,_children)
                }
                console.log(_type,'startRender',_children,renderMod);
            }

        },
        components:{
            ...components,
            ...parsers
        },
        render(h) {
            let _vode = this.renderRoot(h)
            return _vode
        }
    }
</script>

<style lang="scss" scoped>

</style>