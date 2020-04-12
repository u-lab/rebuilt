<template>
  <div>
    <v-text-field
      v-model="valueModel"
      :append-icon="hidden ? 'mdi-eye-off' : 'mdi-eye'"
      :error-messages="errorMessage"
      :label="$t('password')"
      :type="hidden ? 'password' : 'text'"
      @click:append="hidden = !hidden"
      @blur="$v.v.$touch()"
      outlined
    />

    <v-text-field
      v-model="valueConfirmationModel"
      :append-icon="hidden2 ? 'mdi-eye-off' : 'mdi-eye'"
      :error-messages="errorMessageConfirmation"
      :label="$t('confirm_password')"
      :type="hidden2 ? 'password' : 'text'"
      @click:append="hidden2 = !hidden2"
      @blur="$v.vc.$touch()"
      outlined
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

  data() {
    return {
      hidden: true,
      hidden2: true
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

    // バリデーションをする
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
