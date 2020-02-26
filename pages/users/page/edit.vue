<template>
  <div>
    <!-- TODO 自分の情報を修正 -->
    <user-title title="ポートフォリオ編集" />
  </div>
</template>

<script>
import Form from 'vform'
import { mapGetters } from 'vuex'
import UserTitle from '~/components/user/UserTitle'

export default {
  middleware: 'auth',

  layout: 'user',

  components: {
    UserTitle
  },

  data: () => ({
    form: new Form({
      id: '',
      name: '',
      email: ''
    })
  }),

  computed: mapGetters({
    user: 'auth/user'
  }),

  created () {
    // Fill the form with user data.
    this.form.keys().forEach((key) => {
      this.form[key] = this.user[key]
    })
  }

}
</script>
