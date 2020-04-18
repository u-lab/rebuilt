<template>
  <username v-model="form" :user="user" @submit="update" />
</template>

<script>
import Form from 'vform'
import Username from '@/components/templates/users/settings/Username'

export default {
  components: {
    Username
  },

  middleware: 'auth',

  layout: 'user',

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

        this.$router.push('/users/settings')
      } catch (e) {}
    }
  }
}
</script>
