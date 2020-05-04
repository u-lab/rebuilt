<template>
  <div
    :style="styleHeight"
    class="pos-topLeftAlign user_storage_eyecatch_image_preview"
  >
    <v-img :src="src" :height="height" :alt="alt" />
    <div :style="styleHeight" class="pos-topLeftAlign" style="width: 100%;">
      <v-icon class="pos-topAndBottomCenter" light x-large>
        mdi-plus
      </v-icon>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    alt: {
      type: String,
      default: ''
    },

    height: {
      type: [String, Number],
      default: '200px'
    },

    src: {
      type: String,
      default: ''
    }
  },

  computed: {
    styleHeight() {
      return `height: ${this.height};`
    }
  }
}
</script>

<style lang="scss" scoped>
.user_storage_eyecatch_image_preview {
  width: 100%;

  /* クリックイベントの無効 */
  pointer-events: none;
}
</style>
