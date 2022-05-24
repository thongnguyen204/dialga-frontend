import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Dashboard from '../views/Dashboard.vue'
import Register from '../components/auth/Register.vue'
import Login from '../components/auth/Login.vue'
import store from '../store/index'
import Articles from '../components/Articles.vue'
import ArticleDetail from '../components/ArticleDetail.vue'
import CreateArticle from '../components/CreateArticle.vue'
import ArticleEdit from '../components/ArticleEdit.vue'
import UserInfo from '../components/UserInfo.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/info',
    name: 'UserInfo',
    component: UserInfo,
    beforeEnter: (to, from, next) => {
      store.dispatch('checkAuthenticate')
      .then(() => { next() })
      .catch(() => { next({ name: 'Login' })})
    }
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    beforeEnter: (to, from, next) => {
      store.dispatch('checkAuthenticate')
      .then(() => {
        next( {name: 'Dashboard'} );
      })
      .catch(() => { next() });
    } 
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    beforeEnter: (to, from, next) => {
      store.dispatch('checkAuthenticate')
      .then(() => {
        next();
      })
      .catch(() => { next({ name: 'Login' }) });
    },
    children: [
      {
        path: 'articles',
        name: 'Articles',
        component: Articles,
      },
      {
        path: 'article/:id',
        name: 'ArticleDetail',
        component: ArticleDetail,
      },
      {
        path: 'article/edit/:id',
        name: 'ArticleEdit',
        component: ArticleEdit,
      },
      {
        path: 'articles/create',
        name: 'CreateArticle',
        component: CreateArticle,
      }
    ], 
  },
  {
    path: '/login',
    name: 'Login',
    component: Login, 
    beforeEnter: (to, from, next) => {
      store.dispatch('checkAuthenticate')
      .then(() => {
        next( {name: 'Dashboard'} );
      })
      .catch(() => { next() });
    } 
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
