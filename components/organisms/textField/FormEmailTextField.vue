<template>
  <v-text-field
    v-model="valueModel"
    :label="$t('email')"
    :error-messages="errorMessage"
    @blur="$v.v.$touch()"
    :outlined="outlined"
    :required="required"
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
      this.required &&
        !validate.required &&
        errors.push('メールアドレスは必須です')
      !validate.email && errors.push('正しいメールアドレスではありません')
      !validate.maxLength && errors.push('255文字以内で入力してください')
      return errors
    }
  }
}
</script>
