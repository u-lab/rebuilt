/**
 * 配列型に変える
 *
 * @param {*} v
 * @returns { Array }
 */
export const convertToArray = (v) => (v != null ? (isArray(v) ? v : [v]) : [])

/**
 * 配列型かどうか
 *
 * @param {*} v
 * @returns { Boolean }
 */
export const isArray = (v) => Array.isArray(v)
