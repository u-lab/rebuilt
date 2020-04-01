export const form = {
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

    objKey: {
      type: String,
      required: true
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
     *
     * @return {Boolean}
     */
    isErrorServer() {
      const err = this.errors.errors
      return err && this.objKey in err && `${this.objKey}_confirmation` in err
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
        this.$v.v.$touch()

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
        this.$v.vc.$touch()

        if (!this.dirty) {
          this.$emit('dirty')
        }

        return this.$emit('confirmation', newVal)
      }
    }
  }
}
