<template>
  <v-text-field
    v-model="valueModel"
    :counter="50"
    :error-messages="errorMessage"
    :label="$t('title')"
    @blur="$v.v.$touch()"
    outlined
    required
    placeholder="必須"
    maxlength="50"
  />
</template>

<script>
import { maxLength, required } from 'vuelidate/lib/validators'
import { form } from '@/mixins/form'

export default {
  mixins: [form],

  validations: {
    v: {
      maxLength: maxLength(50),
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
      !validate.required && errors.push('タイトルを入力してください')
      !validate.maxLength && errors.push('50文字以内で入力してください')
      return errors
    }
  }
}
</script>
