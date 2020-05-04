<template>
  <register-template
    v-model="form"
    :must-verify-email="mustVerifyEmail"
    @submit="onSubmit"
  />
</template>

<script>
import Form from 'vform'
const RegisterTemplate = () =>
  import('@/components/templates/auth/RegisterTemplate')

export default {
  head() {
    return { title: this.$t('register') }
  },

  components: {
    RegisterTemplate
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
