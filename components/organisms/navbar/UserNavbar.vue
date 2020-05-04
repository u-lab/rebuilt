<template>
  <v-app-bar app clipped-left fixed dark dense color="grey darken-4">
    <v-app-bar-nav-icon @click.stop="onDrawer()" />

    <v-toolbar-title>
      <nuxt-link
        :to="{ name: 'users.dashboard' }"
        v-text="siteTitle"
        class="text--white text-decoration-none"
      />
    </v-toolbar-title>

    <v-spacer />

    <v-toolbar-items>
      <client-only>
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
      </client-only>

      <user-navbar-menu />
    </v-toolbar-items>
  </v-app-bar>
</template>

<script>
import UserNavbarMenu from '@/components/organisms/menu/UserNavbarMenu'

export default {
  components: {
    UserNavbarMenu
  },

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
      this.$emit('drawer')
    }
  }
}
</script>
