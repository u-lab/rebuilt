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

  async asyncData() {
    let profile
    let storage
    try {
      const { data } = await axios.get('users/profile')
      profile = data
    } catch (e) {
      console.error(e)
    }

    try {
      const { data } = await axios.get('users/storage')
      storage = data
    } catch (e) {
      console.error(e)
    }

    return { success: true, data: profile.data, storage }
  }
}
</script>
