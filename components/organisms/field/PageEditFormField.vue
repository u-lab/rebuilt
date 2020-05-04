<template>
  <div class="px-4 px-sm-6">
    <v-form @submit.prevent="onSubmit" @keydown="form.onKeydown($event)">
      <div class="d-flex justify-space-between mb-2">
        <user-title :title="$t('edit_my_portfolio')" />

        <!-- Submit Button -->
        <v-btn
          :disabled="form.busy"
          v-text="$t('store')"
          class="teal--text text--lighten-1"
          color="grey lighten-3"
          large
          type="submit"
        />
      </div>

      <v-row class="flex-column pt-8">
        <v-col cols="12" sm="6" md="4" class="pb-0">
          <v-text-field
            v-model="form.nick_name"
            :dirty="formDirty"
            :errors="form.errors"
            :label="$t('name')"
            :lazy-validation="true"
            @dirty="dirty"
            obj-key="nick_name"
            outlined
          />

          <v-text-field
            v-model="form.kana"
            :dirty="formDirty"
            :errors="form.errors"
            :label="$t('kana')"
            :lazy-validation="true"
            @dirty="dirty"
            obj-key="kana"
            outlined
          />
        </v-col>

        <v-col cols="12" sm="10" class="pt-0">
          <v-textarea
            v-model="form.description"
            :dirty="formDirty"
            :errors="form.errors"
            :label="$t('description')"
            :lazy-validation="true"
            @dirty="dirty"
            auto-grow
            obj-key="description"
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

      <div class="d-flex justify-end mb-2 pt-4">
        <!-- Submit Button -->
        <v-btn
          :disabled="form.busy"
          v-text="$t('store')"
          class="teal--text text--lighten-1"
          color="grey lighten-3"
          large
          type="submit"
        />
      </div>
    </v-form>
  </div>
</template>

<script>
const ImageFileInput = () => import('@/components/molecues/form/ImageFileInput')
const UserCareerField = () =>
  import('@/components/organisms/field/UserCareerField')
const UserTitle = () => import('@/components/molecues/pages/UserTitle')

export default {
  components: {
    ImageFileInput,
    UserCareerField,
    UserTitle
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
      preview_icon_src: null,
      formDirty: false
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
    dirty() {
      this.formDirty = true
    },

    onSubmit() {
      return this.$emit('submit')
    },

    updateDid(newVal) {
      this.form.user_career_did = newVal
    }
  }
}
</script>
