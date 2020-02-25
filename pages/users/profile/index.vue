<template>
  <div>
    <!-- TODO 自分のプロフィールを見る -->
    <user-title title="自分のプロフィールを見る" />
  </div>
</template>

<script>
import axios from 'axios'
import UserTitle from '~/components/user/UserTitle'

export default {
  middleware: 'auth',

  layout: 'user',

  components: {
    UserTitle
  },

  async asyncData ({ isDev, route, store, env, params, query, req, res, redirect, error }) {
    const { data } = await axios.get('users/profile')
    return { success: true, data: data.data }
  }

}
</script>
