<template>
  <auth-wrapper>
    <auth-form :title="$t('changed_password')">
      <div class="d-flex justify-center">
        <v-btn :to="{ name: 'login' }" color="primary">
          {{ $t('login') }}
        </v-btn>
      </div>
    </auth-form>
  </auth-wrapper>
</template>

<script>
import AuthForm from '~/components/molecues/auth/AuthForm'
import AuthWrapper from '~/components/atoms/Wrapper'

export default {
  components: {
    AuthForm,
    AuthWrapper
  },

  layout: 'auth',

  middleware: 'guest'
}
</script>
