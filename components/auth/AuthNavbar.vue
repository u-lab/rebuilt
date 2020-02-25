<template>
  <v-app-bar app color="transparent" flat>
    <!-- 他のページへのリンク -->
    <other-page-link />

    <v-spacer />

    <!-- 言語セレクト -->
    <locale-dropdown />
  </v-app-bar>
</template>

<script>
import LocaleDropdown from '~/components/LocaleDropdown'
import OtherPageLink from '~/components/auth/OtherPageLink'

export default {
  components: {
    LocaleDropdown,
    OtherPageLink
  }
}
</script>
