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
export default {
  props: {
    value: { type: String, required: true },

    /**
     * APIで発生したエラー
     */
    errors: {
      type: Object,
      default: null
    },

    /**
     * ユーザーが編集したかどうか
     */
    isEdit: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    /**
     * エラーメッセージ
     *
     * @return {?String} エラーメッセージ
     */
    errorMessage() {
      return this.isEdit ? '' : this.errors.errors.title
    },

    valueModel: {
      get() {
        return this.value
      },
      set(newVal) {
        this.isEdit = true /* Userが編集した */
        return this.$emit('input', newVal)
      }
    }
  }
}
</script>
