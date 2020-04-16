<template>
  <div class="pt-2 pt-sm-4">
    <pages-user v-if="user && storages" :user="user" :storages="storages" />
  </div>
</template>

<script>
import PagesUser from '@/components/templates/pages/PagesUser'

export default {
  components: {
    PagesUser
  },

  computed: {
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
