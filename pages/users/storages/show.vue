<template>
  <div>
    <!-- TODO 自分の作品を見る(個別) -->
  </div>
</template>

<script>
import axios from 'axios'

export default {
  middleware: 'auth',

  layout: 'user',

  async asyncData({ params, error }) {
    const { data } = await axios.get(`/users/storage/${params.storageId}`)
    return { success: true, data: data.data }
  }
}
</script>
