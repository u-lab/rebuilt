<template>
  <v-text-field
    v-model="valueModel"
    :counter="255"
    :label="$t('web_address')"
    :error-messages="errorMessage"
    @blur="$v.v.$touch()"
    outlined
    autocomplete="url"
    type="url"
  />
</template>

<script>
import { maxLength, url } from 'vuelidate/lib/validators'
import { form } from '@/mixins/form'

export default {
  mixins: [form],

  validations: {
    v: {
      maxLength: maxLength(255),
      url
    }
  },

  computed: {
    /**
     * エラーメッセージ
     *
     * @return {String[]} エラーメッセージ
     */
    errorMessage() {
      const v = this.$v.v
      // ユーザーが一回以上touchしたか
      if (!this.dirty || !v.$dirty) {
        return this.errorServerMessage
      }

      const errors = []
      !v.url && errors.push('正しいURLを入力してください')
      !v.maxLength && errors.push('255文字以内で入力してください')
      return errors
    }
  }
}
</script>
