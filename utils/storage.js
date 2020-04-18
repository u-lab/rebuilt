/**
 * storageIdによってstorageを取得
 *
 * @param { Array } storages
 * @param { String } storageId
 * @returns { Object|undefined }
 */
export const getStorageByStorageId = (arr, storageId) =>
  arr.find((i) => i.storage_id === storageId)

/**
 * userとstorageIdによってstorageを取得
 *
 * @param { Array } storages
 * @param { String } user
 * @param { String } storageId
 * @returns { Object|undefined }
 */
export const getStorageByUserAndStorageId = (arr, user, storageId) =>
  arr.find((i) => i.user.name === user && i.data.storage_id === storageId)

export const getUserFromAllStorages = (arr, user) =>
  arr.find((i) => i.user.name === user)
