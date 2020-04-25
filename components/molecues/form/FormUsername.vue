<template>
  <v-text-field
    v-model="valueModel"
    :error-messages="errorMessage"
    :label="$t('username')"
    @blur="$v.v.$touch()"
    :outlined="outlined"
    autocomplete="username"
    type="name"
    required
  />
</template>

<script>
import {
  alphaNum,
  maxLength,
  required,
  minLength
} from 'vuelidate/lib/validators'
import { form } from '@/mixins/form'

export default {
  mixins: [form],

  validations: {
    v: {
      alphaNum,
      maxLength: maxLength(50),
      minLength: minLength(4),
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
      !validate.required && errors.push('ユーザー名を入力してください')
      !validate.minLength && errors.push('4文字以上入力してください')
      !validate.alphaNum && errors.push('英数字で入力してください')
      !validate.maxLength && errors.push('50文字以内で入力してください')
      return errors
    }
  }
}
</script>
