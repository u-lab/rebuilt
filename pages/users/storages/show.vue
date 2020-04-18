<template>
  <div>
    <!-- TODO 自分の作品を見る(個別) -->
    <router-link
      :to="{
        name: 'users.storages.edit',
        params: { storageId: data.storage_id }
      }"
      >編集する
    </router-link>
    <div v-for="(item, key) in data" :key="key">{{ key }} : {{ item }}</div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  middleware: 'auth',

  async asyncData({ params, error }) {
    const { data } = await axios.get(`/users/storage/${params.storageId}`)
    return { success: true, data: data.data }
  }
}
</script>
