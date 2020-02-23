<template>
  <div>
    <v-navigation-drawer
      v-model="drawer"
      app
      clipped
      dark
    >
      <v-list
        dense
        nav
        class="py-0"
      >
        <v-list-item v-for="item in items" :key="item.title" link>
          <v-list-item-content>
            <v-list-item-title>
              {{ item.title }}
            </v-list-item-title>
            <v-list-item v-for="subtitle in item.subtitles" :key="subtitle.title" link>
              <v-list-item-title>
                {{ subtitle.title }}
              </v-list-item-title>
            </v-list-item>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <h1>作品を記録する</h1>
  </div>
</template>

<script>
import axios from 'axios'
// import Form from 'vform'

export default {

  data () {
    return {
      items: [
          { title: 'ダッシュボード' },
          { title: '作品を記録する',
            subtitles: [ { title: 'プロフィールの変更' },
                         { title: '作品の投稿' },
                         { title: '作品一覧' },
                         { title: 'アカウント設定' }
                       ]
          },
          { title: '作品を眺める',
            subtitles: [ { title: 'ギャラリー' },
                         { title: 'イイね履歴' },
                         { title: 'お気に入り一覧' }
                       ]
          }
        ]
    }
    /*
    return {
      form: new Form({
        data: ''
      })
    }
    */
  },

  async asyncData ({ params, error }) {
    try {
      const { data } = await axios.get(`pages/${params.user}`)
      return { success: true, data }
    } catch (e) {
      // return error({
      //   statusCode: e.response.data.status,
      //   message: e.response.data.message
      // })
      return { success: false, statusCode: e.response.data.status }
    }
  }

  /*,
  created () {
      // Fill the form with data.
      this.form.keys().forEach((key) => {
        if (this.data[key] !== null) {
          this.form[key] = this.data[key]
        }
      })
  }
  */
}
</script>
