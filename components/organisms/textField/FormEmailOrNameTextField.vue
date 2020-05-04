<template>
  <v-text-field
    v-model="valueModel"
    :label="$t('username_or_email')"
    :error-messages="errorMessage"
    @blur="$v.v.$touch()"
    outlined
    clearable
  />
</template>

<script>
import { maxLength, required } from 'vuelidate/lib/validators'
import { form } from '@/mixins/form'

export default {
  mixins: [form],

  validations: {
    v: {
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
      !validate.required && errors.push('ユーザー名かメールアドレスは必須です')
      !validate.maxLength && errors.push('255文字以内で入力してください')
      return errors
    }
  }
}
</script>
