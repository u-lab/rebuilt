<template>
  <settings-locale-template @click="onClick" />
</template>

<script>
const SettingsLocaleTemplate = () =>
  import('@/components/templates/users/SettingsLocaleTemplate')

export default {
  components: {
    SettingsLocaleTemplate
  },

  middleware: 'auth',

  methods: {
    onClick() {
      this.$router.push({ name: 'users.settings.index' })
    }
  }
}
</script>
