import Vue from 'vue'
import Router from 'vue-router'
import { scrollBehavior } from '~/utils'

Vue.use(Router)

const page = path => () => import(`~/pages/${path}`).then(m => m.default || m)
const pageUsers = path => () => import(`~/pages/users/${path}`).then(m => m.default || m)

const routes = [
  // Home
  { path: '/', name: 'welcome', component: page('welcome.vue') },
  // 個人ページ
  { path: '/pages/:user', name: 'pages.user', component: page('pages/_user.vue') },
  // 作品ページ一覧
  { path: '/pages/:user/storages', name: 'pages.storages.index', component: page('pages/storages/index.vue') },
  // 作品ページ
  { path: '/pages/:user/storages/:storageId', name: 'pages.storages.show', component: page('pages/storages/_storageId.vue') },
  // プロフィール一覧
  { path: '/profiles', name: 'users.profiles', component: pageUsers('lists/profiles.vue') },
  // 作品一覧
  { path: '/storages', name: 'users.storages', component: pageUsers('lists/storages.vue') },

  // ダッシュボード
  { path: '/users/dashboard', name: 'users.dashboard', component: pageUsers('dashboard.vue') },
  // 自分のプロフィール
  { path: '/users/profile', name: 'users.profile.index', component: pageUsers('profile/index.vue') },
  // プロフィール編集
  { path: '/users/profile/edit', name: 'users.profile.edit', component: pageUsers('profile/edit.vue') },
  // 自分のポートフォリオ
  { path: '/users/page', name: 'users.page.index', component: pageUsers('page/index.vue') },
  // 自分のポートフォリオ編集
  { path: '/users/page/edit', name: 'users.page.edit', component: pageUsers('page/edit.vue') },
  // 自分の作品一覧
  { path: '/users/storages', name: 'users.storages.index', component: pageUsers('storages/index.vue') },
  // 作品追加
  { path: '/users/storages/create', name: 'users.storages.create', component: pageUsers('storages/create.vue') },
  // 作品を見る
  { path: '/users/storages/:storageId', name: 'users.storages.edit', component: pageUsers('storages/show.vue') },
  // 作品編集
  { path: '/users/storages/:storageId/edit', name: 'users.storages.edit', component: pageUsers('storages/edit.vue') },

  { path: '/login', name: 'login', component: page('auth/login.vue') },
  { path: '/register', name: 'register', component: page('auth/register.vue') },
  { path: '/password/reset', name: 'password.request', component: page('auth/password/email.vue') },
  { path: '/password/reset/:token', name: 'password.reset', component: page('auth/password/reset.vue') },
  { path: '/email/verify/:id', name: 'verification.verify', component: page('auth/verification/verify.vue') },
  { path: '/email/resend', name: 'verification.resend', component: page('auth/verification/resend.vue') },

  { path: '/home', name: 'home', component: page('home.vue') },
  { path: '/settings',
    component: page('settings/index.vue'),
    children: [
      { path: '', redirect: { name: 'settings.profile' } },
      { path: 'profile', name: 'settings.profile', component: page('settings/profile.vue') },
      { path: 'password', name: 'settings.password', component: page('settings/password.vue') }
    ] }
]

export function createRouter () {
  return new Router({
    routes,
    scrollBehavior,
    mode: 'history'
  })
}
