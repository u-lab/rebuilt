<template>
  <div class="pt-2 pt-sm-4">
    <!-- kanaをjobにしてる。デザインを見て直すか決める -->
    <user-header
      :bgSrc="getBgUrl"
      :iconSrc="getIconUrl"
      :name="user.user_profile.nick_name"
      :kana="user.user_profile.job_name"
    />

    <v-container>
      <v-card>
        <base-tab title1="- work -" title2="- profile -">
          <template v-slot:first>
            <div class="pa-4">
              <user-storage-page
                v-if="user.user_portfolio.masterpiece_storage"
                :storage="user.user_portfolio.masterpiece_storage"
              />
              <p v-else>代表作ないよ</p>
            </div>
          </template>

          <template v-slot:second>
            <v-card flat style="min-height: 640px">
              <tab-box
                :content="user.user_profile.web_address"
                title="My Site"
              />

              <tab-box
                :content="user.user_profile.description"
                :title="$t('description')"
              />

              <tab-box-history :career="user.user_profile.user_career" />
            </v-card>
          </template>
        </base-tab>
      </v-card>
    </v-container>

    <!-- other work -->
    <v-container>
      <other-storage-list :user-name="user.name" :storages="storages" />
    </v-container>
  </div>
</template>

<script>
import BaseTab from '@/components/molecues/tabs/BaseTab'
import UserHeader from '@/components/molecues/pages/UserHeader'
import TabBox from '@/components/molecues/pages/TabBox'
import TabBoxHistory from '@/components/molecues/storages/TabBoxHistory'
import UserStoragePage from '@/components/templates/pages/UserStoragePage'
import OtherStorageList from '@/components/organisms/list/OtherStorageList'

import { getIconUrl, getMediumUrl } from '@/utils/image'

export default {
  components: {
    BaseTab,
    UserHeader,
    UserStoragePage,
    TabBox,
    TabBoxHistory,
    OtherStorageList
  },

  computed: {
    getIconUrl() {
      if (this.user && this.user.user_profile) {
        const image = this.user.user_profile.icon_image
        return getIconUrl(image)
      }
      return null
    },

    getBgUrl() {
      if (this.user && this.user.user_profile) {
        const image = this.user.user_profile.background_image
        return getMediumUrl(image)
      }
      return null
    },

    storages() {
      return this.$store.getters['page/storages']
    },

    user() {
      return this.$store.getters['page/user']
    }
  },

  async fetch({ store, params, error }) {
    try {
      await store.dispatch('page/fetchUser', params.user)
    } catch (e) {
      return error({
        statusCode: 404,
        message: 'Page Not Found'
      })
    }
  },

  async mounted() {
    await this.$store.dispatch('page/fetchStorages')
  }
}
</script>
