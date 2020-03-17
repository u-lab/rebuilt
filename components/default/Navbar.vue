<template>
  <v-container fluid>
    <header class="d-flex justify-content-between">
      <div class="default-navbar-container">
        <div class="default-navbar-wrapper">
          <nuxt-link
            :to="{ name: 'welcome' }"
            class="default-navbar-title-link"
          >
            <h1 v-if="IsTopPage" class="default-navbar-title">
              Archi Walk
            </h1>

            <p v-if="!IsTopPage" class="default-navbar-title">Archi Walk</p>
          </nuxt-link>
        </div>
      </div>
    </header>
  </v-container>
</template>

<script>
export default {
  computed: {
    IsTopPage() {
      return this.$route.name === 'welcome'
    }
  }
}
</script>
