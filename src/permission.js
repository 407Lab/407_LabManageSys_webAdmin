import router from './router'
import store from './store'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
// import { Message } from 'element-ui'
import { getToken } from '@/utils/auth' // getToken from cookie

NProgress.configure({ showSpinner: false }) // NProgress configuration

const LOGIN_PAGE_NAME = 'Login'

// 大概流程： 1. 在全局进行路由拦截。 -> 2. 判断是否获取了token

// const whiteList = ['/login'] // 不重定向白名单
// router.beforeEach((to, from, next) => {
//   NProgress.start()
//   if (getToken()) {
//     if (to.path === '/login') {
//       next({ path: '/' })
//       NProgress.done() // if current page is dashboard will not trigger	afterEach hook, so manually handle it
//     } else {
//       if (store.getters.roles.length === 0) {
//         store.dispatch('GetInfo').then(res => { // 拉取用户信息
//           next()
//         }).catch((err) => {
//           store.dispatch('FedLogOut').then(() => {
//             Message.error(err || 'Verification failed, please login again')
//             next({ path: '/' })
//           })
//         })
//       } else {
//         next()
//       }
//     }
//   } else {
//     if (whiteList.indexOf(to.path) !== -1) {
//       next()
//     } else {
//       next(`/login?redirect=${to.path}`) // 否则全部重定向到登录页
//       NProgress.done()
//     }
//   }
// })

router.afterEach(() => {
  // NProgress.done() // 结束Progress
  console.log('route 跳转结束')
})

router.beforeEach((to, from, next) => {
  const token = getToken()
  console.log('premission token', token)
  if (token) {
    if (to.name === LOGIN_PAGE_NAME) {
      next({ path: '/' })
    } else {
      if (store.getters.roles.length === 0) {
        store
          .dispatch('GetInfo')
          .then(res => {
            next()
          })
          .catch(err => {
            console.error(err)
            store.dispatch('FedLogOut').then(res => {
              next('/')
            })
          })
      } else {
        next()
      }
    }
  } else {
    if (to.name === LOGIN_PAGE_NAME) {
      next()
    } else {
      next({ name: LOGIN_PAGE_NAME })
    }
  }
})
