<template>
  <auth-wrapper>
    <auth-form-container :title="$t('changed_password')">
      <div class="d-flex justify-center">
        <v-btn :to="{ name: 'login' }" color="primary">
          {{ $t('login') }}
        </v-btn>
      </div>
    </auth-form-container>
  </auth-wrapper>
</template>

<script>
const AuthFormContainer = () =>
  import('@/components/organisms/containers/AuthFormContainer')
const AuthWrapper = () => import('@/components/atoms/Wrapper')

export default {
  components: {
    AuthFormContainer,
    AuthWrapper
  },

  layout: 'auth',

  middleware: 'guest'
}
</script>
