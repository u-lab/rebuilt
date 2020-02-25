<template>
  <v-app>
    <auth-navbar />

    <!-- Sizes your content based upon application components -->
    <v-content class="auth-container d-flex align-center">
      <!-- Provides the application the proper gutter -->
      <v-container fluid>
        <!-- If using vue-router -->
        <nuxt />
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import AuthNavbar from '~/components/auth/AuthNavbar'

export default {
  components: {
    AuthNavbar
  }
}
</script>
