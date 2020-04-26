<template>
  <div>
    <navbar />

    <div class="pt-2 pt-sm-4">
      <pages-storages-storageid :storage="storage" :user="user" />

      <!-- other work -->
      <v-container>
        <other-storage-list :user-name="user.name" :storages="storages" />
      </v-container>
    </div>
  </div>
</template>

<script>
const Navbar = () => import('@/components/organisms/navbar/DefaultNavbar')
const PagesStoragesStorageid = () =>
  import('@/components/templates/pages/PagesStoragesStorageid')
const OtherStorageList = () =>
  import('@/components/organisms/list/OtherStorageList')

export default {
  components: {
    Navbar,
    PagesStoragesStorageid,
    OtherStorageList
  },

  computed: {
    storage() {
      return this.$store.getters['page/storage']
    },

    storages() {
      const storages = this.$store.getters['page/storages']
      if (storages.length === 0) {
        return []
      }

      return storages.filter((obj) => {
        return obj.storage_id !== this.$route.params.storageId
      })
    },

    user() {
      return this.$store.getters['page/user']
    }
  },

  async fetch({ store, params, query, error }) {
    try {
      if (query.data) {
        await store.dispatch('page/fetchUserFromAllStorages', params.user)
        await store.dispatch(
          'page/fetchStorageFromAllStorages',
          params.storageId
        )
      } else {
        await store.dispatch('page/fetchUser', params.user)
        await store.dispatch('page/fetchStorage', params.storageId)
      }
    } catch (e) {
      return error({
        statusCode: 404,
        message: 'Page Not Found'
      })
    }
  },

  async mounted() {
    await this.$store.dispatch('page/fetchStorages')
  }
}
</script>
