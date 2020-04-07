<template>
  <auth-wrapper>
    <auth-form>
      <v-form @submit.prevent="send" @keydown="form.onKeydown($event)">
        <alert-success :form="form" :message="status" />

        <!-- Email -->
        <form-email
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
    </auth-form>
  </auth-wrapper>
</template>

<script>
import Form from 'vform'
import AuthForm from '~/components/auth/AuthForm'
import AuthWrapper from '~/components/auth/AuthWrapper'
import FormEmail from '@/components/auth/form/FormEmail'

export default {
  head() {
    return { title: this.$t('reset_password') }
  },

  components: {
    AuthForm,
    AuthWrapper,
    FormEmail
  },

  layout: 'auth',

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
