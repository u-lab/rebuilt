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

export default {
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
    }
  },

  data() {
    return {
      v: this.value
    }
  },

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
      const errors = []
      const validate = this.$v.v
      // ユーザーが一回以上touchしたか
      if (!this.dirty || !this.$v.v.$dirty) {
        if (this.isErrorServer) {
          return this.errorServerMessage
        }
        return errors
      }
      !validate.required && errors.push('タイトルを入力してください')
      return errors
    },

    /**
     * サーバーでエラーが発生したかどうか
     *
     * @return {Boolean}
     */
    isErrorServer() {
      const err = this.errors.errors
      return err && 'title' in err
    },

    /**
     * サーバーで発生したエラー
     *
     * @return {String[]}
     */
    errorServerMessage() {
      return this.errors.errors.title
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
    }
  }
}
</script>
