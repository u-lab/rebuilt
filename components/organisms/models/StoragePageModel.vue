<template>
  <div>
    <!-- modelの表示をする -->
    <div class="py-2 px-sm-2">
      <div class="d-flex justify-center">
        <v-card :max-width="maxWidth" width="100%">
          <v-img :src="src" :max-width="maxWidth" width="100%" />
        </v-card>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    src: {
      type: String,
      required: true
    },

    maxWidth: {
      type: [Number, String],
      required: false,
      default: '700px'
    }
  }
}
</script>

<style lang="scss" scoped>
.box {
  width: 100%;
  height: 300px;
}
</style>
