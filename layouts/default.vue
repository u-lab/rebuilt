<template>
  <v-app class="default">
    <user-navbar v-if="isAuth" @drawer="onDrawer" />

    <sidebar v-if="isAuth" :drawer="drawer" />

    <!-- Sizes your content based upon application components -->
    <v-content class="mb-12">
      <!-- Provides the application the proper gutter -->
      <v-container v-if="isAuth" fluid>
        <nuxt />
      </v-container>

      <nuxt v-else />
    </v-content>

    <the-default-footer v-if="!isAuth" />
  </v-app>
</template>

<script>
const TheDefaultFooter = () =>
  import('@/components/organisms/footer/TheDefaultFooter')
const Sidebar = () => import('@/components/organisms/sidebar/Sidebar')
const UserNavbar = () => import('@/components/organisms/navbar/UserNavbar')

export default {
  components: {
    TheDefaultFooter,
    Sidebar,
    UserNavbar
  },

  data() {
    return {
      drawer: false
    }
  },

  computed: {
    isAuth() {
      return this.$store.getters['auth/check']
    }
  },

  methods: {
    onDrawer() {
      this.drawer = !this.drawer
    }
  }
}
</script>
