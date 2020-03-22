<template>
  <div>
    <!-- TODO 設定 -->
    <user-title title="設定" />

    <!-- メールアドレス変更へのリンク -->

    <div>
      <nuxt-link to="">
        パスワードを変更する
      </nuxt-link>
    </div>

    <div>
      <v-btn @click.prevent="logout" dark color="red">ログアウト</v-btn>
    </div>
  </div>
</template>

<script>
import UserTitle from '~/components/user/UserTitle'

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
