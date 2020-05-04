<template>
  <b-container :title="$t('update_your_user_name')">
    <v-form @submit.prevent="onSubmit">
      <form-username-text-field
        v-model="form.user"
        :dirty="formDirty"
        :errors="form.errors"
        :lazy-validation="true"
        @dirty="dirty"
        obj-key="user"
      />

      <v-btn v-text="$t('update')" color="primary" large type="submit" />
    </v-form>
  </b-container>
</template>

<script>
const BContainer = () =>
  import('@/components/organisms/containers/UserSettingsContainer')
const FormUsernameTextField = () =>
  import('@/components/organisms/textField/FormUsernameTextField')

export default {
  components: {
    BContainer,
    FormUsernameTextField
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
