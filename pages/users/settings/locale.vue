<template>
  <locale @click="onClick" />
</template>

<script>
import Locale from '@/components/templates/users/settings/Locale'

export default {
  components: {
    Locale
  },

  middleware: 'auth',

  methods: {
    onClick() {
      this.$router.push({ name: 'users.settings.index' })
    }
  }
}
</script>
