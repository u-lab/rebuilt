<template>
  <v-app class="default">
    <navbar />

    <!-- Sizes your content based upon application components -->
    <v-content>
      <!-- Provides the application the proper gutter -->
      <nuxt />
    </v-content>

    <the-default-footer />
  </v-app>
</template>

<script>
import Navbar from '@/components/organisms/navbar/DefaultNavbar'
import TheDefaultFooter from '@/components/organisms/footer/TheDefaultFooter'

export default {
  components: {
    Navbar,
    TheDefaultFooter
  }
}
</script>
