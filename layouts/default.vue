<template>
  <v-app class="default">
    <navbar />

    <!-- Sizes your content based upon application components -->
    <v-content>
      <!-- Provides the application the proper gutter -->
      <nuxt />
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
