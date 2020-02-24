<template>
  <v-app-bar
    app
    clipped-left
    fixed
    dense
  >
    <v-toolbar-title>
      <router-link :to="{ name: user ? 'home' : 'welcome' }">
        {{ appName }}
      </router-link>
    </v-toolbar-title>

    <v-spacer />
    <!-- デバッグ捗るように入れておいた -->
    <v-btn @click="$router.go(-1)">
      一つ前に戻る
    </v-btn>

    <v-spacer />

    <!-- auth -->
    <template v-if="user">
      <v-btn v-model="listOpen" class="mx-2" fab dark color="teal" @click="listOpen = !listOpen">
        <v-icon dark>
          mdi-format-list-bulleted-square
        </v-icon>
      </v-btn>

      <template v-if="listOpen">
        <v-card>
          <!-- 参照: https://vuetifyjs.com/ja/components/lists -->
          <v-list>
            <v-list-item-group v-model="model">
              <v-list-item>
                <!-- <v-list-item-icon>
                  <v-avatar>
                    <img
                      alt="Avatar"
                      :src="user.photo_url"
                    >
                  </v-avatar>
                </v-list-item-icon> -->
                <v-list-item-content>
                  <v-list-item-title :v-text="user.name" />
                </v-list-item-content>
              </v-list-item>

              <v-list-item :to="{ name: 'settings.profile' }">
                <!-- <v-list-item-icon>
                  <v-icon>
                    mdi_cog_outline
                  </v-icon>
                </v-list-item-icon> -->
                <v-list-item-content>
                  <v-list-item-title v-text="$t('settings')" />
                </v-list-item-content>
              </v-list-item>

              <v-list-item @click.prevent="logout">
                <!-- <v-list-item-icon>
                  <v-icon v-text="mdi-sign-out-alt" />
                </v-list-item-icon> -->
                <v-list-item-content>
                  <v-list-item-title v-text="$t('logout')" />
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-card>
      </template>
    </template>

    <!-- Guest -->
    <template v-else>
      <v-btn text :to="{ name: 'login' }">
        {{ $t('login') }}
      </v-btn>

      <v-btn text :to="{ name: 'register' }">
        {{ $t('register') }}
      </v-btn>
    </template>
    </v-spacer>
  </v-app-bar>
</template>

<script>
import { mapGetters } from 'vuex'
// import LocaleDropdown from './LocaleDropdown'

export default {
  components: {
    // LocaleDropdown
  },

  data: () => ({
    appName: process.env.appName,
    listOpen: false,
    model: 1
  }),

  computed: mapGetters({
    user: 'auth/user'
  }),

  methods: {
    async logout () {
      // Log out the user.
      await this.$store.dispatch('auth/logout')

      // Redirect to login.
      this.$router.push({ name: 'login' })
    }
  }
}
</script>
