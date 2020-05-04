<template>
  <v-text-field
    v-model="valueModel"
    :label="$t('email')"
    :error-messages="errorMessage"
    @blur="$v.v.$touch()"
    :outlined="outlined"
    type="email"
  />
</template>

<script>
import { email, maxLength, required } from 'vuelidate/lib/validators'
import { form } from '@/mixins/form'

export default {
  mixins: [form],

  validations: {
    v: {
      email,
      maxLength: maxLength(255),
      required
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
      !validate.email && errors.push('正しいメールアドレスを入力してください')
      !validate.maxLength && errors.push('255文字以内で入力してください')
      return errors
    }
  }
}
</script>
