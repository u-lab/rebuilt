<template>
  <div>
    <!-- TODO 自分の情報を確認 -->
    <user-title title="ポートフォリオ確認" />

    <router-link :to="{ name: 'users.page.edit' }">編集する</router-link>

    <v-container>
      <v-card>
        <v-row class="pos-relative" style="margin-bottom: 130px">
          <v-col class="pt-0" cols="12">
            <v-img
              :src="data.background_image.url"
              class="user_storage_eyecatch_image_preview"
              height="180px"
              style="z-index:3;"
            ></v-img>
            <div class="pos-marginBottomCenter" style="z-index: 3">
              <div class="pos-relative">
                <v-avatar
                  :size="130"
                  class="pages-user-header-avatar pos-relative"
                >
                  <v-img
                    :src="data.icon_image.url"
                    class="user_storage_eyecatch_image_preview"
                    style="z-index:5;"
                  ></v-img>
                </v-avatar>
                <v-card-title class="">{{ data.nick_name }}</v-card-title>
              </div>
            </div>
          </v-col>
        </v-row>
        <v-container>
          <v-row justify="center">
            <v-col cols="12">
              <v-card height="130px">
                <v-card-text v-text="data.description" />
              </v-card>
            </v-col>
          </v-row>
          <v-row>
            <v-col class="text-center" cols="8">
              <h3>-作品-</h3>
              <v-row>
                <v-col
                  v-for="(item, key) in filterStorage(8)"
                  :key="`storage-${key}`"
                  align="center"
                  cols="6"
                >
                  <v-card
                    :to="{
                      name: 'users.storages.show',
                      params: {
                        storageId: item.storage_id
                      }
                    }"
                  >
                    <v-img :src="item.eyecatch_image.url"> </v-img>
                    <v-card-title v-text="item.title" />
                  </v-card>
                </v-col>
              </v-row>
            </v-col>
            <v-col class="text-center" cols="4">
              <h3>-これまでの歴史-</h3>
              <v-card>
                <v-card-text>
                  <div
                    v-for="(item, key) in data.user_career"
                    :key="`user_career-${key}`"
                  >
                    {{ item.date }} : {{ item.name }}
                  </div>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-container>

    <!-- <div v-for="(item, key) in storage" :key="key">{{ key }} : {{ item }}</div> -->
  </div>
</template>

<script>
import axios from 'axios'
import UserTitle from '~/components/molecues/pages/UserTitle'

export default {
  middleware: 'auth',

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
  },

  methods: {
    filterStorage(num = 8) {
      return this.storage.data.slice(0, num)
    }
  }
}
</script>
