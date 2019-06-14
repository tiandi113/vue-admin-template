import { asyncRoutes, constantRoutes } from '@/router'
import { getUserMenu } from '@/api/user.js'

/**
 * determine if the current user has permission
 * @param userRoute 用户路由
 * @param route 前端路由
 */
function hasPermission(userRoute, route) {
  if (route.name) {
    return userRoute.findIndex(m => m.name === route.name) > -1
  } else {
    return false
  }
}

/**
 * Filter asynchronous routing tables by recursion
 * @param userRoutes 用户路由
 * @param routes asyncRoutes 前端路由
 * @param roles
 */
export function filterAsyncRoutes(userRoutes, routes, roles) {
  const res = []
  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(userRoutes, tmp)) {
      // 子级路由
      var childrenRoutes = userRoutes.find(m => m.name === tmp.name).children
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(childrenRoutes, tmp.children)
      }
      res.push(tmp)
    }
  })
  return res
}

const state = {
  routes: [],
  addRoutes: [],
  hasRoutes: false
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
    state.hasRoutes = true
  }
}

const actions = {
  generateRoutes({ commit }, userId) {
    return new Promise((resolve, reject) => {
      // 在这里获取人员的权限列表
      getUserMenu({ employeeCode: userId })
        .then(resData => {
          const userRouter = resData.data
          let accessedRoutes = filterAsyncRoutes(userRouter, asyncRoutes)
          accessedRoutes = accessedRoutes.length === 0 ? [{ path: '*', redirect: '/404', hidden: true }] : accessedRoutes
          commit('SET_ROUTES', accessedRoutes)
          resolve(accessedRoutes)
        }).catch(error => {
          reject(error)
        })

      // const accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
      // commit('SET_ROUTES', accessedRoutes)
      // resolve(accessedRoutes)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
