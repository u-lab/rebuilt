<template>
  <div>
    <v-row>
      <template v-for="(storage, key) in storages">
        <v-col :key="key" cols="6" sm="4" md="3">
          <storage-card
            :src="getSrc(storage.data.eyecatch_image)"
            :title="storage.data.title"
            :to="{
              name: 'pages.storages.show',
              params: {
                user: storage.user.name,
                storageId: storage.data.storage_id
              },
              query: { data: true }
            }"
          />
        </v-col>
      </template>
    </v-row>
  </div>
</template>

<script>
import { getSmallUrl } from '@/utils/image'
const StorageCard = () => import('@/components/molecues/cards/StorageCard')

export default {
  components: {
    StorageCard
  },

  props: {
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
