<template>
  <v-row>
    <template v-for="(storage, key) in storages">
      <v-col :key="key" cols="6" sm="4" md="3">
        <storage-card
          :src="getSrc(storage.eyecatch_image)"
          :title="storage.title"
          :to="{
            name: 'pages.storages.show',
            params: {
              user: userName,
              storageId: storage.storage_id
            }
          }"
        />
      </v-col>
    </template>
  </v-row>
</template>

<script>
import { getSmallUrl } from '@/utils/image'
const StorageCard = () => import('@/components/molecues/cards/StorageCard')

export default {
  components: {
    StorageCard
  },

  props: {
    userName: {
      type: String,
      required: true
    },

    storages: {
      type: Array,
      required: true
    }
  },

  computed: {
    getSrc() {
      return (image) => getSmallUrl(image)
    }
  }
}
</script>
