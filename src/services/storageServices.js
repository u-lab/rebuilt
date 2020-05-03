import { unixTimeToDate } from '@/utils/date'

const RAND_LEN = 6
const TIMESTAMP_LEN = 10
const STORAGE_ID_LEN = TIMESTAMP_LEN + RAND_LEN

/**
 * 正しいStorageIDか調べる
 *
 * @param { String } id
 * @returns { Boolean }
 */
export const isStorageID = (id) => {
  // 適切な長さか調べる
  if (id.length !== STORAGE_ID_LEN) {
    return false
  }

  if (!new RegExp(/^([a-z0-9]{6})$/).test(id.slice(TIMESTAMP_LEN))) {
    return false
  }

  return unixTimeToDate(id.slice(0, TIMESTAMP_LEN)) < new Date()
}
