<template>
  <div>
    <!-- kanaをjobにしてる。デザインを見て直すか決める -->
    <user-header
      :bgSrc="getBgUrl"
      :iconSrc="getIconUrl"
      :name="data.user_profile.nick_name"
      :kana="data.user_profile.job_name"
    />

    <v-container>
      <v-card>
        <v-tabs v-model="tab" dark grow slider-color="white">
          <v-tab>
            - work -
          </v-tab>
          <v-tab>
            - profile -
          </v-tab>
        </v-tabs>

        <v-tabs-items v-model="tab">
          <v-tab-item>
            <div class="pa-4">
              <user-storage-page
                :storage="data.user_portfolio.masterpiece_storage"
              />
            </div>
          </v-tab-item>

          <v-tab-item>
            <v-card flat style="min-height: 640px">
              <tab-box
                :content="data.user_profile.web_address"
                title="My Site"
              />

              <tab-box
                :content="data.user_profile.description"
                :title="$t('description')"
              />

              <tab-box-history :career="data.user_profile.user_career" />
            </v-card>
          </v-tab-item>
        </v-tabs-items>
      </v-card>

      <div class="py-4">
        <h3>- Other Work -</h3>
        <storage-card-list
          :storages="storages.data"
          :user="$route.params.user"
        />
      </div>
    </v-container>
  </div>
</template>

<script>
import axios from 'axios'
import StorageCardList from '@/components/molecues/storages/StorageCardList'
import UserHeader from '@/components/molecues/pages/UserHeader'
import TabBox from '@/components/molecues/pages/TabBox'
import TabBoxHistory from '@/components/molecues/storages/TabBoxHistory'
import UserStoragePage from '@/components/templates/pages/UserStoragePage'

export default {
  components: {
    UserHeader,
    UserStoragePage,
    StorageCardList,
    TabBox,
    TabBoxHistory
  },

  data() {
    return {
      tab: null
    }
  },

  computed: {
    getIconUrl() {
      const image = this.data.user_profile.icon_image
      return image.url_160 || image.url_320 || image.url
    },

    getBgUrl() {
      const image = this.data.user_profile.background_image
      return image.url_1280 || image.url
    }
  },

  async asyncData({ params, error }) {
    try {
      const { data } = await axios.get(`pages/${params.user}`)
      const storages = await axios.get(`pages/${params.user}/storages`)
      return { success: true, data: data.data, storages: storages.data }
    } catch (e) {
      // return error({
      //   statusCode: e.response.data.status,
      //   message: e.response.data.message
      // })
      return { success: false, statusCode: e.response.data.status }
    }
  }
}
</script>
