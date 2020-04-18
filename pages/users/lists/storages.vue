<template>
  <div>
    <storages :storages="storages" />
  </div>
</template>

<script>
import Storages from '@/components/templates/users/list/Storages'

export default {
  components: {
    Storages
  },

  middleware: 'auth',

  computed: {
    storages() {
      return this.$store.getters['page/allStorages']
    }
  },

  async fetch({ store }) {
    await store.dispatch('page/fetchAllStorages')
  }
}
</script>
