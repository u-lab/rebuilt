<template>
  <storages-list-template :storages="storages" />
</template>

<script>
const StoragesListTemplate = () =>
  import('@/components/templates/users/StoragesListTemplate')

export default {
  components: {
    StoragesListTemplate
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
