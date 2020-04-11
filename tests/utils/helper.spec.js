import * as HelperFunc from '@/utils/helper'

describe('utils/helper', () => {
  describe('getType', () => {
    it('正しい型が返ってくるか', () => {
      expect(HelperFunc.getType(undefined) === 'undefined').toBeTruthy()
      expect(HelperFunc.getType(null) === 'null').toBeTruthy()
      expect(HelperFunc.getType(true) === 'boolean').toBeTruthy()
      expect(HelperFunc.getType(false) === 'boolean').toBeTruthy()
      expect(HelperFunc.getType(['array']) === 'array').toBeTruthy()
      expect(HelperFunc.getType({ key: 'value' } === 'object')).toBeTruthy()
      expect(HelperFunc.getType(1234) === 'number').toBeTruthy()
      expect(HelperFunc.getType(NaN) === 'number').toBeTruthy()
      expect(HelperFunc.getType('abcd') === 'string').toBeTruthy()
      expect(HelperFunc.getType(function() {}) === 'function').toBeTruthy()
      expect(HelperFunc.getType(() => {}) === 'function').toBeTruthy()
      expect(
        HelperFunc.getType(function*() {}) === 'generatorfunction'
      ).toBeTruthy()
      expect(
        HelperFunc.getType(async function() {}) === 'asyncfunction'
      ).toBeTruthy()
      expect(
        HelperFunc.getType(new Promise(() => {})) === 'promise'
      ).toBeTruthy()
      expect(HelperFunc.getType(Symbol('hoge')) === 'symbol').toBeTruthy()
      expect(HelperFunc.getType(new Date()) === 'date').toBeTruthy()
      expect(
        HelperFunc.getType(new Date('2018/09/01 10:00')) === 'date'
      ).toBeTruthy()
      expect(HelperFunc.getType(new Map()) === 'map').toBeTruthy()
      expect(HelperFunc.getType(new Set()) === 'set').toBeTruthy()
    })
  })
})
