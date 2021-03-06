export const form = {
  props: {
    value: { type: String, default: '' },

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
      v: this.value
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
      return err && this.objKey in err
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
    }
  }
}
