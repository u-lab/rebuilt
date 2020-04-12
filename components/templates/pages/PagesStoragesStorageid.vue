<template>
  <div>
    <!-- header -->
    <div class="background-navy">
      <v-container>
        <storage-page-header
          :kana="user.name"
          :name="user.name"
          :src="getUserIconUrl"
          :to="{ name: 'pages.user', params: { user: user.name } }"
          :title="storage.title"
        />

        <storage-page-model :src="getEyecatchUrl" />
      </v-container>
    </div>

    <div>
      <v-container>
        <storage-page-main-field
          :content="storage.long_comment"
          :src="getEyecatchUrl"
        />
      </v-container>
    </div>
  </div>
</template>

<script>
import StoragePageHeader from '@/components/organisms/header/StoragePageHeader'
import StoragePageMainField from '@/components/organisms/field/StoragePageMainField'
import StoragePageModel from '@/components/organisms/models/StoragePageModel'
import { getIconUrl, getMediumUrl } from '@/utils/image'

export default {
  components: {
    StoragePageHeader,
    StoragePageMainField,
    StoragePageModel
  },

  props: {
    storage: {
      type: Object,
      required: true
    },

    user: {
      type: Object,
      required: true
    }
  },

  computed: {
    getUserIconUrl() {
      if (this.user && this.user.user_profile) {
        const image = this.user.user_profile.icon_image
        return getIconUrl(image)
      }
      return null
    },

    getEyecatchUrl() {
      const image = this.storage.eyecatch_image
      return getMediumUrl(image)
    }
  }
}
</script>

<style lang="scss" scoped>
.background-navy {
  background: $background-page-header;
}
</style>
