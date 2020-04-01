<template>
  <auth-wrapper>
    <auth-form>
      <v-form @submit.prevent="login" @keydown="form.onKeydown($event)">
        <!-- Email -->
        <form-email-or-name
          v-model="form.email"
          :dirty="formDirty"
          :errors="form.errors"
          :lazy-validation="true"
          @dirty="dirty"
          obj-key="email"
        />

        <form-password
          v-model="form.password"
          :dirty="formDirty"
          :errors="form.errors"
          :lazy-validation="true"
          @dirty="dirty"
          obj-key="password"
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
        </div>
      </v-form>
    </auth-form>
  </auth-wrapper>
</template>

<script>
import Form from 'vform'
import AuthForm from '~/components/auth/AuthForm'
import AuthWrapper from '~/components/auth/AuthWrapper'
import FormEmailOrName from '@/components/auth/form/FormEmailOrName'
import FormPassword from '@/components/auth/form/FormPassword'

export default {
  head() {
    return { title: this.$t('login') }
  },

  components: {
    AuthForm,
    AuthWrapper,
    FormEmailOrName,
    FormPassword
  },

  layout: 'auth',

  data: () => ({
    form: new Form({
      email: '',
      password: ''
    }),
    formDirty: false,
    remember: false,
    field: {
      password: false
    }
  }),

  middleware: 'guest',

  methods: {
    dirty() {
      this.formDirty = true
    },

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
