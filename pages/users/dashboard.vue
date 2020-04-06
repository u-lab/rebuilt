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
          <v-card-title>
            {{ $t('record_your_storage') }}
            <v-icon>mdi-pencil</v-icon>
          </v-card-title>

          <v-card-text>
            <ol>
              <li>自分の情報を設定しよう!</li>
              <li>作品を投稿しよう!</li>
              <li>ポートフォリオを確認しよう!</li>
            </ol>
          </v-card-text>
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
import LookStorage from '~/components/organism/dashboard/LookStorage'
import UserTitle from '~/components/molecues/pages/UserTitle'

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
