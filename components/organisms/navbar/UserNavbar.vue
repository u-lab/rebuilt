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
      dark
      large
      class="d-none d-md-flex"
    >
      作品を眺める
    </v-btn>

    <v-btn
      :to="{ name: 'users.storages.create' }"
      dark
      large
      class="d-none d-md-flex"
    >
      新規作品
    </v-btn>

    <locale-dropdown dark color="grey darken-4" />

    <!-- auth -->
    <template v-if="user">
      <v-menu bottom offset-y>
        <template v-slot:activator="{ on }">
          <v-btn v-on="on" icon>
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item :to="{ name: 'users.storages.index' }">
            <v-list-item-icon>
              <v-icon>mdi-book-open-variant</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title v-text="`作品を眺める`" />
            </v-list-item-content>
          </v-list-item>

          <v-list-item :to="{ name: 'users.storages.create' }">
            <v-list-item-icon>
              <v-icon>mdi-pencil</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title v-text="`新規作品`" />
            </v-list-item-content>
          </v-list-item>

          <!-- ログアウト -->
          <v-list-item @click.prevent="logout">
            <v-list-item-icon>
              <v-icon>mdi-account-off</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title v-text="$t('logout')" />
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-menu>
    </template>

    <!-- Guest -->
    <template v-else>
      <v-btn :to="{ name: 'login' }" text>
        {{ $t('login') }}
      </v-btn>

      <v-btn :to="{ name: 'register' }" text>
        {{ $t('register') }}
      </v-btn>
    </template>
  </v-app-bar>
</template>

<script>
import { mapGetters } from 'vuex'
import LocaleDropdown from '~/components/organisms/LocaleDropdown'

export default {
  components: {
    LocaleDropdown
  },

  data: () => ({
    appName: process.env.appName,
    drawer: false
  }),

  computed: mapGetters({
    user: 'auth/user'
  }),

  methods: {
    async logout() {
      // Log out the user.
      await this.$store.dispatch('auth/logout')

      // Redirect to login.
      this.$router.push({ name: 'login' })
    },

    drawerEvent() {
      this.drawer = !this.drawer
      this.$emit('drawer', this.drawer)
    }
  }
}
</script>
