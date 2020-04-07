<template>
  <v-navigation-drawer v-model="drawer" fixed clipped app dark>
    <v-list dark>
      <template v-for="item in getLinkList">
        <v-list-item
          v-if="!item.subtitles"
          :key="item.name"
          :to="generateLink(item)"
          nuxt
          link
          dark
          color="white"
        >
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>

        <v-list-group
          v-if="item.subtitles"
          :key="item.name"
          color="white"
          sub-group
        >
          <template v-slot:activator>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </template>

          <v-list-item
            v-for="subItem in item.subtitles"
            :key="subItem.name"
            :to="generateLink(subItem)"
            link
            nuxt
            dark
          >
            <v-list-item-title>{{ subItem.title }}</v-list-item-title>
          </v-list-item>
        </v-list-group>
      </template>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  props: {
    drawer: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    getLinkList: () => {
      return [
        { title: 'ダッシュボード', name: 'users.dashboard' },
        { title: '新規作品追加', name: 'users.storages.create' },
        { title: '作品一覧', name: 'users.storages.index' },
        { title: 'みんなの作品を見る', name: 'users.storages' },
        { title: 'ポートフォリオを見る', name: 'users.page.index' },
        { title: 'ポートフォリオを編集', name: 'users.page.edit' },
        {
          title: '設定',
          name: 'users.settings.index'
        }
      ]
    }
  },

  methods: {
    generateLink(item) {
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
