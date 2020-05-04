<template>
  <v-form
    @submit.prevent="onSubmit"
    @keydown="form.onKeydown($event)"
    class="mb-4"
  >
    <!-- Email -->
    <form-email-or-name
      v-model="emailOrName"
      :dirty="formDirty"
      :errors="form.errors"
      :lazy-validation="true"
      @dirty="dirty"
      obj-key="email"
    />

    <form-password
      v-model="form.password"
      :dirty="formDirty"
      :errors="form.errors"
      :lazy-validation="true"
      @dirty="dirty"
      obj-key="password"
    />

    <div class="d-sm-flex justify-space-between">
      <v-checkbox
        v-model="remember"
        :label="$t('remember_me')"
        class="mt-0 small"
      />
    </div>

    <div class="text-center login-btn-wraaper">
      <!-- Submit Button -->
      <v-btn
        :disabled="form.busy"
        v-text="$t('login')"
        color="grey lighten-1"
        large
        type="submit"
      />
    </div>
  </v-form>
</template>

<script>
import { isEmail } from '@/utils/helper'
const FormEmailOrName = () =>
  import('@/components/organisms/textField/FormEmailOrNameTextField')
const FormPassword = () =>
  import('@/components/organisms/textField/FormPasswordTextField')

export default {
  components: {
    FormEmailOrName,
    FormPassword
  },

  props: {
    value: {
      type: Object,
      required: true
    },

    valueRemember: {
      type: Boolean,
      required: true
    }
  },

  data() {
    return {
      emailOrName: '',
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
    },

    remember: {
      get() {
        return this.value
      },
      set(newVal) {
        return this.$emit('remember', newVal)
      }
    }
  },

  methods: {
    dirty() {
      this.formDirty = true
    },

    onSubmit() {
      if (isEmail(this.emailOrName)) {
        this.form.email = this.emailOrName
      } else {
        this.form.name = this.emailOrName
      }

      return this.$emit('submit')
    }
  }
}
</script>
