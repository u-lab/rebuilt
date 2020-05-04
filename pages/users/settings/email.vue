<template>
  <div>
    <settings-email-template v-model="form" :user="user" @submit="update" />
  </div>
</template>

<script>
import Form from 'vform'
const SettingsEmailTemplate = () =>
  import('@/components/templates/users/SettingsEmailTemplate')

export default {
  components: {
    SettingsEmailTemplate
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
