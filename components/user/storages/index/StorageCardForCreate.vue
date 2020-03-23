<template>
  <storage-card :to="to" :height="height">
    <div
      :style="heightStyle"
      class="d-flex justify-center align-center flex-column"
    >
      <v-icon dark x-large>mdi-plus</v-icon>
      <v-card-title>Work</v-card-title>
    </div>
  </storage-card>
</template>

<script>
import StorageCard from '@/components/user/storages/index/StorageCard'

export default {
  components: {
    StorageCard
  },

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
