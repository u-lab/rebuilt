<template>
  <settings-deactivate-template :user="user" @click="deactivated" />
</template>

<script>
const SettingsDeactivateTemplate = () =>
  import('@/components/templates/users/SettingsDeactivateTemplate')

export default {
  components: {
    SettingsDeactivateTemplate
  },

  middleware: 'auth',

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

      this.$router.push({ name: 'welcome' })
    }
  }
}
</script>
