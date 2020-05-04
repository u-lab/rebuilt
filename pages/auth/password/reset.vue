<template>
  <auth-wrapper>
    <auth-form :title="$t('reset_password')">
      <v-form @submit.prevent="reset" @keydown="form.onKeydown($event)">
        <!-- Password -->
        <form-password-with-confirmation-text-field
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
            {{ $t('reset_password') }}
          </v-btn>
        </div>
      </v-form>
    </auth-form>
  </auth-wrapper>
</template>

<script>
import Form from 'vform'
import AuthForm from '~/components/molecues/auth/AuthForm'
import AuthWrapper from '~/components/atoms/Wrapper'
import FormPasswordWithConfirmationTextField from '@/components/organisms/textField/FormPasswordWithConfirmationTextField'

export default {
  head() {
    return { title: this.$t('reset_password') }
  },

  components: {
    AuthForm,
    AuthWrapper,
    FormPasswordWithConfirmationTextField
  },

  layout: 'auth',

  middleware: 'guest',

  data: () => ({
    status: '',
    formDirty: false,
    form: new Form({
      token: '',
      email: '',
      password: '',
      password_confirmation: ''
    })
  }),

  created() {
    this.form.email = this.$route.query.email
    this.form.token = this.$route.params.token
  },

  methods: {
    dirty() {
      this.formDirty = true
    },

    updatePasswordConfirmation(value) {
      this.form.password_confirmation = value
    },

    async reset() {
      try {
        const { data } = await this.form.post('/password/reset')

        this.status = data.status

        this.form.reset()

        this.$router.push({ name: 'password.reset.success' })
      } catch (e) {
        this.$nuxt.error({
          statusCode: e.response.status
        })
      }
    }
  }
}
</script>
