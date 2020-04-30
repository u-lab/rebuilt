<template>
  <div>
    <index
      :disabled="form.busy"
      :masterpiece-storage-id="masterpieceStorageId"
      :user="user"
      :storages="storages"
      @click="onClick"
    />
  </div>
</template>

<script>
import Form from 'vform'
const Index = () => import('@/components/templates/users/storages/Index')

export default {
  components: {
    Index
  },

  middleware: 'auth',

  data() {
    return {
      form: new Form({
        user_id: '',
        masterpiece_storage_id: ''
      })
    }
  },

  computed: {
    user() {
      return this.$store.getters['auth/user']
    },

    storages() {
      return this.$store.getters['storage/storages']
    },

    masterpieceStorageId() {
      return this.$store.getters['storage/masterpiece_storage_id']
    }
  },

  async fetch({ store, error }) {
    await store.dispatch('storage/fetchStorages')
    await store.dispatch('storage/fetchMasterpiece')
  },

  created() {
    this.form.user_id = this.user.id
    this.form.masterpiece_storage_id = this.masterpieceStorageId
  },

  methods: {
    async onClick(storageId) {
      this.form.masterpiece_storage_id = storageId

      try {
        const { data } = await this.form.patch(`users/page`)

        this.$store.commit(
          'storage/SET_masterpiece_storage_id',
          data.data.masterpiece_storage.storage_id
        )

        document.activeElement.blur()
      } catch (e) {}
    }
  }
}
</script>
