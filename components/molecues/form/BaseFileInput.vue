<template>
  <div>
    <v-file-input
      v-model="valueModel"
      @change="onChange"
      :accept="accept"
      :class="{ 'v-file-input-icon-none': noIcon }"
      :filled="filled"
      :height="height"
      :label="label"
    />
  </div>
</template>

<script>
import { getType } from '@/utils/helper'

export default {
  props: {
    accept: {
      type: String,
      required: false,
      default: ''
    },

    filled: {
      type: Boolean,
      required: false,
      default: true
    },

    height: {
      type: [Number, String],
      required: false,
      default: undefined
    },

    noIcon: {
      type: Boolean,
      required: false,
      default: true
    },

    label: {
      type: String,
      required: false,
      default: ''
    },

    /**
     * @see { @link https://github.com/vuetifyjs/vuetify/blob/master/packages/vuetify/src/components/VFileInput/VFileInput.ts | Vuetify }
     */
    value: {
      default: undefined,
      validator: (val) => {
        return !val || getType(val) === 'file'
      }
    }
  },

  computed: {
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
      return this.$emit('change', e)
    }
  }
}
</script>
