<template>
  <v-app>
    <login-navbar />

    <!-- Sizes your content based upon application components -->
    <v-content class="login-container d-flex align-center">
      <!-- Provides the application the proper gutter -->
      <v-container fluid>
        <!-- If using vue-router -->
        <nuxt />
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import LoginNavbar from '~/components/login/LoginNavbar'

export default {
  components: {
    LoginNavbar
  }
}
</script>
