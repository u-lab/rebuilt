<template>
  <div>
    <!-- TODO 作品紹介ページ(1作品を紹介) -->
    <v-app>
      <v-card height="500px" color="#E3F2FD" class="stl_viewer">
        <v-container fill-height>
          <v-layout>
            <v-flex align-center>
              <v-img height="400px" contain :src="work2Img"></v-img>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card>
      <v-container class="example">
        <v-card color="#FFF8E1">
          <v-row class="user">
            <v-col>
              <v-avatar>
                <img
                  src="https://www.gravatar.com/avatar/e64c7d89f26bd1972efa854d13d7dd61.jpg?s=200&d=mm"
                />
              </v-avatar>
            </v-col>
            <v-col>
              <h2>{{user.name}}</h2>
            </v-col>
          </v-row>
          <v-container class="contents">
            <v-row>
              <v-col cols="6">
                <v-container class="left_contents">
                  <v-row>
                    <v-img height="400px" contain :src="work1Img"></v-img>
                  </v-row>
                  <v-row class="spePerctives">
                    <v-container>
                      <v-layout>
                        <v-flex class="flex-row">
                          <v-img width="100px" :src="work2Img"></v-img>

                          <v-img width="100px" :src="work2Img"></v-img>

                          <v-img width="100px" :src="work2Img"></v-img>

                          <v-img width="100px" :src="work2Img"></v-img>

                          <v-img width="100px" :src="work2Img"></v-img>
                        </v-flex>
                      </v-layout>
                    </v-container>
                  </v-row>
                </v-container>
              </v-col>
              <!--<v-container class="right_contents"-->
              <v-col cols="6" class="comments">
                <v-card>
                  <v-card-title>comments</v-card-title>
                </v-card>
              </v-col>
              <!--/v-container-->
            </v-row>
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
      work2Img: work2Img
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
