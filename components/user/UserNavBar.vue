<template>
  <v-app-bar app clipped-left fixed dark dense color="grey darken-4">
    <v-toolbar-title>
      <router-link
        :to="{ name: user ? 'users.dashboard' : 'welcome' }"
        style="color: white"
      >
        {{ appName }}
      </router-link>
    </v-toolbar-title>

    <v-spacer />

    <v-btn :to="{ name: 'users.storages.index' }" dark large>
      作品を眺める
    </v-btn>

    <v-btn :to="{ name: 'users.storages.create' }" dark large>
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
import LocaleDropdown from '../LocaleDropdown'

export default {
  components: {
    LocaleDropdown
  },

  data: () => ({
    appName: process.env.appName
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
    }
  }
}
</script>
