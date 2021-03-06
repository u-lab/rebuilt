import * as arrayFunc from '@/utils/array'

describe('utils/array', () => {
  describe('convertToArray', () => {
    it('配列型がそのままか(正常系)', () => {
      expect(arrayFunc.convertToArray(['aaa', 'bbb'])).toEqual(['aaa', 'bbb']) // 一般的な配列
      expect(arrayFunc.convertToArray(['aaa', 'bbb', ['ccc', 'ddd']])).toEqual([
        'aaa',
        'bbb',
        ['ccc', 'ddd']
      ]) // 一般的な連想配列配列
      expect(arrayFunc.convertToArray([])).toEqual([]) // 空の配列
    })

    it('配列以外の型が配列になるか(正常系)', () => {
      expect(arrayFunc.convertToArray(null)).toEqual([]) // 一般的な数字
      expect(arrayFunc.convertToArray(0)).toEqual([0]) // 一般的な数字
      expect(arrayFunc.convertToArray(1)).toEqual([1]) // 一般的な数字
      expect(arrayFunc.convertToArray(true)).toEqual([true]) // bool型
      expect(arrayFunc.convertToArray('aiueo')).toEqual(['aiueo']) // 一般的な文字列
      expect(arrayFunc.convertToArray({})).toEqual([{}]) // 空のオブジェクト
      expect(
        arrayFunc.convertToArray({
          a: 'aa',
          b: ['hoge', 'foo']
        })
      ).toEqual([{ a: 'aa', b: ['hoge', 'foo'] }]) // 一般的なオブジェクト
      expect(arrayFunc.convertToArray('')).toEqual(['']) // 空の文字列
    })
  })

  describe('isArray', () => {
    it('配列がtrueか(正常系)', () => {
      expect(arrayFunc.isArray(['aaa', 'bbb'])).toBeTruthy() // 一般的な配列
      expect(arrayFunc.isArray(['aaa', 'bbb', ['ccc', 'ddd']])).toBeTruthy() // 一般的な連想配列配列
      expect(arrayFunc.isArray([])).toBeTruthy() // 空の配列
    })

    it('配列以外の型がfalseか(異常系)', () => {
      expect(arrayFunc.isArray(0)).toBeFalsy() // 一般的な数字
      expect(arrayFunc.isArray(1)).toBeFalsy() // 一般的な数字
      expect(arrayFunc.isArray(true)).toBeFalsy() // bool型
      expect(arrayFunc.isArray('aiueo')).toBeFalsy() // 一般的な文字列
      expect(arrayFunc.isArray({})).toBeFalsy() // 空のオブジェクト
      expect(
        arrayFunc.isArray({
          a: 'aa',
          b: ['hoge', 'foo']
        })
      ).toBeFalsy() // 一般的なオブジェクト
      expect(arrayFunc.isArray('')).toBeFalsy() // 空の文字列
    })
  })

  describe('uniq', () => {
    it('重複を削除できたか', () => {
      expect(arrayFunc.uniq([1, 2, 1, 4, 1, 3])).toEqual([1, 2, 4, 3])
      expect(
        arrayFunc.uniq(
          [
            { key: 1, name: 'foo' },
            { key: 2, name: 'goo' },
            { key: 1, name: 'foo' },
            { key: 4, name: 'foo' },
            { key: 1, name: 'foo' },
            { key: 3, name: 'hoge' }
          ],
          'key'
        )
      ).toEqual([
        { key: 1, name: 'foo' },
        { key: 2, name: 'goo' },
        { key: 4, name: 'foo' },
        { key: 3, name: 'hoge' }
      ])

      expect(
        arrayFunc.uniq(
          [
            { key: 1, name: 'foo' },
            { key: 2, name: 'goo' },
            { key: 1, name: 'foo' },
            { key: 4, name: 'foo' },
            { key: 1, name: 'bar' },
            { key: 3, name: 'hoge' }
          ],
          'name'
        )
      ).toEqual([
        { key: 1, name: 'foo' },
        { key: 2, name: 'goo' },
        { key: 1, name: 'bar' },
        { key: 3, name: 'hoge' }
      ])
    })

    it('引数が配列でないとき、空の配列が返ってくるか', () => {
      expect(arrayFunc.uniq('hoge')).toStrictEqual([]) // 文字列型
      expect(arrayFunc.uniq({ name: 'hoge' })).toStrictEqual([]) // object型
    })
  })
})
