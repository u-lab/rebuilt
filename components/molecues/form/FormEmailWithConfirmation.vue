<template>
  <div>
    <v-text-field
      v-model="valueModel"
      :error-messages="errorMessage"
      :label="$t('email')"
      @click:append="hidden = !hidden"
      @blur="$v.v.$touch()"
      outlined
    />

    <v-text-field
      v-model="valueConfirmationModel"
      :error-messages="errorMessageConfirmation"
      :label="$t('confirm_email')"
      @click:append="hidden2 = !hidden2"
      @blur="$v.vc.$touch()"
      outlined
    />
  </div>
</template>

<script>
import { email, sameAs, required } from 'vuelidate/lib/validators'
import { formConfirmation } from '@/mixins/formConfirmation'

export default {
  mixins: [formConfirmation],

  validations: {
    v: {
      email,
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
      !validate.required && errors.push('メールアドレスは必須です')
      !validate.email && errors.push('正しいメールアドレスではありません')
      return errors
    },

    // バリデーションをする
    errorMessageConfirmation() {
      const vc = this.$v.vc
      if (!this.dirty || !vc.$dirty) {
        return this.errorServerMessage
      }
      const errors = []
      !vc.sameAs && errors.push('メールアドレスが一致しません。')
      return errors
    }
  }
}
</script>
