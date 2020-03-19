<template>
  <div>
    <!-- TODO 全プロフィール修正 -->
    <!-- TODO 自分の情報を修正 -->
    <user-title title="プロフィール編集" />

    <v-container>
      <v-card color="grey lighten-1">
        <!-- 画像の挿入 -->
        <div class="">
          <div class="d-flex pos-relative justify-end pr-0 pt-0">
            <v-img
              :src="headerimg"
              width="100%"
              height="200"
            > </v-img>
            <v-btn
              class="teal--text text--lighten-1 btn-store "
              color="grey lighten-3"
            >
              Store
            </v-btn>
          </div>
        </div>

        <div class="pos-relative">
          <!-- eyecatch_image -->
          <v-file-input
            v-model="formProfile.eyecatch_image"
            :label="$t('eyecatch_image')"
            @change="eyecatchImageFileChange"
            accept="image/*"
            show-size
            filled
            height="200px"
          />

          <template v-if="preview.eyecatch_image">
            <div class=" user_storage_eyecatch_image_preview">
              <v-avatar
                class="user-icon"
                size="280"
              >
                <v-img
                  :src="preview.eyecatch_image"
                  alt=""
                />
              </v-avatar>
            </div>
          </template>

          <template v-else-if="formProfile.eyecatch_image_url">
            <div class=" user_storage_eyecatch_image_preview">
              <v-avatar
                class="user-icon"
                size="280"
              >
                <v-img
                  :src="formProfile.eyecatch_image_url"
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
            class="pb-0"
            cols="12"
          >
            <v-card color="grey lighten-4">
              <v-row justify="center">
                <v-btn
                  class="teal--text text--lighten-1 btn-edit "
                  color="grey lighten-3"
                >編集</v-btn>
                <v-col
                  class="pt170"
                  cols="4"
                >
                  <v-text-field
                    v-model="formUser.name"
                    :counter="255"
                    :label="$t('name')"
                    required
                  />
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
                <v-card-title>-work-</v-card-title>
                <v-btn
                  class="white--text  btn-work"
                  color="teal lighten-1"
                >
                  <v-icon left>mdi-plus</v-icon>work
                </v-btn>
              </v-row>
              <v-row>
                <v-col
                  v-for="n in 9"
                  align="center"
                  cols="4"
                >
                  <v-card width="400px">
                    <v-img :src="workimg"> </v-img>
                    <v-card-title>Rocket room</v-card-title>
                  </v-card>
                </v-col>
              </v-row>
            </v-card>
          </v-col>
        </v-row>
      </v-card>
    </v-container>

    <div>
      <h2>{{ $t('user') }}情報を編集</h2>
      <v-form
        @submit.prevent="updateUser"
        @keydown="formUser.onKeydown($event)"
      >
        <v-text-field
          v-model="formUser.name"
          :counter="255"
          :label="$t('name')"
          required
        />

        <v-text-field
          v-model="formUser.email"
          :counter="255"
          :label="$t('email')"
          required
        />

        <v-text-field
          v-model="formUser.photo_url"
          :counter="255"
          :label="$t('your_icon')"
          required
        />

        <div class="text-center login-btn-wraaper">
          <!-- Submit Button -->
          <v-btn
            :disabled="formUser.busy"
            color="grey lighten-1"
            large
            type="submit"
          >
            {{ $t('update') }}
          </v-btn>
        </div>
      </v-form>
    </div>

    <div>
      <h2>{{ $t('profile') }}情報を編集</h2>
      <v-form
        @submit.prevent="updateProfile"
        @keydown="formProfile.onKeydown($event)"
      >
        <v-text-field
          v-model="formProfile.description"
          :counter="255"
          :label="$t('description')"
          required
        />

        <v-text-field
          v-model="formProfile.hobby"
          :counter="255"
          :label="$t('hobby')"
          required
        />

        <v-file-input
          v-model="formProfile.icon_image"
          :label="$t('your_icon')"
          accept="image/*"
          show-size
          filled
          prepend-icon="mdi-camera"
        />

        <v-text-field
          v-model="formProfile.job_name"
          :counter="255"
          :label="$t('job')"
          required
        />

        <v-text-field
          v-model="formProfile.nick_name"
          :counter="255"
          :label="$t('nick_name')"
          required
        />

        <v-text-field
          v-model="formProfile.web_address"
          :counter="255"
          :label="$t('web_address')"
          required
        />

        <div class="text-center login-btn-wraaper">
          <!-- Submit Button -->
          <v-btn
            :disabled="formProfile.busy"
            color="grey lighten-1"
            large
            type="submit"
          >
            {{ $t('update') }}
          </v-btn>
        </div>
      </v-form>
    </div>
  </div>
</template>

<script>
import Form from 'vform'
import axios from 'axios'
import { mapGetters } from 'vuex'
import { objectToFormData } from 'object-to-formdata'
import UserTitle from '~/components/user/UserTitle'
import headerimg from '~/assets/img/work2.jpg'
import workimg from '~/assets/img/work1.jpg'

export default {
  middleware: 'auth',

  layout: 'user',

  components: {
    UserTitle
  },

  data() {
    return {
      formProfile: new Form({
        user_id: '' /* Integer */,
        description: '' /* String */,
        hobby: '' /* Stirng */,
        icon_image: '' /* FILE */,
        icon_image_url: '' /* URL */,
        eyecatch_image: '' /* FILE */,
        job_name: '' /* String */,
        nick_name: '' /* String */,
        web_address: '' /* URL */
      }),

      formUser: new Form({
        name: '' /* String */,
        email: '' /* E-Mail */,
        photo_url: '' /* URL */
      }),
      preview: {
        eyecatch_image: ''
      },
      headerimg,
      workimg
    }
  },

  computed: mapGetters({
    user: 'auth/user'
  }),

  async asyncData() {
    try {
      const { data } = await axios.get('users/profile')

      return { success: true, data: data.data }
    } catch (e) {}
  },

  created() {
    // Fill the formProfile with data.
    if (this.formProfile !== null) {
      this.formProfile.keys().forEach((key) => {
        if (this.data[key] !== null) {
          this.formProfile[key] = this.data[key]
        }
      })
    }

    // Fill the formUser with user data.
    this.formUser.keys().forEach((key) => {
      this.formUser[key] = this.user[key]
    })
  },

  methods: {
    async updateUser() {
      try {
        const { data } = await this.formUser.patch('/settings/profile')

        this.$store.dispatch('auth/updateUser', { user: data })

        // Redirect dashboard.
        this.$router.push({ name: 'users.dashboard' })
      } catch (e) {
        console.log(e)
      }
    },

    async updateProfile() {
      try {
        await this.formProfile
          .post('users/profile', {
            transformRequest: [
              function(data, headers) {
                data._method = 'PATCH'
                return objectToFormData(data)
              }
            ]
          })
          .then((response) => {
            // Redirect User Dashboard.
            this.$router.push({ name: 'users.dashboard' })
          })
      } catch (e) {}
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
  z-index: 1;
}
.btn-store {
  position: absolute;
  left: 95%;
  top: 0;

  transform: translateY(50%) translateX(-50%);
  -webkit-transform: translateY(50%) translateX(-50%);
  z-index: 1;
}
.btn-edit {
  position: absolute;
  left: 15%;
  top: 5%;

  transform: translateY(50%) translateX(-50%);
  -webkit-transform: translateY(50%) translateX(-50%);
}
.btn-work {
  position: absolute;
  left: 92%;
  top: 27%;

  transform: translateY(50%) translateX(-50%);
  -webkit-transform: translateY(50%) translateX(-50%);
}
</style>
