<template>
  <v-app-bar app color="transparent" flat>
    <other-page-link />
    <v-spacer />
    <locale-dropdown />
  </v-app-bar>
</template>

<script>
import LocaleDropdown from '~/components/LocaleDropdown'
import OtherPageLink from '~/components/login/OtherPageLink'

export default {
  components: {
    LocaleDropdown,
    OtherPageLink
  }
}
</script>
