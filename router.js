import Vue from 'vue'
import Router from 'vue-router'
import { scrollBehavior } from '~/utils'

Vue.use(Router)

const page = (path) => () =>
  import(`~/pages/${path}`).then((m) => m.default || m)
const pageUsers = (path) => () =>
  import(`~/pages/users/${path}`).then((m) => m.default || m)

const routes = [
  // Home
  { path: '/', name: 'welcome', component: page('welcome.vue') },
  // 個人ページ
  {
    path: '/pages/:user',
    name: 'pages.user',
    component: page('pages/_user.vue')
  },
  // 作品ページ
  {
    path: '/pages/:user/storages/:storageId',
    name: 'pages.storages.show',
    component: page('pages/storages/_storageId.vue')
  },
  // 作品一覧
  {
    path: '/storages',
    name: 'users.storages',
    component: pageUsers('lists/storages.vue')
  },

  // ダッシュボード
  {
    path: '/users/dashboard',
    name: 'users.dashboard',
    component: pageUsers('dashboard.vue')
  },
  // 自分のポートフォリオ
  {
    path: '/users/page',
    name: 'users.page.index',
    component: pageUsers('page/index.vue')
  },
  // 自分のポートフォリオ編集
  {
    path: '/users/page/edit',
    name: 'users.page.edit',
    component: pageUsers('page/edit.vue')
  },
  // 自分の作品一覧
  {
    path: '/users/storages',
    name: 'users.storages.index',
    component: pageUsers('storages/index.vue')
  },
  // 作品追加
  {
    path: '/users/storages/create',
    name: 'users.storages.create',
    component: pageUsers('storages/create.vue')
  },
  // 作品編集
  {
    path: '/users/storages/:storageId/edit',
    name: 'users.storages.edit',
    component: pageUsers('storages/edit.vue')
  },

  // 設定
  {
    path: '/users/settings',
    name: 'users.settings.index',
    component: pageUsers('settings/index.vue')
  },
  // パスワードの変更
  {
    path: '/users/settings/password',
    name: 'users.settings.password',
    component: pageUsers('settings/password.vue')
  },
  // ユーザー名を変更する
  {
    path: '/users/settings/username',
    name: 'users.settings.username',
    component: pageUsers('settings/username.vue')
  },
  // メールアドレスを変更する
  {
    path: '/users/settings/email',
    name: 'users.settings.email',
    component: pageUsers('settings/email.vue')
  },
  {
    path: '/users/settings/success',
    name: 'users.settings.success',
    component: pageUsers('settings/success.vue')
  },

  // アカウントを削除する
  {
    path: '/users/settings/deactivate',
    name: 'users.settings.deactivate',
    component: pageUsers('settings/deactivate.vue')
  },

  { path: '/login', name: 'login', component: page('auth/login.vue') },
  { path: '/register', name: 'register', component: page('auth/register.vue') },
  {
    path: '/password/reset',
    name: 'password.request',
    component: page('auth/password/email.vue')
  },
  {
    path: '/password/reset/success',
    name: 'password.reset.success',
    component: page('auth/password/success.vue')
  },
  {
    path: '/password/reset/:token',
    name: 'password.reset',
    component: page('auth/password/reset.vue')
  },
  {
    path: '/email/verify/:id',
    name: 'verification.verify',
    component: page('auth/verification/verify.vue')
  },
  {
    path: '/email/resend',
    name: 'verification.resend',
    component: page('auth/verification/resend.vue')
  }
]

export function createRouter() {
  return new Router({
    routes,
    scrollBehavior,
    mode: 'history'
  })
}
