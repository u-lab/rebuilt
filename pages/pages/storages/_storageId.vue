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
import Navbar from '@/components/organisms/navbar/DefaultNavbar'
import PagesStoragesStorageid from '@/components/templates/pages/PagesStoragesStorageid'
import OtherStorageList from '@/components/organisms/list/OtherStorageList'

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
      return this.$store.getters['page/storages']
    },

    user() {
      return this.$store.getters['page/user']
    }
  },

  async fetch({ store, params, error }) {
    try {
      await store.dispatch('page/fetchUser', params.user)
      await store.dispatch('page/fetchStorage', params.storageId)
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
