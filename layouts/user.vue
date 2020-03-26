<template>
  <v-app>
    <sidebar :drawer="drawer" />

    <user-navbar @drawer="drawerEvent" />

    <!-- Sizes your content based upon application components -->
    <v-content>
      <!-- Provides the application the proper gutter -->
      <v-container fluid>
        <nuxt />
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import Sidebar from '~/components/user/Sidebar'
import UserNavbar from '~/components/user/UserNavbar'

export default {
  components: {
    Sidebar,
    UserNavbar
  },

  data() {
    return {
      drawer: false
    }
  },

  methods: {
    drawerEvent(payload) {
      this.drawer = payload
    }
  }
}
</script>
