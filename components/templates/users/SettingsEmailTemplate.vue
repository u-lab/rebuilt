<template>
  <b-container :title="$t('update_your_email_address')">
    <div>
      <h2 v-text="$t('your_current_email_address')" />
      <p v-text="user.email" />
    </div>

    <v-form @submit.prevent="onSubmit">
      <form-email-with-confirmation
        v-model="form.email"
        :confirmationField="email_confirmation"
        :dirty="formDirty"
        :errors="form.errors"
        :lazy-validation="true"
        @dirty="dirty"
        obj-key="email"
      />

      <v-btn v-text="$t('update')" color="primary" large type="submit" />
    </v-form>
  </b-container>
</template>

<script>
const BContainer = () =>
  import('@/components/organisms/containers/UserSettingsContainer')
const FormEmailWithConfirmation = () =>
  import('@/components/molecues/form/FormEmailWithConfirmation')

export default {
  components: {
    BContainer,
    FormEmailWithConfirmation
  },

  props: {
    value: {
      type: Object,
      required: true
    },

    user: {
      type: Object,
      required: true
    }
  },

  data() {
    return {
      email_confirmation: null,
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
      return this.$emit('submit')
    }
  }
}
</script>
