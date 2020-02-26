<template>
  <div>
    <!-- TODO 作品紹介ページ(1作品を紹介) -->
    <v-app>
      <v-container class="stl_viewer_parent">
        <v-card height="500px" color="#E3F2FD" class="stl_viewer">
          <v-container fill-height>
            <v-layout>
              <v-flex class="align-center py-6">
                <v-img height="100%" contain :src="work2Img" />
              </v-flex>
            </v-layout>
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
                    src="https://www.gravatar.com/avatar/e64c7d89f26bd1972efa854d13d7dd61.jpg?s=200&d=mm"
                  />
                </v-avatar>
              </v-col>
              <v-col cols="11">
                <h2>{{user.name}}</h2>
                <p>{{subusername}}</p>
              </v-col>
            </v-row>
          </v-container>
          <v-container class="contents px-10">
            <v-row>
              <v-col cols="6">
                <v-container class="left_contents">
                  <v-row>
                    <v-img height="400px" contain :src="work1Img"></v-img>
                  </v-row>
                  <v-row class="spePerctives">
                    <v-col cols="3">
                      <v-img width="100px" contain :src="work2Img"></v-img>
                    </v-col>
                    <v-col cols="3">
                      <v-img width="100px" contain :src="work2Img"></v-img>
                    </v-col>
                    <v-col cols="3">
                      <v-img width="100px" contain :src="work2Img"></v-img>
                    </v-col>
                    <v-col cols="3">
                      <v-img width="100px" contain :src="work2Img"></v-img>
                    </v-col>
                  </v-row>
                </v-container>
              </v-col>
              <v-col cols="6" class="comments pt-10">
                <v-card>
                  <v-card-title>comments</v-card-title>
                  <v-card-text>最近自然の中の曲線や形に興味がある。特にネジバナやサボテンに見られる”螺旋”やバッタの脚を始めとした昆虫の足の曲線が凄く不思議に心が惹かれる。そこで、そういった自然的な形や線をロボットに入れ込むことで、naturalなロボットを作ることができるのかについて考えた。</v-card-text>
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
                    <v-img width="200px" contain :src="work2Img"></v-img>
                  </v-container>
                </v-col>
                <v-col cols="3">
                  <v-container class="fill-height">
                    <v-img width="200px" contain :src="work2Img"></v-img>
                  </v-container>
                </v-col>
                <v-col cols="3">
                  <v-container class="fill-height">
                    <v-img width="200px" contain :src="work2Img"></v-img>
                  </v-container>
                </v-col>
                <v-col cols="3">
                  <v-container class="fill-height">
                    <v-img width="200px" contain :src="work2Img"></v-img>
                  </v-container>
                </v-col>
              </v-row>
            </v-container>
          </v-container>
        </v-card>
      </v-container>

      <v-container class="other_works"></v-container>
    </v-app>
  </div>
</template>

<script>
import axios from "axios";
import work1Img from "~/assets/img/work1.jpg";
import work2Img from "~/assets/img/work2.jpg";

export default {
  async asyncData({ params }) {
    const { data } = await axios.get("pages/admin/storages/1581315433ra05d0");

    return { success: true, data: data.data, user: data.user };
  },

  data() {
    return {
      work1Img: work1Img,
      work2Img: work2Img,
      subusername: "admin"
    };
  },
  computed: {
    /*spePerctives: function() {
      return {
        height: "100px"
      };
    }*/
  }
};
</script>
