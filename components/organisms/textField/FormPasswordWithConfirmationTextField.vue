<template>
  <div>
    <v-text-field
      v-model="valueModel"
      :append-icon="hidden ? 'mdi-eye-off' : 'mdi-eye'"
      :error-messages="errorMessage"
      :label="$t('password')"
      :outlined="outlined"
      :type="hidden ? 'password' : 'text'"
      @click:append="hidden = !hidden"
      @blur="$v.v.$touch()"
      required
    />

    <v-text-field
      v-model="valueConfirmationModel"
      :append-icon="hidden2 ? 'mdi-eye-off' : 'mdi-eye'"
      :error-messages="errorMessageConfirmation"
      :label="$t('confirm_password')"
      :outlined="outlined"
      :type="hidden2 ? 'password' : 'text'"
      @click:append="hidden2 = !hidden2"
      @blur="$v.vc.$touch()"
      required
    />
  </div>
</template>

<script>
import { minLength, sameAs, required, helpers } from 'vuelidate/lib/validators'
import { formConfirmation } from '@/mixins/formConfirmation'

export default {
  mixins: [formConfirmation],

  props: {
    outlined: {
      type: Boolean,
      default: true
    }
  },

  validations: {
    v: {
      minLength: minLength(8),
      required,
      regex: helpers.regex(
        'password',
        /^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?\d)[a-zA-Z\d]{8,100}$/
      )
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

      !validate.minLength && errors.push('8文字以上で入力してください')
      !validate.regex &&
        errors.push('半角英小文字大文字数字をそれぞれ1種類以上入力してください')
      !validate.required && errors.push('パスワードは必須です')
      return errors
    },

    // バリデーションをする(確認パスワードと同じか比較)
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
