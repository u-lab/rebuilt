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
