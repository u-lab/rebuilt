<template>
  <v-row align="end">
    <v-col cols="12" sm="7" class="pb-0 pb-sm-3">
      <h1 v-text="title" class="main-title" />
    </v-col>

    <v-col cols="12" sm="5">
      <storage-author-field :kana="kana" :name="name" :src="src" :to="to" />
    </v-col>
  </v-row>
</template>

<script>
import StorageAuthorField from '@/components/organisms/field/StorageAuthorField'

export default {
  components: {
    StorageAuthorField
  },

  props: {
    kana: {
      type: String,
      required: false,
      default: undefined
    },

    name: {
      type: String,
      required: true
    },

    src: {
      type: String,
      required: false,
      default: ''
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
.main-title {
  font-size: 1.5rem;
  font-weight: normal;

  @include mq(sm) {
    font-size: 1.75rem;
  }
}
</style>
