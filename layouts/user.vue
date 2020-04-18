<template>
  <v-app>
    <sidebar :drawer="drawer" />

    <user-navbar @drawer="onDrawer" />

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
import Sidebar from '@/components/organisms/sidebar/Sidebar'
import UserNavbar from '@/components/organisms/navbar/UserNavbar'

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
    onDrawer(payload) {
      this.drawer = payload
    }
  }
}
</script>
