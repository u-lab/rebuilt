<template>
  <div>
    <!-- TODO 自分の情報を修正 -->
    <user-title title="ポートフォリオ編集" />

    <v-form @submit.prevent="update" @keydown="form.onKeydown($event)">
      <v-container>
        <div class="d-flex justify-end mb-2">
          <!-- Submit Button -->
          <v-btn
            :disabled="form.busy"
            class="teal--text text--lighten-1"
            color="grey lighten-3"
            large
            type="submit"
          >
            {{ $t('store') }}
          </v-btn>
        </div>

        <!-- 画像の挿入 -->
        <v-card>
          <div class="pos-relative" style="margin-bottom: 130px">
            <v-img
              v-if="preview.background_image_url"
              :src="preview.background_image_url"
              class="user_storage_eyecatch_image_preview"
              height="180px"
              style="z-index:3;"
            />

            <v-img
              v-else-if="data.background_image.url"
              :src="data.background_image.url"
              class="user_storage_eyecatch_image_preview"
              height="180px"
              style="z-index:3;"
            />

            <v-file-input
              v-model="form.background_image"
              :label="$t('background_image')"
              @change="backgroundImageFileChange"
              class="pos-topLeftAlign v-file-input-icon-none w-100"
              filled
              height="180px"
            />

            <div class="pos-marginBottomCenter" style="z-index: 3">
              <div class="pos-relative">
                <v-avatar
                  :size="130"
                  class="pages-user-header-avatar pos-relative"
                >
                  <v-img
                    v-if="preview.icon_image_url"
                    :src="preview.icon_image_url"
                    class="user_storage_eyecatch_image_preview"
                    style="z-index:5;"
                  />

                  <v-img
                    v-else-if="data.icon_image.url"
                    :src="data.icon_image.url"
                    class="user_storage_eyecatch_image_preview"
                    style="z-index:5;"
                  />

                  <span
                    v-else
                    v-text="`アイコン`"
                    class="user_storage_eyecatch_image_preview"
                  />

                  <v-file-input
                    v-model="form.icon_image"
                    :label="$t('icon')"
                    @change="iconImageFileChange"
                    class="pos-topLeftAlign v-file-input-icon-none w-100"
                    show-size
                    filled
                    height="130px"
                  />
                </v-avatar>

                <div
                  class="pos-topAndBottomCenter"
                  style="z-index: 10; pointer-events: none;"
                >
                  <v-icon size="40" class="user_storage_eyecatch_image_preview">
                    mdi-plus
                  </v-icon>
                </div>
              </div>
            </div>
          </div>

          <v-row justify="center">
            <v-col cols="4">
              <v-text-field v-model="form.nick_name" label="name" single-line />
            </v-col>
          </v-row>

          <v-container>
            <v-row>
              <v-col cols="12">
                <v-textarea
                  v-model="form.description"
                  filled
                  auto-grow
                  label="Four rows"
                  rows="4"
                  row-height="30"
                  shaped
                ></v-textarea>
              </v-col>

              <v-col cols="6">
                <!-- TODO: 作品一覧の表示 -->
              </v-col>
              <v-col cols="6">
                <v-card-title> -{{ $t('career') }}- </v-card-title>
                <v-card height="200px">
                  <v-btn @click.stop="historyModal = true">追加</v-btn>

                  <v-list>
                    <v-list-item
                      v-for="(item, key) in form.user_career"
                      :key="`history-${key}`"
                    >
                      <v-list-item-title
                        >{{ item.date }}: {{ item.name }}</v-list-item-title
                      >
                    </v-list-item>
                  </v-list>
                </v-card>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-container>

      <v-dialog v-model="historyModal" :width="dialogWidth">
        <v-card>
          <v-text-field v-model="history.name" :label="$t('name')" />

          <template v-slot:activator="{ on }">
            <v-text-field
              v-model="date"
              v-on="on"
              label="Picker in dialog"
              prepend-icon="event"
              readonly
            ></v-text-field>
          </template>

          <v-dialog
            ref="dialog"
            v-model="dateModal"
            :return-value.sync="history.date"
            :width="dialogWidth"
            persistent
          >
            <template v-slot:activator="{ on }">
              <v-text-field
                v-model="history.date"
                v-on="on"
                label="Picker in dialog"
                readonly
              ></v-text-field>
            </template>
            <v-date-picker v-model="history.date" type="month" scrollable>
              <v-spacer></v-spacer>
              <v-btn @click="dateModal = false" text color="primary"
                >Cancel</v-btn
              >
              <v-btn
                @click="$refs.dialog.save(history.date)"
                text
                color="primary"
              >
                OK
              </v-btn>
            </v-date-picker>
          </v-dialog>

          <div>
            <v-btn @click="historyModal = false" text color="primary">
              Cancel
            </v-btn>
            <v-btn @click="historyAdd" text color="primary">
              OK
            </v-btn>
          </div>
        </v-card>
      </v-dialog>
    </v-form>
  </div>
</template>

<script>
import Form from 'vform'
import { mapGetters } from 'vuex'
import { objectToFormData } from 'object-to-formdata'
import clonedeep from 'lodash.clonedeep'
import axios from 'axios'
import UserTitle from '~/components/molecues/pages/UserTitle'
import headerimg from '~/assets/img/work2.jpg'

export default {
  middleware: 'auth',

  layout: 'user',

  components: {
    UserTitle
  },

  data() {
    return {
      form: new Form({
        user_id: '' /* Integer */,
        description: '' /* String */,
        nick_name: '' /* String */,
        icon_image: '' /* FILE */,
        background_image: '' /* FILE */,
        web_address: '' /* URL */,
        user_career: [] /* Array */,
        user_career_did: [] /* Integer 削除したいuser_carrerのID */
      }),
      preview: {
        icon_image_url: '',
        background_image_url: ''
      },
      headerimg,
      date: new Date().toISOString().substr(0, 10),
      dateModal: false,
      historyModal: false,

      history: {
        id: '',
        name: '',
        date: new Date().toISOString().substr(0, 10)
      }
    }
  },

  computed: {
    ...mapGetters({
      user: 'auth/user'
    }),

    dialogWidth() {
      return '290px'
    },

    getIconSrc() {
      const image = this.data.user_profile.icon_image
      return (
        this.preview.eyecatch_image_url ||
        image.url_160 ||
        image.url_320 ||
        image.url
      )
    }
  },

  async asyncData() {
    try {
      const { data } = await axios.get('users/profile')

      return { success: true, data: data.data }
    } catch (e) {}
  },

  created() {
    this.form.keys().forEach((key) => {
      if (this.data[key] !== null) {
        this.form[key] = this.data[key]
      }
    })

    this.preview.icon_image_url = this.data.icon_image.url
    this.preview.background_image_url = this.data.background_image.url
    this.form.background_image = ''
    this.form.icon_image = ''
    this.form.user_career_did = []
  },

  methods: {
    async update() {
      // API Serverに PATCH する
      try {
        await this.form
          .post(`/users/profile`, {
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
      } catch (e) {
        // TODO: 何が起きるかはわからないが、そのログをとりたい。
      }
    },

    backgroundImageFileChange(e) {
      // e は FILE Objectであることに注意
      try {
        this.preview.background_image_url = URL.createObjectURL(e)
      } catch (e) {
        this.preview.background_image_url = null
      }
    },

    iconImageFileChange(e) {
      // e は FILE Objectであることに注意
      try {
        this.preview.icon_image_url = URL.createObjectURL(e)
      } catch (e) {
        this.preview.icon_image_url = null
      }
    },

    historyAdd() {
      const history = this.history
      this.form.user_career.push(clonedeep(history))
      this.history = {
        id: '',
        name: '',
        date: new Date().toISOString().substr(0, 10)
      }
      this.historyModal = false
    }
  }
}
</script>
