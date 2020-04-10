<template>
  <div>
    <!-- TODO 作品紹介ページ(1作品を紹介) -->
    <!-- <v-container class="stl-viewer-parent">
      <v-card height="500px" color="#E3F2FD" class="stl-viewer">
        <v-container style="height: 100%" class="text-center pa-10">
          <p>モデルの表示</p>
        </v-container>
      </v-card>
    </v-container>
    <v-container class="example">
      <v-card color="#FFF8E1">
        <v-container class="mainhead px-10 pb-0">
          <v-row class="worktitle">
            <v-card-title>{{ storage.title }}</v-card-title>
          </v-row>
          <v-row class="user">
            <v-col cols="1">
              <v-avatar>
                <v-img :src="getIconUrl" />
              </v-avatar>
            </v-col>
            <v-col cols="11">
              <h2>{{ user.name }}</h2>
              <p>{{ user.name }}</p>
            </v-col>
          </v-row>
        </v-container>
        <v-container class="contents px-10">
          <v-row>
            <v-col cols="6">
              <v-container class="left-contents">
                <v-row>
                  <v-img
                    v-if="mainImage"
                    :src="mainImage"
                    height="100%"
                    contain
                  />
                  <p v-else>No Image</p>
                </v-row>
                <v-row justify="center">
                  <template
                    v-for="(subImages, key) in storage.storage_sub_images"
                  >
                    <v-col :key="`subImages-${key}`" cols="3">
                      <v-container class="fill-height">
                        <v-img :src="subImages.url" width="200px" contain />
                      </v-container>
                    </v-col>
                  </template>
                </v-row>
              </v-container>
            </v-col>
            <v-col cols="6" class="comments pt-10">
              <v-card>
                <v-card-title>comments</v-card-title>
                <v-card-text>{{ storage.long_comment }}</v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-card>

      <div class="py-4">
        <h3>- Other Work -</h3>

        <storage-card-list
          v-if="storages"
          :storages="storages"
          :user="user.name"
        />
      </div>
    </v-container> -->
  </div>
</template>

<script>
// import StorageCardList from '@/components/molecues/storages/StorageCardList'
import { getIconUrl, getMediumUrl } from '@/utils/image'

export default {
  components: {
    // StorageCardList
  },

  computed: {
    /**
     * 作品データを返す
     *
     * @return Object|null
     * @example {
     *    storage_id: 23,
     *    url: 'http://localhost:8000/storage/storages/storage/6a8a45ae-8d4e-4f31-9ff7-f71342aa7acc.obj'
     * }
     */
    storageFile() {
      return this.storage_file ? this.storage_file[0] : null
    },

    getIconUrl() {
      if (this.user && this.user.user_profile) {
        const image = this.user.user_profile.icon_image
        return getIconUrl(image)
      }
      return null
    },

    mainImage() {
      if (this.storage && this.storage.eyecatch_image) {
        const image = this.storage.eyecatch_image
        return getMediumUrl(image)
      }
      return null
    },

    storage() {
      return this.$store.getters['page/storage']
    },

    storages() {
      return this.$store.getters['page/storages']
    },

    user() {
      console.log(this.$store.getters['page/user'])
      return this.$store.getters['page/user']
    }
  },

  async fetch({ store, params, error }) {
    try {
      // 別のuserページから遷移してきた場合、内容を削除する
      // store.dispatch('page/clearAllData', { name: params.user, force: false })

      await store.dispatch('page/fetchUser', params.user)
      await store.dispatch('page/fetchStorage', params.storageId)
    } catch (e) {
      // return error({
      //   statusCode: 404,
      //   message: 'Page Not Found'
      // })
    }
  },

  async mounted() {
    await this.$store.dispatch('page/fetchStorages')
  }
}
</script>
