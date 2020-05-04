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
            v-if="
              user.user_portfolio && user.user_portfolio.masterpiece_storage
            "
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
        <profile-icon-list
          v-if="getCareer"
          :title="$t('career')"
          :items="getCareer"
          icon-name="school"
        />

        <profile-icon-list
          v-if="getReward"
          :title="$t('reward')"
          :items="getReward"
          icon-name="reward"
        />

        <profile-icon-list
          v-if="getSkill"
          :title="$t('skill')"
          :items="getSkill"
          icon-name="skill"
        />

        <profile-icon-list
          v-if="getOther"
          :title="$t('other')"
          :items="getOther"
          icon-name="library"
        />

        <h2>Social & Link</h2>
        <v-row justify="center">
          <div v-if="user.user_profile.web_address">
            <a
              :href="user.user_profile.web_address"
              target="_blank"
              rel="noopener"
            >
              <v-img src="/hp.png" width="80px" />
            </a>
          </div>
        </v-row>
      </template>
    </base-tab>
  </div>
</template>

<script>
import { getIconUrl, getMediumUrl } from '@/utils/image'
const RepezenWorkCard = () =>
  import('@/components/organisms/cards/RepezenWorkCard')
const BaseTab = () => import('@/components/molecues/tabs/BaseTab')
const UserHeader = () => import('@/components/organisms/header/UserHeader')
const OtherStorageList = () =>
  import('@/components/organisms/list/OtherStorageList')
const ProfileIconList = () =>
  import('@/components/organisms/list/ProfileIconList')

export default {
  components: {
    BaseTab,
    UserHeader,
    OtherStorageList,
    ProfileIconList,
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
    },

    getCareer() {
      const career = this.user.user_profile.user_career
      if (!career) {
        return null
      }

      const arr = career.filter((obj) => obj.type === 'career')
      return arr.length !== 0 ? arr : null
    },

    getReward() {
      const career = this.user.user_profile.user_career
      if (!career) {
        return null
      }

      const arr = career.filter((obj) => obj.type === 'reward')
      return arr.length !== 0 ? arr : null
    },

    getSkill() {
      const career = this.user.user_profile.user_career
      if (!career) {
        return null
      }

      const arr = career.filter((obj) => obj.type === 'skill')
      return arr.length !== 0 ? arr : null
    },

    getOther() {
      const career = this.user.user_profile.user_career
      if (!career) {
        return null
      }

      const arr = career.filter((obj) => obj.type === null)
      return arr.length !== 0 ? arr : null
    }
  }
}
</script>

<style></style>
