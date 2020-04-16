import { getType } from '@/utils/helper'

/**
 * String型であるか
 *
 * @param {*} v
 * @returns { Boolean }
 */
export const isString = (v) => getType(v) === 'string'
