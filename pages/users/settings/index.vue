<template>
  <v-container>
    <user-title :title="$t('settings')" />

    <v-list>
      <!-- ユーザー名変更 -->
      <v-list-item :to="{ name: 'users.settings.username' }" nuxt>
        {{ $t('update_your_user_name') }}
      </v-list-item>

      <v-divider />

      <!-- メールアドレス変更 -->
      <v-list-item :to="{ name: 'users.settings.email' }" nuxt>
        {{ $t('update_your_email_address') }}
      </v-list-item>

      <v-divider />

      <!-- パスワード変更 -->
      <v-list-item :to="{ name: 'users.settings.password' }" nuxt>
        {{ $t('update_your_password') }}
      </v-list-item>

      <v-divider />

      <v-list-item :to="{ name: 'users.settings.deactivate' }" nuxt>
        {{ $t('deactivate_your_account') }}
      </v-list-item>
    </v-list>

    <div class="text-right mt-4">
      <v-btn @click.prevent="logout" v-text="$t('logout')" dark color="red" />
    </div>
  </v-container>
</template>

<script>
import UserTitle from '~/components/molecues/pages/UserTitle'

export default {
  middleware: 'auth',

  layout: 'user',

  components: {
    UserTitle
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
