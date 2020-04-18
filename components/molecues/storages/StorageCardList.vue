<template>
  <div>
    <v-row>
      <template v-for="(storage, key) in storages">
        <v-col :key="key" cols="6" sm="4" md="3">
          <storage-card
            :src="getSrc(storage.eyecatch_image)"
            :title="storage.title"
            :to="{
              name: 'pages.storages.show',
              params: {
                user: user,
                storageId: storage.storage_id
              }
            }"
          />
        </v-col>
      </template>
    </v-row>
  </div>
</template>

<script>
import StorageCard from '@/components/molecues/cards/StorageCard'

export default {
  components: {
    StorageCard
  },

  props: {
    user: {
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
      return (obj) => obj.url_320 || obj.url_640 || obj.url
    }
  }
}
</script>
