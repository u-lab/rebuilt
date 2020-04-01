<template>
  <div>
    <v-text-field
      v-model="valueModel"
      :label="$t('password')"
      :error-messages="errorMessage"
      outlined
      clearable
    />

    <v-text-field
      v-model="valueConfirmationModel"
      :label="$t('confirm_password')"
      :error-messages="errorMessageConfirmation"
      outlined
      clearable
    />
  </div>
</template>

<script>
import { minLength, sameAs, required } from 'vuelidate/lib/validators'
import { formConfirmation } from '@/mixins/formConfirmation'

export default {
  mixins: [formConfirmation],

  validations: {
    v: {
      minLength: minLength(8),
      required
    },

    vc: {
      sameAs: sameAs('value')
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
    },

    errorMessageConfirmation() {
      const validateConfiramtion = this.$v.vc
      if (!this.dirty || !validateConfiramtion.$dirty) {
        return this.errorServerMessage
      }
      const errors = []
      !validateConfiramtion.sameAs && errors.push('パスワードが一致しません。')
      return errors
    }
  }
}
</script>
