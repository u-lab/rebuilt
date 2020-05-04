<template>
  <b-container :title="$t('update_your_password')">
    <v-form @submit.prevent="onSubmit">
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

      <v-btn v-text="$t('update')" color="primary" large type="submit" />
    </v-form>
  </b-container>
</template>

<script>
const BContainer = () =>
  import('@/components/organisms/containers/UserSettingsContainer')
const FormPasswordWithConfirmation = () =>
  import('@/components/molecues/form/FormPasswordWithConfirmation')

export default {
  components: {
    BContainer,
    FormPasswordWithConfirmation
  },

  props: {
    value: {
      type: Object,
      required: true
    }
  },

  data() {
    return {
      formDirty: false
    }
  },

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
      this.formDirty = false
      return this.$emit('submit')
    },

    updatePasswordConfirmation(value) {
      this.form.password_confirmation = value
    }
  }
}
</script>
