<template>
  <div class="other-page-link-wrapper">
    <template v-if="getNowPageName === 'login'">
      <router-link :to="{ name: 'register' }" class="other-page-link">
        {{ $t('register') }}
      </router-link>
    </template>

    <template v-else>
      <router-link :to="{ name: 'login' }" class="other-page-link">
        {{ $t('login') }}
      </router-link>
    </template>
  </div>
</template>

<script>
export default {
  computed: {
    getNowPageName () {
      return this.$route.name
    }
  }
}
</script>
