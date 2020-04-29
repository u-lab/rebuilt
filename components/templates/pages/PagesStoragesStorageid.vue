<template>
  <div>
    <!-- header -->
    <div class="background-navy">
      <v-container>
        <storage-page-header :title="storage.title" />

        <storage-page-model :src="getEyecatchUrl" />
      </v-container>
    </div>

    <div>
      <v-container>
        <v-col cols="12" sm="5" class="background-navy">
          <storage-author-field
            :kana="user.kana"
            :name="user.name"
            :src="getUserIconUrl"
            :to="{ name: 'pages.user', params: { user: user.name } }"
          />
        </v-col>

        <storage-page-main-field
          :content="storage.long_comment"
          :src="getEyecatchUrl"
        />
      </v-container>
    </div>
  </div>
</template>

<script>
import { getIconUrl, getMediumUrl } from '@/utils/image'
const StorageAuthorField = () =>
  import('@/components/organisms/field/StorageAuthorField')
const StoragePageHeader = () =>
  import('@/components/organisms/header/StoragePageHeader')
const StoragePageMainField = () =>
  import('@/components/organisms/field/StoragePageMainField')
const StoragePageModel = () =>
  import('@/components/organisms/models/StoragePageModel')

export default {
  components: {
    StorageAuthorField,
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
