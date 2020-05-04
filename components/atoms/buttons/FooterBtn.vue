<template>
  <client-only>
    <v-btn
      v-text="text"
      :to="to"
      :href="href"
      :target="target"
      :rel="rel"
      color="#fff"
      text
      rounded
      class="my-2 opacity-100"
      dark
      nuxt
    />
  </client-only>
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
  },

  computed: {
    target() {
      return this.href ? '_blank' : undefined
    },

    rel() {
      return this.href ? 'noopener' : undefined
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
