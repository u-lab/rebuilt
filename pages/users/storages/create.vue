<template>
  <div>
    <user-title class="text-center" title="-my work-" />

    <v-form @submit.prevent="create" @keydown="form.onKeydown($event)">
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
                <!-- title -->
                <form-title
                  v-model="form.title"
                  :dirty="formDirty"
                  :errors="form.errors"
                  @dirty="dirty"
                  obj-key="title"
                />
              </v-col>

              <v-col cols="12">
                <!-- web_address -->
                <form-web-address
                  v-model="form.web_address"
                  :dirty="formDirty"
                  :errors="form.errors"
                  @dirty="dirty"
                  obj-key="web_address"
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
                <form-description
                  v-model="form.description"
                  :dirty="formDirty"
                  :errors="form.errors"
                  @dirty="dirty"
                  obj-key="description"
                />
              </v-col>
            </v-row>

            <v-row>
              <v-col>
                <!-- long_comment -->
                <!-- TODO: tinyMCEのようなエディタに置き換えたい -->
                <form-long-comment
                  v-model="form.long_comment"
                  :dirty="formDirty"
                  :errors="form.errors"
                  @dirty="dirty"
                  obj-key="long_comment"
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
import Form from 'vform'
import { objectToFormData } from 'object-to-formdata'
import UserTitle from '~/components/molecues/pages/UserTitle'
import EyeCatchImageDisplay from '@/components/molecues/form/EyeCatchImageDisplay'
import FormTitle from '@/components/molecues/form/FormTitle'
import FormWebAddress from '@/components/molecues/form/FormWebAddress'
import FormDescription from '@/components/molecues/form/FormDescription'
import FormLongComment from '@/components/molecues/form/FormLongComment'

export default {
  middleware: 'auth',

  layout: 'user',

  components: {
    EyeCatchImageDisplay,
    FormTitle,
    FormWebAddress,
    FormDescription,
    FormLongComment,
    UserTitle
  },

  data() {
    return {
      form: new Form({
        description: '' /* String */,
        long_comment: '' /* String */,
        title: '' /* String */,
        eyecatch_image: '' /* FILE */,
        storage: '' /* FILE */,
        web_address: '' /* URL */
      }),
      formDirty: false,
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

      return ''
    }
  },

  methods: {
    dirty() {
      this.formDirty = true
    },

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
        this.preview.eyecatch_image_url = URL.createObjectURL(e)
      } catch (e) {
        this.preview.eyecatch_image_url = null
      }
    }
  }
}
</script>
