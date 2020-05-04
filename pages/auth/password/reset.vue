<template>
  <auth-wrapper>
    <auth-form-container :title="$t('reset_password')">
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

        <div class="text-center p-2">
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
    </auth-form-container>
  </auth-wrapper>
</template>

<script>
import Form from 'vform'
const AuthFormContainer = () =>
  import('@/components/organisms/containers/AuthFormContainer')
const AuthWrapper = () => import('@/components/atoms/Wrapper')
const FormPasswordWithConfirmationTextField = () =>
  import(
    '@/components/organisms/textField/FormPasswordWithConfirmationTextField'
  )

export default {
  head() {
    return { title: this.$t('reset_password') }
  },

  components: {
    AuthFormContainer,
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
