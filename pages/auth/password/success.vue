<template>
  <auth-wrapper>
    <auth-form>
      <p>パスワードの変更をしました</p>

      <nuxt-link :to="{ name: 'login' }">ログインへ</nuxt-link>
    </auth-form>
  </auth-wrapper>
</template>

<script>
import AuthForm from '~/components/auth/AuthForm'
import AuthWrapper from '~/components/auth/AuthWrapper'

export default {
  components: {
    AuthForm,
    AuthWrapper
  },

  layout: 'auth'
}
</script>
