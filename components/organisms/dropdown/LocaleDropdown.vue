<template>
  <div>
    <base-dropdown
      :color="color"
      :dark="dark"
      :items="locales"
      :title="locales[locale]"
      @click="setLocale"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import BaseDropdown from '@/components/molecues/dropdown/BaseDropdown'
import { loadMessages } from '~/plugins/i18n'

export default {
  components: {
    BaseDropdown
  },

  props: {
    color: {
      type: String,
      default: 'grey lighten-2'
    },

    dark: {
      type: Boolean,
      default: false
    }
  },

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
