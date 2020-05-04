<template>
  <div>
    <user-title :title="$t('add_new_work')" class="text-center" />

    <storage-form
      v-model="form"
      :preview-image="previewImage"
      :releases="releases"
      @submit="onSubmit"
      @preview="onPreview"
    />
  </div>
</template>

<script>
const StorageForm = () => import('@/components/organisms/form/StorageForm')
const UserTitle = () => import('@/components/molecues/pages/UserTitle')

export default {
  components: {
    StorageForm,
    UserTitle
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
    },

    onPreview() {
      return this.$emit('preview')
    }
  }
}
</script>
