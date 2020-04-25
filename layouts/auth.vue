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
import AuthNavbar from '@/components/organisms/navbar/AuthNavbar'

export default {
  components: {
    AuthNavbar
  }
}
</script>

<style lang="scss" scoped>
.auth-container {
  background-color: #444;
  background-position: center center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: 100% 100%;
}
</style>
