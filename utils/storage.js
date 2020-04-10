/**
 * storageIdによってstorageを取得
 *
 * @param { Array } storages
 * @param { String } storageId
 * @returns { Object|undefined }
 */
export const getStorageByStorageId = (arr, storageId) =>
  arr.find((i) => i.storage_id === storageId)
