<template>
  <div>
    <!-- TODO 作品紹介ページ(1作品を紹介) -->
    <v-container class="stl-viewer-parent">
      <v-card height="500px" color="#E3F2FD" class="stl-viewer">
        <v-container style="height: 100%" class="text-center pa-10">
          <v-img :src="work2Img" height="100%" contain></v-img>
        </v-container>
      </v-card>
    </v-container>
    <v-container class="example">
      <v-card color="#FFF8E1">
        <v-container class="mainhead px-10 pb-0">
          <v-row class="worktitle">
            <v-card-title>{{ worktitle }}</v-card-title>
          </v-row>
          <v-row class="user">
            <v-col cols="1">
              <v-avatar>
                <img
                  src="https://www.gravatar.com/avatar/e64c7d89f26bd1972efa854d13d7dd61.jpg?s=200&d=mm"
                />
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
                  <v-img :src="work1Img" height="400px" contain></v-img>
                </v-row>
                <v-row class="perspectives">
                  <v-col cols="3">
                    <v-img :src="work2Img" width="100px" contain></v-img>
                  </v-col>
                  <v-col cols="3">
                    <v-img :src="work2Img" width="100px" contain></v-img>
                  </v-col>
                  <v-col cols="3">
                    <v-img :src="work2Img" width="100px" contain></v-img>
                  </v-col>
                  <v-col cols="3">
                    <v-img :src="work2Img" width="100px" contain></v-img>
                  </v-col>
                </v-row>
              </v-container>
            </v-col>
            <v-col cols="6" class="comments pt-10">
              <v-card>
                <v-card-title>Comments</v-card-title>
                <v-card-text>{{ comments }}</v-card-text>
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
              <v-col cols="3">
                <v-container class="fill-height">
                  <v-img :src="work2Img" width="200px" contain></v-img>
                </v-container>
              </v-col>
              <v-col cols="3">
                <v-container class="fill-height">
                  <v-img :src="work2Img" width="200px" contain></v-img>
                </v-container>
              </v-col>
              <v-col cols="3">
                <v-container class="fill-height">
                  <v-img :src="work2Img" width="200px" contain></v-img>
                </v-container>
              </v-col>
              <v-col cols="3">
                <v-container class="fill-height">
                  <v-img :src="work2Img" width="200px" contain></v-img>
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
import work1Img from '~/assets/img/work1.jpg'
import work2Img from '~/assets/img/work2.jpg'

export default {
  data() {
    return {
      work1Img,
      work2Img,
      subusername: 'admin',
      worktitle: 'TraialHome',
      comments:
        '最近自然の中の曲線や形に興味がある。特にネジバナやサボテンに見られる”螺旋”やバッタの脚を始めとした昆虫の足の曲線が凄く不思議に心が惹かれる。そこで、そういった自然的な形や線をロボットに入れ込むことで、naturalなロボットを作ることができるのかについて考えた。'
    }
  },
  async asyncData({ params }) {
    const { data } = await axios.get('pages/admin/storages/1581315433ra05d0')

    return { success: true, data: data.data, user: data.user }
  }
}
</script>
