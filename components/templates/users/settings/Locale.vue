<template>
  <b-container :title="$t('display_language')">
    <locale-dropdown @click="onClick" color="darken" dark />
  </b-container>
</template>

<script>
import BContainer from '@/components/organisms/containers/UserSettingsContainer'
import LocaleDropdown from '@/components/organisms/dropdown/LocaleDropdown'

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
