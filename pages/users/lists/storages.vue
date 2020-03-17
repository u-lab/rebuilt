<template>
  <div>
    <!-- TODO 全作品一覧を作る -->
    <user-title
      class="text-center"
      title="-Open Gallery-"
    />
    <v-container>
      <h3>{{ data[0].data.title }}</h3>

      <v-card>
        <v-container>
          <v-row>
            <v-col cols="6">
              <v-img :src="data[0].data.eyecatch_image.url"></v-img>
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
                <v-card width="100%">
                  <v-card-text>{{ data[0].data.description }}</v-card-text>
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
          v-for="(items, key) in data"
          cols="4"
        >
          <v-card
            :to="{
              name: 'pages.storages.show',
              params: {
                user: items.user.name,
                storageId: items.data.storage_id
              }
            }"
            hover
          >
            <v-img :src="items.data.eyecatch_image.url"></v-img>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import axios from 'axios'
import UserTitle from '~/components/user/UserTitle'
import myIcon from '~/assets/img/usericon-ex.jpg'

export default {
  components: {
    UserTitle
  },

  data() {
    return {
      myIcon
    }
  },

  middleware: 'auth',

  layout: 'user',

  async asyncData() {
    const { data } = await axios.get(`/storages`)
    return {
      success: true,
      data: data.data,
      links: data.links,
      meta: data.meta
    }
  }
}
</script>
