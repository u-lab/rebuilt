<template>
  <v-container>
    <deactivate :user="user" @click="deactivated" />
  </v-container>
</template>

<script>
import Deactivate from '@/components/templates/users/settings/Deactivate'

export default {
  components: {
    Deactivate
  },

  middleware: 'auth',

  layout: 'user',

  computed: {
    user() {
      return this.$store.getters['auth/user']
    }
  },

  methods: {
    async deactivated() {
      try {
        await this.$store.dispatch('auth/deactivatedUser')
      } catch (e) {}

      this.$router.push('/')
    }
  }
}
</script>
