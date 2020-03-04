<template>
  <div>
    <!-- TODO 全プロフィール修正 -->
    <user-title title="プロフィール編集" />

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
        job_name: '' /* String */,
        nick_name: '' /* String */,
        web_address: '' /* URL */
      }),

      formUser: new Form({
        name: '' /* String */,
        email: '' /* E-Mail */,
        photo_url: '' /* URL */
      })
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

        // Redirect home.
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
    }
  }
}
</script>
