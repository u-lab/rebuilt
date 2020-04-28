import axios from 'axios'
import { uniq } from '@/utils/array'
import {
  getStorageByStorageId,
  getStorageByUserAndStorageId,
  getUserFromAllStorages
} from '@/utils/storage'

// state
export const state = () => ({
  storage: null,
  storages: null,
  storagesPageNext: null,
  allStorages: [],
  allStoragesPageNext: null,
  user: null
})

// getters
export const getters = {
  checkStorages: (state) => state.storages !== null,
  checkUser: (state) => state.user !== null,
  storage: (state) => state.storage,
  storages: (state) => state.storages,
  storagesPageNext: (state) => state.storagesPageNext,
  checkAllStorages: (state) => state.allStorages.length !== 0,
  allStorages: (state) => state.allStorages,
  allStoragesPageNext: (state) => state.allStoragesPageNext,
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

  PUSH_STORAGE(state, storage) {
    state.storage = storage
    state.storages = [...state.storages, ...[storage]] // 配列のマージ
    state.storages = uniq(state.storages, 'storage_id') // 重複の削除
  },

  PUSH_STORAGES(state, storages) {
    state.storages = [...state.storages, ...storages] // 配列のマージ
    state.storages = uniq(state.storages, 'storage_id') // 重複の削除
  },

  PUSH_ALLSTORAGES(state, storages) {
    state.allStorages = [...state.allStorages, ...storages] // 配列のマージ
    state.allStorages = uniq(state.allStorages, 'storage_id') // 重複の削除
  },

  SET_ALLSTORAGES(state, storages) {
    state.allStorages = storages
  },

  SET_ALLSTORAGES_PAGE_NEXT(state, nextUrl) {
    state.allStoragesPageNext = nextUrl
  },

  SET_STORAGE(state, storage) {
    state.storage = storage
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
  clearAllData({ getters, commit }, { name, force = false }) {
    if (force || getters.user.name !== name) {
      commit('CLEAR_ALL')
    }
  },

  /**
   * 更にユーザーデータを取得する
   */
  async fetchFurthermoreStorages({ getters, commit }) {
    if (getters.storagesPageNext) {
      try {
        const { data } = await axios.get(getters.storagesPageNext)
        commit('PUSH_STORAGESS', data.data)
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
    if (getters.checkUser) {
      if (getters.user.name === name) {
        return
      }
      commit('CLEAR_ALL') // state内を空にする
    }

    try {
      const { data } = await axios.get(`pages/${name}`)

      commit('SET_USER', data.data)
    } catch (e) {
      throw new Error('Page Not Found')
    }
  },

  /**
   * ユーザーデータを取得する
   *
   * @param { String } name ユーザー名
   */
  async fetchUserFromAllStorages({ getters, commit, dispatch }, name) {
    // データが取得済みの場合はreturn
    if (getters.checkUser) {
      if (getters.user.name === name) {
        return
      }
      commit('CLEAR_ALL') // state内を空にする
    }

    if (getters.checkAllStorages) {
      const storages = getters.allStorages
      const { user } = getUserFromAllStorages(storages, name)

      return commit('SET_USER', user)
    }

    await dispatch('fetchUser', name)
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
        return commit('PUSH_STORAGE', storage) // すでにデータがある場合はPush
      }
    }

    if (!getters.checkUser) {
      throw new Error('fetchUserを先に使用してください')
    }

    try {
      const user = getters.user
      const { data } = await axios.get(
        `pages/${user.name}/storages/${storageId}`
      )

      if (getters.checkStorages) {
        return commit('PUSH_STORAGE', data.data) // すでにデータがある場合はPush
      }
      return commit('SET_STORAGE', data.data)
    } catch (e) {
      throw new Error('Page Not Found')
    }
  },

  async fetchStorageFromAllStorages({ getters, commit, dispatch }, storageId) {
    if (getters.checkAllStorages) {
      const user = getters.user
      const storages = getters.allStorages
      const { data } = getStorageByUserAndStorageId(
        storages,
        user.name,
        storageId
      )

      if (data !== undefined) {
        return commit('SET_STORAGE', data)
      }
    }

    await dispatch('fetchStorage', storageId)
  },

  /**
   * 複数の作品を取得する
   */
  async fetchStorages({ getters, commit }) {
    if (getters.checkStorages && getters.storages.length > 1) {
      return
    }

    const user = getters.user
    if (user === null) {
      throw new Error('fetchUserを先に使用してください')
    }

    try {
      const { data } = await axios.get(`pages/${user.name}/storages`)

      if (getters.checkStorages) {
        commit('PUSH_STORAGES', data.data) // すでにデータがある場合はPush
      } else {
        commit('SET_STORAGES', data.data)
      }
      commit('SET_STORAGES_PAGE_NEXT', data.links.next)
    } catch (e) {
      throw new Error('Page Not Found')
    }
  },

  /**
   * 更にユーザーデータを取得する
   */
  async fetchFurthermoreAllStorages({ getters, commit }) {
    if (getters.storagesAllPageNext) {
      try {
        const { data } = await axios.get(getters.allStoragesPageNext)
        commit('PUSH_ALLSTORAGESS', data.data)
        commit('SET_ALLSTORAGES_PAGE_NEXT', data.links.next)
      } catch (e) {
        throw new Error('Page Not Found')
      }
    }
  },

  /**
   * 複数の作品を取得する
   */
  async fetchAllStorages({ getters, commit }) {
    if (getters.checkAllStorages) {
      return
    }

    try {
      const { data } = await axios.get(`storages`)

      commit('SET_ALLSTORAGES', data.data)
      commit('SET_ALLSTORAGES_PAGE_NEXT', data.links.next)
    } catch (e) {
      throw new Error('Page Not Found')
    }
  }
}
