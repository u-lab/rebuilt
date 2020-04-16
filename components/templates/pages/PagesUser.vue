<template>
  <div>
    <!-- kanaをjobにしてる。デザインを見て直すか決める -->
    <user-header
      :bgSrc="getBgUrl"
      :iconSrc="getIconUrl"
      :name="user.user_profile.nick_name"
      :kana="user.user_profile.job_name"
      :description="user.user_profile.description"
    />

    <base-tab title1="work" title2="profile">
      <template v-slot:first>
        <div class="d-flex justify-center">
          <repezen-work-card
            v-if="user.user_portfolio.masterpiece_storage"
            :storage="user.user_portfolio.masterpiece_storage"
            :user-name="user.name"
          />

          <p v-else>代表作ないよ</p>
        </div>

        <!-- other work -->
        <v-container>
          <other-storage-list :user-name="user.name" :storages="storages" />
        </v-container>
      </template>

      <template v-slot:second>
        <v-card flat style="min-height: 640px">
          <tab-box :content="user.user_profile.web_address" title="My Site" />

          <tab-box
            :content="user.user_profile.description"
            :title="$t('description')"
          />

          <tab-box-history :career="user.user_profile.user_career" />
        </v-card>
      </template>
    </base-tab>
  </div>
</template>

<script>
import RepezenWorkCard from '@/components/organisms/cards/RepezenWorkCard'
import BaseTab from '@/components/molecues/tabs/BaseTab'
import UserHeader from '@/components/molecues/pages/UserHeader'
import TabBox from '@/components/molecues/pages/TabBox'
import TabBoxHistory from '@/components/molecues/storages/TabBoxHistory'
import OtherStorageList from '@/components/organisms/list/OtherStorageList'
import { getIconUrl, getMediumUrl } from '@/utils/image'

export default {
  components: {
    BaseTab,
    UserHeader,
    TabBox,
    TabBoxHistory,
    OtherStorageList,
    RepezenWorkCard
  },

  props: {
    user: {
      type: Object,
      required: true
    },

    storages: {
      type: Array,
      required: true
    }
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
    }
  }
}
</script>

<style></style>
