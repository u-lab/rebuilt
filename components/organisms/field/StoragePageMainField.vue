<template>
  <v-row>
    <v-col cols="12" sm="6" order="2" order-sm="1">
      <v-card>
        <v-img v-if="src" :src="src" />
      </v-card>
    </v-col>

    <v-col cols="12" sm="6" order="1" order-sm="2">
      <div class="mb-1">
        <h3 v-text="$t('comment')" />
      </div>
      <div v-text="content" class="content-field" />
    </v-col>
  </v-row>
</template>

<script>
export default {
  props: {
    content: {
      type: String,
      required: false,
      default: null
    },

    src: {
      type: String,
      required: false,
      default: null
    }
  }
}
</script>

<style lang="scss" scoped>
.content-field {
  border: 1px solid #222;
  border-radius: 5px;
  padding: 1rem;
}
</style>
