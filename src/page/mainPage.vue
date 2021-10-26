<!--
 * @Descripttion: 
 * @Author: 时融伟
 * @Date: 2021-10-14 16:28:57
-->
<template>
    <div class="hello">
        <el-button></el-button>
        <div class="header">顶栏</div>
        <div class="main-content">
            <el-row>
                <el-col :span="4">
                    <!-- 物料堆 -->
                    <div class="comonent-stack block">
                        <div class="component-title">
                            物料堆
                        </div>
                        <ul>
                            <li v-for="(item,index) in stacks" :key="index" :draggable="true" @drag="handleDrag(item)" class="component-item">
                                {{ item }}
                            </li>
                        </ul>
                    </div>
                </el-col>
                <el-col :span="16">
                    <!-- 主舞台 -->
                    <div class="stage block"  @dragover.prevent @drop="handleDrop">
                        <render-engine ref="engine" 
                            :json-schema="jsonSchema" :addNode="selectedType"
                        ></render-engine>
                        <!-- <ul>
                            <li v-for="(item,index) in components" :key="index">
                                {{ item }}
                                <component :is="item"></component>
                            </li>
                        </ul> -->
                    </div>
                </el-col>
                <el-col :span="4">
                    <!-- 配置面板 -->
                    <div class="config-panel">
                        <div class="component-title block">
                            配置面板
                        </div>
                    </div>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
    import { components } from '../components';
    import renderEngine from '../fragments/renderEngine.vue'
    export default {
        components:{ ...components,renderEngine },
        data() {
            return {
                // 需要加到配置系统中的组件
                stacks: ['CButton','CInput','Container'],
                components:[],
                // 当亲操作的数组
                currentJson:{},
                // 数据库拿到的协议
                jsonSchema:{
                    page:{
                        type:'Container',
                        children:[{
                            type:'Container',
                            children:[
                                {type:'CInput'},
                                {type:'CButton'},
                            ]
                        }]
                    }
                },
                // 当前拾取类型
                selectedType:''
            }
        },
        methods: {
            // 拾取被配置组件
            handleDrag(e) {
                this.selectedType = e
            },
            // 放手
            handleDrop() {
                const _type = this.selectedType
                console.log(_type);
                this.components.push(_type)
            },
            // 放手于container上
            handleDropContainer(item) {
                item.innerType = this.selectedType
            }
        },
        created() {
            this.currentJson = this.jsonSchema
        }
    }
</script>
    
<style scoped>
.block {
    border: 1px solid #edbede;
    height: 100vh;
}

/* 物料堆 */
.compoent-stack {

}
.component-title {
    padding: 10px;
}
.component-item {
    border: 1px solid #edbede;
    margin: 2px 5px;
    padding: 10px 0;
    border-radius: 18px;
}
</style> 