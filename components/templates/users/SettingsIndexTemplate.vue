<template>
  <v-container>
    <user-title-text :title="$t('settings')" />

    <user-settings-index-list />

    <div class="text-right mt-4">
      <v-btn @click.prevent="logout" v-text="$t('logout')" dark color="red" />
    </div>
  </v-container>
</template>

<script>
const UserTitleText = () => import('@/components/atoms/text/UserTitleText')
const UserSettingsIndexList = () =>
  import('@/components/organisms/list/UserSettingsIndexList')

export default {
  components: {
    UserTitleText,
    UserSettingsIndexList
  },

  methods: {
    async logout() {
      // Log out the user.
      await this.$store.dispatch('auth/logout')

      // Redirect to login.
      this.$router.push({ name: 'login' })
    }
  }
}
</script>
