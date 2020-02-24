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
        :to="item.link"
      >
        <v-list-item-content>
          <v-list-item-title>{{ item.name }}</v-list-item-title>
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
        { name: 'Top Page', link: '/' },
        { name: '個人ページ', link: '/pages/admin' },
        { name: '作品一覧', link: '/pages/admin/storages' },
        { name: '作品ページ', link: '/pages/admin/storages/1581315433ra05d0' },
        { name: 'プロフィール一覧', link: '/profiles' },
        { name: '作品一覧', link: '/storages' },
        { name: '自分のポートフォリオ', link: '/users/page' },
        { name: '自分のポートフォリオ(編集)', link: '/users/page/edit' },
        { name: '自分の作品一覧', link: '/users/storages' },
        { name: '新規作品追加', link: '/users/storages/create' },
        { name: '自分の作品を見る', link: '/users/storages/1581315433ra05d0' },
        { name: '自分の作品(編集)', link: '/users/storages/1581315433ra05d0/edit' }
      ]
    }
  }
}
</script>
