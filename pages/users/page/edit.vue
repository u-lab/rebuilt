<template>
  <div>
    <!-- TODO 自分の情報を修正 -->
    <user-title title="ポートフォリオ編集" />

    <div>
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
  </div>
</template>

<script>
import Form from 'vform'
import { mapGetters } from 'vuex'
import axios from 'axios'
import UserTitle from '~/components/user/UserTitle'

export default {
  middleware: 'auth',

  layout: 'user',

  components: {
    UserTitle
  },

  data: () => ({
    formPage: new Form({
      long_comment: '',
      masterpiece_storage_id: ''
    }),
    storage: ''
  }),

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

    this.formPage.masterpiece_storage_id = this.data.masterpiece_storage.id
    this.storage = this.data.masterpiece_storage
  },

  methods: {
    async updatePage() {
      try {
        await this.formPage.patch('/users/page')

        // Redirect home.
        this.$router.push({ name: 'users.dashboard' })
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>
