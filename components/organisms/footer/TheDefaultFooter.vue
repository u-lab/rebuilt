<template>
  <v-footer absolute app padless>
    <v-row justify="center" class="bg-top">
      <template v-for="(link, key) in links">
        <footer-btn
          v-if="link.isDisplay"
          :key="key"
          :href="link.href"
          :text="link.text"
          :to="link.to"
        />
      </template>
    </v-row>

    <v-col cols="12" class="bg-bottom text-center py-1">
      <small v-html="copylight" class="white--text" />
    </v-col>
  </v-footer>
</template>

<script>
import FooterBtn from '@/components/atoms/buttons/FooterBtn'

export default {
  components: {
    FooterBtn
  },

  computed: {
    copylight() {
      return `&copy; ${this.getDate} Archi Walk`
    },

    isAuthenticated() {
      return this.$store.getters['auth/check']
    },

    links() {
      return [
        { isDisplay: true, text: this.$t('home'), to: { name: 'welcome' } },
        {
          isDisplay: !this.isAuthenticated,
          text: this.$t('login'),
          to: { name: 'login' }
        },
        {
          isDisplay: !this.isAuthenticated,
          text: this.$t('register'),
          to: { name: 'register' }
        },
        {
          isDisplay: this.isAuthenticated,
          text: this.$t('dashboard'),
          to: { name: 'users.dashboard' }
        },
        { isDisplay: true, text: this.$t('contact'), href: '' }
      ]
    },

    getDate() {
      return new Date().getFullYear()
    }
  }
}
</script>

<style lang="scss" scoped>
.bg-top {
  background: #898989;
}

.bg-bottom {
  background: #464646;
}
</style>
