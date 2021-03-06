export const formConfirmation = {
  props: {
    /**
     * v-model
     */
    value: { type: String, default: '' },

    /**
     * 確認したいフィールドの値
     *
     * ex. password_confirmation
     */
    confirmationField: {
      type: String,
      required: false,
      default: ''
    },

    /**
     * ユーザがフォームの内容を変更したか
     */
    dirty: {
      type: Boolean,
      required: true
    },

    /**
     * APIで発生したエラー
     */
    errors: {
      type: Object,
      default: null
    },

    lazyValidation: {
      type: Boolean,
      default: false
    },

    objKey: {
      type: String,
      required: true
    },

    outlined: {
      type: Boolean,
      default: true
    },

    type: {
      type: String,
      default: undefined
    }
  },

  data() {
    return {
      v: this.value,
      vc: this.confirmationField
    }
  },

  computed: {
    /**
     * サーバーでエラーが発生したかどうか
     * これはapiに一度、リクエストを送った後、apiのバリデーションで弾かれた場合にtrueになる
     *
     * @return {Boolean}
     */
    isErrorServer() {
      if (this.errors === null || !('errors' in this.errors)) {
        return false
      }

      const err = this.errors.errors
      return (err && this.objKey in err) || `${this.objKey}_confirmation` in err
    },

    /**
     * サーバーで発生したエラー
     *
     * @return {String[]}
     */
    errorServerMessage() {
      if (this.isErrorServer) {
        return this.errors.errors[this.objKey]
      }
      return []
    },

    valueModel: {
      get() {
        return this.$v.v.$model
      },
      set(newVal) {
        this.v = newVal

        if (!this.lazyValidation) {
          this.$v.v.$touch()
        }

        if (!this.dirty) {
          this.$emit('dirty')
        }

        return this.$emit('input', newVal)
      }
    },

    valueConfirmationModel: {
      get() {
        return this.$v.vc.$model
      },
      set(newVal) {
        this.vc = newVal

        if (!this.lazyValidation) {
          this.$v.vc.$touch()
        }

        if (!this.dirty) {
          this.$emit('dirty')
        }

        return this.$emit('confirmation', newVal)
      }
    }
  }
}
