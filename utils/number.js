import { getType } from '@/utils/helper'

/**
 * Number型であるか
 *
 * @param {*} v
 * @returns { Boolean }
 */
export const isNumber = (v) => getType(v) === 'number'
