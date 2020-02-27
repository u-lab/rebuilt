<template>
  <div>
    <!-- TODO 自分の情報を確認 -->
    <user-title title="ポートフォリオ確認" />
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

  async asyncData({
    isDev,
    route,
    store,
    env,
    params,
    query,
    req,
    res,
    redirect,
    error
  }) {
    const { data } = await axios.get('users/page')
    return { success: true, data: data.data }
  }
}
</script>
