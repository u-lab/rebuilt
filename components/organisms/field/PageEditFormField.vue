<template>
  <div>
    <v-form @submit.prevent="onSubmit" @keydown="form.onKeydown($event)">
      <div class="d-flex justify-end mb-2">
        <!-- Submit Button -->
        <v-btn
          :disabled="form.busy"
          class="teal--text text--lighten-1"
          color="grey lighten-3"
          large
          type="submit"
        >
          {{ $t('store') }}
        </v-btn>
      </div>

      <div class="pos-relative">
        <image-file-input
          v-model="form.background_image"
          :label="$t('background_image')"
          :preview="backgroundImageSrc"
          height="180px"
        />

        <div class="pos-marginBottomCenter mb-12" style="z-index: 3">
          <div class="pos-relative">
            <v-avatar :size="130" class="pages-user-header-avatar pos-relative">
              <v-img
                v-if="preview_icon_src"
                :src="preview_icon_src"
                class="user_storage_eyecatch_image_preview"
                style="z-index:5;"
              />

              <v-img
                v-else-if="iconImageSrc"
                :src="iconImageSrc"
                class="user_storage_eyecatch_image_preview"
                style="z-index:5;"
              />

              <span
                v-else
                v-text="`アイコン`"
                class="user_storage_eyecatch_image_preview"
              />

              <v-file-input
                v-model="form.icon_image"
                :label="$t('icon')"
                @change="iconImageFileChange"
                accept="image/*"
                class="pos-topLeftAlign v-file-input-icon-none w-100"
                show-size
                filled
                height="130px"
              />
            </v-avatar>

            <div
              class="pos-topAndBottomCenter"
              style="z-index: 10; pointer-events: none;"
            >
              <v-icon size="40" class="user_storage_eyecatch_image_preview">
                mdi-plus
              </v-icon>
            </div>
          </div>
        </div>
      </div>

      <v-row justify="center" align="center" class="flex-column pt-8">
        <v-col cols="4" class="pb-0">
          <v-text-field v-model="form.nick_name" label="name" />

          <v-text-field v-model="form.job_name" label="name" />
        </v-col>

        <v-col cols="10" class="pt-0">
          <v-textarea
            v-model="form.description"
            :label="$t('description')"
            filled
            auto-grow
            rows="4"
            row-height="30"
          />
        </v-col>
      </v-row>
    </v-form>
  </div>
</template>

<script>
import ImageFileInput from '@/components/molecues/form/ImageFileInput'

export default {
  components: {
    ImageFileInput
  },

  props: {
    page: {
      type: Object,
      required: true
    },

    value: {
      type: Object,
      required: true
    },

    backgroundImageSrc: {
      type: String,
      default: undefined
    },

    iconImageSrc: {
      type: String,
      default: undefined
    }
  },

  data() {
    return {
      preview_icon_src: null
    }
  },

  computed: {
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
    iconImageFileChange(e) {
      // e は FILE Objectであることに注意
      try {
        this.preview.icon_image_url = URL.createObjectURL(e)
      } catch (e) {
        this.preview.icon_image_url = null
      }
    }
  }
}
</script>

<style></style>
