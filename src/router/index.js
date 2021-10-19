/*
 * @Descripttion: 
 * @Author: 时融伟
 * @Date: 2021-10-14 16:27:12
 */
import Vue from 'vue';
import Router from 'vue-router';
import mainPage from '@/page/mainPage.vue'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path:'/',
            name:'mainPage',
            component:mainPage
        }
    ]
})