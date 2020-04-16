import { isNumber } from '@/utils/number'
import { isString } from '@/utils/string'
import { isObject } from '@/utils/object'

/**
 * releaseのObjectを作る
 *
 * @param { Number } id
 * @param { String } name
 * @param { Number } level
 * @returns { Object }
 */
export const convertToRelease = (id, name, level) =>
  isNumber(id) && isNumber(level) && isString(name)
    ? { id, name, level }
    : { id: null, name: null, level: null }

/**
 * release型であるか
 *
 * @param {*} v
 * @returns { Object }
 */
export const isRelease = (v) =>
  isObject(v) &&
  'id' in v &&
  'name' in v &&
  'level' in v &&
  isNumber(v.id) &&
  isNumber(v.level) &&
  isString(v.name)
