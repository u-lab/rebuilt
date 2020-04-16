<template>
  <div>
    <v-btn
      v-if="to"
      v-text="text"
      :to="to"
      color="#fff"
      text
      rounded
      class="my-2 opacity-100"
      dark
      nuxt
    />

    <v-btn
      v-else-if="href"
      v-text="text"
      :href="href"
      color="#fff"
      text
      rounded
      class="my-2"
      dark
      target="_blank"
      rel="noopener"
    />

    <v-btn v-else v-text="text" color="#fff" text rounded class="my-2" dark />
  </div>
</template>

<script>
export default {
  props: {
    href: {
      type: String,
      default: undefined
    },

    to: {
      type: [String, Object],
      default: undefined
    },

    text: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
.opacity-100 {
  &::before,
  &:focus::before {
    opacity: 0;
  }

  &:hover::before {
    opacity: 0.08;
  }
}
</style>
