/**
 * 変数の型を調べる
 *
 * Nanの判定はこれでしないこと
 *
 * Number.isNaN(NaN)を使用すること
 *
 * @param {*} v
 * @returns { String }
 * @see { @link https://qiita.com/amamamaou/items/ef0b797156b324bb4ef3#objectprototypetostringcall-を使う }
 */
export const getType = (v) => {
  return Object.prototype.toString
    .call(v)
    .slice(8, -1)
    .toLowerCase()
}

export const isEmail = (v) => {
  const emailRegex = /(^$|^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$)/
  return emailRegex.test(v)
}
