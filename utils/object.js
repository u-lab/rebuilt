import { getType } from '@/utils/helper'

/**
 * object型かどうか
 *
 * @param {*} v
 * @returns { Boolean }
 */
export const isObject = (v) => getType(v) === 'object'
