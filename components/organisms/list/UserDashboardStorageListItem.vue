<template>
  <v-list-item :to="to" link nuxt>
    <v-list-item-content>
      <v-list-item-title v-text="title" />
    </v-list-item-content>

    <v-list-item-avatar v-if="eyecatch">
      <v-img :src="eyecatch" />
    </v-list-item-avatar>
  </v-list-item>
</template>

<script>
import { getIconUrl } from '@/utils/image'

export default {
  props: {
    item: {
      type: Object,
      required: true
    },

    userName: {
      type: String,
      required: true
    }
  },

  computed: {
    eyecatch() {
      if (this.item.eyecatch_image) {
        return getIconUrl(this.item.eyecatch_image)
      }

      return null
    },

    title() {
      return this.item.title || ''
    },

    to() {
      return {
        name: 'pages.storages.show',
        params: {
          user: this.userName,
          storageId: this.item.storage_id
        }
      }
    }
  }
}
</script>
