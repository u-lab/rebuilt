<template>
  <v-form @submit.prevent="onSubmit" @keydown="form.onKeydown($event)">
    <v-container>
      <v-card>
        <v-card color="#26A69A" dark>
          <div class="px-4">
            <div class="d-flex justify-space-between flex-column flex-sm-row">
              <div>
                <v-card-title>
                  <v-icon dark x-large>mdi-plus</v-icon>Work
                </v-card-title>
              </div>

              <div
                class="d-flex align-center flex-column flex-md-row mb-4 mb-md-0"
              >
                <v-select
                  v-model="form.release_id"
                  :label="$t('release')"
                  :items="releaseItems"
                  class="mr-4"
                />

                <div>
                  <v-btn
                    :disabled="form.busy"
                    @click="onPreview"
                    class="teal--text text--lighten-1 mr-4"
                    color="#CFD8DC"
                  >
                    {{ $t('preview') }}
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
          </div>
        </v-card>

        <v-container class="px-4 px-md-6">
          <v-row>
            <v-col cols="12">
              <!-- title -->
              <form-title-text-field
                v-model="form.title"
                :dirty="formDirty"
                :errors="form.errors"
                :lazy-validation="true"
                @dirty="dirty"
                obj-key="title"
              />
            </v-col>

            <v-col cols="12">
              <!-- web_address -->
              <form-web-address-text-field
                v-model="form.web_address"
                :dirty="formDirty"
                :errors="form.errors"
                :lazy-validation="true"
                @dirty="dirty"
                obj-key="web_address"
              />
            </v-col>
          </v-row>
          <v-row>
            <!-- 画像のForm -->
            <v-col cols="12" sm="7">
              <h3>{{ $t('eyecatch_image') }}</h3>

              <image-file-input
                v-model="form.eyecatch_image"
                :label="$t('eyecatch_image')"
                :preview="eyecatch_image_display_src"
                accept="image/*"
                filled
                height="200px"
              />
            </v-col>

            <v-col cols="12" sm="5">
              <h3>objファイル</h3>

              <p v-if="previewStorage">
                objファイルを更新する場合は、以下にファイルを入れてください。
              </p>

              <!-- storage -->
              <v-file-input
                v-model="form.storage"
                :label="$t('storage')"
                accept=".obj, .stl"
                filled
              />
            </v-col>

            <v-col cols="12">
              <!-- description -->
              <form-description-text-field
                v-model="form.description"
                :dirty="formDirty"
                :errors="form.errors"
                :lazy-validation="true"
                @dirty="dirty"
                obj-key="description"
              />
            </v-col>

            <v-col cols="12">
              <!-- long_comment -->
              <!-- TODO: tinyMCEのようなエディタに置き換えたい -->
              <form-long-comment-text-field
                v-model="form.long_comment"
                :dirty="formDirty"
                :errors="form.errors"
                :lazy-validation="true"
                @dirty="dirty"
                obj-key="long_comment"
              />
            </v-col>
          </v-row>

          <!-- Submit Button -->
          <div class="text-right p-2">
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
</template>

<script>
import { getThumbnailUrl } from '@/utils/image'
const FormTitleTextField = () =>
  import('@/components/organisms/textField/FormTitleTextField')
const FormWebAddressTextField = () =>
  import('@/components/organisms/textField/FormWebAddressTextField')
const FormDescriptionTextField = () =>
  import('@/components/organisms/textField/FormDescriptionTextField')
const FormLongCommentTextField = () =>
  import('@/components/organisms/textField/FormLongCommentTextField')
const ImageFileInput = () => import('@/components/molecues/form/ImageFileInput')

export default {
  components: {
    ImageFileInput,
    FormTitleTextField,
    FormWebAddressTextField,
    FormDescriptionTextField,
    FormLongCommentTextField
  },

  props: {
    value: {
      type: Object,
      required: true
    },

    releases: {
      type: Array,
      required: true
    },

    previewImage: {
      type: Object,
      default: undefined
    },

    previewStorage: {
      type: Object,
      default: undefined
    }
  },

  data() {
    return {
      formDirty: false
    }
  },

  computed: {
    eyecatch_image_display_src() {
      return this.previewImage ? getThumbnailUrl(this.previewImage) : null
    },

    form: {
      get() {
        return this.value
      },
      set(newVal) {
        return this.$emit('input', newVal)
      }
    },

    releaseItems() {
      return this.releases.map((obj) => ({
        text: this.$t(obj.name),
        value: obj.id
      }))
    }
  },

  methods: {
    dirty() {
      this.formDirty = true
    },

    onSubmit() {
      this.formDirty = false
      return this.$emit('submit')
    },

    onPreview() {
      this.formDirty = false
      return this.$emit('preview')
    }
  }
}
</script>
