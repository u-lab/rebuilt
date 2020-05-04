<template>
  <v-list-item :to="to" link nuxt dark>
    <v-list-item-title v-text="title" />
  </v-list-item>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: undefined
    },

    to: {
      type: [String, Object],
      default: undefined
    }
  }
}
</script>
