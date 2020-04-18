<template>
  <div>
    <email-template v-model="form" :user="user" @submit="update" />
  </div>
</template>

<script>
import Form from 'vform'
import EmailTemplate from '@/components/templates/users/settings/Email'

export default {
  components: {
    EmailTemplate
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
