<template>
  <v-card :to="to" :height="height" :title="title">
    <div :style="heightStyle" class="pos-relative">
      <v-img
        :src="src"
        :height="height"
        class="align-center white--text"
        gradient="rgba(0,0,0,.5), rgba(0,0,0,.5)"
      >
      </v-img>

      <div class="d-flex justify-center pos-bottom storage_index_card_title">
        <v-card-title>
          {{ title }}
        </v-card-title>
      </div>
    </div>
  </v-card>
</template>

<script>
export default {
  props: {
    src: {
      type: String,
      required: true
    },

    title: {
      type: String,
      required: true
    },

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
