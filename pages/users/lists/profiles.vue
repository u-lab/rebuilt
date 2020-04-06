<template>
  <div>
    <!-- TODO 全プロフィール一覧を作る -->
    <user-title title="全プロフィール一覧" />

    <!-- debug用 -->
    <v-card>
      <div :key="key" v-for="(items, key) in data.data">
        <div v-for="(item, keyItem) in items" :key="keyItem">
          {{ keyItem }} : {{ item }}
        </div>

        <hr />
      </div>
    </v-card>
  </div>
</template>

<script>
import axios from 'axios'
import UserTitle from '~/components/molecues/pages/UserTitle'

export default {
  middleware: 'auth',

  layout: 'user',

  components: {
    UserTitle
  },

  async asyncData() {
    const { data } = await axios.get(`/profiles`)
    return { success: true, data }
  }
}
</script>
