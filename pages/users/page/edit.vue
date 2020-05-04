<template>
  <page-edit-template v-model="form" :page="data" @submit="update" />
</template>

<script>
import Form from 'vform'
import { objectToFormData } from 'object-to-formdata'
import axios from 'axios'
const PageEditTemplate = () =>
  import('@/components/templates/users/PageEditTemplate')

export default {
  middleware: 'auth',

  components: {
    PageEditTemplate
  },

  data() {
    return {
      form: new Form({
        user_id: '' /* Integer */,
        description: '' /* String */,
        nick_name: '' /* String */,
        kana: '' /* String */,
        icon_image: '' /* FILE */,
        background_image: '' /* FILE */,
        web_address: '' /* URL */,
        user_career: [] /* Array */,
        user_career_did: [] /* Integer 削除したいuser_carrerのID */
      })
    }
  },

  computed: {
    user() {
      return this.$store.getters['auth/user']
    }
  },

  async asyncData() {
    try {
      const { data } = await axios.get('users/profile')

      return { success: true, data: data.data }
    } catch (e) {}
  },

  created() {
    this.form.user_id = this.user.id
    if (this.data) {
      this.form.description = this.data.description
      this.form.nick_name = this.data.nick_name
      this.form.kana = this.data.kana
      this.form.web_address = this.data.web_address
      this.form.user_career = this.data.user_career
    }
  },

  methods: {
    async update() {
      // API Serverに PATCH する
      try {
        this.form.user_career = this.form.user_career.map((obj) => ({
          date: obj.date,
          id: obj.id,
          name: obj.name,
          type: obj.type
        }))

        await this.form.post(`/users/profile`, {
          transformRequest: [
            function(data, headers) {
              data._method = 'PATCH'
              return objectToFormData(data)
            }
          ]
        })

        this.$store.commit('page/CLEAR_ALL')

        // Redirect User Dashboard.
        this.$router.push({ name: 'users.dashboard' })
      } catch (e) {
        // TODO: 何が起きるかはわからないが、そのログをとりたい。
      }
    }
  }
}
</script>
