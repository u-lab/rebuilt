<template>
  <div>
    <user-title :title="$t('see_everyones_works')" class="text-center" />

    <all-storage-card-list :storages="storages" />
  </div>
</template>

<script>
import AllStorageCardList from '@/components/organisms/list/AllStorageCardList'
import UserTitle from '~/components/molecues/pages/UserTitle'

export default {
  components: {
    AllStorageCardList,
    UserTitle
  },

  props: {
    storages: {
      type: Array,
      required: true
    }
  }
}
</script>
