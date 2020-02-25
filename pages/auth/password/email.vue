<template>
  <auth-wrapper>
    <auth-form>
      <v-form @submit.prevent="send" @keydown="form.onKeydown($event)">
        <alert-success :form="form" :message="status" />

        <!-- Email -->
        <v-text-field
          v-model="form.email"
          :class="{ 'is-invalid': form.errors.has('email') }"
          :label="$t('email')"
          required
        />
        <has-error :form="form" field="email" />

        <div class="text-center login-btn-wraaper">
          <!-- Submit Button -->
          <v-btn color="grey lighten-1" large :disabled="form.busy" type="submit">
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

export default {
  head () {
    return { title: this.$t('reset_password') }
  },

  components: {
    AuthForm,
    AuthWrapper
  },

  layout: 'auth',

  data: () => ({
    status: '',
    form: new Form({
      email: ''
    })
  }),

  methods: {
    async send () {
      try {
        const { data } = await this.form.post('/password/email')

        this.status = data.status

        this.form.reset()
      } catch (e) {

      }
    }
  }
}
</script>
