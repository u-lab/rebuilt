<template>
  <div>
    <h2 v-text="$t('other_work')" />

    <storage-card-list :user-name="userName" :storages="storages" />
  </div>
</template>

<script>
import StorageCardList from '@/components/organisms/list/StorageCardList'

export default {
  components: {
    StorageCardList
  },

  props: {
    userName: {
      type: String,
      required: true
    },

    storages: {
      type: Array,
      required: false,
      default: undefined
    }
  }
}
</script>

<style></style>
