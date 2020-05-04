<template>
  <settings-password-template v-model="form" @submit="update" />
</template>

<script>
import Form from 'vform'
const SettingsPasswordTemplate = () =>
  import('@/components/templates/users/SettingsPasswordTemplate')

export default {
  middleware: 'auth',

  components: {
    SettingsPasswordTemplate
  },

  data: () => ({
    form: new Form({
      password: '',
      password_confirmation: ''
    })
  }),

  methods: {
    async update() {
      try {
        await this.form.patch('/settings/password')
        this.form.reset()
        this.$router.push({ name: 'users.settings.success' })
      } catch (e) {}
    }
  }
}
</script>
