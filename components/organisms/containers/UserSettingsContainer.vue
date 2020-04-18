<template>
  <v-container>
    <div class="mb-4">
      <nuxt-link :to="{ name: 'users.settings.index' }" class="icon-link">
        <v-icon v-text="`mdi-arrow-left`" class="icon-block" large />
      </nuxt-link>
    </div>

    <v-card class="pa-4">
      <h1 v-text="title" class="c-title mb-4" />

      <slot />
    </v-card>
  </v-container>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
.icon-block {
  border: 1px solid #333;
  border-radius: 50%;
}

.icon-link {
  text-decoration: none;
}
</style>
