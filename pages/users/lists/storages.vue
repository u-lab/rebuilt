<template>
  <div>
    <!-- TODO 全作品一覧を作る -->
    <user-title title="全作品一覧" />

    <!-- debug用 -->
    <v-card>
      <div
        :key="key"
        v-for="(items, key) in data.data"
      >
        <div
          v-for="(item, keyItem) in items"
          :key="keyItem"
        >
          {{ keyItem }} : {{ item }}
        </div>

        <hr />
      </div>
    </v-card>
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
    const { data } = await axios.get(`/storages`)
    return { success: true, data }
  }
}
</script>
