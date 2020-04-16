<template>
  <v-container>
    <user-title title="設定" />

    <v-list>
      <!-- メールアドレス変更へのリンク -->
      <v-list-item :to="{ name: 'users.settings.email' }" nuxt>
        ユーザー名・メールアドレスを変更する
      </v-list-item>

      <v-divider />

      <v-list-item :to="{ name: 'users.settings.password' }" nuxt>
        パスワードを変更する
      </v-list-item>

      <v-divider />

      <v-list-item :to="{ name: 'users.settings.deactivate' }" nuxt>
        {{ $t('deactivate_your_account') }}
      </v-list-item>
    </v-list>

    <div class="text-right mt-4">
      <v-btn @click.prevent="logout" dark color="red">ログアウト</v-btn>
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
