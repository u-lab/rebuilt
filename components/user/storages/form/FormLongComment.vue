<template>
  <v-textarea
    v-model="valueModel"
    :label="$t('long_comment')"
    :error-messages="errorMessage"
    outlined
  />
</template>

<script>
import { maxLength } from 'vuelidate/lib/validators'
import { form } from '@/mixins/form'

export default {
  mixins: [form],

  validations: {
    v: {
      maxLength: maxLength(100000)
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
      !validate.maxLength && errors.push('100000文字以内で入力してください')
      return errors
    }
  }
}
</script>
