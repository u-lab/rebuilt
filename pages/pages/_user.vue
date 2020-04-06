<template>
  <div>
    <!-- kanaをjobにしてる。デザインを見て直すか決める -->
    <user-header
      :bgSrc="BgExampleImg"
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
            <v-card flat>
              <tab-box title="Storage" content="作品を入れる" />
            </v-card>
          </v-tab-item>

          <v-tab-item>
            <v-card flat>
              <tab-box title="History" content="あああ" />

              <tab-box title="Award" content="いいい" />

              <tab-box
                :content="data.user_profile.description"
                :title="$t('description')"
              />

              <tab-box
                :content="data.user_profile.hobby"
                :title="$t('hobby')"
              />

              <tab-box
                :content="data.user_profile.web_address"
                title="My Site"
              />
            </v-card>
          </v-tab-item>
        </v-tabs-items>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import axios from 'axios'
import UserHeader from '@/components/molecues/pages/UserHeader'
import TabBox from '@/components/molecues/pages/TabBox'
import BgExampleImg from '@/assets/img/page_background_example.png'
import myIcon from '~/assets/img/usericon-ex.jpg'

export default {
  components: {
    UserHeader,
    TabBox
  },

  data() {
    return {
      tab: null,
      BgExampleImg,
      myIcon
    }
  },

  computed: {
    getIconUrl() {
      const image = this.data.user_profile.icon_image
      return image.url_160 || image.url_320 || image.url
    }
  },

  async asyncData({ params, error }) {
    try {
      const { data } = await axios.get(`pages/${params.user}`)
      return { success: true, data: data.data }
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
