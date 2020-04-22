<template>
  <v-card :to="to" nuxt>
    <v-img :src="src" :height="height" />

    <v-card-title
      v-text="title"
      class="d-flex justify-center py-1 text-capitalize storage-title"
    />
  </v-card>
</template>

<script>
export default {
  props: {
    height: {
      type: [String, Number],
      default: '200px'
    },

    src: {
      type: String,
      required: false,
      default: '/no-image.png'
    },

    title: {
      type: String,
      required: true
    },

    to: {
      type: [String, Object],
      required: false,
      default: undefined
    }
  }
}
</script>

<style lang="scss" scoped>
.storage-title {
  font-size: 1rem;
}
</style>
