<template>
  <div>
    <!-- TODO 自分の作品を見る -->
    <user-title title="自分の作品一覧" />

    <!-- debug用 -->
    <v-card>
      <div :key="key" v-for="(items, key) in data.data">
        <router-link
          :to="{
            name: 'users.storages.show',
            params: { storageId: items.storage_id }
          }"
          >この作品を見る</router-link
        >
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
import UserTitle from '~/components/user/UserTitle'

export default {
  middleware: 'auth',

  layout: 'user',

  components: {
    UserTitle
  },

  async asyncData({ params, error }) {
    const { data } = await axios.get('users/storage')
    return { success: true, data }
  }
}
</script>
