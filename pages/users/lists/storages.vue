<template>
  <div>
    <!-- TODO 全作品一覧を作る -->
    <user-title
      class="text-center"
      title="-Open Gallery-"
    />
    <v-container>
      <h3>Todays Home!!</h3>

      <v-card>
        <v-container>
          <v-row>
            <v-col cols="6">
              <v-img :src="myhomeImg"></v-img>
            </v-col>
            <v-col cols="6">
              <v-row>
                <v-col cols="3">
                  <v-avatar size="62">
                    <img :src="myIcon" />
                  </v-avatar>
                </v-col>
                <v-col cols="9">
                  <h3>Iizumi Kazuma</h3>
                </v-col>
              </v-row>
              <v-row>
                <v-card
                  height="100%"
                  width="100%"
                >
                  <v-card-text>test</v-card-text>
                </v-card>
              </v-row>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-container>

    <v-container>
      <v-row>
        <v-col
          :key="key"
          v-for="(items, key) in data.data"
          cols="4"
        >
          <v-card
            :to="{
              name: 'pages.storages.show',
              params: { user: user.name, storageId: items.storage_id }
            }"
            hover
          >
            <v-img :src="items.eyecatch_image.url"></v-img>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import axios from 'axios'
import { mapGetters } from 'vuex'
import UserTitle from '~/components/user/UserTitle'
import myhomeImg from '~/assets/img/work2.jpg'
import myIcon from '~/assets/img/usericon-ex.jpg'

export default {
  components: {
    UserTitle
  },
  computed: mapGetters({
    user: 'auth/user'
  }),
  data() {
    return {
      myhomeImg,
      myIcon
    }
  },
  middleware: 'auth',

  layout: 'user',

  async asyncData() {
    const { data } = await axios.get(`/storages`)
    return { success: true, data }
  }
}
</script>
