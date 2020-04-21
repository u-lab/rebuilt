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
        <template v-if="getCareer">
          <h2 v-text="$t('career')" />

          <v-row justify="center">
            <v-card
              v-for="(career, key) in getCareer"
              :key="key"
              width="150px"
              class="mr-2"
            >
              <div class="pa-2">
                <school01 />
              </div>

              <v-card-text v-text="career.name" class="pa-2 text-center" />
            </v-card>
          </v-row>
        </template>

        <template v-if="getReward">
          <h2 v-text="$t('reward')" />

          <v-row justify="center">
            <v-card
              v-for="(career, key) in getReward"
              :key="key"
              width="150px"
              class="mr-2"
            >
              <div class="pa-2">
                <school01 />
              </div>

              <v-card-text v-text="career.name" class="pa-2 text-center" />
            </v-card>
          </v-row>
        </template>

        <template v-if="getSkill">
          <h2 v-text="$t('skill')" />

          <v-row justify="center">
            <v-card
              v-for="(career, key) in getSkill"
              :key="key"
              width="150px"
              class="mr-2"
            >
              <div class="pa-2">
                <school01 />
              </div>

              <v-card-text v-text="career.name" class="pa-2 text-center" />
            </v-card>
          </v-row>
        </template>

        <template v-if="getOther">
          <h2 v-text="$t('other')" />

          <v-row justify="center">
            <v-card
              v-for="(career, key) in getOther"
              :key="key"
              width="150px"
              class="mr-2"
            >
              <div class="pa-2">
                <school01 />
              </div>

              <v-card-text v-text="career.name" class="pa-2 text-center" />
            </v-card>
          </v-row>
        </template>

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
import RepezenWorkCard from '@/components/organisms/cards/RepezenWorkCard'
import BaseTab from '@/components/molecues/tabs/BaseTab'
import UserHeader from '@/components/molecues/pages/UserHeader'
import School01 from '@/components/atoms/icons/School01'
import OtherStorageList from '@/components/organisms/list/OtherStorageList'
import { getIconUrl, getMediumUrl } from '@/utils/image'

export default {
  components: {
    BaseTab,
    UserHeader,
    School01,
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
