<template>
  <settings-username-template v-model="form" :user="user" @submit="update" />
</template>

<script>
import Form from 'vform'
const SettingsUsernameTemplate = () =>
  import('@/components/templates/users/SettingsUsernameTemplate')

export default {
  components: {
    SettingsUsernameTemplate
  },

  middleware: 'auth',

  data() {
    return {
      form: new Form({
        name: '',
        email: ''
      })
    }
  },

  computed: {
    user() {
      return this.$store.getters['auth/user']
    }
  },

  created() {
    this.form.name = this.user.name
    this.form.email = this.user.email
  },

  methods: {
    async update() {
      try {
        const { data } = await this.form.patch('/settings/profile')

        this.$store.dispatch('auth/updateUser', { user: data })

        this.$router.push({ name: 'users.settings.index' })
      } catch (e) {}
    }
  }
}
</script>
