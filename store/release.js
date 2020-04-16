import axios from 'axios'
import { convertToRelease } from '@/utils/release'

// state
export const state = () => ({
  releases: []
})

// getters
export const getters = {
  releases: (state) => state.releases,
  releasesCheck: (state) => state.releases.length !== 0
}

// mutations
export const mutations = {
  SET_RELEASES(state, { releases }) {
    state.releases = releases
  }
}

// actions
export const actions = {
  async fetchReleases({ commit, getters }) {
    if (!getters.releasesCheck) {
      const releases = []

      try {
        const { data } = await axios.get('/release')

        for (const r of data.data) {
          releases.push(convertToRelease(r.id, r.release_name, r.release_level))
        }
      } catch (e) {}

      commit('SET_RELEASES', { releases })
    }
  }
}
