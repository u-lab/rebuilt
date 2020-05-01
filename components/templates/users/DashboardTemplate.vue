<template>
  <div>
    <user-title :title="$t('dashboard')" class="text-center mb-3" />

    <v-card>
      <v-card-title>{{ $t('welcome_to_the_archi_walk') }}</v-card-title>
      <v-card-text>No Message</v-card-text>
    </v-card>

    <v-row>
      <v-col cols="12" sm="6">
        <v-card>
          <v-card-title>
            {{ $t('record_your_storage') }}
            <v-icon>mdi-pencil</v-icon>
          </v-card-title>

          <v-card-text>
            <ol class="list">
              <li>自分の情報を設定しよう!</li>
              <li>作品を投稿しよう!</li>
              <li>ポートフォリオを確認しよう!</li>
            </ol>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" sm="6">
        <look-storage :data="data" :user="user" />
      </v-col>
    </v-row>
  </div>
</template>

<script>
const LookStorage = () => import('@/components/organisms/dashboard/LookStorage')
const UserTitle = () => import('@/components/molecues/pages/UserTitle')

export default {
  components: {
    LookStorage,
    UserTitle
  },

  props: {
    data: {
      type: Object,
      required: true
    },

    user: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
.list {
  font-size: 1rem;
}
</style>
