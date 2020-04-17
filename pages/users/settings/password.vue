<template>
  <div>
    <user-title title="パスワードを変更する" />

    <v-form @submit.prevent="update" @keydown="form.onKeydown($event)">
      <!-- Password -->
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

      <!-- Submit Button -->

      <v-btn @submit="update" type="submit">
        {{ $t('update') }}
      </v-btn>
    </v-form>
  </div>
</template>

<script>
import Form from 'vform'
import UserTitle from '~/components/molecues/pages/UserTitle'
import FormPasswordWithConfirmation from '~/components/molecues/auth/FormPasswordWithConfirmation'
export default {
  middleware: 'auth',

  layout: 'user',

  components: {
    UserTitle,
    FormPasswordWithConfirmation
  },

  data: () => ({
    formDirty: false,
    form: new Form({
      password: '',
      password_confirmation: ''
    })
  }),

  methods: {
    async update() {
      try {
        await this.form.patch('/settings/password')
        this.form.reset()
        this.$router.push({ name: 'users.settings.success' })
      } catch (e) {}
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

<style></style>
