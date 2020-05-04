<template>
  <settings-index-template />
</template>

<script>
const SettingsIndexTemplate = () =>
  import('@/components/templates/users/SettingsIndexTemplate')

export default {
  middleware: 'auth',

  components: {
    SettingsIndexTemplate
  }
}
</script>
