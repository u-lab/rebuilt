<template>
  <auth-wrapper>
    <auth-form :title="$t('register')">
      <div v-if="mustVerifyEmail">
        <v-alert type="success" role="alert">
          {{ $t('verify_email_address') }}
        </v-alert>
      </div>

      <div v-else>
        <v-form @submit.prevent="register" @keydown="form.onKeydown($event)">
          <form-username
            v-model="form.name"
            :dirty="formDirty"
            :errors="form.errors"
            :lazy-validation="true"
            @dirty="dirty"
            obj-key="name"
          />

          <form-email
            v-model="form.email"
            :dirty="formDirty"
            :errors="form.errors"
            :lazy-validation="true"
            @dirty="dirty"
            obj-key="email"
          />

          <form-password-with-confirmation
            v-model="form.password"
            :confirmationField="form.password_confirmation"
            :dirty="formDirty"
            :errors="form.errors"
            :lazy-validation="true"
            @confirmation="updatePasswordConfirmation"
            @dirty="dirty"
            obj-key="password"
          />

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
          </div>
        </v-form>

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
import FormUsername from '@/components/molecues/form/FormUsername'
import FormEmail from '@/components/molecues/form/FormEmail'
import FormPasswordWithConfirmation from '@/components/molecues/form/FormPasswordWithConfirmation'
import AuthForm from '~/components/molecues/auth/AuthForm'
import AuthWrapper from '~/components/atoms/Wrapper'

export default {
  head() {
    return { title: this.$t('register') }
  },

  components: {
    AuthForm,
    AuthWrapper,
    FormEmail,
    FormUsername,
    FormPasswordWithConfirmation
  },

  data: () => ({
    formDirty: false,
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
    },
    dirty() {
      this.formDirty = true
    },
    updatePasswordConfirmation(value) {
      this.form.password_confirmation = value
    }
  }
}
</script>
