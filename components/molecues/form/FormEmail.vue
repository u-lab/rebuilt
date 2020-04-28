<template>
  <div>
    <v-text-field
      v-model="valueModel"
      :error-messages="errorMessage"
      :label="$t('email')"
      @click:append="hidden = !hidden"
      @blur="$v.v.$touch()"
      :outlined="outlined"
      type="email"
      required
    />
  </div>
</template>

<script>
import { email, required } from 'vuelidate/lib/validators'
import { form } from '@/mixins/form'

export default {
  mixins: [form],

  validations: {
    v: {
      email,
      required
    }
  },
  props: {
    outlined: {
      type: Boolean,
      default: true
    }
  },

  computed: {
    /**
     * エラーメッセージ
     *
     * @return {String[]} エラーメッセージ
     */
    errorMessage() {
      const validate = this.$v.v
      // ユーザーが一回以上touchしたか
      if (!this.dirty || !validate.$dirty) {
        return this.errorServerMessage
      }

      const errors = []
      !validate.required && errors.push('メールアドレスは必須です')
      !validate.email && errors.push('正しいメールアドレスではありません')
      return errors
    }
  }
}
</script>
