<template>
  <div>
    <!-- TODO 自分の情報を確認 -->
    <user-title title="ポートフォリオ確認" />

    <router-link :to="{ name: 'users.page.edit' }">編集する</router-link>

    <div v-for="(item, key) in data" :key="key">{{ key }} : {{ item }}</div>
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
