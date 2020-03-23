<template>
  <v-card :to="to" :height="height" color="#26A69A" dark hover>
    <slot />
  </v-card>
</template>

<script>
export default {
  props: {
    to: {
      type: Object,
      required: true
    },

    height: {
      type: [String, Number],
      default: '200px'
    }
  },

  computed: {
    heightStyle() {
      return `height: ${this.height};`
    }
  }
}
</script>
