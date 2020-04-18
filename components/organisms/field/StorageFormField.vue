<template>
  <v-form @submit.prevent="onSubmit" @keydown="form.onKeydown($event)">
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
                  :disabled="form.busy"
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

              <image-file-input
                v-model="form.eyecatch_image"
                :label="$t('eyecatch_image')"
                :preview="eyecatch_image_display_src"
                accept="image/*"
                filled
                height="200px"
              />
            </v-col>

            <v-col cols="5">
              <h3>objファイル</h3>

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
              <form-description
                v-model="form.description"
                :dirty="formDirty"
                :errors="form.errors"
                @dirty="dirty"
                obj-key="description"
              />
            </v-col>

            <v-col cols="12">
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
</template>

<script>
import { getThumbnailUrl } from '@/utils/image'
import FormTitle from '@/components/molecues/form/FormTitle'
import FormWebAddress from '@/components/molecues/form/FormWebAddress'
import FormDescription from '@/components/molecues/form/FormDescription'
import FormLongComment from '@/components/molecues/form/FormLongComment'
import ImageFileInput from '@/components/molecues/form/ImageFileInput'

export default {
  components: {
    ImageFileInput,
    FormTitle,
    FormWebAddress,
    FormDescription,
    FormLongComment
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
    }
  },

  methods: {
    dirty() {
      this.formDirty = true
    },

    onSubmit() {
      return this.$emit('submit')
    }
  }
}
</script>
