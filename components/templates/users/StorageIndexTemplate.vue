<template>
  <div>
    <!-- TODO 自分の作品を見る -->
    <user-title-text :title="$t('mywork')" class="text-center" />

    <v-container>
      <v-row>
        <v-col cols="12" sm="6" md="4">
          <storage-create-card
            :to="{
              name: 'users.storages.create'
            }"
          />
        </v-col>

        <v-col
          v-for="(items, key) in storages"
          :key="key"
          cols="12"
          sm="6"
          md="4"
        >
          <storage-edit-card
            :to="{
              name: 'users.storages.edit',
              params: { storageId: items.storage_id }
            }"
            :color="
              masterpieceStorageId === items.storage_id ? 'yellow' : 'white'
            "
            :disabled="disabled"
            :title="items.title"
            :src="getSrc(items.eyecatch_image)"
            @click="onClick(items.storage_id)"
          />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { getSmallUrl } from '@/utils/image'
const UserTitleText = () => import('@/components/atoms/text/UserTitleText')
const StorageEditCard = () =>
  import('@/components/molecues/cards/StorageEditCard')
const StorageCreateCard = () =>
  import('@/components/molecues/cards/StorageCreateCard')

export default {
  components: {
    UserTitleText,
    StorageCreateCard,
    StorageEditCard
  },

  props: {
    disabled: {
      type: Boolean,
      default: false
    },

    storages: {
      type: Array,
      required: true
    },

    masterpieceStorageId: {
      type: String,
      required: true
    },

    user: {
      type: Object,
      required: true
    }
  },

  computed: {
    cardHeight() {
      return '200px'
    },

    cardHeightStyle() {
      return `height: ${this.cardHeight};`
    },

    getSrc() {
      return (image) => getSmallUrl(image)
    }
  },

  methods: {
    onClick(storageId) {
      return this.$emit('click', storageId)
    }
  }
}
</script>

<style></style>
