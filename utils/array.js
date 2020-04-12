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

/**
 * 配列の重複を削除
 *
 * @param {Array} arr
 * @param {String} key
 * @returns {Array}
 * @see { @link https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_uniq }
 */
export const uniq = (arr, key = null) => {
  // 配列でない場合はからの配列にする
  if (!isArray(arr)) {
    return []
  }

  // [1,2,4,4]の重複を削除
  if (key === null) {
    return [...new Set(arr)]
  }

  // [Object]の重複を削除
  return arr.filter((v1, i, self) => {
    return (
      self.findIndex((v2) => {
        return v1[key] === v2[key]
      }) === i
    )
  })
}
