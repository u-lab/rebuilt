<template>
  <div>
    <!-- TODO 自分の作品を見る -->
    <user-title
      class="text-center"
      title="-my work-"
    />
    <v-container>
      <v-row>
        <v-col>
          <v-card
            :to="{
              name: 'users.storages.create'
            }"
            color="#26A69A"
            dark
            height="80px"
            hover
          >
            <v-row align="center">
              <v-col
                align="end"
                cols="2"
              >
                <v-icon
                  dark
                  x-large
                >mdi-plus</v-icon>
              </v-col>
              <v-col cols="10">
                <v-card-title>Work</v-card-title>
              </v-col>
            </v-row>
          </v-card>
        </v-col>

        <v-col
          v-for="(items, key) in data.data"
          :key="key"
          cols="6"
        >
          <v-card
            :to="{
              name: 'users.storages.edit',
              params: { storageId: items.storage_id }
            }"
            hover
            dark
            nuxt
          >
            <v-img
              :src="items.eyecatch_image.url"
              class="align-center white--text"
              gradient="rgba(0,0,0,.5), rgba(0,0,0,.5)"
              height="80px"
            >
              <v-card-title class="justify-center">
                {{ items.title }}
              </v-card-title>
            </v-img>
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

export default {
  middleware: 'auth',

  layout: 'user',

  components: {
    UserTitle
  },

  computed: mapGetters({
    user: 'auth/user'
  }),

  async asyncData({ params, error }) {
    const { data } = await axios.get('users/storage')
    return { success: true, data }
  }
}
</script>
