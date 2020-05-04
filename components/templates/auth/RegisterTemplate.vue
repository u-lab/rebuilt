<template>
  <auth-wrapper>
    <auth-form-container :title="$t('register')">
      <div v-if="mustVerifyEmail">
        <v-alert type="success" role="alert">
          {{ $t('verify_email_address') }}
        </v-alert>
      </div>

      <div v-else>
        <register-form v-model="form" @submit="onSubmit" />

        <div class="d-flex justify-center justify-sm-end mb-2">
          <div>
            <p>
              <nuxt-link v-text="$t('go_to_login')" :to="{ name: 'login' }" />
            </p>
          </div>
        </div>
      </div>
    </auth-form-container>
  </auth-wrapper>
</template>

<script>
const AuthFormContainer = () =>
  import('@/components/organisms/containers/AuthFormContainer')
const AuthWrapper = () => import('@/components/atoms/Wrapper')
const RegisterForm = () => import('@/components/organisms/form/RegisterForm')

export default {
  components: {
    AuthFormContainer,
    AuthWrapper,
    RegisterForm
  },

  props: {
    value: {
      type: Object,
      required: true
    }
  },

  computed: {
    form: {
      get() {
        return this.value
      },
      set(newVal) {
        return this.$emit('input', newVal)
      }
    }
  },

  methods: {
    onSubmit() {
      return this.$emit('submit')
    }
  }
}
</script>

<style></style>
