import Vuex from 'vuex'
import { createLocalVue } from '@vue/test-utils'
import cloneDeep from 'lodash.clonedeep'
import * as langStore from '@/store/lang'
import { isObject } from '@/utils/object'

const localVue = createLocalVue()
localVue.use(Vuex)

beforeAll(() => {
  process.env.appLocale = 'en'
})

describe('lang', () => {
  let store

  // mockのVueインスタンスを生成
  beforeEach(() => {
    store = new Vuex.Store(cloneDeep(langStore))
  })

  describe('state', () => {
    it('localesがオブジェクト型である', () => {
      expect(isObject(store.getters.locales)).toBeTruthy()
    })
  })

  describe('actions', () => {
    describe('setLocale', () => {
      it('stateとcookieが更新されるか', () => {
        expect(store.getters.locale).toBe('en')

        store.dispatch('setLocale', { locale: 'ja' })

        expect(store.getters.locale).toBe('ja')
      })
    })
  })
})
