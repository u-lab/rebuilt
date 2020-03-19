<template>
  <div>
    <!-- TODO 自分の情報を修正 -->
    <user-title title="ポートフォリオ編集" />

    <v-container class="pos-relative">
      <v-card color=" grey lighten-1">
        <!-- 画像の挿入 -->
        <div class="">
          <div class="d-flex pos-relative justify-end pr-0 pt-0">
            <v-img
              :src="headerimg"
              width="100%"
              height="200"
            > </v-img>
            <v-btn
              class="teal--text text--lighten-1 btn "
              color="grey lighten-3"
            >
              Store
            </v-btn>
          </div>
        </div>

        <div class="pos-relative img-form ">
          <!-- eyecatch_image -->
          <v-file-input
            v-model="formPage.eyecatch_image"
            :label="$t('eyecatch_image')"
            @change="eyecatchImageFileChange"
            accept="image/*"
            show-size
            filled
            height="200px"
          />

          <template v-if="preview.eyecatch_image">
            <div class="user_storage_eyecatch_image_preview">
              <v-avatar
                class=""
                size="280"
              >
                <v-img
                  :src="preview.eyecatch_image"
                  class="pos-topAndBottomCenter"
                  alt=""
                />
              </v-avatar>
            </div>
          </template>

          <template v-else-if="formPage.eyecatch_image_url">
            <div class=" user_storage_eyecatch_image_preview">
              <v-avatar
                class="user-icon"
                size="280"
              >
                <v-img
                  :src="formPage.eyecatch_image_url"
                  class="pos-topAndBottomCenter"
                  alt=""
                />
              </v-avatar>
            </div>
          </template>

          <template v-else>
            <v-avatar
              class="user-icon"
              size="280"
              color="grey lighten-1"
            >
              <v-icon
                class="pos-topAndBottomCenter"
                light
                x-large
              >
                mdi-plus
              </v-icon>
            </v-avatar>
          </template>
        </div>

        <v-row justify="center">
          <v-col
            class="pb-0 pt-0"
            cols="12"
          >
            <v-card color="grey lighten-4">
              <v-row justify="center">
                <v-col
                  class="pt170"
                  cols="4"
                >
                  <v-text-field
                    label="name"
                    single-line
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row justify="center">
                <v-col cols="10">
                  <v-textarea outlined>
                    <template v-slot:label>
                      <div>
                        Bio
                      </div>
                    </template>
                  </v-textarea>
                </v-col>
              </v-row>
              <v-row justify="center">
                <v-col cols="5">
                  <v-card-title>
                    Career
                  </v-card-title>
                  <v-card height="700px"> </v-card>
                </v-col>
                <v-col cols="5">
                  <v-card-title>
                    Reword
                  </v-card-title>
                  <v-card height="700px"> </v-card>
                </v-col>
              </v-row>
            </v-card>
          </v-col>
        </v-row>
      </v-card>
    </v-container>

    <!--debug-->

    <v-form
      @submit.prevent="updatePage"
      @keydown="formPage.onKeydown($event)"
    >
      <v-text-field
        v-model="formPage.long_comment"
        :counter="255"
        :label="$t('long_comment')"
        required
      />

      <v-text-field
        v-model="formPage.masterpiece_storage_id"
        :counter="255"
        :label="$t('masterpiece_storage')"
        required
      />

      <div class="text-center login-btn-wraaper">
        <!-- Submit Button -->
        <v-btn
          :disabled="formPage.busy"
          color="grey lighten-1"
          large
          type="submit"
        >
          {{ $t('update') }}
        </v-btn>
      </div>
    </v-form>
  </div>
</template>

<script>
import Form from 'vform'
import { mapGetters } from 'vuex'
import axios from 'axios'
import UserTitle from '~/components/user/UserTitle'
import headerimg from '~/assets/img/work2.jpg'

export default {
  middleware: 'auth',

  layout: 'user',

  components: {
    UserTitle
  },
  data() {
    return {
      formPage: new Form({
        long_comment: '' /* String */,
        masterpiece_storage_id: '' /* String */,
        eyecatch_image: '' /* FILE */,
        user_id: '' /* Integer */,
        storage: ''
      }),
      preview: {
        eyecatch_image: ''
      },
      headerimg
    }
  },

  computed: mapGetters({
    user: 'auth/user'
  }),

  async asyncData() {
    try {
      const { data } = await axios.get('users/page')

      return { success: true, data: data.data }
    } catch (e) {}
  },

  created() {
    this.formPage.keys().forEach((key) => {
      if (this.data[key] !== null) {
        this.formPage[key] = this.data[key]
      }
    })

    this.formPage.masterpiece_storage_id = this.data.masterpiece_storage.storage_id
    this.storage = this.data.masterpiece_storage
  },

  methods: {
    async updatePage() {
      try {
        await this.formPage.patch('/users/page')

        // Redirect dashboard.
        this.$router.push({ name: 'users.dashboard' })
      } catch (e) {
        console.log(e)
      }
    },
    eyecatchImageFileChange(e) {
      // e は FILE Objectであることに注意
      try {
        this.preview.eyecatch_image = URL.createObjectURL(e)
      } catch (e) {
        this.preview.eyecatch_image = null
      }
    }
  }
}
</script>
<style>
.pt170 {
  padding-top: 170px;
}
.pb150 {
  padding-bottom: 150px;
}

.user-icon {
  position: absolute;
  left: 50%;
  bottom: 50%;

  transform: translateY(50%) translateX(-50%);
  -webkit-transform: translateY(50%) translateX(-50%);
  z-index: 2;
}
.z-index1 {
  z-index: 1;
}
.btn {
  z-index: 1;
  position: absolute;
  left: 95%;
  top: 10%;

  transform: translateY(50%) translateX(-50%);
  -webkit-transform: translateY(50%) translateX(-50%);
}
.img-form {
  position: absolute;
  left: 50%;
  top: 0;
  z-index: 1;
  transform: translateY(50%) translateX(-50%);
  -webkit-transform: translateY(50%) translateX(-50%);
}
</style>
