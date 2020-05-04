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
import { loadMessages } from '@/plugins/i18n'
const BaseDropdown = () => import('@/components/molecues/dropdown/BaseDropdown')

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

  computed: {
    locale() {
      return this.$store.getters['lang/locale']
    },

    locales() {
      return this.$store.getters['lang/locales']
    }
  },

  methods: {
    setLocale(locale) {
      if (this.$i18n.locale !== locale) {
        loadMessages(locale)

        this.$store.dispatch('lang/setLocale', { locale })

        this.$emit('click')
      }
    }
  }
}
</script>
