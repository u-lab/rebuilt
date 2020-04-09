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
          <v-list-item-title>{{ $t(item.title) }}</v-list-item-title>
        </v-list-item>

        <v-list-group
          v-if="item.subtitles"
          :key="item.name"
          color="white"
          sub-group
        >
          <template v-slot:activator>
            <v-list-item-title>{{ $t(item.title) }}</v-list-item-title>
          </template>

          <v-list-item
            v-for="subItem in item.subtitles"
            :key="subItem.name"
            :to="generateLink(subItem)"
            link
            nuxt
            dark
          >
            <v-list-item-title>{{ $t(subItem.title) }}</v-list-item-title>
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
        { title: 'dashboard', name: 'users.dashboard' },
        { title: 'add_new_work', name: 'users.storages.create' },
        { title: 'list_of_works', name: 'users.storages.index' },
        { title: 'see_everyones_works', name: 'users.storages' },
        { title: 'see_portfolio', name: 'users.page.index' },
        { title: 'edit_my_portfolio', name: 'users.page.edit' },
        {
          title: 'settings',
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
