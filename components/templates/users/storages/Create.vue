<template>
  <storage-form-field
    v-model="form"
    :preview-image="previewImage"
    :releases="releases"
    @submit="onSubmit"
  />
</template>

<script>
import StorageFormField from '@/components/organisms/field/StorageFormField'

export default {
  components: {
    StorageFormField
  },

  props: {
    value: {
      type: Object,
      required: true
    },

    previewImage: {
      type: Object,
      default: undefined
    },

    releases: {
      type: Array,
      required: true
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
    }
  }
}
</script>
