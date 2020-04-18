<template>
  <div>
    <password v-model="form" @submit="update" />
  </div>
</template>

<script>
import Form from 'vform'
import Password from '@/components/templates/users/settings/Password'

export default {
  middleware: 'auth',

  components: {
    Password
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
