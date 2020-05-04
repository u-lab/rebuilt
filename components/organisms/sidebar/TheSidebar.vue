<template>
  <v-navigation-drawer v-model="drawer" fixed clipped app dark>
    <sidebar-list :list="getLinkList" :user="user" />
  </v-navigation-drawer>
</template>

<script>
const SidebarList = () => import('@/components/organisms/list/SidebarList')

export default {
  components: {
    SidebarList
  },

  props: {
    drawer: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    getLinkList() {
      return [
        { title: 'dashboard', name: 'users.dashboard' },
        { title: 'add_new_work', name: 'users.storages.create' },
        { title: 'list_of_works', name: 'users.storages.index' },
        { title: 'see_everyones_works', name: 'users.storages' },
        {
          title: 'see_portfolio',
          name: 'pages.user',
          params: { user: this.user.name }
        },
        { title: 'edit_my_portfolio', name: 'users.page.edit' },
        {
          title: 'settings',
          name: 'users.settings.index'
        }
      ]
    },

    user() {
      return this.$store.getters['auth/user']
    }
  }
}
</script>
