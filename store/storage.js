import axios from 'axios'
import { uniq } from '@/utils/array'
import { getStorageByStorageId } from '@/utils/storage'

// state
export const state = () => ({
  storage: null,
  storages: [],
  storagesPageNext: null
})

// getters
export const getters = {
  storage: (state) => state.storage,
  storages: (state) => state.storages,
  storageCheck: (state) => state.storage !== null,
  storagesCheck: (state) => state.storages.length !== 0,
  storagesPageNext: (state) => state.storagesPageNext
}

// mutations
export const mutations = {
  PUSH_STORAGE(state, storage) {
    state.storage = storage
    state.storages = [...state.storages, ...[storage]] // 配列のマージ
    state.storages = uniq(state.storages, 'storage_id') // 重複の削除
  },

  PUSH_STORAGES(state, storages) {
    state.storages = [...state.storages, ...storages] // 配列のマージ
    state.storages = uniq(state.storages, 'storage_id') // 重複の削除
  },

  SET_STORAGE(state, storage) {
    state.storage = storage
  },

  SET_STORAGES(state, storages) {
    state.storages = storages
  },

  SET_STORAGES_PAGE_NEXT(state, nextUrl) {
    state.storagesPageNext = nextUrl
  }
}

// actions
export const actions = {
  async fetchStorage({ commit, getters }, storageId) {
    if (getters.storageCheck && getters.storage.storage_id === storageId) {
      return
    }

    if (getters.storagesCheck) {
      const storages = getters.storages
      const storage = getStorageByStorageId(storages, storageId)

      if (storage !== undefined) {
        return commit('SET_STORAGE', storage)
      }
    }

    try {
      const { data } = await axios.get(`/users/storage/${storageId}`)
      return commit('PUSH_STORAGE', data.data)
    } catch (e) {
      throw new Error('Page Not Found')
    }
  },

  async fetchStorages({ commit, getters }) {
    if (getters.storagesCheck) {
      return
    }

    try {
      const { data } = await axios.get('/users/storage')

      commit('SET_STORAGES', data.data)
      commit('SET_STORAGES_PAGE_NEXT', data.links.next)
    } catch (e) {
      throw new Error('Page Not Found')
    }
  }
}
