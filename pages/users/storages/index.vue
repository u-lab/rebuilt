<template>
  <div>
    <!-- TODO 自分の作品を見る -->
    <user-title title="自分の作品一覧" />
    <v-container>
      <v-row>
        <v-col
          v-for="(items, key) in data.data"
          :key="key"
          cols="4"
        >
          <v-card>
            <v-row>
              <v-col cols="8">
                <div class="ml-5 mt-1">{{ items.id }}</div>
              </v-col>
              <v-col cols="4">
                <v-btn
                  :justify="end"
                  :to="{
                    name: 'users.storages.edit',
                    params: { strageId: items.storage_id }
                  }"
                  class="ml-4 my-0"
                  nuxt
                >編集</v-btn>
              </v-col>
            </v-row>
            <v-img :src="items.eyecatch_image.url"></v-img>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <!-- debug用 -->
    <v-card>
      <div
        :key="key"
        v-for="(items, key) in data.data"
      >
        <router-link :to="{
            name: 'users.storages.edit',
            params: { storageId: items.storage_id }
          }">この作品を見る</router-link>
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

  async asyncData({ params, error }) {
    const { data } = await axios.get('users/storage')
    return { success: true, data }
  }
}
</script>
