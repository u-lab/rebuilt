import axios from 'axios'
import Cookies from 'js-cookie'

// state
export const state = () => ({
  user: null,
  token: null
})

// getters
export const getters = {
  user: (state) => state.user,
  token: (state) => state.token,
  check: (state) => state.user !== null
}

// mutations
export const mutations = {
  SET_TOKEN(state, token) {
    state.token = token
  },

  DEACTIVATED_USER(state) {
    state.user = null
    state.token = null
  },

  FETCH_USER_SUCCESS(state, user) {
    state.user = user
  },

  FETCH_USER_FAILURE(state) {
    state.token = null
  },

  LOGOUT(state) {
    state.user = null
    state.token = null
  },

  UPDATE_USER(state, { user }) {
    state.user = user
  }
}

// actions
export const actions = {
  // ユーザーの退会処理
  async deactivatedUser({ commit }) {
    try {
      await axios.delete('/users')
    } catch (e) {}

    Cookies.remove('token')

    commit('DEACTIVATED_USER')
  },

  // oauthのurlを取得
  async fetchOauthUrl(ctx, { provider }) {
    const { data } = await axios.post(`/oauth/${provider}`)

    return data.url
  },

  // ユーザーの取得
  async fetchUser({ commit }) {
    try {
      const { data } = await axios.get('/user')

      commit('FETCH_USER_SUCCESS', data)
    } catch (e) {
      Cookies.remove('token')

      commit('FETCH_USER_FAILURE')
    }
  },

  // ログアウトの処理
  async logout({ commit, dispatch }) {
    try {
      await axios.post('/logout')
    } catch (e) {}

    Cookies.remove('token')

    commit('LOGOUT')
    dispatch('storage/clearStorages', null, { root: true })
  },

  // tokenをセットする
  saveToken({ commit, dispatch }, { token, remember }) {
    commit('SET_TOKEN', token)

    Cookies.set('token', token, { expires: remember ? 365 : null })
  },

  updateUser({ commit }, payload) {
    commit('UPDATE_USER', payload)
  }
}
