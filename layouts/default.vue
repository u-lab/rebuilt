<template>
  <v-app style="background: #ddd">
    <navbar />

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
import Navbar from '@/components/organisms/navbar/DefaultNavbar'

export default {
  components: {
    Navbar
  }
}
</script>
