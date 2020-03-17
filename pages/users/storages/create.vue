<template>
  <div>
    <user-title class="text-center" title="-my work-" />

    <!-- TODO 作品情報を修正 -->
    <v-form @submit.prevent="create" @keydown="form.onKeydown($event)">
      <v-container class="top">
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
                    class="teal--text text--lighten-1 mr-4"
                    color="#CFD8DC"
                  >
                    Store
                  </v-btn>
                </div>
              </div>
            </div>
          </v-card>

          <v-container>
            <v-row>
              <!-- 画像のForm -->
              <v-col cols="7">
                <h3>メイン画像</h3>

                <div class="user_storage_eyecatch_image_input">
                  <!-- eyecatch_image -->
                  <v-file-input
                    v-model="form.eyecatch_image"
                    :label="$t('eyecatch_image')"
                    @change="eyecatchImageFileChange"
                    accept="image/*"
                    show-size
                    filled
                    height="200px"
                  />

                  <template v-if="preview.eyecatch_image">
                    <div class="user_storage_eyecatch_image_display">
                      <v-img
                        :src="preview.eyecatch_image"
                        alt=""
                        height="200px"
                      />
                    </div>
                  </template>

                  <template v-else-if="form.eyecatch_image_url">
                    <div class="user_storage_eyecatch_image_display">
                      <v-img
                        :src="form.eyecatch_image_url"
                        alt=""
                        height="200px"
                      />
                    </div>
                  </template>

                  <!-- TODO: Plus Icon の上下中央揃え -->
                  <template v-else>
                    <v-card
                      class="user_storage_eyecatch_image_display"
                      style="border: 1px solid #111"
                    >
                      <div style="height: 200px">
                        <v-icon light x-large>mdi-plus</v-icon>
                      </div>
                    </v-card>
                  </template>
                </div>
              </v-col>

              <v-col cols="5">
                <h3>Stl obj fbxファイル</h3>

                <!-- TODO: Plus Icon の上下中央揃え -->
                <v-card style="border: 1px solid #444">
                  <div style="height: 200px">
                    <v-icon light x-large>mdi-plus</v-icon>
                  </div>
                </v-card>
              </v-col>
            </v-row>

            <v-row>
              <v-col>
                <!-- long_comment -->
                <!-- TODO: tinyMCEのようなエディタに置き換えたい -->
                <v-text-field
                  v-model="form.long_comment"
                  :counter="255"
                  :label="$t('long_comment')"
                  height="300px"
                  required
                  outlined
                  clearable
                />
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-container>

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

      <!-- web_address -->
      <v-text-field
        v-model="form.web_address"
        :counter="255"
        :label="$t('web_address')"
        required
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
import Form from 'vform'
import { objectToFormData } from 'object-to-formdata'
import UserTitle from '~/components/user/UserTitle'

export default {
  middleware: 'auth',

  layout: 'user',

  components: {
    UserTitle
  },

  data() {
    return {
      form: new Form({
        description: '' /* String */,
        long_comment: '' /* String */,
        eyecatch_image: '' /* FILE */,
        title: '' /* String */,
        storage: '' /* FILE */,
        web_address: '' /* URL */
      }),
      /* preview表示用 */
      preview: {
        eyecatch_image: ''
      }
    }
  },

  methods: {
    async create() {
      // API Serverに POST する
      try {
        await this.form
          .post(`/users/storage`, {
            transformRequest: [
              function(data, headers) {
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
