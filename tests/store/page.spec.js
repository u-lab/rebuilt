import axios from 'axios'
import Vuex from 'vuex'
import { createLocalVue } from '@vue/test-utils'
import cloneDeep from 'lodash.clonedeep'
import * as pageStore from '@/store/page'

const localVue = createLocalVue()
localVue.use(Vuex)

// axiosのmock
let mockAxiosGetResult // Axiosで発生させる戻り値
let mockAxiosError = false // Errorを発生させるかどうか
jest.mock('axios', () => ({
  get: jest.fn(() => {
    if (mockAxiosError) {
      return Promise.reject(mockAxiosGetResult)
    }

    return Promise.resolve(mockAxiosGetResult)
  }),

  post: jest.fn(() => {
    if (mockAxiosError) {
      return Promise.reject(mockAxiosGetResult)
    }

    return Promise.resolve(mockAxiosGetResult)
  })
}))

describe('store/page', () => {
  let store

  // mockのVueインスタンスを生成
  beforeEach(async () => {
    store = new Vuex.Store(cloneDeep(pageStore))
    mockAxiosError = false // テストをする前に、falseに戻す。
    await store.dispatch('clearAllData', { name: 'admin', force: true }) // stateをリセットする
  })

  describe('actions', () => {
    describe('fetchUser', () => {
      it('ユーザーを取得しstateを更新できるか(正常系)', async () => {
        mockAxiosGetResult = {
          data: {
            data: {
              id: 1,
              name: 'admin'
            }
          }
        }

        expect(store.getters.user).toBeNull() // 初期値の確認

        await store.dispatch('fetchUser', 'admin')

        expect(store.getters.user).toEqual({ id: 1, name: 'admin' })
        expect(store.getters.checkUser).toBeTruthy()
      })
    })

    describe('fetchStorage', () => {
      describe('正常系', () => {
        // userの注入
        beforeEach(async () => {
          mockAxiosGetResult = {
            data: {
              data: {
                id: 1,
                name: 'admin'
              }
            }
          }
          await store.dispatch('fetchUser', 'admin')
        })

        it('storageが取得できるか', async () => {
          // 初期値の確認
          expect(store.getters.checkStoreage).toBeFalsy()

          mockAxiosGetResult = {
            data: {
              data: {
                user_id: 1,
                storage_id: '1581315433ra05d0'
              }
            }
          }
          await store.dispatch('fetchStorage', '1581315433ra05d0')

          // stateが更新されたか確認
          expect(store.getters.checkStorages).toBeTruthy()
          expect(store.getters.storages).toHaveLength(1)
          expect(store.getters.storages).toEqual([
            { user_id: 1, storage_id: '1581315433ra05d0' }
          ])
          expect(store.getters.storage).toEqual({
            user_id: 1,
            storage_id: '1581315433ra05d0'
          })
        })

        it('stateにデータがあるとき、state内のstorageを取得できるか(正常系)', async () => {
          // 初期値を作り、初期値の確認
          store.commit('SET_STORAGE', {
            user_id: 1,
            storage_id: '1581315433ra05d0'
          })
          expect(store.getters.checkStorages).toBeTruthy()
          expect(store.getters.storages).toHaveLength(1)
          expect(store.getters.storages).toEqual([
            { user_id: 1, storage_id: '1581315433ra05d0' }
          ])

          await store.dispatch('fetchStorage', '1581315433ra05d0')

          expect(store.getters.checkStorages).toBeTruthy()
          expect(store.getters.storages).toHaveLength(1)
          expect(store.getters.storages).toEqual([
            { user_id: 1, storage_id: '1581315433ra05d0' }
          ])
          expect(store.getters.storage).toEqual({
            user_id: 1,
            storage_id: '1581315433ra05d0'
          })
          // TODO: axiosがcallされてないことをテストしたい
        })

        it('stateにデータがあるとき、state内に必要なデータがないとき、apiからstorageを取得しているか(正常系)', async () => {
          // 初期値を作り、初期値の確認
          store.commit('SET_STORAGE', {
            user_id: 1,
            storage_id: '1581315433ra05d0'
          })
          expect(store.getters.checkStorages).toBeTruthy()
          expect(store.getters.storages).toHaveLength(1)
          expect(store.getters.storages).toEqual([
            { user_id: 1, storage_id: '1581315433ra05d0' }
          ])
          expect(store.getters.storage).toEqual({
            user_id: 1,
            storage_id: '1581315433ra05d0'
          })

          mockAxiosGetResult = {
            data: {
              data: {
                user_id: 1,
                storage_id: '1586415933mus3lf'
              }
            }
          }
          await store.dispatch('fetchStorage', '1586415933mus3lf')

          expect(store.getters.checkStorages).toBeTruthy()
          expect(store.getters.storages).toHaveLength(2)
          expect(store.getters.storages).toEqual([
            { user_id: 1, storage_id: '1581315433ra05d0' },
            { user_id: 1, storage_id: '1586415933mus3lf' }
          ])
          expect(store.getters.storage).toEqual({
            user_id: 1,
            storage_id: '1586415933mus3lf'
          })
        })
      })
    })

    describe('fetchStorages', () => {
      // userの注入
      beforeEach(async () => {
        mockAxiosGetResult = {
          data: {
            data: {
              id: 1,
              name: 'admin'
            }
          }
        }
        await store.dispatch('fetchUser', 'admin')
      })

      it('storagesが取得できるか', async () => {
        mockAxiosGetResult = {
          data: {
            data: [
              {
                user_id: 1,
                storage_id: '1581315433ra05d0'
              },
              {
                user_id: 1,
                storage_id: '1586415933mus3lf'
              },
              {
                user_id: 1,
                storage_id: '1586415933m924xz'
              }
            ],
            links: {
              first: 'http://localhost:8000/api/v1/pages/admin/storages?page=1',
              last: 'http://localhost:8000/api/v1/pages/admin/storages?page=1',
              prev: null,
              next: null
            }
          }
        }

        await store.dispatch('fetchStorages')
        expect(store.getters.storages).toHaveLength(3)
        expect(store.getters.storages).toEqual([
          {
            user_id: 1,
            storage_id: '1581315433ra05d0'
          },
          {
            user_id: 1,
            storage_id: '1586415933mus3lf'
          },
          {
            user_id: 1,
            storage_id: '1586415933m924xz'
          }
        ])
        expect(store.getters.storagesPageNext).toBeNull()
      })
    })
  })
})
