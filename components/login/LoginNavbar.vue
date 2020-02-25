<template>
  <v-app-bar app color="transparent" flat>
    <v-spacer />
    <locale-dropdown />
  </v-app-bar>
</template>

<script>
import LocaleDropdown from '~/components/LocaleDropdown'

export default {
  components: {
    LocaleDropdown
  }
}
</script>
