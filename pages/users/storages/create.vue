<template>
  <storage-create-template
    v-model="form"
    :releases="releases"
    @submit="onSubmit"
    @preview="onPreview"
  />
</template>

<script>
import Form from 'vform'
import { objectToFormData } from 'object-to-formdata'
const StorageCreateTemplate = () =>
  import('@/components/templates/users/StorageCreateTemplate')

export default {
  middleware: 'auth',

  components: {
    StorageCreateTemplate
  },

  data() {
    return {
      form: new Form({
        description: '' /* String */,
        long_comment: '' /* String */,
        title: '' /* String */,
        eyecatch_image: '' /* FILE */,
        release_id: 1 /* Integer */,
        storage: '' /* FILE */,
        web_address: '' /* URL */
      }),
      formDirty: false
    }
  },

  computed: {
    releases() {
      return this.$store.getters['release/releases']
    }
  },

  async fetch({ store, error }) {
    // releaseの取得
    await store.dispatch('release/fetchReleases')
  },

  methods: {
    async onSubmit() {
      // API Serverに PATCH する
      try {
        const { data } = await this.form.post(`/users/storage`, {
          transformRequest: [
            function(data, headers) {
              return objectToFormData(data)
            }
          ]
        })

        this.$store.commit('storage/PUSH_STORAGE', data.data)
        this.$store.commit('page/CLEAR_ALL')

        // Redirect User Dashboard.
        this.$router.push({ name: 'users.dashboard' })
      } catch (e) {}
    },

    async onPreview() {
      // API Serverに PATCH する
      try {
        const { data } = await this.form.post(`/users/storage`, {
          transformRequest: [
            function(data, headers) {
              return objectToFormData(data)
            }
          ]
        })

        this.$store.commit('storage/PUSH_STORAGE', data.data)
        this.$store.commit('page/CLEAR_ALL')

        // Redirect User Dashboard.
        this.$router.push({
          name: 'pages.storages.show',
          params: {
            user: this.user.name,
            storageId: data.data.storage_id
          }
        })
      } catch (e) {}
    }
  }
}
</script>
