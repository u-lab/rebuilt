<template>
  <auth-wrapper>
    <auth-form :title="$t('reset_password')">
      <template v-if="status">
        <v-alert v-text="status" type="success" />
      </template>

      <v-form v-else @submit.prevent="send" @keydown="form.onKeydown($event)">
        <!-- Email -->
        <form-email-text-field
          v-model="form.email"
          :dirty="formDirty"
          :errors="form.errors"
          :lazy-validation="true"
          @dirty="dirty"
          obj-key="email"
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

      <div class="d-flex justify-end">
        <p>
          <nuxt-link :to="{ name: 'login' }" v-text="$t('go_to_login')" />
        </p>
      </div>
    </auth-form>
  </auth-wrapper>
</template>

<script>
import Form from 'vform'
const AuthForm = () => import('@/components/molecues/auth/AuthForm')
const AuthWrapper = () => import('@/components/atoms/Wrapper')
const FormEmailTextField = () =>
  import('@/components/organisms/textField/FormEmailTextField')

export default {
  head() {
    return { title: this.$t('reset_password') }
  },

  components: {
    AuthForm,
    AuthWrapper,
    FormEmailTextField
  },

  layout: 'auth',

  middleware: 'guest',

  data: () => ({
    status: '',
    formDirty: false,
    form: new Form({
      email: ''
    })
  }),

  methods: {
    dirty() {
      this.formDirty = true
    },

    async send() {
      try {
        const { data } = await this.form.post('/password/email')

        this.status = data.status

        this.form.reset()
      } catch (e) {}
    }
  }
}
</script>
