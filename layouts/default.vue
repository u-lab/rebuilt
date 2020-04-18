<template>
  <v-app class="default">
    <user-navbar v-if="isAuth" />

    <navbar :class="{ 'mt-12': isAuth }" />

    <!-- Sizes your content based upon application components -->
    <v-content class="mb-12">
      <!-- Provides the application the proper gutter -->
      <nuxt />
    </v-content>

    <the-default-footer />
  </v-app>
</template>

<script>
import Navbar from '@/components/organisms/navbar/DefaultNavbar'
import UserNavbar from '@/components/organisms/navbar/UserNavbar'
import TheDefaultFooter from '@/components/organisms/footer/TheDefaultFooter'

export default {
  components: {
    Navbar,
    TheDefaultFooter,
    UserNavbar
  },

  computed: {
    isAuth() {
      return this.$store.getters['auth/check']
    }
  }
}
</script>
