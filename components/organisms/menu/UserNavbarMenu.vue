<template>
  <v-menu bottom offset-y>
    <template v-slot:activator="{ on }">
      <v-btn v-on="on" icon>
        <v-icon v-text="`mdi-dots-vertical`" />
      </v-btn>
    </template>

    <v-list>
      <v-list-item :to="{ name: 'users.storages.index' }">
        <v-list-item-icon>
          <v-icon v-text="`mdi-book-open-variant`" />
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title v-text="$t('look_at_the_storage')" />
        </v-list-item-content>
      </v-list-item>

      <v-list-item :to="{ name: 'users.storages.create' }">
        <v-list-item-icon>
          <v-icon v-text="`mdi-pencil`" />
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title v-text="$t('add_new_work')" />
        </v-list-item-content>
      </v-list-item>

      <!-- ログアウト -->
      <v-list-item @click.prevent="logout">
        <v-list-item-icon>
          <v-icon v-text="`mdi-account-off`" />
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title v-text="$t('logout')" />
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
export default {
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
