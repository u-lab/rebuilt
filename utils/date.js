import { getType } from '@/utils/helper'

/**
 * Date型に変換
 *
 * @param {*} v
 * @returns { Date|null }
 */
export const convertToDate = (v) => {
  if (!v) {
    return null
  }

  if (isDate(v)) {
    return v
  }

  return new Date(v)
}

/**
 * 日付のフォーマットをする
 *
 * @params { Date } date 日付
 * @parmas { String } format 書式フォーマット
 * @returns { String }
 */
export const formatDate = (date, format = 'yyyy-MM-dd') => {
  if (!isDate(date)) {
    return null
  }

  format = format.replace(/yyyy/g, date.getFullYear())
  format = format.replace(/MM/g, ('0' + (date.getMonth() + 1)).slice(-2))
  format = format.replace(/dd/g, ('0' + date.getDate()).slice(-2))
  format = format.replace(/HH/g, ('0' + date.getHours()).slice(-2))
  format = format.replace(/mm/g, ('0' + date.getMinutes()).slice(-2))
  format = format.replace(/ss/g, ('0' + date.getSeconds()).slice(-2))
  format = format.replace(/SSS/g, ('00' + date.getMilliseconds()).slice(-3))
  return format
}

/**
 * 日付型かどうか
 *
 * @param {*} v
 * @returns Boolean
 */
export const isDate = (v) => getType(v) === 'date'
