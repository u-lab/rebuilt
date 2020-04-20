<template>
  <div>
    <edit
      v-model="form"
      :releases="releases"
      :preview-image="storage.eyecatch_image"
      :preview-storage="storage.storage_file[0]"
      @submit="onSubmit"
      @preview="onPreview"
    />
  </div>
</template>

<script>
import Form from 'vform'
import { objectToFormData } from 'object-to-formdata'
import Edit from '@/components/templates/users/storages/Edit'

// ストレージIDの不一致時にエラーを投げる
function throwNotEqualStorageID() {
  throw new Error('NotEqualStorageID')
}

export default {
  middleware: 'auth',

  components: {
    Edit
  },

  data() {
    return {
      form: new Form({
        user_id: '' /* Integer Never Change!! */,
        storage_id: '' /* String Never Change!! */,
        description: '' /* String */,
        long_comment: '' /* String */,
        eyecatch_image: '' /* FILE */,
        eyecatch_image_id: '' /* Integer Never Change!! */,
        release_id: '' /* Integer */,
        title: '' /* String */,
        storage: '' /* FILE */,
        web_address: '' /* URL */
      })
    }
  },

  computed: {
    storage() {
      return this.$store.getters['storage/storage']
    },

    releases() {
      return this.$store.getters['release/releases']
    },

    user() {
      return this.$store.getters['auth/user']
    }
  },

  async fetch({ store, params, error }) {
    // releaseの取得
    await store.dispatch('release/fetchReleases')
    await store.dispatch('storage/fetchStorage', params.storageId)
  },

  created() {
    // Fill the form with data.
    this.form.keys().forEach((key) => {
      if (this.storage[key] !== null) {
        this.form[key] = this.storage[key]
      }
    })

    this.form.release_id = this.storage.release.id
    this.form.eyecatch_image = null /* ApiのObjectが入ってしまうので、空にする */
  },

  methods: {
    async onSubmit() {
      const storageId = this.form.storage_id

      // storageID が書き換えられていないか確認
      try {
        if (storageId !== this.storage.storage_id) {
          throwNotEqualStorageID()
        }
      } catch (err) {
        return this.$nuxt.error({
          statusCode: 500
        })
      }

      // API Serverに PATCH する
      try {
        const { data } = await this.form.post(`/users/storage/${storageId}`, {
          transformRequest: [
            function(data, headers) {
              data._method = 'PATCH'
              return objectToFormData(data)
            }
          ]
        })

        this.$store.commit('storage/PUSH_STORAGE', data.data)

        // Redirect User Dashboard.
        this.$router.push({ name: 'users.dashboard' })
      } catch (e) {}
    },

    async onPreview() {
      const storageId = this.form.storage_id
      this.formDirty = false

      // storageID が書き換えられていないか確認
      try {
        if (storageId !== this.storage.storage_id) {
          throwNotEqualStorageID()
        }
      } catch (err) {
        return this.$nuxt.error({
          statusCode: 500
        })
      }

      // API Serverに PATCH する
      try {
        const { data } = await this.form.post(`/users/storage/${storageId}`, {
          transformRequest: [
            function(data, headers) {
              data._method = 'PATCH'
              return objectToFormData(data)
            }
          ]
        })

        this.$store.commit('storage/PUSH_STORAGE', data.data)

        // Redirect User Dashboard.
        this.$router.push({
          name: 'pages.storages.show',
          params: {
            user: this.user.name,
            storageId: this.storage.storage_id
          }
        })
      } catch (e) {}
    }
  }
}
</script>
