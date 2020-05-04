<template>
  <login-template
    v-model="form"
    :value-remember="remember"
    @remember="onRemember"
    @submit="login"
  />
</template>

<script>
import Form from 'vform'
const LoginTemplate = () => import('@/components/templates/auth/LoginTemplate')

export default {
  components: {
    LoginTemplate
  },

  head() {
    return { title: this.$t('login') }
  },

  layout: 'auth',

  data: () => ({
    form: new Form({
      name: '',
      email: '',
      password: ''
    }),
    remember: false
  }),

  middleware: 'guest',

  methods: {
    onRemember(newVal) {
      this.remember = newVal
    },

    async login() {
      let data

      // Submit the form.
      try {
        const res = await this.form.post('/login')
        data = res.data
      } catch (e) {
        return
      }

      // Save the token.
      this.$store.dispatch('auth/saveToken', {
        token: data.token,
        remember: this.remember
      })

      // Fetch the user.
      await this.$store.dispatch('auth/fetchUser')

      // Redirect dashboard.
      this.$router.push({ name: 'users.dashboard' })
    }
  }
}
</script>
