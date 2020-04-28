<template>
  <v-app>
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

<style lang="scss" scoped>
.auth-container {
  background-color: #444;
  background-position: center center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: 100% 100%;
}
</style>
