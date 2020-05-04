<template>
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

    <v-list-item :to="{ name: 'users.settings.locale' }" nuxt>
      {{ $t('display_language') }}
    </v-list-item>

    <v-divider />

    <v-list-item :to="{ name: 'users.settings.deactivate' }" nuxt>
      {{ $t('deactivate_your_account') }}
    </v-list-item>
  </v-list>
</template>

<script>
export default {}
</script>

<style></style>
