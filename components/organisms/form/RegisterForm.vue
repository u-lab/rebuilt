<template>
  <v-form @submit.prevent="onSubmit" @keydown="form.onKeydown($event)">
    <form-username-text-field
      v-model="form.name"
      :dirty="formDirty"
      :errors="form.errors"
      :lazy-validation="true"
      @dirty="dirty"
      obj-key="name"
    />

    <form-email-text-field
      v-model="form.email"
      :dirty="formDirty"
      :errors="form.errors"
      :lazy-validation="true"
      @dirty="dirty"
      obj-key="email"
    />

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
      <v-btn :disabled="form.busy" color="grey lighten-1" large type="submit">
        {{ $t('register') }}
      </v-btn>
    </div>
  </v-form>
</template>

<script>
const FormUsernameTextField = () =>
  import('@/components/organisms/textField/FormUsernameTextField')
const FormEmailTextField = () =>
  import('@/components/organisms/textField/FormEmailTextField')
const FormPasswordWithConfirmationTextField = () =>
  import(
    '@/components/organisms/textField/FormPasswordWithConfirmationTextField'
  )

export default {
  components: {
    FormEmailTextField,
    FormUsernameTextField,
    FormPasswordWithConfirmationTextField
  },

  props: {
    value: {
      type: Object,
      required: true
    }
  },

  data: () => ({
    formDirty: false
  }),

  computed: {
    form: {
      get() {
        return this.value
      },
      set(newVal) {
        return this.$emit('input', newVal)
      }
    }
  },

  methods: {
    dirty() {
      this.formDirty = true
    },

    onSubmit() {
      return this.$emit('submit')
    },

    updatePasswordConfirmation(value) {
      this.form.password_confirmation = value
    }
  }
}
</script>

<style></style>
