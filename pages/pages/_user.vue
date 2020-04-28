<template>
  <div>
    <navbar />

    <div class="pt-2 pt-sm-4">
      <pages-user v-if="user && storages" :user="user" :storages="storages" />
    </div>
  </div>
</template>

<script>
const PagesUser = () => import('@/components/templates/pages/PagesUser')
const Navbar = () => import('@/components/organisms/navbar/DefaultNavbar')

export default {
  components: {
    Navbar,
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

  async fetch({ store, params, query, error }) {
    try {
      if (query.data) {
        await store.dispatch('page/fetchUserFromAllStorages', params.user)
      }

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
