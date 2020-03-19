<template>
  <div>
    <!-- TODO 自分の情報を修正 -->
    <user-title title="ポートフォリオ編集" />
  
<v-container>
  <v-card  color="grey lighten-1">
    <v-row class="pb20" justify="end">
      
      <v-col  cols="4">
        <div class="d-flex justify-end pr-3">
        <v-btn  class="teal--text text--lighten-1 " color="grey lighten-3">
          Store
        </v-btn>
        </div>
      </v-col>
    </v-row>
    <v-row class="user-icon-parent"  justify="center" >
      <v-col cols="1">  
        <div class=" align-end">
          <v-avatar class="user-icon" size="280" color="grey lighten-1">
          <v-icon class="pos-topAndBottomCenter" light x-large>
            mdi-plus
          </v-icon>
          </v-avatar>
        </div>
                      
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col class="pb-0" cols="12">
      <v-card  color="grey lighten-4">
        <v-row justify="center">
          <v-col class="pt20" cols="4">
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
            <v-card height="700px">
            </v-card>
          </v-col>
          <v-col cols="5">
             <v-card-title>
              Reword
            </v-card-title>
            <v-card height="700px">
            </v-card>
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
      long_comment: '' /* String */,
      masterpiece_storage_id: '' /* String */,
      user_id: '' /* Integer */
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
    }
  }
}
</script>
<style>
.pt20{
  padding-top:170px
}
.pb20{
  padding-bottom: 150px;
}
.user-icon-parent{
  position: relative;
}
.user-icon{
    position: absolute;
  left: 50%;
  bottom: 50%;

  transform: translateY(50%) translateX(-50%);
  -webkit-transform: translateY(50%) translateX(-50%);
  z-index: 1;
  
}
</style>
