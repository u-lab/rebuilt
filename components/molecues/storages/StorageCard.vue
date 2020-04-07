<template>
  <v-card :to="to" nuxt>
    <v-img :src="src" />
  </v-card>
</template>

<script>
export default {
  props: {
    src: {
      type: String,
      required: false,
      default: 'no-image.png'
    },

    title: {
      type: String,
      required: true
    },

    to: {
      type: [String, Object],
      required: false,
      default: null
    }
  }
}
</script>
