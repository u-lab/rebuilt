<template>
  <v-text-field
    v-model="valueModel"
    :append-icon="hidden ? 'mdi-eye-off' : 'mdi-eye'"
    :label="$t('password')"
    :error-messages="errorMessage"
    :type="hidden ? 'password' : 'text'"
    @click:append="hidden = !hidden"
    @blur="$v.v.$touch()"
    outlined
  />
</template>

<script>
import { minLength, required } from 'vuelidate/lib/validators'
import { form } from '@/mixins/form'

export default {
  mixins: [form],

  validations: {
    v: {
      minLength: minLength(8),
      required
    }
  },

  data() {
    return {
      hidden: true
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
      !validate.required && errors.push('パスワードは必須です')
      !validate.minLength && errors.push('8文字以上で入力してください')
      return errors
    }
  }
}
</script>
