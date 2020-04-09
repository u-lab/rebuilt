import { isObject } from '@/utils/object'

/**
 * image型に変換
 *
 * @param {*} v
 * @returns { Object }
 */
export const convertToImage = (v) => (isImageType(v) ? v : newImage)

/**
 * サムネイルサイズの画像を取得
 *
 * @param {*} image
 * @returns { String }
 */
export const getThumbnailUrl = (image) => {
  image = convertToImage(image)
  return image.url_160 || image.url_320 || image.url
}

/**
 * 中サイズの画像を取得
 *
 * @param {*} image
 * @returns { String }
 */
export const getMediumUrl = (image) => {
  image = convertToImage(image)
  return image.url_640 || image.url_1024 || image.url
}

/**
 * 大サイズの画像を取得
 *
 * @param {*} image
 * @returns { String }
 */
export const getLargeUrl = (image) => {
  image = convertToImage(image)
  return image.url_640 || image.url_1024 || image.url
}

/**
 * image型かどうか
 *
 * @param {*} v
 * @returns { Boolean }
 */
export const isImageType = (v) => isObject(v) && 'url' in v && 'id' in v

/**
 * 空のimage型を生成
 */
export const newImage = {
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
