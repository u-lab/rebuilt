<template>
  <div>
    <navbar />

    <div class="text-center mb-4">
      <template v-if="authenticated">
        <v-btn :to="{ name: 'users.dashboard' }" larage>
          {{ $t('dashboard') }}
        </v-btn>
      </template>
      <template v-else>
        <v-btn :to="{ name: 'login' }" large>
          {{ $t('login') }}
        </v-btn>
        <v-btn :to="{ name: 'register' }" large>
          {{ $t('register') }}
        </v-btn>
      </template>
    </div>

    <div class="text-center">
      <nuxt-link to="/pages/admin">管理者のページ</nuxt-link>
      <nuxt-link to="/pages/aaa">aaaのページ</nuxt-link>
    </div>
  </div>
</template>

<script>
const Navbar = () => import('@/components/organisms/navbar/DefaultNavbar')

export default {
  components: {
    Navbar
  },

  head() {
    return { title: this.$t('home') }
  },

  computed: {
    authenticated() {
      return this.$store.getters['auth/check']
    }
  }
}
</script>
