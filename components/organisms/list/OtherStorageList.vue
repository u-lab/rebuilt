<template>
  <div>
    <h2 v-text="$t('other_work')" />

    <storage-card-list
      v-if="storages"
      :user-name="userName"
      :storages="storages"
    />
  </div>
</template>

<script>
const StorageCardList = () =>
  import('@/components/organisms/list/StorageCardList')

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
