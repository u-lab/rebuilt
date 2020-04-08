<template>
  <eye-catch-image-display :height="height" :src="getPreview">
    <base-file-input
      v-model="valueModel"
      @change="onChange"
      :accept="accept"
      :height="height"
      :label="label"
      no-icon
    />
  </eye-catch-image-display>
</template>

<script>
import BaseFileInput from '@/components/molecues/form/BaseFileInput'
import EyeCatchImageDisplay from '@/components/molecues/form/EyeCatchImageDisplay'
import { convertToArray } from '@/utils/array'

export default {
  components: {
    BaseFileInput,
    EyeCatchImageDisplay
  },

  props: {
    accept: {
      type: String,
      required: false,
      default: 'image/*'
    },

    height: {
      type: [Number, String],
      required: false,
      default: undefined
    },

    label: {
      type: String,
      required: false,
      default: ''
    },

    preview: {
      type: String,
      required: false,
      default: null
    },

    /**
     * @see { @link https://github.com/vuetifyjs/vuetify/blob/master/packages/vuetify/src/components/VFileInput/VFileInput.ts | Vuetify }
     */
    value: {
      default: undefined,
      validator: (val) => {
        return convertToArray(val).every(
          (v) => v != null && typeof v === 'object'
        )
      }
    }
  },

  data() {
    return {
      newPreview: null
    }
  },

  computed: {
    getPreview() {
      return this.newPreview || this.preview
    },

    valueModel: {
      get() {
        return this.value
      },

      set(newVal) {
        return this.$emit('input', newVal)
      }
    }
  },

  methods: {
    onChange(e) {
      // e は FILE Objectであることに注意
      try {
        this.newPreview = URL.createObjectURL(e)
      } catch (err) {
        this.newPreview = null
      }
    }
  }
}
</script>
