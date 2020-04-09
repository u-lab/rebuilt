<template>
  <v-app-bar app clipped-left fixed dark dense color="grey darken-4">
    <v-app-bar-nav-icon @click.stop="drawerEvent()" />

    <v-toolbar-title>
      <nuxt-link
        :to="{ name: user ? 'users.dashboard' : 'welcome' }"
        class="user-navbar-title"
      >
        {{ appName }}
      </nuxt-link>
    </v-toolbar-title>

    <v-spacer />

    <v-btn
      :to="{ name: 'users.storages.index' }"
      v-text="$t('look_at_the_storage')"
      dark
      large
      class="d-none d-md-flex"
    />

    <v-btn
      :to="{ name: 'users.storages.create' }"
      v-text="$t('add_new_work')"
      dark
      large
      class="d-none d-md-flex"
    />

    <locale-dropdown dark color="grey darken-4" />

    <!-- auth -->
    <template v-if="user">
      <user-navbar-menu />
    </template>
  </v-app-bar>
</template>

<script>
import { mapGetters } from 'vuex'
import LocaleDropdown from '@/components/organisms/dropdown/LocaleDropdown'
import UserNavbarMenu from '@/components/organisms/menu/UserNavbarMenu'

export default {
  components: {
    LocaleDropdown,
    UserNavbarMenu
  },

  data: () => ({
    appName: process.env.appName,
    drawer: false
  }),

  computed: mapGetters({
    user: 'auth/user'
  }),

  methods: {
    drawerEvent() {
      this.drawer = !this.drawer
      this.$emit('drawer', this.drawer)
    }
  }
}
</script>
