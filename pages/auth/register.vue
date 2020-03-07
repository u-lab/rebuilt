<template>
  <auth-wrapper>
    <auth-form>
      <card v-if="mustVerifyEmail" :title="$t('register')">
        <div class="alert alert-success" role="alert">
          {{ $t('verify_email_address') }}
        </div>
      </card>

      <v-form
        v-else
        @submit.prevent="register"
        @keydown="form.onKeydown($event)"
      >
        <v-text-field
          v-model="form.name"
          :label="$t('name')"
          :counter="255"
          :class="{ 'is-invalid': form.errors.has('name') }"
          required
        />
        <has-error :form="form" field="name" />

        <v-text-field
          v-model="form.email"
          :label="$t('email')"
          :class="{ 'is-invalid': form.errors.has('email') }"
          :counter="255"
          required
        />
        <has-error :form="form" field="email" />

        <v-text-field
          v-model="form.password"
          :label="$t('password')"
          :class="{ 'is-invalid': form.errors.has('password') }"
          :counter="255"
          required
        />
        <has-error :form="form" field="password" />

        <v-text-field
          v-model="form.password_confirmation"
          :label="$t('confirm_password')"
          required
        />
        <has-error :form="form" field="password_confirmation" />

        <div class="text-center login-btn-wraaper">
          <!-- Submit Button -->
          <v-btn
            :disabled="form.busy"
            color="grey lighten-1"
            large
            type="submit"
          >
            {{ $t('register') }}
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
    return { title: this.$t('register') }
  },

  components: {
    AuthForm,
    AuthWrapper
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
