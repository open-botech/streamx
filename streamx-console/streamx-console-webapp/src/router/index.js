import Vue from 'vue'
import Router from 'vue-router'
import SignInView from '@/views/user/SignIn'
import { BasicView, RouteView, EmptyView, PageView,BasicViewIframe } from '@/layouts'
import store from '@/store'
import storage from '@/utils/storage'
import themeUtil from '@/utils/themeUtil'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import notification from 'ant-design-vue/es/notification'
import { TOKEN } from '@/store/mutation-types'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

Vue.use(Router)

const constRouter = [
  {
    path: '/signin',
    name: 'signin',
    component: SignInView
  },
  {
    path: '/index',
    name: 'home',
    redirect: '/home'
  },
  {
    path: '/devflink',
      component: process.env.NODE_VIEW=='empty'?EmptyView:BasicView,
      children: [{
        'path': '/devflink/app',
        'component': PageView,
        'children': [{
          'path': '/devflink/app/flinkedit',
          'component': () => import('@/views/flink/app/flinkEdit/EditStreamX') ,
        },{
          'path': '/devflink/app/add',
          'component': () => import('@/views/flink/app/flinkEdit/Add') ,
        },{
          'path': '/devflink/app/costumedit',
          'component': () => import('@/views/flink/app/costumEdit/CostumEdit_bak') ,
        },{
          'path': '/devflink/app/costumadd',
          'component': () => import('@/views/flink/app/costumAdd/CostumAdd') ,
        },{
          'path': '/devflink/app/fly',
          'component': () => import('@/components/newTopology/index.vue') ,
        }]
      }]
  },

  {
    path: '/discardflink',
      component: EmptyView,
      children: [{
        'path': '/discardflink/app',
        'component': PageView,
        'children': [{
          'path': '/discardflink/app/flinkedit',
          'component': () => import('@/views/flink/app/flinkEditDiscard/index') ,
        }]
      }]
  }
  // ,{
  //   path: '/iframe',
  //   component: EmptyView,
  //   children: [{
  //     'path': '/iframe/system',
  //     'name': 'System',
  //     'component': PageView,
  //     'children': [{
  //       'path': '/iframe/system/user',
  //       // 'name': 'User Management',
  //       'component': resolveView('system/user/User'),
  //     }, {
  //       'path': '/iframe/system/role',
  //       // 'name': 'Role Management',
  //       'component': resolveView('system/role/Role'),
  //     }, {
  //       'path': '/iframe/system/menu',
  //       // 'name': 'Router Management',
  //       'component': resolveView('system/menu/Menu'),
  //     }]
  //   }, {
  //     'path': '/iframe/flink',
  //     'name': 'StreamX',
  //     'component': PageView,
  //     'children': [{
  //       'path': '/iframe/flink/app/edit_streamx',
  //       // 'name': 'Edit StreamX App',
  //       'component': resolveView('flink/app/EditStreamX'),
  //     }, {
  //       'path': '/iframe/flink/app/add',
  //       // 'name': 'Add Application',
  //       'component': resolveView('flink/app/Add'),
  //     }, {
  //       'path': '/iframe/flink/app/detail',
  //       // 'name': 'App Detail',
  //       'component': resolveView('flink/app/Detail'),
  //     }, {
  //       'path': '/iframe/flink/app/edit_flink',
  //       // 'name': 'Edit Flink App',
  //       'component': resolveView('flink/app/EditFlink'),
  //     }, {
  //       'path': '/iframe/flink/project/add',
  //       // 'name': 'Add Project',
  //       'component': resolveView('flink/project/Add'),
  //     }, {
  //       'path': '/iframe/flink/project',
  //       // 'name': 'Project',
  //       'component': resolveView('flink/project/View'),
  //     }, {
  //       'path': '/iframe/flink/app',
  //       // 'name': 'Application',
  //       'component': resolveView('flink/app/View'),
  //     }, {
  //       'path': '/iframe/flink/notebook/view',
  //       // 'name': 'Notebook',
  //       'component': resolveView('flink/notebook/Submit'),
  //     }, {
  //       'path': '/iframe/flink/setting',
  //       // 'name': 'Setting',
  //       'component': resolveView('flink/setting/View'),
  //     }]
  //   }]
  // }
]

const router = new Router({
  routes: constRouter,
  base: process.env.BASE_URL,
  scrollBehavior: () => ({ y: 0 })
})

const whiteList = ['signin']

let asyncRouter

// 导航守卫，渲染动态路由
router.beforeEach((to, from, next) => {
  NProgress.start() // start progress bar
  if (whiteList.indexOf(to.path) !== -1) {
    next()
  }
  const token = storage.get(TOKEN)
  if (token) {
    if (!asyncRouter) {
      // 如果用户路由不存在
      const routers = store.getters.routers
      if (routers) {
        asyncRouter = routers
        go(to, next)
      } else {
        // 获取当前这个用户所在角色可访问的全部路由
        store.dispatch('GetRouter', {}).then((resp) => {
          asyncRouter.push(...resp)
          go(to, next)
        }).catch(async () => {
          // notification.error({
          //   message: 'Request failed, please try again'
          // })
          await store.dispatch('SignIn',{
            username: 'admin',
            password: 'streamx'
          })
          location.reload()
          NProgress.done()
          // store.dispatch('SignOut').then(() => { 
          //   const redirect=to.name=='signin'?{}:{
          //     redirect:to.fullPath
          //   }
          //   //正常跳转登录
          //   next({ path: '/user/signin', query: { ...redirect } })
            
          // })
        })
      }
    } else {
      next()
    }
  } else {
    console.log(to)
    store.dispatch('SignIn',{
      username: 'admin',
      password: 'streamx'
    }).then(()=>{
      location.reload()  
    })
    NProgress.done()
    // if (whiteList.includes(to.name)) {
    //   next()
    // } else {
    //   const redirect=to.name=='signin'?{}:{
    //     redirect:to.fullPath
    //   }
    //   next({ name: 'signin', query: { ...redirect } })
    //   
    // }
  }
})

router.afterEach(() => {
  NProgress.done() // finish progress bar
})

function go (to, next) {
  asyncRouter = buildRouter(asyncRouter)
  router.addRoutes(asyncRouter)
  next({ ...to, replace: true })
}

function buildRouter (routes) {
  if( process.env.NODE_VIEW=='empty'){
    themeUtil.changeThemeColor(null, 'dark').then(()=>{})
  }
  return routes.filter((route) => {
    if (route.path === '/') {
      route.redirect = '/flink/app'
    }
    if (route.component) {
      switch (route.component) {
        case 'BasicView':
          route.component = process.env.NODE_VIEW=='empty'?EmptyView:BasicView
          break
        case 'RouteView':
          route.component = RouteView
          break
        case 'EmptyView':
          route.component = EmptyView
          break
        case 'PageView':
          route.component = PageView
          break
        default:
          route.component = resolveView(route.component)
      }
      if (route.children && route.children.length) {
        route.children = buildRouter(route.children)
      }
      return true
    }
  })
}

function resolveView (path) {
  return function (resolve) {
    import(`@/views/${path}.vue`).then(x => resolve(x))
  }
}

export default router
