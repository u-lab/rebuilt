<template>
  <v-app-bar app clipped-left fixed dark dense color="grey darken-4">
    <v-app-bar-nav-icon @click.stop="onDrawer()" />

    <v-toolbar-title>
      <nuxt-link
        :to="{ name: 'users.dashboard' }"
        v-text="siteTitle"
        class="user-navbar-title"
      />
    </v-toolbar-title>

    <v-spacer />

    <v-toolbar-items>
      <v-btn
        :to="{ name: 'users.storages.index' }"
        v-text="$t('look_at_the_storage')"
        dark
        class="d-none d-md-flex"
      />

      <v-btn
        :to="{ name: 'users.storages.create' }"
        v-text="$t('add_new_work')"
        dark
        class="d-none d-md-flex"
      />

      <locale-dropdown dark color="grey darken-4" />

      <user-navbar-menu />
    </v-toolbar-items>
  </v-app-bar>
</template>

<script>
import LocaleDropdown from '@/components/organisms/dropdown/LocaleDropdown'
import UserNavbarMenu from '@/components/organisms/menu/UserNavbarMenu'

export default {
  components: {
    LocaleDropdown,
    UserNavbarMenu
  },

  data: () => ({
    drawer: false
  }),

  computed: {
    siteTitle() {
      return process.env.appName
    },

    user() {
      return this.$store.getters['auth/user']
    }
  },

  methods: {
    onDrawer() {
      this.drawer = !this.drawer
      this.$emit('drawer', this.drawer)
    }
  }
}
</script>

<style lang="scss" scoped>
.user-navbar-title {
  color: white;
  text-decoration: none;
}
</style>
