import clonedeep from 'lodash.clonedeep'
import * as imageFunc from '@/utils/image'

describe('utils/image', () => {
  describe('convertToImage && isImageType', () => {
    it('image型は同じものが返ってくるか', () => {
      const image = {
        id: 'hogehoge',
        extension: 'png',
        title: null,
        url: 'https://example.com/hoge',
        url_80: null,
        url_160: null,
        url_320: null,
        url_640: null,
        url_1024: null,
        url_1280: null,
        url_1920: null,
        url_2580: null
      }
      expect(imageFunc.convertToImage(clonedeep(image))).toEqual(image)
    })

    it('image型以外は空のimage型であるか', () => {
      const expectImage = {
        id: null,
        extension: null,
        title: null,
        url: null,
        url_80: null,
        url_160: null,
        url_320: null,
        url_640: null,
        url_1024: null,
        url_1280: null,
        url_1920: null,
        url_2580: null
      }
      expect(imageFunc.convertToImage(null)).toEqual(expectImage)
      expect(imageFunc.convertToImage({})).toEqual(expectImage)
      expect(imageFunc.convertToImage({ id: 'id' })).toEqual(expectImage)
      expect(imageFunc.convertToImage(undefined)).toEqual(expectImage)
    })
  })
})
