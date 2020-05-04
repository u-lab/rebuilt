<template>
  <b-container :title="$t('display_language')">
    <locale-dropdown @click="onClick" color="darken" dark />
  </b-container>
</template>

<script>
const BContainer = () =>
  import('@/components/organisms/containers/UserSettingsContainer')
const LocaleDropdown = () =>
  import('@/components/organisms/dropdown/LocaleDropdown')

export default {
  components: {
    BContainer,
    LocaleDropdown
  },

  methods: {
    onClick() {
      return this.$emit('click')
    }
  }
}
</script>
