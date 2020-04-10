import * as storageFunc from '@/utils/storage'

describe('utils/storage', () => {
  describe('getStorageByStorageId', () => {
    it('指定したstorage_idのデータを取得できるか', () => {
      const storages = [
        { user_id: 1, storage_id: '1581315433ra05d0' },
        {
          user_id: 1,
          storage_id: '1586415933mus3lf'
        },
        {
          user_id: 1,
          storage_id: '1586415933m924xz'
        }
      ]

      expect(
        storageFunc.getStorageByStorageId(storages, '1586415933mus3lf')
      ).toEqual({
        user_id: 1,
        storage_id: '1586415933mus3lf'
      })
    })
  })
})
