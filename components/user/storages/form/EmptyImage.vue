<template>
  <v-card class="pos-topLeftAlign user_storage_eyecatch_image_empty">
    <div :style="styleHeight" class="pos-relative">
      <v-icon class="pos-topAndBottomCenter" light x-large>
        mdi-plus
      </v-icon>
    </div>
  </v-card>
</template>

<script>
export default {
  props: {
    height: {
      type: [String, Number],
      default: '200px'
    }
  },

  computed: {
    styleHeight() {
      return `height: ${this.height};`
    }
  }
}
</script>
