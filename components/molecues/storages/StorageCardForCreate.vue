<template>
  <v-card :to="to" :height="height" color="#26A69A" dark hover>
    <div
      :style="heightStyle"
      class="d-flex justify-center align-center flex-column"
    >
      <v-icon dark x-large>mdi-plus</v-icon>
      <v-card-title>Work</v-card-title>
    </div>
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

<style></style>
