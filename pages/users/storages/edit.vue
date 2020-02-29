<template>
  <div>
    <!-- TODO 作品情報を修正 -->
    <v-form @submit.prevent="update" @keydown="form.onKeydown($event)">
      <!-- title -->
      <v-text-field
        v-model="form.title"
        :counter="255"
        :label="$t('title')"
        required
      />

      <!-- description -->
      <v-text-field
        v-model="form.description"
        :counter="255"
        :label="$t('description')"
        required
      />

      <!-- long_comment -->
      <v-text-field
        v-model="form.long_comment"
        :counter="255"
        :label="$t('long_comment')"
        required
      />

      <!-- eyecatch_image -->
      <v-file-input
        v-model="form.eyecatch_image"
        :label="$t('eyecatch_image')"
        @change="eyecatchImageFileChange"
        accept="image/*"
        show-size
        filled
        prepend-icon="mdi-camera"
      />

      <!-- storage -->
      <v-file-input
        v-model="form.storage"
        :label="$t('storage')"
        show-size
        filled
        prepend-icon="mdi-camera"
      />

      <!-- Submit Button -->
      <div class="text-center login-btn-wraaper">
        <!-- Submit Button -->
        <v-btn :disabled="form.busy" color="grey lighten-1" large type="submit">
          {{ $t('update') }}
        </v-btn>
      </div>
    </v-form>

    <v-card>
      <v-card-title>アイキャッチ画像</v-card-title>

      <div v-if="preview.eyecatch_image">
        <v-img :src="preview.eyecatch_image" alt="" width="300px" />
      </div>

      <div v-else-if="form.eyecatch_image_url">
        <v-img :src="form.eyecatch_image_url" alt="" width="300px" />
      </div>

      <div v-else>
        <p>アイキャッチ画像はありません。</p>
      </div>
    </v-card>
  </div>
</template>

<script>
import axios from 'axios'
import Form from 'vform'
import { objectToFormData } from 'object-to-formdata'

// ストレージIDの不一致時にエラーを投げる
function throwNotEqualStorageID() {
  throw new Error('NotEqualStorageID')
}

export default {
  middleware: 'auth',

  layout: 'user',

  data() {
    return {
      form: new Form({
        storage_id: '' /* Never Change!! */,
        description: '' /* String */,
        long_comment: '' /* String */,
        eyecatch_image: '' /* FILE */,
        eyecatch_image_url: '' /* URL */,
        title: '' /* String */,
        storage: '' /* FILE */,
        storage_url: '' /* URL */,
        web_address: '' /* URL */
      }),
      /* preview表示用 */
      preview: {
        eyecatch_image: ''
      }
    }
  },

  async asyncData({ params, error }) {
    const { data } = await axios.get(`/users/storage/${params.storageId}`)
    return { success: true, data: data.data }
  },

  created() {
    // Fill the form with data.
    this.form.keys().forEach((key) => {
      if (this.data[key] !== null) {
        this.form[key] = this.data[key]
      }
    })
  },

  methods: {
    async update() {
      const storageId = this.form.storage_id

      // storageID が書き換えられていないか確認
      try {
        if (storageId !== this.data.storage_id) {
          throwNotEqualStorageID()
        }
      } catch (err) {
        return this.$nuxt.error({
          statusCode: err.response.status,
          message: err.response.message
        })
      }

      // API Serverに PATCH する
      try {
        await this.form
          .post(`/users/storage/${storageId}`, {
            transformRequest: [
              function(data, headers) {
                data._method = 'PATCH'
                return objectToFormData(data)
              }
            ]
          })
          .then((response) => {
            // Redirect User Dashboard.
            this.$router.push({ name: 'users.dashboard' })
          })
      } catch (e) {
        // TODO: 何が起きるかはわからないが、そのログをとりたい。
      }
    },

    eyecatchImageFileChange(e) {
      // e は FILE Objectであることに注意
      try {
        this.preview.eyecatch_image = URL.createObjectURL(e)
      } catch (e) {
        this.preview.eyecatch_image = null
      }
    }
  }
}
</script>
