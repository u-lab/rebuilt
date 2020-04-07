<template>
  <div class="pos-relative v-file-input-icon-none">
    <slot />

    <preview-image v-if="src" :alt="alt" :height="height" :src="src" />

    <empty-image v-else :height="height" />
  </div>
</template>

<script>
import EmptyImage from '@/components/molecues/form/EmptyImage'
import PreviewImage from '@/components/molecues/form/PreviewImage'

export default {
  components: {
    EmptyImage,
    PreviewImage
  },

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
