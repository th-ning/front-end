import Vue from 'vue'
import VueRouter from 'vue-router'
import firstView from '../views/firstView.vue'
import Home from "../views/Article.vue";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'firstView',
    //redirect:'/search',
    component: firstView,
    meta: {
      title: '第一页'
    }
  },
  {
    path: '/twoView',
    name: 'twoView',
    component: () => import('../views/twoView.vue'),
    meta: {
      title: '第二页'
    }
  },
  {
    path: "/a",
    name: "Home",
    component: Home,
  },
]

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
})
router.afterEach(to => {
	// 设置title
	document.title = to.meta.title;
})
export default router
