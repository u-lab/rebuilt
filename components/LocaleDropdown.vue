<template>
  <v-menu offset-y open-on-hover>
    <template v-slot:activator="{ on }">
      <v-btn v-on="on" color="grey lighten-2" large>
        {{ locales[locale] }}
        <v-icon>mdi-chevron-down</v-icon>
      </v-btn>
    </template>
    <v-list>
      <v-list-item
        v-for="(value, key) in locales"
        :key="key"
        @click.prevent="setLocale(key)"
      >
        <v-list-item-title>{{ value }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
import { mapGetters } from 'vuex'
import { loadMessages } from '~/plugins/i18n'

export default {
  computed: mapGetters({
    locale: 'lang/locale',
    locales: 'lang/locales'
  }),

  methods: {
    setLocale(locale) {
      if (this.$i18n.locale !== locale) {
        loadMessages(locale)

        this.$store.dispatch('lang/setLocale', { locale })
      }
    }
  }
}
</script>
