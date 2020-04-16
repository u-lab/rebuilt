<template>
  <v-card max-width="540px" width="100%">
    <v-img :src="getSrc" max-width="540px" width="100%" />

    <v-card-title v-text="storage.title" class="text-capitalize" />

    <v-card-text>
      <div v-text="storage.description" />
    </v-card-text>

    <v-card-actions>
      <v-spacer />

      <v-btn
        :to="{
          name: 'pages.storages.show',
          params: {
            user: userName,
            storageId: storage.storage_id
          }
        }"
        color="#2b3360"
        text
      >
        <span v-text="`詳しく見る`" class="right-arrow" />
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { getMediumUrl } from '@/utils/image'

export default {
  props: {
    storage: {
      type: Object,
      required: true
    },

    userName: {
      type: String,
      required: true
    }
  },

  computed: {
    getSrc() {
      return getMediumUrl(this.storage.eyecatch_image)
    }
  }
}
</script>

<style lang="scss" scoped>
.right-arrow {
  &::after {
    content: '→';
  }
}
</style>
