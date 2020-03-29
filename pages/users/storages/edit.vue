<template>
  <div>
    <user-title class="text-center" title="-my work-" />

    <!-- TODO 作品情報を修正 -->
    <v-form @submit.prevent="update" @keydown="form.onKeydown($event)">
      <v-container>
        <v-card>
          <v-card color="#26A69A" dark>
            <div class="px-4">
              <div class="d-flex justify-space-between">
                <div>
                  <v-card-title>
                    <v-icon dark x-large>mdi-plus</v-icon>Work
                  </v-card-title>
                </div>

                <div class="d-flex align-center">
                  <v-btn
                    class="teal--text text--lighten-1 mr-4"
                    color="#CFD8DC"
                  >
                    Preview
                  </v-btn>

                  <v-btn
                    :disabled="form.busy"
                    class="teal--text text--lighten-1 mr-4"
                    color="#CFD8DC"
                    type="submit"
                  >
                    {{ $t('store') }}
                  </v-btn>
                </div>
              </div>
            </div>
          </v-card>

          <v-container>
            <v-row>
              <v-col cols="12">
                <!-- title
                <form-title v-model="form.title" :errors="form.errors" />
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
                <!-- web_address -->
                <v-text-field
                  v-model="form.web_address"
                  :error-messages="form.errors.errors.web_address"
                  :counter="255"
                  :label="$t('web_address')"
                  required
                  outlined
                  clearable
                />
              </v-col>
            </v-row>
            <v-row>
              <!-- 画像のForm -->
              <v-col cols="7">
                <h3>{{ $t('eyecatch_image') }}</h3>

                <eye-catch-image-display
                  :src="eyecatch_image_display_src"
                  height="200px"
                >
                  <!-- eyecatch_image -->
                  <v-file-input
                    v-model="form.eyecatch_image"
                    :label="$t('eyecatch_image')"
                    @change="eyecatchImageFileChange"
                    accept="image/*"
                    filled
                    height="200px"
                  />
                </eye-catch-image-display>
              </v-col>

              <v-col cols="5">
                <h3>Stl obj fbxファイル</h3>

                <div class="pos-relative v-file-input-icon-none">
                  <!-- storage -->
                  <v-file-input
                    v-model="form.storage"
                    :label="$t('storage')"
                    filled
                    height="200px"
                  />

                  <v-card class="pos-topLeftAlign user_storage_object_empty">
                    <div class="pos-relative" style="height: 200px">
                      <v-icon class="pos-topAndBottomCenter" light x-large>
                        mdi-plus
                      </v-icon>
                    </div>
                  </v-card>
                </div>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="12">
                <!-- description -->
                <v-text-field
                  v-model="form.description"
                  :error-messages="form.errors.errors.description"
                  :counter="255"
                  :label="$t('description')"
                  required
                  outlined
                  clearable
                />
              </v-col>
            </v-row>

            <v-row>
              <v-col>
                <!-- long_comment -->
                <!-- TODO: tinyMCEのようなエディタに置き換えたい -->
                <v-text-field
                  v-model="form.long_comment"
                  :error-messages="form.errors.errors.long_comment"
                  :counter="255"
                  :label="$t('long_comment')"
                  height="300px"
                  required
                  outlined
                  clearable
                />
              </v-col>
            </v-row>

            <!-- Submit Button -->
            <div class="text-right login-btn-wraaper">
              <v-btn
                :disabled="form.busy"
                color="grey lighten-1"
                large
                type="submit"
              >
                {{ $t('store') }}
              </v-btn>
            </div>
          </v-container>
        </v-card>
      </v-container>
    </v-form>
  </div>
</template>

<script>
import axios from 'axios'
import Form from 'vform'
import { objectToFormData } from 'object-to-formdata'
import UserTitle from '~/components/user/UserTitle'
import EyeCatchImageDisplay from '@/components/user/storages/form/EyeCatchImageDisplay'
import FormTitle from '@/components/user/storages/form/FormTitle'

// ストレージIDの不一致時にエラーを投げる
function throwNotEqualStorageID() {
  throw new Error('NotEqualStorageID')
}

export default {
  middleware: 'auth',
  components: {
    EyeCatchImageDisplay,
    FormTitle,
    UserTitle
  },

  layout: 'user',

  data() {
    return {
      form: new Form({
        user_id: '' /* Never Change!! */,
        storage_id: '' /* Never Change!! */,
        description: '' /* String */,
        long_comment: '' /* String */,
        eyecatch_image: '' /* FILE */,
        eyecatch_image_id: '' /* UUID Never Change!! */,
        title: '' /* String */,
        storage: '' /* FILE */,
        storage_url: '' /* URL */,
        web_address: '' /* URL */
      }),
      /* preview表示用 */
      preview: {
        eyecatch_image_url: ''
      }
    }
  },

  computed: {
    eyecatch_image_display_src() {
      if (this.preview.eyecatch_image_url) {
        return this.preview.eyecatch_image_url
      }

      if (this.data.eyecatch_image.url) {
        return this.data.eyecatch_image.url
      }

      return ''
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
    this.preview.eyecatch_image_url = this.data.eyecatch_image.url
    this.form.eyecatch_image = null /* ApiのObjectが入ってしまうので、空にする */
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
        this.preview.eyecatch_image_url = URL.createObjectURL(e)
      } catch (e) {
        this.preview.eyecatch_image_url = null
      }
    },
    onFileChange(e) {
      const files = e.target.files || e.dataTransfer.files
      this.createImage(files[0])
    },
    // アップロードした画像を表示
    createImage(file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        this.uploadedImage = e.target.result
      }
      reader.readAsDataURL(file)
    }
  }
}
</script>
