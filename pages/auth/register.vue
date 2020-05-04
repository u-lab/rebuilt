<template>
  <auth-wrapper>
    <auth-form :title="$t('register')">
      <div v-if="mustVerifyEmail">
        <v-alert type="success" role="alert">
          {{ $t('verify_email_address') }}
        </v-alert>
      </div>

      <div v-else>
        <register-form v-model="form" @submit="register" />

        <div class="d-flex justify-center justify-sm-end mb-2">
          <div>
            <p>
              <nuxt-link v-text="$t('go_to_login')" :to="{ name: 'login' }" />
            </p>
          </div>
        </div>
      </div>
    </auth-form>
  </auth-wrapper>
</template>

<script>
import Form from 'vform'
const AuthForm = () => import('@/components/molecues/auth/AuthForm')
const AuthWrapper = () => import('@/components/atoms/Wrapper')
const RegisterForm = () => import('@/components/organisms/form/RegisterForm')

export default {
  head() {
    return { title: this.$t('register') }
  },

  components: {
    AuthForm,
    AuthWrapper,
    RegisterForm
  },

  data: () => ({
    form: new Form({
      name: '',
      email: '',
      password: '',
      password_confirmation: ''
    }),
    mustVerifyEmail: false
  }),

  layout: 'auth',

  middleware: 'guest',

  methods: {
    async register() {
      let data
      try {
        // Register the user.
        data = await this.form.post('/register')
      } catch (e) {
        return
      }

      // Must verify email fist.
      if (data.status) {
        this.mustVerifyEmail = true
      } else {
        // Log in the user.
        const {
          data: { token }
        } = await this.form.post('/login')

        // Save the token.
        this.$store.dispatch('auth/saveToken', { token })

        // Update the user.
        await this.$store.dispatch('auth/updateUser', { user: data })

        // Redirect dashboard.
        this.$router.push({ name: 'users.dashboard' })
      }
    }
  }
}
</script>
