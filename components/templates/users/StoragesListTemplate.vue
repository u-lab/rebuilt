<template>
  <div>
    <user-title-text :title="$t('see_everyones_works')" class="text-center" />

    <all-storage-card-list :storages="storages" />
  </div>
</template>

<script>
const AllStorageCardList = () =>
  import('@/components/organisms/list/AllStorageCardList')
const UserTitleText = () => import('@/components/atoms/text/UserTitleText')

export default {
  components: {
    AllStorageCardList,
    UserTitleText
  },

  props: {
    storages: {
      type: Array,
      required: true
    }
  }
}
</script>
