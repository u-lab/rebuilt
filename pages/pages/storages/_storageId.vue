<template>
  <div>
    <!-- TODO 作品紹介ページ(1作品を紹介) -->
    <v-container class="stl-viewer-parent">
      <v-card height="500px" color="#E3F2FD" class="stl-viewer">
        <v-container style="height: 100%" class="text-center pa-10">
          <v-img height="100%" contain :src="work2Img" />
        </v-container>
      </v-card>
    </v-container>
    <v-container class="example">
      <v-card color="#FFF8E1">
        <v-container class="mainhead px-10 pb-0">
          <v-row class="worktitle">
            <v-card-title>TrialHome</v-card-title>
          </v-row>
          <v-row class="user">
            <v-col cols="1">
              <v-avatar>
                <img
                  :src="user.user_profile.icon_image_url"
                >
              </v-avatar>
            </v-col>
            <v-col cols="11">
              <h2>{{ user.name }}</h2>
              <p>{{ subusername }}</p>
            </v-col>
          </v-row>
        </v-container>
        <v-container class="contents px-10">
          <v-row>
            <v-col cols="6">
              <v-container class="left-contents">
                <v-row>
                  <v-img height="400px" contain :src="work1Img" />
                </v-row>
                <v-row class="perspectives">
                  <v-col cols="3">
                    <v-img width="100px" contain :src="work2Img" />
                  </v-col>
                  <v-col cols="3">
                    <v-img width="100px" contain :src="work2Img" />
                  </v-col>
                  <v-col cols="3">
                    <v-img width="100px" contain :src="work2Img" />
                  </v-col>
                  <v-col cols="3">
                    <v-img width="100px" contain :src="work2Img" />
                  </v-col>
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
            <v-card-title>other works</v-card-title>
          </v-row>
          <v-container class="pa-0">
            <v-row>
              <v-col cols="3">
                <v-container class="fill-height">
                  <v-img width="200px" contain :src="work2Img" />
                </v-container>
              </v-col>
              <v-col cols="3">
                <v-container class="fill-height">
                  <v-img width="200px" contain :src="work2Img" />
                </v-container>
              </v-col>
              <v-col cols="3">
                <v-container class="fill-height">
                  <v-img width="200px" contain :src="work2Img" />
                </v-container>
              </v-col>
              <v-col cols="3">
                <v-container class="fill-height">
                  <v-img width="200px" contain :src="work2Img" />
                </v-container>
              </v-col>
            </v-row>
          </v-container>
        </v-container>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import axios from 'axios'
import work2Img from '~/assets/img/work2.jpg'

export default {

  data () {
    return {
      work1Img: '',
      work2Img,
      subusername: 'admin'
    }
  },

  async asyncData ({ params }) {
    const { data } = await axios.get('pages/admin/storages/1581315433ra05d0')

    return { success: true, data: data.data, user: data.user }
  },

  created () {
    this.work1Img = this.data.eyecatch_imgae_url
  }
}
</script>
