import axios from 'axios'
import { uniq } from '@/utils/array'
import { getStorageByStorageId } from '@/utils/storage'

// state
export const state = () => ({
  storages: null,
  storagesPageNext: null,
  user: null
})

// getters
export const getters = {
  checkStorages: (state) => state.storages !== null,
  checkUser: (state) => state.user !== null,
  storages: (state) => state.storages,
  storagesPageNext: (state) => state.storagesPageNext,
  user: (state) => state.user
}

// mutations
export const mutations = {
  CLEAR_ALL(state) {
    state.storages = null
    state.storagesPageNext = null
    state.user = null
  },

  CLEAR_STORAGES(state) {
    state.storages = null
  },

  CLEAR_USER(state) {
    state.user = null
  },

  PUSH_STORSGE(state, storage) {
    state.storages = [...state.storages, ...[storage]] // 配列のマージ
    state.storages = uniq(state.storages, 'storage_id') // 重複の削除
  },

  PUSH_STORSGES(state, storages) {
    state.storages = [...state.storages, ...storages] // 配列のマージ
    state.storages = uniq(state.storages, 'storage_id') // 重複の削除
  },

  SET_STORAGE(state, storage) {
    state.storages = [storage]
  },

  SET_STORAGES(state, storages) {
    state.storages = storages
  },

  SET_STORAGES_PAGE_NEXT(state, nextUrl) {
    state.storagesPageNext = nextUrl
  },

  SET_USER(state, user) {
    state.user = user
  }
}

// actions
export const actions = {
  /**
   * stateを空にする
   *
   * @param { String } name ユーザー名
   * @param { String } force 強制的に空にするか
   */
  clearAllData({ commit }, { name, force = false }) {
    if (name === undefined || getters.user.name !== name || force) {
      commit('CLEAR_ALL')
    }
  },

  /**
   * 更にユーザーデータを取得する
   */
  async fetchFurthermoreStorages({ getters, commit }) {
    if (getters.storagesPageNext) {
      try {
        const data = await axios.get(getters.storagesPageNext)
        commit('PUSH_STORSGES', data.data)
        commit('SET_STORAGES_PAGE_NEXT', data.links.next)
      } catch (e) {
        throw new Error('Page Not Found')
      }
    }
  },

  /**
   * ユーザーデータを取得する
   *
   * @param { String } name ユーザー名
   */
  async fetchUser({ getters, commit }, name) {
    // データが取得済みの場合はreturn
    if (getters.checkUser && getters.user.name === name) {
      return
    }

    try {
      const { data } = await axios.get(`pages/${name}`)

      commit('SET_USER', data)
    } catch (e) {
      throw new Error('Page Not Found')
    }
  },

  /**
   * 1つの作品を取得する
   *
   * @param { String } storageId
   */
  async fetchStorage({ getters, commit }, storageId) {
    // stateにデータがあったらそのデータを返す
    if (getters.checkStorages) {
      const storage = getStorageByStorageId(getters.storages, storageId)

      if (storage !== undefined) {
        return storage
      }
    }

    const user = getters.user
    if (user === null) {
      throw new Error('fetchUserを先に使用してください')
    }

    try {
      const { data } = await axios.get(
        `pages/${user.name}/storages/${storageId}`
      )

      if (getters.checkStorages) {
        commit('PUSH_STORSGE', data) // すでにデータがある場合はPush
      } else {
        commit('SET_STORAGE', data)
      }
      return data
    } catch (e) {
      throw new Error('Page Not Found')
    }
  },

  /**
   * 複数の作品を取得する
   */
  async fetchStorages({ getters, commit }) {
    if (getters.checkStorages) {
      return
    }

    const user = getters.user
    if (user === null) {
      throw new Error('fetchUserを先に使用してください')
    }

    try {
      const { data, links } = await axios.get(`pages/${user.name}/storages`)

      if (getters.checkStorages) {
        commit('PUSH_STORAGES', data) // すでにデータがある場合はPush
      } else {
        commit('SET_STORAGES', data)
      }
      commit('SET_STORAGES_PAGE_NEXT', links.next)
    } catch (e) {
      throw new Error('Page Not Found')
    }
  }
}
