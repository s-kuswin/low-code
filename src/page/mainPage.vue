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
                    <div class="comonent-stack">
                        <div class="component-title">
                            物料堆
                        </div>
                        <ul>
                            <li v-for="(item,index) in stacks" :key="index">
                                {{ item }}
                            </li>
                        </ul>
                    </div>
                </el-col>
                <el-col :span="16">
                    <!-- 主舞台 -->
                    <div class="stage">
                        <div class="component-title">
                            <li v-for="(item,index) in components" :key="index">
                                <component :is="item"></component>
                            </li>
                        </div>
                    </div>
                </el-col>
                <el-col :span="4">
                    <!-- 配置面板 -->
                    <div class="config-panel">
                        <div class="component-title">
                            配置面板
                        </div>
                    </div>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
    import components from '../components';
    export default {
        components:{ ...components },
        data() {
            return {
                // 需要加到配置系统中的组件
                stacks: ['choseButton','choseInput','Container'],
                components:[]
            }
        },
    }
</script>
    
<style lang="scss" scoped>

</style> 