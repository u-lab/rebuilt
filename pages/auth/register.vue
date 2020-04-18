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
        <form-username
          v-model="form.user"
          :dirty="formDirty"
          :errors="form.errors"
          :lazy-validation="true"
          @dirty="dirty"
          :outlined="false"
          obj-key="user"
        />

        <!-- <v-text-field
          v-model="form.email"
          :label="$t('email')"
          :class="{ 'is-invalid': form.errors.has('email') }"
          :counter="255"
          required
        /> -->
        <form-email
          v-model="form.email"
          :confirmationField="email_confirmation"
          :dirty="formDirty"
          :errors="form.errors"
          :lazy-validation="true"
          @dirty="dirty"
          :outlined="false"
          obj-key="email"
        />
        <has-error :form="form" field="email" />

        <form-password-with-confirmation
          v-model="form.password"
          :confirmationField="form.password_confirmation"
          :dirty="formDirty"
          :errors="form.errors"
          :lazy-validation="true"
          @confirmation="updatePasswordConfirmation"
          @dirty="dirty"
          :outlined="false"
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

          <!-- GitHub Login Button -->
          <login-with-github />
        </div>
      </v-form>
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
