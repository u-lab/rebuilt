<template>
  <!-- title -->
  <v-text-field
    v-model="valueModel"
    :counter="50"
    :label="$t('title')"
    :error-messages="errorMessage"
    required
    outlined
    clearable
    prefix="必須"
  />
</template>

<script>
import { required } from 'vuelidate/lib/validators'
import { form } from '@/mixins/form'

export default {
  mixins: [form],

  validations: {
    v: {
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
      return errors
    }
  }
}
</script>
