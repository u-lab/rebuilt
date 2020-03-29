<template>
  <v-text-field
    v-model="valueModel"
    :counter="50"
    :label="$t('description')"
    :error-messages="errorMessage"
    outlined
    clearable
  />
</template>

<script>
import { maxLength } from 'vuelidate/lib/validators'
import { form } from '@/mixins/form'

export default {
  mixins: [form],

  validations: {
    v: {
      maxLength: maxLength(50)
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
      !validate.maxLength && errors.push('50文字以内で入力してください')
      return errors
    }
  }
}
</script>
