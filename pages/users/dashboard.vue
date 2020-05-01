<template>
  <dashboard-template :data="data" :user="user" />
</template>

<script>
import axios from 'axios'
const DashboardTemplate = () =>
  import('@/components/templates/users/DashboardTemplate')

export default {
  middleware: 'auth',

  components: {
    DashboardTemplate
  },

  computed: {
    user() {
      return this.$store.getters['auth/user']
    }
  },

  async asyncData() {
    const { data } = await axios.get('users/storage', {
      params: {
        per_page: 10
      }
    })

    return { success: true, data }
  }
}
</script>
