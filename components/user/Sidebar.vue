<template>
  <v-navigation-drawer
    v-model="drawer"
    fixed
    clipped
    app
    dark
  >
    <v-list>
      <v-list-item
        v-for="item in getLinkList"
        :key="item.name"
        nuxt
        link
        :to="generateLink(item)"
      >
        <v-list-item-content>
          <v-list-item-title>{{ item.title }}</v-list-item-title>

          <v-list-item v-for="subtitle in item.subtitles" :key="subtitle.title" link nuxt :to="generateLink(subtitle)">
            <v-list-item-title>
              {{ subtitle.title }}
            </v-list-item-title>
          </v-list-item>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  data () {
    return {
      drawer: true
    }
  },

  computed: {
    getLinkList: () => {
      return [
          { title: 'ダッシュボード', name: 'users.dashboard' },
          {
            title: '作品を記録する',
            subtitles: [
              { title: '作品の投稿', name: 'users.storages.create' },
              { title: '作品一覧', name: 'users.storages.index' },
              { title: '作品(デバッグ用)', link: '/users/storages/1581315433ra05d0' },
              { title: '作品編集(デバッグ用)', link: '/users/storages/1581315433ra05d0/edit' }
            ]
          },
          {
            title: '作品を眺める',
            subtitles: [
              { title: 'みんなのプロフィールを見る', name: 'users.profiles' },
              { title: 'みんなの作品を見る', name: 'users.storages' }
            ]
          },
          {
            title: 'アカウント設定',
            subtitles: [
              { title: 'ポートフォリオを見る', name: 'users.page.index' },
              { title: 'ポートフォリオを編集', name: 'users.page.edit' },
              { title: 'アカウント情報を見る', name: 'users.profile.index' },
              { title: 'アカウント情報を編集', name: 'users.profile.edit' }
            ]
          }
        ]
    }

  },

  methods: {
    generateLink (item) {
      if (item.hasOwnProperty('name')) {
        return { name: item.name }
      }

      if (item.hasOwnProperty('link')) {
        return item.link
      }

      return null
    }
  }
}
</script>
