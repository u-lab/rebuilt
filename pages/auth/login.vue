<template>
  <auth-wrapper>
    <auth-form>
      <v-form @submit.prevent="login" @keydown="form.onKeydown($event)">
        <v-text-field
          v-model="form.email"
          :rules="rules.email"
          :counter="255"
          :label="$t('username_or_email')"
          required
        />

        <v-text-field
          v-model="form.password"
          :append-icon="field.password ? 'mdi-eye' : 'mdi-eye-off'"
          :rules="rules.password"
          :type="field.password ? 'text' : 'password'"
          :label="$t('password')"
          @click:append="field.password = !field.password"
          required
        />

        <div class="d-flex justify-space-between">
          <v-checkbox
            v-model="remember"
            :label="$t('remember_me')"
            class="mt-0 small"
          />

          <router-link :to="{ name: 'password.request' }" class="small">
            {{ $t('forgot_password') }}
          </router-link>
        </div>

        <div class="text-center login-btn-wraaper">
          <!-- Submit Button -->
          <v-btn
            :disabled="form.busy"
            color="grey lighten-1"
            large
            type="submit"
          >
            {{ $t('login') }}
          </v-btn>

          <!-- GitHub Login Button -->
          <login-with-github />
        </div>
      </v-form>
    </auth-form>
  </auth-wrapper>
</template>

<script>
import Form from 'vform'
import AuthForm from '~/components/auth/AuthForm'
import AuthWrapper from '~/components/auth/AuthWrapper'

export default {
  head() {
    return { title: this.$t('login') }
  },

  components: {
    AuthForm,
    AuthWrapper
  },

  layout: 'auth',

  data: () => ({
    form: new Form({
      email: '',
      password: ''
    }),
    remember: false,
    rules: {
      email: [(v) => !!v || 'Name is required'],
      password: [
        (v) => !!v || 'Password is required',
        (v) => v.length >= 7 || 'Password must be more than 7 characters'
      ]
    },
    field: {
      password: false
    }
  }),

  middleware: 'guest',

  methods: {
    async login() {
      let data

      // Submit the form.
      try {
        const response = await this.form.post('/login')
        data = response.data
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
