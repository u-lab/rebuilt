<template>
  <v-container>
    <div class="mb-4">
      <nuxt-link :to="to" class="text-decoration-none">
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
    backLink: {
      type: [Object, String],
      default: undefined
    },

    title: {
      type: String,
      required: true
    }
  },

  computed: {
    to() {
      return this.backLink || { name: 'users.settings.index' }
    }
  }
}
</script>

<style lang="scss" scoped>
.icon-block {
  border: 1px solid #333;
  border-radius: 50%;
}
</style>
