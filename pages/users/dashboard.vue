<template>
  <div>
    <!-- TODO ユーザーダッシュボード -->
    <user-title :title="$t('dashboard')" />

    <v-card>
      <v-card-title>{{ $t('welcome_to_the_archi_walk') }}</v-card-title>
      <v-card-text>No Message</v-card-text>
    </v-card>

    <v-row>
      <v-col cols="6">
        <v-card>
          <v-card-title>{{ $t('record_your_storage') }}</v-card-title>
        </v-card>
      </v-col>

      <v-col cols="6">
        <look-storage :data="data" />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import axios from 'axios'
import LookStorage from '~/components/user/dashboard/LookStorage'
import UserTitle from '~/components/user/UserTitle'

export default {
  middleware: 'auth',

  layout: 'user',

  components: {
    LookStorage,
    UserTitle
  },

  async asyncData() {
    const { data } = await axios.get('users/storage', {
      params: {
        per_page: 10
      }
    })

    return { success: true, data }
  }
}
</script>
