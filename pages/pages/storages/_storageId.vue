<template>
  <div>
    <!-- TODO 作品紹介ページ(1作品を紹介) -->
    <v-container class="stl-viewer-parent">
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
            <v-card-title>{{ data.title }}</v-card-title>
          </v-row>
          <v-row class="user">
            <v-col cols="1">
              <v-avatar>
                <!-- <v-img :src="user.user_profile.icon_image.url" /> -->
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
                  <template v-for="(subImages, key) in data.storage_sub_images">
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
                <v-card-text>{{ data.long_comment }}</v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
        <v-container class="other-works">
          <v-row class="other-work-title px-5">
            <v-card-title>Other Works</v-card-title>
          </v-row>
          <v-container class="pa-0">
            <v-row>
              <template v-for="(subImages, key) in data.storage_sub_images">
                <v-col :key="`subImages-${key}`" cols="3">
                  <v-container class="fill-height">
                    <v-img :src="subImages.url" width="200px" contain />
                  </v-container>
                </v-col>
              </template>
            </v-row>
          </v-container>
        </v-container>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import axios from 'axios'

export default {
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

    mainImage() {
      const image = this.data.eyecatch_image

      if (image) {
        return image.url_640 || image.url_1024 || image.url_1280 || image.url
      }

      return null
    }
  },

  async asyncData({ params, error }) {
    try {
      const { data } = await axios.get(
        `pages/${params.user}/storages/${params.storageId}`
      )

      return { success: true, data: data.data, user: data.user }
    } catch (e) {
      return error({
        statusCode: 404,
        message: 'Page Not Found'
      })
    }
  }
}
</script>
