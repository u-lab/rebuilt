import * as objectFunc from '@/utils/object'

describe('utils/object', () => {
  describe('isObject', () => {
    it('オブジェクト型である(正常系)', () => {
      expect(objectFunc.isObject({})).toBeTruthy()
      expect(objectFunc.isObject({ key: 'hoge' })).toBeTruthy()
      expect(
        objectFunc.isObject({ key: 'hoge', hoge: { foo: 'bar' } })
      ).toBeTruthy()
      expect(
        objectFunc.isObject({ key: 'hoge', hoge: ['foo', 'bar'] })
      ).toBeTruthy()
    })
  })
})
