import * as arrayFunc from '@/utils/array'

describe('utils/array', () => {
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
})
