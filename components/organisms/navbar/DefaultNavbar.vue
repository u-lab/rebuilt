<template>
  <base-navbar
    :is-top="isTopPage"
    :title="title"
    :to-title="{ name: 'welcome' }"
  />
</template>

<script>
const BaseNavbar = () => import('@/components/molecues/navbar/BaseNavbar')

export default {
  components: {
    BaseNavbar
  },

  computed: {
    isTopPage() {
      return this.$route.name === 'welcome'
    },

    title() {
      return process.env.appName
    }
  }
}
</script>

<style></style>
