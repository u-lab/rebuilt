<template>
  <v-app>
    <sidebar />

    <user-navbar />

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
  }
}
</script>
