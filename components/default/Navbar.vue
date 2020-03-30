<template>
  <v-container fluid>
    <header class="d-flex justify-content-between">
      <div class="default-navbar-container pos-relative">
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
          <div class="triangle "></div>
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
<style>
.triangle {
  position: absolute;
  top: 22%;
  right: 5%;
  margin: 0 auto;
  width: 70px;
  border-top: 50px solid #000000;
  border-right: 50px solid transparent;
  border-bottom: 50px solid #bdbdbd;
  border-left: 50px solid transparent;
}
</style>
