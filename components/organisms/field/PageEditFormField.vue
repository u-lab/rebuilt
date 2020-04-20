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

      <v-row class="flex-column pt-8">
        <v-col cols="12" sm="6" md="4" class="pb-0">
          <v-text-field v-model="form.nick_name" :label="$t('name')" outlined />

          <v-text-field v-model="form.job_name" :label="$t('kana')" outlined />
        </v-col>

        <v-col cols="10" class="pt-0">
          <v-textarea
            v-model="form.description"
            :label="$t('description')"
            auto-grow
            outlined
            rows="4"
            row-height="30"
          />
        </v-col>
      </v-row>

      <div class="pos-relative">
        <p>ヘッダー画像</p>

        <v-row>
          <v-col cols="12" sm="8">
            <image-file-input
              v-model="form.background_image"
              :label="$t('background_image')"
              :preview="backgroundImageSrc"
              height="180px"
            />
          </v-col>
          <v-col cols="12" sm="4">
            <p>画像ファイルは10MB以下でお願いします</p>
            <p>推奨サイズは1200×300です</p>
          </v-col>
        </v-row>

        <p v-text="$t('icon_image')" />

        <v-row>
          <v-col cols="4" sm="2">
            <image-file-input
              v-model="form.icon_image"
              :label="$t('icon_image')"
              :preview="iconImageSrc"
              height="130px"
            />
          </v-col>
          <v-col cols="12" sm="4">
            <p>画像ファイルは10MB以下でお願いします</p>
            <p>推奨サイズは300×300です</p>
          </v-col>
        </v-row>
      </div>

      <div>
        <user-career-field
          v-model="form.user_career"
          :did="form.user_career_did"
          @did="updateDid"
        />
      </div>
    </v-form>
  </div>
</template>

<script>
import ImageFileInput from '@/components/molecues/form/ImageFileInput'
import UserCareerField from '@/components/organisms/field/UserCareerField'

export default {
  components: {
    ImageFileInput,
    UserCareerField
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
    onSubmit() {
      return this.$emit('submit')
    },

    updateDid(newVal) {
      this.form.user_career_did = newVal
    }
  }
}
</script>
