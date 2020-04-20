<template>
  <div>
    <page-edit-form-field
      v-model="form"
      :background-image-src="backgroundImageSrc"
      :icon-image-src="iconImageSrc"
      :page="page"
      class="mt-12"
    />
  </div>
</template>

<script>
import { getMediumUrl } from '@/utils/image'
import PageEditFormField from '@/components/organisms/field/PageEditFormField'

export default {
  components: {
    PageEditFormField
  },

  props: {
    page: {
      type: Object,
      required: true
    },

    value: {
      type: Object,
      required: true
    }
  },

  computed: {
    backgroundImageSrc() {
      return getMediumUrl(this.page.background_image)
    },

    iconImageSrc() {
      return getMediumUrl(this.page.icon_image)
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
    onSubmit() {
      return this.$emit('submit')
    }
  }
}
</script>

<style></style>
