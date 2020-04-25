<template>
  <v-app-bar app color="transparent" flat>
    <v-spacer />

    <!-- 言語セレクト -->
    <locale-dropdown />
  </v-app-bar>
</template>

<script>
import LocaleDropdown from '@/components/organisms/dropdown/LocaleDropdown'

export default {
  components: {
    LocaleDropdown
  }
}
</script>
